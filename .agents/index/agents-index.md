---
name: agents-index
description: Index of the portal's local instruction folders — repository rules, the hosting iron rules, and the website structure.
---

# Agents Index

**Scope:** `.agents/` instruction folders
**Parent:** [`root-index.md`](root-index.md)

Any file added to or removed from this scope is reflected here in the same commit. This
index lists local files only; the shared set is reached through
`{shared}/index/root-index.md`, never enumerated here.

## rules/

| File | Purpose |
|---|---|
| [`../rules/repository.md`](../rules/repository.md) | How this site is built, served, and bounded — the first local file to read. |
| [`../rules/iron.md`](../rules/iron.md) | Hosting facts every repository must state, and where `README.md` records them. |

## architecture/

| File | Purpose |
|---|---|
| [`../architecture/website.md`](../architecture/website.md) | The site layout under `docs/` and how the shared theme is vendored locally. |

## git/, architecture/ legacy, and rules/execution.md — pending removal

These predate the shared set. Two of them do not merely duplicate a shared file, they
contradict it. They are listed here because they still exist on disk; the duplicate audit
removes each file and its row together.

| File | Purpose |
|---|---|
| [`../git/workflow.md`](../git/workflow.md) | Superseded by `{shared}/git/branching-strategy.md` and its two siblings. |
| [`../architecture/index-template.md`](../architecture/index-template.md) | Conflicts with `{shared}/creators/index-creator.md`; mandates the forbidden `INDEX.md`. |
| [`../architecture/agent-directories.md`](../architecture/agent-directories.md) | Conflicts with `{shared}/rules/directories.md`; prescribes a different layout. |
| [`../rules/execution.md`](../rules/execution.md) | Conflicts with `{shared}/rules/versioning.md`; its local remainder folds into `repository.md`. |
