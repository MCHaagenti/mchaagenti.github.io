---
name: memory-state-repository-state
description: Current state of the MCHaagenti portal after adopting the shared instruction set — what exists, what does not, and what is next.
---

# Repository State — MCHaagenti Portal

## What this repository is

The MCHaagenti documentation portal, served by GitHub Pages from `docs/`. Static HTML,
CSS, and JavaScript, no build step, no package manifest. It implements the Silver Glass design system
in its own CSS under `docs/css/`, and fetches nothing over the network. Version `0.1.0`, recorded in `logs-index.md` because there is no
manifest to carry it.

## Instruction set

Mode B consumer of the shared LXAgents set, resolved over the `lxagents-agents-base`
connector. The local set holds repository rules, the hosting iron rules, and the website
structure. No overrides are declared.

This repository had the heaviest divergence of the three MCHaagenti repositories. Before
this adoption it routed through `INDEX.md` at the root and in `.agents/`, kept a
`README.md` inside every `.agents/` folder, and carried four files that shadowed the
shared set — two of which contradicted it outright: an index template mandating the
`INDEX.md` files the directory mandate forbids, and an execution rule requiring a version
bump on every pull request where the shared rule forbids bumping unasked.

## What exists on the site

Three pages: the portal homepage, an MCReport page, and an MCTrade page. Both project pages
document the universal jar each plugin now ships as, and cross link each other.

## What does not exist

* No test suite, no build, and no CI workflow under `.github/`.
* No declared shared overrides.
* No page for any project other than MCReport and MCTrade.

## Verification available

`node tools/check-layout.mjs`, against the site served over HTTP, asserts computed layout
geometry and audits for silently invalid grid track lists. Run it after any layout change;
the structural checks alone let a broken footer ship in 0.2.0.

## Next obvious step

Two candidates, in order.

The design system now supports components the pages do not yet use — the accordion, the
definition list, badges, and chips. The command and column listings on the MCReport page
were written as `ul` because the previous theme styled no tables; they would read better as
tables in `.table-wrap`, or as `.deflist` rows.

Then: no page states which plugin version it describes, so a reader cannot tell whether the
page matches the jar they downloaded. Both plugins are at 1.0.0, which makes that worth
fixing.
