---
title: Rebuilding Herald’s CLI in Rust and ratatui
description: Why I reimplemented our production TUI from React + Ink into a dual-run Rust client — binary distribution, feel, and scripts that made the rewrite sane.
date: 2026-07-24
tags: rust, ratatui, cli, tui, herald, craft
draft: false
---

Herald’s client CLI started life as a TypeScript app on React + Ink. That was the right call at the time: we already thought in React, shipped fast, and got a real product into people’s terminals.

But Herald is not a simple spinner-and-prompt demo. It is a long-lived TUI that streams investigations, runs local tools, manages credentials, and talks to production systems. Over time, the Node + Ink stack started to feel like the wrong long-term home for that product.

So I rebuilt it.

**herald_v2** is a parallel reimplementation in Rust + ratatui — same product shape, same protocol and config contracts, different runtime. Binary name: `herald-v2`. It does not break the npm `herald` package. Dual-run was intentional from day one.

## Why leave Ink

Three things kept showing up.

### 1. Distribution

Customers install a DevOps CLI and expect something closer to `kubectl` or `gh`, not “install Node 18+, then the package.” V1’s install story always carried a runtime dependency. A stripped release binary lands around ~4–5 MB and needs nothing else on `PATH`. That alone is a better enterprise story: simpler Homebrew formulas, locked-down machines, fewer “which Node?” tickets.

### 2. Feel

Ink’s model is React reconcile → Yoga layout → rewrite the terminal. It works, and we shipped real product with it. ratatui’s model is immediate-mode: **state → paint a frame → diff cells → terminal**.

For streaming agent output, keyboard-driven navigation, and overlays, that loop feels more native. Subjectively, input and redraws are snappier. Resize also becomes ordinary code — recompute from state + size — instead of a framework-shaped edge case we had already spent time fighting in V1.

### 3. Systems work lives next to the UI

A large part of Herald is not JSX. It is process control, tool execution, WebSockets, file permissions, watchers, and async orchestration. Doing all of that in one compiled crate — Tokio for background work, a sync ratatui loop for paint — is a cleaner story than “UI in React, glue in Node, hope the event loop cooperates.”

None of that means Ink is bad. It means Herald’s product surface was outgrowing the stack we used to prove it.

## Same product, familiar architecture

I did not want a clever rewrite that reinvented every abstraction. I wanted parity with a structure people who know V1 could still read.

| Idea | V1 (Ink) | V2 (ratatui) |
|------|----------|--------------|
| Screens | `screens/` | `ui/screens/` + a `Screen` trait |
| Reusable UI | React components | `ui/widgets/` |
| Domain logic | `lib/` | crate-root modules (session, tools, …) |
| Theme | `theme.ts` | `theme.rs` as single source of truth |
| Orchestration | app shell | thin `main.rs` + `app.rs` |
| Protocol / config | shared contracts | same HTTP/WS + `~/.herald` formats |

**Library-first** mattered a lot: almost everything lives in the library crate; the binary only parses CLI flags, sets up the runtime, and enters the TUI. Screens own local state; App owns global state; background work goes over channels so the render loop never blocks.

Ratatui does not give you React’s component tree, so we invented the seams ourselves — `Screen`, `ScreenAction`, pure-ish widgets with explicit props. That discipline is what keeps `app.rs` from becoming a god object.

## Quality first: tests, docs, and deliberate design

Because this was a rewrite of a production surface, “move fast and hope” was not the plan.

**Testing.** Domain logic and pure helpers get unit tests as a default, not a nice-to-have. Config, credentials, predictions, protocol edges, paste/input helpers — if it can break without a human staring at a terminal, it should fail in `cargo test`. The goal is not “test the pretty frames”; it is confidence when we change behavior while dual-running against V1.

**Documentation.** I treated docs as part of the product of the rewrite. Architecture, structure tour, best practices, migration status, parity plan, go/no-go criteria, Ink vs ratatui decision brief, running guides, E2E checklists, side-by-side prod comparison. If a teammate (or future me) cannot start from `docs/START.md` and know which path to take, the rewrite failed even if the UI looks fine.

**Conventions.** Best practices are written down: library-first, widgets vs screens, theme only in one place, async/sync boundary via Tokio + mpsc. Writing them forced clarity; following them kept the port consistent as the surface grew.

## Learning Rust along the way

I did not pick this stack because I already lived in Rust. I picked it because the product wanted a native TUI and a single binary — and I was willing to learn.

Rust was a language I honestly never expected to spend serious time on. Ownership, lifetimes, and the async/sync split are real friction at first. The payoff is that the compiler becomes a harsh code reviewer: many classes of “works on my machine” bugs show up before the binary ships. For a CLI that holds credentials and runs local tools, that pressure is a feature.

The learning curve is not free. Reviewers need Rust fluency; hiring is a smaller pool than React. Dual-running two clients has a real cost. Those trade-offs belong in the open — we documented them in the decision brief instead of pretending the rewrite was pure upside.

## Snappier runtime, better day-to-day development

**Runtime:** cold start is a normal OS process, not Node + a module graph. Frame updates are paint + diff. Streaming investigations and key-heavy navigation feel tighter. Whether every millisecond is measured or not, the product feels more like infrastructure tooling.

**Shipping:** one binary per platform. No `depends_on "node"`. Easier story for SREs and security reviews (static artifact + lockfile vs live npm install graph). Packaging as the production `herald` name still has work ahead; the shape of the artifact is already right.

**Developing:** this is the part I did not fully appreciate until the scripts existed.

## The scripts changed how we work

Raw `cargo run` is fine for a toy. For dual-run against a real gateway, mock UI, and production cloud — while never wiping V1 credentials — **scripts are the product**.

Everything under `scripts/` defaults `HERALD_HOME` to `~/.herald-v2-sandbox`, isolated from npm herald’s `~/.herald`. That dual-run safety is what made daily development sane.

| Script | What it does |
|--------|----------------|
| `demo-preflight.sh` | Flight check: toolchain, sandbox home, optional release build |
| `mock.sh` | Offline UI only — no Redis, gateway, or API key |
| `local.sh` | Real sessions against local gateway / dev DB |
| `prod.sh` | Real sessions against production cloud |
| `hdev.sh` | Local stack: up, cli, logs, restart, status, macOS split |
| `fresh.sh` | Reset sandbox to first-run, mint a local key path, launch onboarding |
| `dev.sh` / `dev-herald-local.sh` | Lower-level stack helpers |

A typical day:

```bash
./scripts/demo-preflight.sh --quick   # am I ready?
./scripts/mock.sh                     # UI work with no backend
./scripts/hdev.sh up                  # once per day: redis + gateway
./scripts/local.sh                    # real investigation path
./scripts/prod.sh                     # side-by-side with cloud
```

That workflow is better than the old “remember twelve env vars and don’t nuke prod keys” muscle memory. Mock for design and navigation. Local for real protocol. Prod for honesty. Preflight so a teammate can demo without a 30-minute setup chat.

## What this rewrite was really about

Replicating Herald in ratatui was never only about Rust hype or frame budgets.

It was about:

- matching the product’s identity (terminal-native, shippable as a binary),
- keeping structure familiar so the port was a migration, not a rewrite of meaning,
- raising the quality bar with tests and docs as first-class work,
- making development repeatable with sandbox-safe scripts,
- and learning a language I had written off — then finding it fit the problem.

V1 in Ink taught us what Herald should be. V2 in ratatui is about making that product feel and ship like the infrastructure tool it always wanted to be.

I came for a snappier TUI. I stayed for the binary, the tests, and a language I never thought I’d write.
