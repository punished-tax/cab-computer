---
title: "Custom scraper for chess.com stats"
date: "2026-01-10"
stack: ["Python", "requests", "chess.com public API", "SQLite", "pandas"]
excerpt: "Scraper for stats and game fetching"
github: ""
demo: ""
screenshots: []
---

## why

chess.com's own stats page gives you rating over time and not much else. I wanted to actually see my own patterns — which openings I bleed the most points on, whether my rating drops are clustered by time of day, that kind of thing — and none of that exists in the built-in UI. So: pull my own game history somewhere I can query it.

## fetching, politely

chess.com exposes a public read-only API (no auth needed for a username's own profile, stats, and monthly archives), so this was less "scraping" in the adversarial sense and more "structured fetching." Each account has a list of monthly archive URLs, and each archive returns every game played that month as PGN plus metadata — result, time control, ratings for both sides, accuracy if available.

The only real constraint was rate limiting myself. Nothing about the API demanded it, but hammering someone else's public endpoint just because I *can* felt like a bad habit to build, so every request goes through a small wrapper that sleeps between calls and backs off on non-200s.

## turning PGN into something queryable

Each game comes back as a PGN blob, which is great for a chess engine and useless for `GROUP BY`. Parsed each game into a flat row: my color, opening (via ECO code), result, time control, rating before/after, and move count. That went into a local SQLite table, one row per game, which is the part that actually made the project worth doing — a spreadsheet-shaped view of a few thousand games.

```python
def parse_game(pgn: str) -> GameRow:
    game = chess.pgn.read_game(io.StringIO(pgn))
    headers = game.headers
    return GameRow(
        eco=headers.get("ECO"),
        result=headers.get("Result"),
        time_control=headers.get("TimeControl"),
        rating_before=int(headers.get("WhiteElo" if is_white else "BlackElo")),
    )
```

## what the data actually showed

The honest answer: less than I hoped. No dramatic "you always lose after 10pm" pattern. The one real signal was opening-dependent — a couple of openings I play on autopilot had a noticeably worse win rate than my average, which matched the "I peaked at 1200 and I'm fine with it" vibe more than it contradicted it. Turns out data confirming you're comfortably mediocre is still data.

## outcome

Small, still just a local SQLite file and a couple of pandas notebooks, no dashboard yet. But it's the kind of tool I keep reaching for whenever curiosity about my own numbers shows up again — rerun the fetch, get the new games, ask a new question.
