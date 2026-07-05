# Repository Index

This file is the entry point for any agent working in this repository. Read it first, then [`AGENTS.md`](AGENTS.md) and [`README.md`](README.md).

`mchaagenti.github.io` is the MCHaagenti documentation portal, served by GitHub Pages from `docs/`. It uses the shared MCEngine theme (white/silver/modern with page transitions) imported from `https://mcengine.github.io`. Keep this index accurate whenever files or directories are added, removed, or restructured.

## Root Files

| Path | Purpose |
|---|---|
| AGENTS.md | Agent instruction set (workflow, branching, commits, content rules). |
| README.md | Repository overview. |
| INDEX.md | This file. |

## Site Content (`docs/`, served by GitHub Pages)

| Path | Purpose |
|---|---|
| docs/index.html | `/` — documentation portal with navigation blocks to every project. |
| docs/mctrade/index.html | `/mctrade/` — MCTrade documentation (item-to-item trading market). |

## Shared Theme Assets

The pages carry no local stylesheets or scripts. They import the shared MCEngine theme hosted by `MCEngine/mcengine.github.io`:

- `https://mcengine.github.io/styles/main/style.css` — tokens, components, page transitions.
- `https://mcengine.github.io/styles/important/main.css` — centered container card layout.
- `https://mcengine.github.io/scripts/main/script.js` — page transition controller.
