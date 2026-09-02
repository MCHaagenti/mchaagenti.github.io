---
name: agent-wiki-context-repository-map
description: Orientation for an agent working in the MCHaagenti portal — what lives where, how the site is served, and the constraints that bite first.
---

# Repository Map — MCHaagenti Portal

Read this before touching anything. It says where things are; the rules that constrain them
live in [`../../rules/repository.md`](../../rules/repository.md), and the facts a human
would want are in [`../../../wiki/`](../../../wiki/), linked rather than repeated.

## Layout

| Path | What it is |
|---|---|
| `docs/` | The published site. GitHub Pages serves this folder directly. |
| `docs/index.html` | The portal homepage, with navigation blocks to every project. |
| `docs/mctrade/index.html` | The MCTrade documentation page. |
| `docs/styles/main/style.css` | Vendored shared theme: tokens, components, page transitions. |
| `docs/styles/important/main.css` | Vendored centered container card layout. |
| `docs/scripts/main/script.js` | Vendored page transition controller. |
| `DESIGN.md` | The design system this site must stay within. |
| `.agents/` | This instruction set. Start at [`../../index/root-index.md`](../../index/root-index.md). |
| `wiki/` | Human documentation. |

## Build and run

There is no build step, no package manifest, and no test suite. Open `docs/index.html` in a
browser, or serve `docs/` with any static file server, and the site is what you see. Do not
claim tests passed; say plainly that none exist.

## Gotchas

* **`docs/` is not a documentation tree.** It is the published artifact. The shared ban on
  a third documentation tree does not make it one, and it must not be folded into `wiki/`.
* **Never add a `.nojekyll` file.** The site is served without one.
* **The theme is vendored, not linked.** Every page references `docs/styles/` and
  `docs/scripts/` with relative paths. A network import or a raw content URL breaks the
  repository's independence from `MCEngine/mcengine.github.io`.
* **`DESIGN.md` is a synchronized copy**, not this repository's invention. Changing the
  visual language here without changing the canonical copy puts the two out of step.
* Pages are explanatory. Source code listings belong in the project repositories.

## Shared set

Universal conventions are not in this repository. They are served by the
`lxagents-agents-base` connector and resolved per the bootstrap in the root
[`AGENTS.md`](../../../AGENTS.md).
