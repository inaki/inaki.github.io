---
title: The architecture graph needed lenses, not a better layout
description: Herald’s Architecture page renders a system’s real component graph. It worked — and it still opened on a hairball. Here’s the redesign I’m betting on, and why the original view stays.
date: 2026-08-18
tags: design, information-architecture, graph-visualization, react-flow, herald, craft
draft: false
---

Herald builds a live map of your system: components, dependencies, groups, and the evidence behind each one. The Architecture page is where you see that map. It is React Flow, group boxes, a table view, and a versioned edit model where corrections become an auditable new version instead of a silent overwrite.

It works. It is genuinely a lot of product.

It also opens on the whole thing — every group, every component, every edge — and the honest reaction from most first-time viewers is a small flinch.

That is not a layout bug. You cannot fix it with a better `rankdir`.

## What V1 got right, and why it stays

It would be easy to tell this story as “the old graph was overwhelming, so I replaced it.” That is the wrong reading, and it would throw away the part that mattered most.

The first version is what proved the hard things:

- that a **content graph** of a real production system could be extracted, stored, and versioned at all;
- that **groups** could nest and lay out sensibly against a dependency mesh;
- that human corrections could be modeled as **delta ops on an immutable version**, not a wiki edit;
- that the same graph could serve a UI _and_ investigation agents reading it as a tool.

Every one of those is load-bearing. The redesign inherits all of them unchanged. Nothing about the data model, the version history, or the edit semantics is being thrown out — the new work is entirely about **what we render, when**.

And the full-fidelity view itself is not going anywhere. It becomes an explicit mode — a **Full graph** tab you choose — rather than the thing that greets you before you have asked a question. Some people want the whole mesh. Rendering it on demand is respect; rendering it on arrival is an ambush.

## Why this data is hard

| Dimension      | What people actually hit                                                                     |
| -------------- | -------------------------------------------------------------------------------------------- |
| **Nodes**      | Dozens to hundreds of components, nine-plus classifications                                  |
| **Edges**      | A dense “depends on” mesh with no natural sparsity                                           |
| **Groups**     | Nested bounding boxes fighting edge readability                                              |
| **Attributes** | Classification, aliases, description, properties, evidence, versions                         |
| **Jobs**       | Find X · What does X touch? · Is this map right? · Fix a mistake · Orient during an incident |

That last row is the real problem. One canvas was quietly being asked to do orientation, inventory, audit, and editing — four different jobs with four different densities — and the only way to serve all of them at once is to show everything at once.

## The reframe

**The full graph is a database, not a view.**

Once you say that out loud, the design falls out of it. You do not ship one canvas that answers every question. You ship **lenses** over the same data, each of which answers one question well.

The principles I’m holding the redesign to:

1. **Question-first.** Every view has a primary question it exists to answer.
2. **Default low density.** Fewer nodes and edges on first paint, always.
3. **One primary action.** Search, pick a domain, or open a service. Not all three at equal weight.
4. **Edge thrift.** Edges are the most expensive ink on the canvas. Earn them.
5. **Editing is a deliberate mode.** It arrives after context, not alongside it.

None of this is novel. It is the C4 model’s zoom levels, focus-plus-context, and progressive disclosure — applied to a surface that had grown past the point where one view could carry it.

## Three lenses

**L0 — System map.** Groups and external systems only, with dependencies aggregated to group→group edges. This is the page you land on. It fits on a screen, it is screenshot-able, and it answers “what is this system, roughly?” in about four seconds. Click a group to descend.

**L1 — Group map.** The components inside one domain, edges within it, and stubs where dependencies cross the boundary. Breadcrumb reads `Platform › Payments › billing-api`, so you always know where you are and how to get back up.

**L2 — Service radar.** A component and its one-hop neighborhood: what it depends on, what depends on it, with a depth toggle for a second hop. This is the incident view. When something is on fire, nobody wants the system map — they want the blast radius of one service.

Alongside those, an **outline rail**: a filterable tree of groups and components that drives the focused graph on the right. It is the IDE pattern, and it is unbeatable for “I know the name, get me there.” The table stops being a competing full dump of the graph and becomes **Inventory** — the completeness-and-aliases surface, where you audit rather than explore.

The straw-man flow:

> Land on the system map. Search “billing.” Jump to the `billing-api` radar at one hop. The rail shows its group and siblings; the panel shows description, depends-on, used-by, and the evidence behind each edge. “Show blast radius” is a toggle on the same view. “Edit” appears only once something is selected.

Same data. Same version. Four different densities, each chosen deliberately.

## Density tactics that apply to any of it

Even inside a lens, the canvas needs discipline:

- Hide edges until selection, or show only group-level edges at L0
- Slug on the node; relationship text lives in the panel, not on the canvas
- Encode type with color **or** icon — not both competing
- Cap visible nodes around 30–50, then “+ N more in group”
- One detail surface open at a time
- Version history is secondary; default to the latest trusted version
- Teach through the empty state: _search a service, or pick a domain_

That last one matters more than it sounds. An empty state that tells you what to do is a better first paint than a complete graph that tells you nothing.

## Staying on React Flow — and where I wouldn’t

There is a version of this post where the redesign becomes a library rewrite. It isn’t one.

React Flow is the right home for this product surface: custom nodes, group sub-flows, detail panels, an edit mode. That is what it is good at, and it is where the existing investment lives. The change I do want is **ELK over Dagre** for layout — layered architecture graphs are exactly the case where Dagre starts to strain and ELK doesn’t.

The broader point is that you rarely need one library to own every mode:

```text
Inventory / search / table     → plain React, design-system components
System map (groups)            → React Flow + ELK
Service radar (1–2 hops)       → React Flow, filtered
Dense global overview          → WebGL (G6 / Reagraph) — only if scale demands it
```

A WebGL overview or hierarchical edge bundling would be the answer to a 500-node hairball. It is not the answer to a 60-node graph that simply shipped with the wrong default. Reaching for the heavier renderer first would have been solving the fun problem instead of the real one.

## The questions I still owe an answer to

Being honest about what is unresolved is part of the design, not a gap in it:

- **Which job wins?** Orientation, correction, incident response, and the customer demo pull the default in different directions.
- **Are groups good enough to be L0?** The entire zoom hierarchy rests on grouping being trustworthy. If it isn’t, search-first has to lead instead.
- **What size are real graphs?** A 30-node map and a 300-node map want different first paints.
- **Docs feel or ops feel?** A calm architecture diagram and a dense operations console are both defensible; they are not the same product.

Those get settled with stakeholders and real customer graphs, not in a design doc.

## What this is really about

The old view was not wrong. It was _complete_ — and completeness is the correct instinct when you are still proving the data exists. You render everything because you need to see that everything is there.

The next version’s job is different. The map is real now; the work is making it answer questions.

V1 proved the graph was worth trusting. V2 is about making it worth opening.
