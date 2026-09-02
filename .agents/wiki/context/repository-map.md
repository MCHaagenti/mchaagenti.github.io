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
| `docs/mcreport/index.html` | The MCReport documentation page. |
| `docs/mctrade/index.html` | The MCTrade documentation page. |
| `docs/css/main.css` | Design tokens and base element styles. Every value the site uses resolves here. |
| `docs/css/shared/layout.css` | Header, nav, footer, breadcrumbs. |
| `docs/css/shared/components.css` | Every component class. |
| `docs/js/site.js` | Injects the header and footer partials at runtime. |
| `docs/partials/` | The shared header and footer, using the `{{ROOT}}` token. |
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
* **A page must serve over HTTP to render fully.** `site.js` fetches the partials, so
  opening a file directly leaves the header and footer empty. That is not a bug.
* **Never give a partial YAML front matter.** Jekyll only runs Liquid over files that have
  it, and Liquid would eat the `{{ROOT}}` token. Never add `.nojekyll` either; it is
  forbidden by the repository rules.
* **Wrap every table in `.table-wrap`**, or a wide one scrolls the whole page sideways.
* **`DESIGN.md` is a synchronized copy**, not this repository's invention. Changing the
  visual language here without changing the canonical copy puts the two out of step.
* Pages are explanatory. Source code listings belong in the project repositories.

## Shared set

Universal conventions are not in this repository. They are served by the
`lxagents-agents-base` connector and resolved per the bootstrap in the root
[`AGENTS.md`](../../../AGENTS.md).
