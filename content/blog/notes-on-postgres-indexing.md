---
title: "notes-on-postgres-indexing.md"
date: "2026-07-02"
category: "notes"
tags: ["postgres", "database"]
excerpt: "Loose notes from tracking down a slow query: B-tree vs GIN, partial indexes, and reading EXPLAIN without panicking."
---

## the query

A `WHERE status = 'pending' AND created_at > $1` filter over a table with about 4 million rows, going from ~8ms to ~1200ms as data grew. Classic case of an index that used to be selective enough and no longer is.

## reading EXPLAIN without panicking

The habit that actually helps: read bottom-up, and only look at `actual time`, not `cost`. Cost is the planner's estimate; actual time is what happened.

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM jobs WHERE status = 'pending' AND created_at > now() - interval '1 day';
```

```
Seq Scan on jobs  (actual time=0.02..1187.44 rows=812 loops=1)
  Filter: (status = 'pending' AND created_at > ...)
  Rows Removed by Filter: 3991204
```

`Rows Removed by Filter` is the tell. The planner is scanning almost the whole table to find 812 rows.

## partial index over composite index

My first instinct was a composite index on `(status, created_at)`. That works, but `status = 'pending'` is a tiny fraction of rows most of the time — the rest are `done` or `failed`. A partial index is a better fit:

```sql
CREATE INDEX idx_jobs_pending_created
ON jobs (created_at)
WHERE status = 'pending';
```

Smaller index, cheaper to maintain on write, and the planner only even considers it for the query shape it's built for. Query dropped to ~3ms.

## B-tree vs GIN, briefly

Not relevant to this specific query, but came up while I was in there: B-tree is the default and right for equality/range on scalar columns. GIN is for when a single column holds multiple indexable values — `jsonb`, arrays, full-text search vectors. Using GIN on a plain `timestamp` column is a category error, not just a suboptimal choice.

## takeaway

Indexing decisions age. A column that was fine to scan at 50k rows is not fine at 4 million, and the fix is usually not "add more index" but "add the *right* index for the actual access pattern" — which usually means looking at the query, not the schema.
