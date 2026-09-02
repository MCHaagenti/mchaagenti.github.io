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

### Task 3 — feat/design-components

Added layers 2 and 3 and the runtime chrome: `docs/css/shared/layout.css`,
`docs/css/shared/components.css`, `docs/js/site.js`, and the two partials.

`components.css` implements every class in section 4 — hero, panel, card grid, feature
list, native `<details>` accordion, code, table wrap, badge, chip, button, callout,
definition list, eyebrow, lead — and `layout.css` covers the sticky header, nav,
dropdown, mobile toggle, breadcrumbs, and footer.

**The opaque-overlay rule is applied where it actually matters.** Both the dropdown panel
and the mobile nav list use `--surface-solid` with `backdrop-filter: none`, each with a
comment saying why: they sit inside the blurred header, so a translucent fill can be
dropped where `backdrop-filter` is unsupported and the page content behind them bleeds
through. This is the one rule in the document that looks like a style preference and is
not.

Five more tokens were added rather than writing literals: `--ok-soft`, `--warn-soft`,
`--sponsor-deep` for the sponsor gradient's end stop, and `--code-bg` / `--code-ink` for
the dark `pre` section 4 specifies. Two automated checks now hold across every stylesheet:
**no hex outside `:root`**, and **no `var()` referencing an undefined token** (44 defined,
40 used).

**Verified in a real browser, not by reading the code.** The site was served over HTTP and
driven with Chromium:

* the header and footer are injected
* **no `{{ROOT}}` token survives in the DOM** — the Jekyll risk recorded in task 1 does
  not materialise, because a partial without front matter is copied verbatim and Liquid
  never sees it
* the active nav link is marked, the footer year is stamped, the inline SVG favicon is
  injected, tokens resolve (`--ink-900` → `#1b2430`), the header paints
  `rgba(255,255,255,0.9)`
* **zero console errors**

One fix came out of that run. With `SITE_ROOT` set to `""` at the site root, substitution
produced `href=""`, which resolves to the current page rather than reading as a path. The
loader now normalizes `""` to `"./"` internally, so the documented contract in `DESIGN.md`
is unchanged while the emitted links are `./`, `./mcreport/`, `./mctrade/`.

The old `docs/styles/` and `docs/scripts/` are still present and still referenced by the
three pages; task 4 rebuilds the pages and removes them.

### Task 4 — refactor/site-pages

Rebuilt all three pages on the component classes and deleted `docs/styles/` and
`docs/scripts/`.

Each page now sets `SITE_ROOT` and `PAGE_SECTION`, links the three layers in the
prescribed order, carries a skip link and `<main id="main">`, and mounts the header and
footer. The project pages gained breadcrumbs and a hero; the old `.blocks`/`.block` became
`.card-grid`/`.card`, and `.warning` became `.callout--warn`.

**A regression I caught and repaired rather than shipped.** Converting the pages replaced
the `#intro` section with the hero, and the "Commercial Software" notice lived inside it —
so both project pages briefly lost their licensing notice. Restored as a proper
`.callout--warn`, with MCTrade's paid-tier note intact.

**A real visual bug, found only because the page was actually rendered.** The hero's
radial glow is a `::after`, which is generated as the last child and therefore painted
*over* the positioned heading, washing the text out. Structural checks pass either way; a
screenshot does not. `.hero > *` now carries `z-index: 1`, with a comment saying the
z-index is load-bearing so nobody removes it as decoration.

**Verified in Chromium against the served site**, all three pages: header and footer
inject, the active nav link is correct per page, exactly one `<h1>`, all four landmarks
present, **no `{{ROOT}}` survives**, no horizontal page scroll, no console errors, no
failed requests.

At a 390px viewport the mobile menu opens and the panel computes to
`rgba(255, 255, 255, 0.98)` with `backdrop-filter: none` — the opaque-overlay rule
confirmed at the breakpoint where it matters, not merely written in the stylesheet.

Two static checks also hold: every class used in the HTML is defined in the CSS, and the
only external references anywhere are `<a href>` navigation links — no external
stylesheet, script, or font, so principle 1.1 holds.

### Task 5 — chore/silver-glass-release

Closed out the work at `0.2.0` — a minor bump: a whole subsystem was added and the pages
rebuilt, but nothing about the site's purpose or structure changed and no content was lost.

`wiki/logs/0/1/0/` and `0/1/1/` are not deleted; a released version directory never is.

The Jekyll risk recorded in task 1 is **resolved, not merely unencountered**: partials carry
no front matter, so Liquid never processes them, and the rendered DOM was checked for a
surviving `{{ROOT}}` on all three pages. The rule is written into
`.agents/design/silver-glass.md` and the repository map so the next person does not add
front matter and quietly break every internal link in the chrome.

## Status

Work complete. Five branches stacked in order.

## What a reviewer should look at with their own eyes

Everything here was verified structurally and in a headless browser, including screenshots
at 1280px and 390px. What that cannot settle is taste: whether the silver field, the glass
tint, and the spacing read the way the design system intends on a real display. That
judgement is the user's.
