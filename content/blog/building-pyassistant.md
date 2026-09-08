---
title: "building pyassistant"
date: "2026-03-30"
category: "projects"
tags: ["python", "ai", "automation"]
excerpt: "A daily Python challenge generator with an AI assistant that gives hints instead of answers. Notes on keeping the assistant from just solving the problem for you."
---

## the idea

A small daily-challenge tool: generate a Python problem at a chosen difficulty, run the user's solution against test cases, and offer an assistant that gives *hints*, not solutions. The interesting part was never the challenge generation — it was making the assistant actually withhold the answer.

## the naive version

First pass just wrapped a system prompt around "give hints, don't give the full solution." It worked for about a day, until a slightly more insistent phrasing ("just show me the fixed version, I'll learn from reading it") talked it straight into producing working code.

## what actually worked

Structural constraints instead of instructional ones — don't ask the model to hold back, make it structurally unable to:

1. The assistant never sees the reference solution. It only sees the problem statement, the user's current code, and the failing test output.
2. Its response schema has no field for a full code block — only `hint_text` and `pointer_line`. If it tries to cram code into `hint_text` anyway, a post-processing regex strips fenced code blocks before the response reaches the user.
3. Each hint costs a "hint token" from a small daily budget, which discourages just chain-requesting hints until the answer falls out.

```python
class Hint(BaseModel):
    hint_text: str
    pointer_line: int | None = None
    # deliberately no `solution` or `code` field
```

## the part I underestimated

Grading partial correctness. "Wrong" isn't one bucket — off-by-one, wrong edge case, right idea/wrong syntax, and completely-lost all need different hints, and the test runner alone can't tell those apart. Ended up diffing the user's AST against a small set of known-mistake patterns per problem, which is crude but catches the common cases well enough to route to a more specific hint.

## outcome

It's a small tool, still rough at the edges, but the actual lesson generalized past this one project: if you want an LLM to reliably *not* do something, don't ask nicely — remove its ability to do it in the first place.
