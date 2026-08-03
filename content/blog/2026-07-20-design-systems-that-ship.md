---
title: Design systems that ship
description: How to keep a system honest when product velocity is high — craft without ceremony.
date: 2026-07-20
tags: design-systems, craft, frontend
draft: false
---

Design systems die in two ways: too little process (every team invents a button), or too much (the system becomes the product and shipping slows to a crawl). The useful middle is a system that **earns** its constraints by making the right thing faster than the wrong thing.

## Intent before components

A token library without intent is a paint catalog. Before another `Button` variant, write down:

- What must feel identical across surfaces (trust, density, focus)?
- What is allowed to diverge for product personality?
- Who owns the exception path when design and engineering disagree?

At Herald, the “human layer” on AI workflows only works if the UI vocabulary is calm and predictable. Models can surprise people; the chrome should not.

## Ship the boring path first

The best systems I’ve maintained (Williams-Sonoma, NextRequest, Afterpay, Optimizely) shared a pattern:

1. **One canonical primitive** per interaction — not five near-duplicates.
2. **Docs that show real product screens**, not isolated Storybook islands.
3. **CI that fails on drift** (Chromatic, visual diffs, package versioning) so “temporary” forks don’t become permanent.

Ceremony is optional. **Feedback loops** are not.

## Terminal as a design surface

This site is a small proof: a constrained interaction model (slash commands, cards, mono chrome) can still feel generous. The same discipline applies to dashboards and AI editors — reduce the surface area, invest in the states that matter (empty, loading, error, “are you sure?”).

If a pattern only works in the happy path, it isn’t a system yet. It’s a screenshot.

## What to measure

- Time from “we need X” to “X is in prod without a one-off”
- Number of unmanaged local forks of shared components
- Accessibility and contrast regressions caught before release

Craft is not pixel perfection for its own sake. It’s making the inevitable interface feel like it was always supposed to be there — and making that path the one your team can actually ship.
