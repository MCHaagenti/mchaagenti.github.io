---
name: memory-tasks-silver-glass
description: Task record for implementing the Silver Glass design system the portal documented but never built.
---

# Task — Implement the Silver Glass design system

## Goal

Make the site actually use `DESIGN.md`. The document has been in this repository all
along; the site implements none of it.

## Objective

Every token, component, and structural rule in `DESIGN.md` exists in `docs/`, all three
pages are built from the component classes, and the design system is routable from the
agent instruction set.

## Detail — what the survey found

`DESIGN.md` is not out of date and did not need replacing. It is byte for byte the
document the user supplied. What was missing was the implementation:

| `DESIGN.md` prescribes | Before this work |
|---|---|
| 32 design tokens | **0 of 32 present.** The CSS carried 23 tokens under unrelated names (`--color-text`, `--space-1`, `--radius-card`) |
| `css/main.css`, `css/shared/layout.css`, `css/shared/components.css` | absent; the site had `styles/main/style.css` and `styles/important/main.css` |
| `js/site.js` runtime loader | absent; `scripts/main/script.js` was a page transition fader |
| `partials/header.html`, `partials/footer.html` | absent; the site had no header or navigation at all |
| Around 14 components | the three pages used four classes: `.container`, `.section`, `.blocks`/`.block`, `.warning` |

So `DESIGN.md` was aspirational. `.agents/rules/repository.md` says never to change the
visual style beyond what `DESIGN.md` allows, but the style in place was not within it at
all — the rule had nothing to hold on to.

This is therefore a **visual rebuild**, not a refactor. Every page is restyled and the
site gains navigation it has never had.

## Tasks

| # | Title | Scope | Branch | PR |
|---|---|---|---|---|
| 1 | Task record | This file — the confirmed plan, before any work | `chore/silver-glass-plan` | pending |
| 2 | Tokens and base | `docs/css/main.css`, and the design system in the instruction set | `feat/design-tokens` | pending |
| 3 | Layout and components | `layout.css`, `components.css`, `js/site.js`, the two partials | `feat/design-components` | pending |
| 4 | Rebuild the pages | All three pages on the component classes; delete the old assets | `refactor/site-pages` | pending |
| 5 | Release | Version, changelog, index rows, close this record | `chore/silver-glass-release` | pending |

Task 4 is where the old assets are deleted, so tasks 2 and 3 can land without leaving the
site in a broken intermediate state.

## Decisions

| Decision | Choice | Why |
|---|---|---|
| `DESIGN.md` | Not modified | It already matches the supplied document exactly. Changing it would break the sync with the canonical copy in `MCEngine/mcengine.github.io` for no gain. |
| `.agents/design/silver-glass.md` | Created, carrying the normative design rules | Explicit user instruction. Agents route through `.agents/`, so a design rule that lives only at the repository root never fires on a trigger. |
| Old assets | Deleted, not left beside the new ones | Two stylesheets claiming the same job is how a site ends up with neither. |
| `.nojekyll` | Never created | `repository.md` forbids it outright. If Liquid interferes with `{{ROOT}}`, the fix is a different delimiter. |

## The overlap this creates, stated rather than hidden

Root `DESIGN.md` and `.agents/design/silver-glass.md` now describe the same system. That
is close to the duplication the Iron Rule forbids, and it was done on explicit
instruction. The two are kept distinct in role: `DESIGN.md` is the human reference and
the copy synced with MCEngine, while the `.agents/` file is the normative rule set an
agent is routed to and must obey.

They must change together. If the pair proves to drift, the resolution is to reduce the
`.agents/` file to the rules alone and link out for the reference material.

## Known risk to verify, not assume

GitHub Pages runs Jekyll, and Liquid claims the `{{ }}` delimiter that `DESIGN.md` uses
for `{{ROOT}}`. Jekyll only runs Liquid over files carrying YAML front matter, and the
partials will have none, so they should pass through untouched. There is no
`_config.yml` here. This is checked during task 3 rather than assumed.

## Progress

### Task 1 — chore/silver-glass-plan

Created this record with the confirmed task list, the survey that motivated it, and the
decisions behind it. No other file touched.

### Task 2 — feat/design-tokens

Added `docs/css/main.css` — layer 1 of the system — and the design system in the
instruction set.

**All 34 tokens named in `DESIGN.md` are now defined**, checked programmatically rather
than by eye: the check extracts every `--token` mentioned anywhere in the document and
asserts each is declared in `main.css`. Before this commit, zero of them existed.

Three tokens were added beyond the document: `--ok` and `--warn`, which `DESIGN.md` names
in prose as intent colours without giving them a table row, and `--backdrop-start` /
`--backdrop-end` / `--backdrop-glow`.

The backdrop tokens exist for a reason worth recording. The document writes the backdrop
as `linear-gradient(160deg, #eef1f6 → #dbe1ea)`, and transcribing that literally left two
hard-coded hex values in the `body` rule — which principle 1.2 forbids, and which would
have made section 8's "adjust the body background gradient" a hunt through a rule instead
of an edit on `:root`. Naming them satisfies the principle and makes the rebrand
instruction true. The check now asserts **no hex appears outside `:root` at all**.

Also in this commit: base element styles, the fixed layered backdrop, `:focus-visible`, a
skip link, `.container` with its `.narrow` variant, and a `prefers-reduced-motion` block.

`.agents/design/silver-glass.md` carries the system as rules rather than reference —
what an agent must obey, with the reasoning kept for the two rules that look arbitrary
without it: why content-covering overlays must be opaque, and why a partial must never
carry front matter. It is wired into the trigger table, the agents index, and
`repository.md`, so it fires when CSS is touched rather than sitting unread.

The old `docs/styles/` is untouched and still live; task 4 removes it once the pages no
longer reference it.
