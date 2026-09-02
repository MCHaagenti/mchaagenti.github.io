---
name: agents-entry-point
description: Entry point for the MCHaagenti portal — resolves the shared instruction set, states the activation contract, and routes to the local index.
---

# Agent Instructions — MCHaagenti Portal

`mchaagenti.github.io` is the MCHaagenti documentation portal, served by GitHub Pages from
`docs/`. It is static HTML, CSS, and JavaScript with no build step, and it vendors its own
copy of the shared MCEngine theme rather than fetching one over the network. This file is
the entry point an agent reads first. It carries no rules of its own beyond the standing
ones below; everything else is routed.

## Shared Instruction Set

The conventions this repository follows — branching, commits, pull requests, task
workflow, the creators — live in the shared instruction set served by the
**`lxagents-agents-base`** MCP server. This repository carries only what is its
own. **Resolve the shared set before doing any work:**

1. If the `lxagents-agents-base` connector is available in this session, that is
   the shared set. Refer to it as `{shared}`; its files are addressed as
   `agents://{folder}/{file}.md`.
2. Read `agents://manifest.json` once. It lists every shared file with its `name`,
   path and description — one read instead of twenty, and it is what the routing
   tables below are checked against.
3. Read `agents://index/root-index.md` and route from there. Do not bulk-read the
   set.
4. If the connector is not available, say so plainly and continue with this
   repository's local instruction set only. **Do not reconstruct the missing rules
   from memory, and do not clone or copy them into this repository.**

**One call instead of six.** Where the connector exposes tools,
`agents_auto_activation` returns steps 2 and 3 together with the four files that load
on every request. It does not cover the local reads — this file, the local root index,
and the local memory index are still read from disk.

Never commit shared content into this repository. A file that can be read from
`agents://` must not exist here as a copy — see
`{shared}/rules/duplicate-instruction-audit.md`.

**Local overrides shared.** A file in `.agents/` whose `name` matches a shared
file's `name` replaces that shared file entirely for this repository. The current
overrides are listed in
[`.agents/index/root-index.md`](.agents/index/root-index.md).

## Auto-Activation

The instruction set is **always active** — the local `.agents/` set and the shared set
together. It applies to every task in this repository whether or not the user mentions
it, links to it, or asks for it. Treat these files as standing orders, not as optional
reference material.

At the start of every session, before doing any work:

1. Read `AGENTS.md` (this file).
2. Resolve the shared set per the bootstrap above.
3. Read [`.agents/index/root-index.md`](.agents/index/root-index.md).
4. Read [`.agents/index/memory-index.md`](.agents/index/memory-index.md) and load only
   the memory rows whose scope matches the current request, so you continue prior work
   instead of restarting it.
5. Load the four mandatory standard files, whatever the request looks like.
6. Match the request against the trigger table below and load the instruction files it
   names, local first, shared second.

Four files load on **every** request rather than on a trigger — the task workflow, the
branching strategy, the commit conventions, and the discovery protocol — along with the
three permission gates that ride with them: approve the plan before any file is
written, ask before opening a pull request, ask before merging. See
`{shared}/rules/shared-instructions.md` §H.

Steps 2, 5 and 6 are one call to `agents_auto_activation` where the connector exposes
tools. Steps 1, 3 and 4 read files in this repository and are still read from disk.

If a rule conflicts with a habit, a default, or a template you would otherwise follow,
the rule wins. If it conflicts with an explicit instruction from the user in this
session, the user wins — and you say out loud which rule you are setting aside.

## Trigger Table

The authority behind this table is `{shared}/rules/auto-activation.md`. The rows above
the divider mirror it; the rows below it are this repository's own.

| When you are about to… | Load and obey |
|---|---|
| Take in any new request of more than one step | `{shared}/planning/task-workflow.md` |
| Create a branch | `{shared}/git/branching-strategy.md` |
| Write a commit message | `{shared}/git/commit-conventions.md` |
| Open or update a pull request | `{shared}/git/pull-request-template.md` |
| Write **any** commit, tag, PR, comment, or file that will be committed or posted | `{shared}/rules/no-session-links.md` |
| Wonder whether something is local or shared, or need to override a shared rule | `{shared}/rules/shared-instructions.md` |
| Decide where a new file goes | `{shared}/rules/directories.md` |
| Resolve, connect, or fail to reach the shared set | `{shared}/rules/mcp-connector.md` |
| Add, move, rename, or delete any file in a set or in `wiki/` | `{shared}/creators/index-creator.md` |
| Write a rule or instruction | `{shared}/creators/instruction-creator.md` |
| Write documentation, an SOP, or a domain guideline | `{shared}/creators/information-creator.md` |
| Write or change a security file — a policy, a threat model, or a security SOP | `{shared}/creators/security-creator.md` |
| Change code or structure that a document describes | `{shared}/rules/change-propagation.md` |
| Record progress, a decision, or session state | `{shared}/creators/memory-creator.md` |
| Touch anything that carries a version number | `{shared}/rules/versioning.md` |
| Record a release | `{shared}/creators/changelog-creator.md` |
| Store, read, or construct a model identifier — any `model_name` column | `{shared}/rules/model-naming-convention.md` |
| Report finished work back to the user | `{shared}/rules/work-summary.md` |
| Need project facts, commands, or orientation | `.agents/wiki/context/repository-map.md` |
| Do anything at all in this project | `.agents/rules/repository.md` |
| Add a page, a stylesheet, or a script under `docs/` | `.agents/architecture/website.md` |
| Write or change any CSS, or add a component or page to the site | `.agents/design/silver-glass.md` |
| State or verify where a repository is hosted | `.agents/rules/iron.md` |

## Reading Order

`AGENTS.md` → resolve the shared set → [`.agents/index/root-index.md`](.agents/index/root-index.md)
and nothing else at this stage → the ONE index whose scope matches the task → one child
branch if it delegates → only then the specific files.

## Routing Protocol

Route by reading index tables, not by reading files. Do NOT load every index. Do NOT
bulk-scan either set to build a registry — `agents://manifest.json` already is one. Do
NOT read an instruction body until it has been selected. The standing exception is
[`.agents/index/memory-index.md`](.agents/index/memory-index.md), read every session
because continuity depends on it.

## Iron Rule

* `AGENTS.md` and `README.md` are overviews and must never carry detailed rules or
  documentation.
* `.agents/index/root-index.md` is a **router only**. It lists other indexes. It must
  never contain rules, documentation, prose, or direct links to leaf content.
* Each index owns exactly one scope and writes outside it never.
* **Local carries only what is local.** A convention true for more than one MCHaagenti
  repository belongs in the shared set — propose it there, do not copy it here.
* `wiki/` is for humans, `.agents/wiki/` is for agents, and neither duplicates the
  other.
* **One subject per file.** A cross cutting rule gets its own file and is linked, not
  pasted into a file about something else.
* An index never teaches. The moment it explains something, that content belongs in a
  real file.

## Placement

* Local instructions → `.agents/{folder}/{file}.md`.
* Human documentation → `wiki/{folder}/{file-name}.md`.
* Agent knowledge → `.agents/wiki/{type}/{file-name}.md`.
* Memory → `.agents/memory/{type}/{file-name}.md`; indexes → `.agents/index/{scope}-index.md`;
  anything universal → the shared set. No `INDEX.md`, anywhere, ever.

## Discovery Protocol

Source of truth: `{shared}/rules/discovery-protocol.md`.

```
## Discovery Protocol

While working, if you notice an instruction worth adding — a new rule, or new
content for an existing instruction file — do NOT create or edit it yourself.
Collect the findings, and when the task is done present them to the user:

* one finding per message block, each in its own code block;
* state the target set — `local` (this repository) or `shared` (the organization's
  instruction set served by the `lxagents-agents-base` connector);
* include the proposed file path, `name`, `description`, and the full proposed
  body;
* explain in one line why it is worth adding.

Then let the user select which findings to apply. Create only the selected ones.
Never batch-apply, never apply silently. A `shared` finding is never written from a
consuming repository — it is reported so it can be raised against the shared set.

**Scope of this gate:** it covers instruction files in either set. Documentation
pages under `wiki/` and `.agents/wiki/` may be written when the facts are real and
verified. Memory under `.agents/memory/` is written freely and automatically — see
`memory-policy.md`.
```

## Version Rule

Never change this repository's version without explicit user approval —
`{shared}/rules/versioning.md`. The current version is recorded in
[`.agents/index/logs-index.md`](.agents/index/logs-index.md); this repository has no
package manifest to carry it.

## No Session Links

Never write a link or identifier pointing at an assistant or tool session into a file,
commit message, commit trailer, branch name, tag, pull request, or comment. If your
tooling appends one by default, strip it before committing or posting —
`{shared}/rules/no-session-links.md`.
