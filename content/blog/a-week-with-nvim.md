---
title: "a-week-with-nvim.md"
date: "2026-05-19"
category: "tools"
tags: ["neovim", "productivity"]
excerpt: "Switched from VS Code to Neovim for a week to see if it would stick. It stuck, mostly because of one keybinding."
---

## why bother

Not chasing the "real programmers use vim" thing. The actual motivation was dumber: I kept losing flow reaching for the mouse to jump between files, and VS Code's remote-SSH mode was laggy enough on a slow connection that I wanted a terminal-native alternative for that specific case.

## the setup

Kept it deliberately small — no giant distro config, just:

- `telescope.nvim` for fuzzy file/grep search
- `nvim-lspconfig` + `mason.nvim` for LSP
- `treesitter` for actual syntax awareness instead of regex highlighting
- one status line plugin, because a blank status line makes me anxious

That's it. No 40-plugin kitchen-sink config, on purpose — the goal was to see if the editor itself changed anything, not to build a new IDE from scratch.

## what actually stuck

`gd` to jump to definition and `<C-o>` to jump back. That's genuinely most of it. Everything else — the modal editing, the motions, `ci"` to change inside quotes — is nice, but the navigation loop of "jump in, read, jump out" without touching the mouse is the thing that changed how fast I move through unfamiliar code.

## what didn't

Debugging. `nvim-dap` works, but the setup cost per language was high enough that for anything beyond a quick `print`, I still reach for a real debugger in a full IDE. I'm not going to pretend otherwise.

## verdict

Kept it for remote work and quick edits. Still keep a full IDE around for anything involving a debugger attached to a running process. Not a religious conversion, just added a better tool for a specific job.
