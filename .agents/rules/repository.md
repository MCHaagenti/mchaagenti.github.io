# Repository-specific rules — mchaagenti.github.io

This repository is the MCHaagenti documentation portal, served by GitHub Pages from `docs/`. These instructions apply to every AI agent (Claude Code, Windsurf, Codex, and others) working in this repository.

## Repository-specific rules
* **Read First (Structure):** Always read `INDEX.md` to understand the repository structure. If `INDEX.md` does not exist, create it first. Actively update it when structural changes occur.
* **Read Second (Context):** Always read `README.md` to understand the core project goals and context.
* **Design:** The site uses the shared MCEngine ecosystem theme (white/silver/modern, no dark theme), vendored locally in this repository under `docs/styles/` and `docs/scripts/` (never imported over the network, never raw content URLs). The design system is documented in this repository's own `DESIGN.md`, a copy kept in sync with the canonical `DESIGN.md` in `MCEngine/mcengine.github.io`; never change the visual style outside of what `DESIGN.md` allows.
* **Content:** The website explains how the MCHaagenti projects work. Pages must stay explanatory; do not embed source code listings inside the website pages.
* **Static Only:** GitHub Pages serves static files from `docs/`. Use plain HTML, CSS, and JavaScript with no build step and no external runtime dependencies beyond the shared MCEngine theme assets.
* **No `.nojekyll`:** Never create `.nojekyll` files anywhere in this repository. GitHub Pages serves the site's static files without them.
* **Execution:** Create a solid plan. Write content section-by-section. Verify pages render correctly and links resolve before completing the task.
* **No Master/Main:** Never work directly on `master` or `main`. Create a new branch if the task scope changes; otherwise, continue on the active branch.
