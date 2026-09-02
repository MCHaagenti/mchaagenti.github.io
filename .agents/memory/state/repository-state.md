---
name: memory-state-repository-state
description: Current state of the MCHaagenti portal after adopting the shared instruction set — what exists, what does not, and what is next.
---

# Repository State — MCHaagenti Portal

## What this repository is

The MCHaagenti documentation portal, served by GitHub Pages from `docs/`. Static HTML,
CSS, and JavaScript, no build step, no package manifest. It vendors its own copy of the
shared MCEngine theme. Version `0.1.0`, recorded in `logs-index.md` because there is no
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

Two pages: the portal homepage and an MCTrade page. `report` has no page yet, which is the
most visible content gap.

## What does not exist

* No test suite, no build, and no CI workflow under `.github/`.
* No declared shared overrides.
* No page for MCReport.

## Next obvious step

Add a `docs/mcreport/index.html` page. The portal documents MCTrade but not MCReport, and
the sibling repository is now documented well enough in its own `wiki/` to draw from.
