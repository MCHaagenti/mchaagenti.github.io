# Changelog — 0.1.0

**Date:** 2026-09-02

First recorded version of the MCHaagenti documentation portal, cut at the adoption of the
shared LXAgents agent instruction set. The repository now resolves its universal
conventions over the `lxagents-agents-base` MCP connector and keeps only what is genuinely
its own. No site content under `docs/` changed.

## Added

- `AGENTS.md` rewritten as an entry point carrying the connector bootstrap verbatim, the
  auto activation contract, the trigger table, and the discovery protocol.
- `.agents/index/` with six scope indexes: the root router (carrying an override table),
  the instruction set, both wiki trees, memory, and these logs. This repository has no
  package manifest, so `logs-index.md` is where its version is recorded.
- `.agents/wiki/context/repository-map.md`, the orientation page an agent reads before
  touching the site.
- `.agents/memory/` seeded with repository state and the adoption task record.
- `wiki/` human documentation: overview, site structure, and setup.
- `LICENSE` — proprietary, MCHaagenti, 2026. The repository previously had none.
- `.claude/CLAUDE.md`, a single `@../AGENTS.md` import.
- This changelog and its row in `logs-index.md`.

## Changed

- `rules/repository.md` rewritten around what is actually local here: the static site
  constraint, the vendored theme, the no `.nojekyll` rule, environment documentation, and
  the modularity and dashes rules rescued from `execution.md`.
- `README.md` expanded from a bare title into an overview carrying the project hosting
  block that `rules/iron.md` requires. The rule was already in the repository; the
  repository did not satisfy it.
- `architecture/website.md` gained frontmatter, and its repository tree was corrected to
  drop the `INDEX.md` removed in the same change.
- `rules/iron.md` gained frontmatter. It is otherwise unchanged.

## Removed

- `.agents/git/workflow.md` — collapsed three shared files into one and was weaker than
  any of them.
- `.agents/architecture/index-template.md` — mandated the `INDEX.md` files the shared
  directory mandate forbids outright.
- `.agents/architecture/agent-directories.md` — prescribed an `.agents/` layout that is
  not the shared one.
- `.agents/rules/execution.md` — required a version bump on every pull request, where the
  shared rule forbids bumping on your own initiative. Its local content was folded into
  `repository.md` first.
- The root `INDEX.md`, `.agents/INDEX.md`, and the four per folder `README.md` overviews,
  all replaced by the index set.

## Security

- No credentials, tokens, or environment values were introduced. This repository is a
  static site with no server side component and no secrets.
