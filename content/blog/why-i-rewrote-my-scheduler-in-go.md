---
title: "why-i-rewrote-my-scheduler-in-go.md"
date: "2026-08-14"
category: "engineering"
tags: ["go", "backend"]
excerpt: "A cron-in-Python side project outgrew the GIL. Notes on the rewrite, what got simpler, and what got harder."
---

## the problem

The original scheduler was a couple hundred lines of Python sitting on top of `APScheduler`. It worked fine right up until I needed it to fan out a few hundred jobs a minute with tight timing guarantees. The GIL didn't care about my timing guarantees.

Symptoms showed up as jitter first — jobs firing 200-400ms late under load — then as outright missed ticks once a worker got stuck on something blocking. Profiling pointed at exactly what you'd expect: thread contention around the job queue, plus a few `requests` calls that had no business being synchronous.

## why Go, specifically

I considered three options:

- Fix the Python version (async rewrite, `asyncio` scheduler, more workers)
- Move to a message queue + language-agnostic workers
- Rewrite the scheduler itself in Go

I picked Go because the actual problem was concurrency primitives, not architecture. Goroutines and channels map almost one-to-one onto "run N jobs on a schedule, some of them slow, none of them allowed to block the others." No new infrastructure, no new failure modes to learn — just a language better suited to the job.

## what got simpler

```go
func (s *Scheduler) run(job Job) {
    ticker := time.NewTicker(job.Interval)
    defer ticker.Stop()
    for {
        select {
        case <-ticker.C:
            go s.execute(job)
        case <-s.done:
            return
        }
    }
}
```

That's most of the core loop. No thread pool tuning, no `GIL`-aware batching, no async/sync boundary to keep straight in my head. Each job gets its own goroutine, the scheduler just ticks.

## what got harder

Error handling got more explicit, which is a fair trade but not a free one. Every goroutine needs its own panic recovery or a crashed job silently kills the whole process. I ended up with a small `safeRun` wrapper around every job execution:

```go
func safeRun(fn func()) {
    defer func() {
        if r := recover(); r != nil {
            log.Printf("job panicked: %v", r)
        }
    }()
    fn()
}
```

Also lost some of Python's batteries-included tooling — no `APScheduler`-style persistence store out of the box, so job state (last run, next run, backoff) is now a small struct I serialize to disk myself.

## outcome

Jitter dropped from ~250ms average to under 5ms under the same load. More importantly, it stopped being a thing I had to think about. That's really the bar for infrastructure code: it should disappear.
