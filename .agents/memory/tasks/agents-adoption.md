---
name: memory-tasks-agents-adoption
description: Task record for adopting the shared agent instruction set in the MCHaagenti portal — the confirmed plan, the branches, and what each task landed.
---

# Task — Adopt the shared agent instruction set

## Goal

Make `mchaagenti.github.io` read one instruction set — the shared set served by the
`lxagents-agents-base` connector — instead of maintaining its own copies of conventions
that are true across every MCHaagenti repository.

## Objective

The repository satisfies the adoption checklist: a root `AGENTS.md` carrying the
connector bootstrap verbatim, `.agents/index/root-index.md` with an override table,
`.agents/rules/repository.md` naming the mode and connector,
`.agents/wiki/context/repository-map.md` filled from real discovery, seed memory, and no
file copied from the shared set.

## Detail

* Mode B (consumer). The remote is `MCHaagenti/mchaagenti.github.io`.
* The site under `docs/` is the GitHub Pages root — static HTML, CSS, and JavaScript with
  no build step. **It is site source, not a documentation tree**, so the shared ban on a
  third documentation tree does not apply to it and it is not touched. Human documentation
  goes to a new `wiki/` alongside it.
* This repository had the heaviest divergence of the three. Two of its local files did not
  merely duplicate shared rules, they contradicted them.
* Initial version `0.1.0`, chosen by the user. The repository previously carried no
  version anywhere.
* `LICENSE` did not exist. Added as proprietary, MCHaagenti, 2026, matching the sibling
  repositories.
* Unlike `report` and `trade`, this repository has no root `CLAUDE.md` and no
  `.windsurfrules`, so the harness pointer task only adds `.claude/CLAUDE.md`.

This work spans three repositories — `report`, `trade`, and `mchaagenti.github.io`. Each
carries its own record; memory is never shared between them.

## Tasks

| # | Title | Scope | Branch | PR |
|---|---|---|---|---|
| 1 | Task record | This file — the confirmed plan, before any work | `chore/agents-adoption-plan` | pending |
| 2 | Adopt shared set | Mode B tree, legacy routing removed, LICENSE added | `docs/agents-setup` | pending |
| 3 | Harness pointers | Add the Claude Code import | `chore/agent-harness-pointers` | pending |
| 4 | Duplicate cleanup | Delete instructions shadowing or contradicting the shared set | `chore/agents-duplicate-cleanup` | pending |
| 5 | Release | Changelog, index rows, close this record | `chore/agents-adoption-release` | pending |

Pull request numbers are filled in once every branch is pushed and its pull request
opened. They cannot exist before that, so the column is completed in a follow up commit on
the release branch — which rebases nothing, since nothing stacks above it.

## Decisions

| Decision | Choice | Why |
|---|---|---|
| Branch naming | `{type}/{primary-noun}`, one branch per task | The shared branching strategy forbids tool-preset prefixes and generated suffixes. The user gave explicit permission to override the harness-assigned branch. |
| `docs/` | Left alone | It is the GitHub Pages site root, not a markdown documentation tree. |
| Initial version | `0.1.0` | User's choice. The site already exists and serves, so a first scaffold rather than `0.0.0`. |
| License | Proprietary, MCHaagenti, 2026 | User's choice, matching `report` and `trade`. |
| `DESIGN.md` | Left at the root | It is human facing documentation that by the audience test belongs at `wiki/information/`, but it predates this task and moving it is not this task's scope. Reported as a discovery instead. |
| Pull requests | One per branch, opened in order, none merged | Explicit user instruction. |

## Audit findings applied in task 4

Four findings, each approved per file. Two of them are not merely stale — they instruct an
agent to do what the shared set forbids, which means any session reading local first has
been obeying the wrong rule.

| File | Shadows | Verdict |
|---|---|---|
| `.agents/git/workflow.md` | `{shared}/git/branching-strategy.md`, `commit-conventions.md`, `pull-request-template.md` | Stale copy — three shared files collapsed into one |
| `.agents/architecture/index-template.md` | `{shared}/creators/index-creator.md` | **Conflicts** — mandates the `INDEX.md` files the directory mandate forbids outright |
| `.agents/architecture/agent-directories.md` | `{shared}/rules/directories.md` | **Conflicts** — prescribes a different `.agents/` layout and a README per folder |
| `.agents/rules/execution.md` | `{shared}/rules/versioning.md`, `{shared}/rules/directories.md` | **Conflicts** — requires a version bump on every pull request, where the shared rule forbids bumping on your own initiative |

Kept as local-only: `rules/iron.md` and `architecture/website.md`. The genuinely local
parts of `execution.md` — the environment documentation rules and website synchronization
— are folded into `repository.md` rather than deleted.

`rules/iron.md` reads as an organization wide MCHaagenti convention with no shared
equivalent. It stays local for now and is reported as a candidate to promote into the
shared set.

## Progress

### Task 1 — chore/agents-adoption-plan

Created this record with the confirmed task list, the decisions behind it, and the four
audit verdicts task 4 will apply. No other file touched; `.agents/memory/` did not exist
in this repository before this commit.
