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
