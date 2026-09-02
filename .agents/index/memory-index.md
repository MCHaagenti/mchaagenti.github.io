---
name: memory-index
description: Index of .agents/memory/ — the MCHaagenti portal's task records and current repository state, read at the start of every session.
---

# Memory Index

**Scope:** `.agents/memory/`
**Parent:** [`root-index.md`](root-index.md)

This index is read every session. Load only the rows whose scope matches the current
request, so work continues rather than restarts. Any file added to or removed from this
scope is reflected here in the same commit.

## state/

| File | Purpose |
|---|---|
| [`../memory/state/repository-state.md`](../memory/state/repository-state.md) | What exists in the MCHaagenti portal right now, what the instruction set looks like, and the next obvious step. |

## tasks/

| File | Purpose |
|---|---|
| [`../memory/tasks/agents-adoption.md`](../memory/tasks/agents-adoption.md) | Adoption of the shared instruction set: plan, decisions, audit verdicts, and per task progress. |
