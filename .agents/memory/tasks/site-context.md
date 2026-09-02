---
name: memory-tasks-site-context
description: Task record for adding the MCReport page and documenting the universal jar and per-model embeddings on the portal.
---

# Task — Portal content for the engine jar and per-model embeddings

## Goal

Bring the documentation portal up to date with what the two plugins actually are now, and
close its most visible gap: **MCReport has no page at all.**

## Objective

* `docs/mcreport/index.html` exists and documents MCReport to the same depth the MCTrade
  page documents MCTrade.
* The homepage lists both projects.
* Both project pages describe the universal jar rather than three per-platform downloads.
* The MCReport page explains per-model embeddings and why the split makes a model change
  reversible.

## Detail

This repository documents the sibling projects, so a change to their behaviour is a change
this site has to follow — that is the shared change propagation rule applied across
repositories rather than within one. Two things landed in the same piece of work:

1. Both plugins now ship **one universal jar** that detects the server at enable time,
   rather than a separate jar per platform.
2. MCReport moved embeddings into a `report_embeddings` table keyed by model, so a server
   owner can change embedding model and change back without re-embedding.

The site is static HTML with no build step, and it vendors its own theme. New pages follow
the existing structure exactly: a `container`, an `h1`, then `section` divs with ids, and
the standard Explore blocks and footer.

`docs/` is the published artifact, not a documentation tree, so these pages are site source
and are not indexed by `project-wiki-index.md`.

## Tasks

| # | Title | Scope | Branch | PR |
|---|---|---|---|---|
| 1 | Task record | This file — the confirmed plan, before any work | `chore/site-context-plan` | pending |
| 2 | Site content | The MCReport page, the homepage block, and the MCTrade updates | `feat/mcreport-page` | pending |
| 3 | Release | Version, changelog, index rows, close this record | `chore/site-context-release` | pending |

## Decisions

| Decision | Choice | Why |
|---|---|---|
| MCReport page depth | Match the MCTrade page | The portal's only project page sets the standard; a thinner one would read as an afterthought. |
| Embedding explanation | Lead with the reversibility, not the schema | A server owner cares that switching model is safe and cheap, not that the primary key is a pair. |
| Version | Patch bump to `0.1.1` | Content added to an existing site; no structural change. Subject to user approval, as every version is. |
| `docs/` | Still not a documentation tree | It is the published site. `wiki/` remains the human documentation tree. |

## Progress

### Task 1 — chore/site-context-plan

Created this record with the confirmed task list and the decisions behind it. No other file
touched.

### Task 2 — feat/mcreport-page

Added `docs/mcreport/index.html`, the page the portal had been missing entirely, at the
same depth as the MCTrade page: how a report flows, the commands, the OpenRouter
assistant, semantic search, the per-model embedding table, the database, the architecture,
thread safety, the universal jar, building, and getting started.

Added the MCReport block to the homepage, and expanded the About list to say what
MCHaagenti actually builds — the previous text said only "select a project below".

Updated the MCTrade page for the universal jar: a new "One jar for every platform"
section, the `engine` module in the architecture list, a note that platform entry points
now supply only their `SyncExecutor`, and a Getting Started step that no longer tells the
reader to pick a jar per platform. Both project pages now link to each other from Explore.

**A correction caught before shipping.** The first draft of the MCReport page used two
HTML tables for the command list and the embedding columns. The vendored theme styles no
tables at all — `grep` over both stylesheets returns nothing — so they would have rendered
unstyled against the Silver Glass system. Adding table CSS was not an option either: that
is a change to the design system, and `DESIGN.md` is a synchronized copy whose canonical
version lives in `MCEngine/mcengine.github.io`. Both tables were converted to the `ul` with
`strong code` idiom the existing pages already use, and the constraint was written into the
site structure page and the agent map so the next person does not rediscover it.

All three pages were parsed and confirmed well formed, and every internal link resolves.
