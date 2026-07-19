# Agent Instructions & Workflow

This repository is the MCHaagenti documentation portal, served by GitHub Pages from `docs/`. These instructions apply to every AI agent (Claude Code, Windsurf, Codex, and others) working in this repository.

**Strict Rules & Execution**
* **Read First (Structure):** Always read `INDEX.md` to understand the repository structure. If `INDEX.md` does not exist, create it first. Actively update it when structural changes occur.
* **Read Second (Context):** Always read `README.md` to understand the core project goals and context.
* **Design:** The site uses the shared MCEngine ecosystem theme (white/silver/modern, no dark theme), imported from `https://mcengine.github.io` (never raw content URLs, never local copies). The design system is defined in `DESIGN.md` of `MCEngine/mcengine.github.io` — the single source of truth for the whole ecosystem; this repository keeps no `DESIGN.md` of its own and never changes the visual style outside of what that document allows.
* **Content:** The website explains how the MCHaagenti projects work. Pages must stay explanatory; do not embed source code listings inside the website pages.
* **Static Only:** GitHub Pages serves static files from `docs/`. Use plain HTML, CSS, and JavaScript with no build step and no external runtime dependencies beyond the shared MCEngine theme assets.
* **No `.nojekyll`:** Never create `.nojekyll` files anywhere in this repository. GitHub Pages serves the site's static files without them.
* **Execution:** Create a solid plan. Write content section-by-section. Verify pages render correctly and links resolve before completing the task.
* **No Master/Main:** Never work directly on `master` or `main`. Create a new branch if the task scope changes; otherwise, continue on the active branch.

**Git & Branching Workflow (STRICT)**
* **Branch Naming:** Must follow `{type}/{primary-noun}` (e.g., `docs/homepage`). Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
* **Branch Coverage:** Branch names must reflect the entire set of changes on the branch, not only a subset of the work.
* **Commit Frequency & Verification:** Commit each change or group related changes. Do not wait for the entire session to finish. Always check the diff before creating a commit.
* **Commits:** Must use Conventional Commits (`type[optional scope]: description`). Commit messages must be plain text with no links or Jira IDs.
* **Pull Requests (PR):** Open sequentially. Always ask for user approval first. Provide a detailed report of added/modified/deleted features in the PR body. PR titles use human-readable language, not git conventions.

---

## Website repository structure

Every site in the MCEngine ecosystem shares this repository layout. `{org}` is
this repository's organization/name and `{section}` is a page folder (for
example `home`, `api`, `logs`).

```
{org}.github.io/
├── AGENTS.md                         # agent rules for this repository (this file)
├── INDEX.md                          # repository structure index
├── README.md                         # human-facing project overview
└── docs/                             # served by GitHub Pages (Settings → Pages → branch master, folder /docs)
    ├── index.html                    # homepage
    ├── {section}/index.html          # one folder per page/section
    ├── css/                          # OPTIONAL — only this repo's OWN custom styles
    │   └── {section}/{section}.css   #   per-section stylesheet (custom only)
    ├── js/                           # OPTIONAL — page scripts (e.g. site.js include loader)
    └── partials/                     # OPTIONAL — shared header/footer fragments
        ├── header.html
        └── footer.html
```

### Shared theme — single source of truth

The visual language (design tokens, layout, and components) is defined **once**
in `MCEngine/mcengine.github.io` and consumed by every site over the network —
it is never copied into this repository:

* `DESIGN.md` in `MCEngine/mcengine.github.io` is the single source of truth for
  the design system. This repository keeps **no** `DESIGN.md` of its own.
* The shared stylesheets are served from `https://mcengine.github.io/`. Import
  them in every page's `<head>` — either the modular theme:

  ```html
  <link rel="stylesheet" href="https://mcengine.github.io/css/main.css">
  <link rel="stylesheet" href="https://mcengine.github.io/css/shared/layout.css">
  <link rel="stylesheet" href="https://mcengine.github.io/css/shared/components.css">
  ```

  or, for pages built on the single-file theme with page transitions:

  ```html
  <link rel="stylesheet" href="https://mcengine.github.io/styles/main/style.css">
  <script src="https://mcengine.github.io/scripts/main/script.js" defer></script>
  ```

* Add a local `docs/css/{section}/{section}.css` **only** when this repository
  needs its own custom, per-page styling. Never re-create the shared theme files
  locally, and never use raw `raw.githubusercontent.com` URLs.
