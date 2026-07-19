# Repository Index

This file is the entry point for any agent working in this repository. Read it first, then [`AGENTS.md`](AGENTS.md) and [`README.md`](README.md).

`mchaagenti.github.io` is the MCHaagenti documentation portal, served by GitHub Pages from `docs/`. It vendors its own local copy of the shared MCEngine theme (white/silver/modern with page transitions). Keep this index accurate whenever files or directories are added, removed, or restructured.

## Root Files

| Path | Purpose |
|---|---|
| AGENTS.md | Agent instruction set (workflow, branching, commits, content rules). |
| DESIGN.md | Design system: theme tokens, components, motion, and rules for changing the site (a copy of the shared MCEngine "Silver Glass" system). |
| README.md | Repository overview. |
| INDEX.md | This file. |

## Site Content (`docs/`, served by GitHub Pages)

| Path | Purpose |
|---|---|
| docs/index.html | `/` — documentation portal with navigation blocks to every project. |
| docs/mctrade/index.html | `/mctrade/` — MCTrade documentation (item-to-item trading market). |
| docs/styles/main/style.css | Vendored shared theme — tokens, components, page transitions. |
| docs/styles/important/main.css | Vendored centered container card layout. |
| docs/scripts/main/script.js | Vendored page transition controller. |

## Vendored Theme

The pages carry their own local copy of the shared MCEngine theme — there is no runtime dependency on another repository. The design system is documented in this repository's `DESIGN.md`. Pages link these with relative paths:

- `docs/styles/main/style.css` — tokens, components, page transitions.
- `docs/styles/important/main.css` — centered container card layout.
- `docs/scripts/main/script.js` — page transition controller.
