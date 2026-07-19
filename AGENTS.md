# Agent Instructions & Workflow

This repository is the MCHaagenti documentation portal, served by GitHub Pages from `docs/`. These instructions apply to every AI agent (Claude Code, Windsurf, Codex, and others) working in this repository.

**Strict Rules & Execution**
* **Read First (Structure):** Always read `INDEX.md` to understand the repository structure. If `INDEX.md` does not exist, create it first. Actively update it when structural changes occur.
* **Read Second (Context):** Always read `README.md` to understand the core project goals and context.
* **Design:** The site uses the shared MCEngine ecosystem theme (white/silver/modern, no dark theme), vendored locally in this repository under `docs/styles/` and `docs/scripts/` (never imported over the network, never raw content URLs). The design system is documented in this repository's own `DESIGN.md`, a copy kept in sync with the canonical `DESIGN.md` in `MCEngine/mcengine.github.io`; never change the visual style outside of what `DESIGN.md` allows.
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

### Shared theme — vendored locally

The visual language (design tokens, layout, and components) is the shared
MCEngine "Silver Glass" design system, documented in this repository's own
`DESIGN.md` (a copy kept in sync with the canonical `DESIGN.md` in
`MCEngine/mcengine.github.io`). Each site vendors its own copy of the theme
locally so it has no runtime dependency on another repository:

* The theme files live under `docs/` in this repository — either the modular
  theme (`docs/css/main.css`, `docs/css/shared/layout.css`,
  `docs/css/shared/components.css`) or the single-file theme
  (`docs/styles/main/style.css` plus `docs/scripts/main/script.js`).
* Every page links these local files with **relative** paths. Never import a
  stylesheet or script over the network (`https://mcengine.github.io/...` or raw
  content URLs).
* Add a local `docs/css/{section}/{section}.css` (or extend the single-file
  theme) only for this repository's own custom, per-page styling.

---

## Organization Standard — Agent Instructions & Workflow

### Iron Rules

* **Platform Specification:** Whether working with a single repository or multiple repositories, the user must explicitly specify the cloud hosting platform for each repository. For example:
  * `{org}/{repo} - github.com`
  * `{org}/{repo} - gitlab.com`
* **Project Hosting Validation:** The project hosting information must be clearly documented in the first section of the `README.md` file. If this information is missing, you must ask the user where the project is hosted and update the `README.md` to include it using exactly this format (ensuring the items are clickable links):
  ```markdown
  # Project Overview

  * **Platform:** [github.com](link) or [gitlab.com](link)
  * **Organization:** [organization-name](link)
  * **Repository:** [repository-name](link)
  ```

### Strict Rules & Execution

* **Initialization (Read & Understand):** For every repository being worked on (single or multiple), you must perform the following:
  1. **Structure (`INDEX.md`):** Always read `INDEX.md` to understand the project structure. If it does not exist, create it first using the **Universal Repository Index Template** provided below. Actively update it whenever structural changes occur.
  2. **Context (`README.md`):** Always read `README.md` to understand the core project goals, context, setup instructions, and to verify the project hosting information. If the hosting information is missing, refer to the **Project Hosting Validation** iron rule immediately.
* **Execution:** Create a solid plan. Write code section-by-section. Test thoroughly by executing the project's standard test suite via the command line (e.g., `npm test`, `pytest`, `cargo test`) and fix any errors. Verify code security for modified files before completing the task.
* **Modularity:** Separate code into multiple focused files and modules to prevent spaghetti code. Keep files concise and adhere to the Single Responsibility Principle.
* **Dashes:** Do not use dashes (`-`) unnecessarily. Use them strictly for file or directory names (e.g., `getting-started.md`) and branch names. Avoid them in variable names, database schemas, or general prose unless standard conventions explicitly require it.
* **Versioning:** If a project is newly created, its version must be set to "0.0.0". For any pull request (PR) update, the version must always be updated. The version must use the Semantic Versioning format (`Major.Minor.Patch`). If it does not, update it to this format. Before merging, check if the version has been updated. If it hasn't changed, ask the user if they want to update it. If they answer yes, update the version according to the standard definitions of Major, Minor, and Patch.
* **Documents:** The root `README.md` must contain only an overview of the project. The project must have the following documentation files: `wiki/requirements.md`, `wiki/api.md`, `wiki/environment.md`, and `wiki/system.md`. Any other required documentation files must be created within the `wiki/` directory using lowercase filenames, and use hyphens for multiple words (e.g., `wiki/getting-started.md`).
* **Environment:** Do not create a `.env.example` file. Instead, document the required environment variables within the `wiki/environment.md` file using a code block. When providing example values, do not use actual realistic text; use standardized placeholders such as `your_{name}_api_key`, `your_server_api_key`, or `your_openrouter_api_key`. Any examples of infrastructure configurations (e.g., Kubernetes, docker-compose, etc.) must also be written exclusively within the `wiki/environment.md` file.
* **Website Synchronization:** If the user has also cloned the website repository, the agents must update the website contents accordingly.

### Universal Repository Index Template

When creating or updating `INDEX.md`, Agents must follow this structure, adapting the sections to fit the specific project type. Every table must list the directory in the first row, followed by its respective files or subdirectories. **Every single file or directory must have its own dedicated row.**

```markdown
# Repository Index

This file is the entry point for understanding the project structure. Agents MUST read it first, and keep it updated whenever the structure or indexed content of this repository changes. It reflects only the files and directories that exist in this repository.

Agent rules are not kept in this repository. They live in the portable `.agents` instruction set used alongside it.

## Root Files

| Directory / File | Purpose |
|---|---|
| [`./`](./) | Repository root directory. |
| [`INDEX.md`](INDEX.md) | This project structure index. |
| [`README.md`](README.md) | Human-facing project overview. |
| [`package.json`](package.json) | Core dependency and build configuration. |
| [`Dockerfile`](Dockerfile) | Main Docker image configuration. |
| [`docker-compose.yml`](docker-compose.yml) | Multi-container orchestration. |
| [`.gitignore`](.gitignore) | Git ignore configuration. |
| [`.gitattributes`](.gitattributes) | Git attributes configuration. |

## Source Modules / Architecture

Description of the overall architectural patterns (e.g., MVC, Monolith, Multi-module, Microservices). All core packages or directories must be listed below.

### [Module/Layer Name]

Description of the responsibility of this specific module or layer.

| Directory / File | Purpose |
|---|---|
| [`src/`](src/) | Root source directory. |
| [`src/core/`](src/core/) | Core business logic and types. |
| [`src/api/`](src/api/) | API routes, controllers, or contracts. |
| [`src/infrastructure/`](src/infrastructure/) | Database connections, external service clients, or drivers. |

*(Repeat the module/layer block above for every major module, package, or application layer in the repository)*

## Documentation

| Directory / File | Purpose |
|---|---|
| [`wiki/`](wiki/) | Human-facing documentation root directory. |
| [`wiki/api.md`](wiki/api.md) | API specifications and endpoints. |
| [`wiki/environment.md`](wiki/environment.md) | Environment configuration, variables, and infrastructure examples. |
| [`wiki/requirements.md`](wiki/requirements.md) | Project requirements. |
| [`wiki/system.md`](wiki/system.md) | System architecture documentation. |
```

### Agent Directories

All agent-specific files and configurations must be centralized under the `.agents/` directory. Each repository will have its own `.agents/` directory. Agents must strictly use the agent directory belonging to the current repository and must not use or cross-reference `.agents/` directories from another repository.
* `.agents/`: Root directory for all agent configurations.
* `.agents/skills/`: Specific skill definitions and execution steps.
* `.agents/tools/`: Tool definitions and schemas.
* `.agents/knowledge/`: Domain-specific context.
* `.agents/personas/`: Specific roles to adopt.
* `.agents/ethics/`: Safety bounds and constraints.

### Git & Branching Workflow (STRICT)

* **Task Management:** If the user provides one or multiple tasks, each task must have its own branch created, a pull request (PR) opened, and be merged separately.
* **No Master/Main:** Never work directly on the `main` or `master` branches. Create a new branch if the task scope changes; otherwise, continue on the active branch.
* **Branch Naming & Validation:** Must follow `{type}/{primary-noun}` (e.g., `feat/login`). Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`. Absolutely do not use preset prefixes (e.g., `claude/`, `codex/`). If a created branch does not follow the naming convention, you must recreate it (rewrite the branch name and delete the incorrect branch) or provide the user with options on how to proceed.
* **Commit Frequency & Verification:** Commit each change or group related commits. Do not wait for the entire session to finish. Always check the diff before creating a commit.
* **Commits:** Must use Conventional Commits (`type[optional scope]: description`). Commit messages must be plain text with **no links** or Jira IDs.
* **Pull Requests (PR):** Open sequentially. Always ask for user approval first. Provide a detailed report of added/modified/deleted features in the PR body. PR titles and descriptions must contain **no links**. Assume any references to github.com or gitlab.com are for their cloud-hosted environments.
