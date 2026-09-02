---
name: repository-rules
description: How the MCHaagenti portal is built and bounded — mode, the static site constraint, the vendored theme, and what must not be introduced.
---

# Repository Rules — MCHaagenti Portal

`mchaagenti.github.io` is the MCHaagenti documentation portal. It explains how the
MCHaagenti projects work, and it is served by GitHub Pages from `docs/`.

## Mode and instruction set

This repository is a **consumer** of the shared LXAgents instruction set, resolved through
the **`lxagents-agents-base`** MCP connector. It carries only what is its own: its indexes,
this file, the hosting iron rules, the website structure, its agent wiki, and its memory.
Nothing served over `agents://` is copied here. There are currently no overrides; the
override table in [`../index/root-index.md`](../index/root-index.md) is the record if that
changes.

## The site is static, and `docs/` is the published artifact

* GitHub Pages serves `docs/` directly. Use plain HTML, CSS, and JavaScript with **no
  build step** and no external runtime dependency beyond the vendored theme assets.
* `docs/` is site source, not a documentation tree. The two documentation trees are
  `wiki/` for people and `.agents/wiki/` for agents; `docs/` is neither and is not indexed
  as one.
* **Never create a `.nojekyll` file**, anywhere in this repository. Pages serves the site's
  static files without one.

## Design

The site uses the shared MCEngine ecosystem theme — white, silver, modern, no dark theme —
vendored locally under `docs/styles/` and `docs/scripts/`. Never import a stylesheet or
script over the network, and never from a raw content URL.

The design system is documented in this repository's own `DESIGN.md`, a copy kept in sync
with the canonical `DESIGN.md` in `MCEngine/mcengine.github.io`. **Never change the visual
style beyond what `DESIGN.md` allows.** The layout the site follows is in
[`../architecture/website.md`](../architecture/website.md).

## Content

Pages must stay explanatory. Do not embed source code listings inside the website pages;
link to the project repository instead.

## Environment documentation

* Do not create a `.env.example` file. Document required environment variables in
  [`../../wiki/environments/setup.md`](../../wiki/environments/setup.md) inside a code
  block instead.
* Use standardized placeholders in examples, never realistic values: `your_{name}_api_key`,
  `your_server_api_key`, and similar.
* Infrastructure configuration examples — Kubernetes, Docker Compose, and the like — go in
  the same environments page, never scattered across other documents.

## Keeping the sibling projects in sync

This site documents the MCHaagenti projects. When a change to `report` or `trade` alters
behaviour this site describes, update the corresponding page here in the same piece of
work — the shared change propagation rule applies across repositories, not only within one.

## Modularity

Separate content and code into multiple focused files rather than letting one grow into
everything. Keep files concise and to a single responsibility. One page per section under
`docs/`, one stylesheet per section when a section genuinely needs its own.

## Dashes

Do not use dashes unnecessarily. They belong in file and directory names
(`getting-started.md`) and in branch names. Avoid them in variable names, database
schemas, and general prose unless a standard convention requires them.

## Verifying

There is no test suite and no build. Before completing a task, confirm the pages render and
that every link resolves.
