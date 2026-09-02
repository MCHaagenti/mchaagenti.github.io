---
name: memory-tasks-footer-layout
description: Task record for fixing the footer that stacked because its grid track list was silently invalid.
---

# Task — Fix the stacked footer

## Goal

Put the footer's brand, Projects, and Elsewhere columns on one row, as the design
intends, instead of stacked vertically.

## Objective

The footer resolves to a single row at desktop widths, stacks cleanly on narrow screens
with no dead space, and a regression check exists that would have caught this.

## Detail — the cause

`layout.css` declared:

```css
grid-template-columns: 1.4fr repeat(auto-fit, minmax(150px, 1fr));
```

**That track list is invalid.** CSS Grid forbids combining an auto-repeat
(`auto-fit`/`auto-fill`) with flexible `fr` sizing in the same list. The browser discards
the entire declaration, grid falls back to a single implicit column, and every child
stacks.

Confirmed in Chromium rather than reasoned about: the computed `grid-template-columns`
came back as `"1080px"` — one track, not three — with the three children at three
distinct `y` positions.

## Why the earlier verification missed it

The Silver Glass implementation was checked for landmarks, partial injection, absence of
horizontal scroll, and console errors. **Every one passed**, because an invalid CSS
declaration fails *silently*: nothing is logged, nothing throws, and the page renders.

Not one check asked whether a layout rule produced the layout it claimed. Structural
assertions cannot see a dropped declaration; only geometry can. That is the actual defect
in the process, and it is why task 2 adds a geometry check rather than only a fix.

## Tasks

| # | Title | Scope | Branch | PR |
|---|---|---|---|---|
| 1 | Task record | This file — the confirmed plan, before any work | `chore/footer-layout-plan` | pending |
| 2 | Fix the footer | The flex layout, the `__intro` class, the mobile reset, and a layout regression check | `fix/footer-row` | pending |
| 3 | Release | Version 0.2.1, changelog, index rows, close this record | `chore/footer-layout-release` | pending |

## Decisions

| Decision | Choice | Why |
|---|---|---|
| Flex, not a corrected grid | `display: flex` with wrap | The footer partial is shared. `repeat(2, ...)` would hard-code "exactly two link columns" and break silently the day a third is added. |
| Brand gets a class | `.site-footer__intro` | The brand block had no class, so nothing could target it. |
| Version | `0.2.1` | A patch: a layout bug fixed, nothing added or removed. |
| Scope | The footer only | The header, pages, and every other component stay as they are. |

## A second bug the prototype surfaced

At 700px and below the layout flips to `flex-direction: column`, and `flex-basis` sizes
the **main** axis — which is then vertical. The intro's `flex: 1 1 280px` became a 280px
tall box and opened a large dead gap under the tagline.

This was caught by screenshotting the prototype at 390px, not by reasoning about it. The
media query resets `.site-footer__intro` to `flex: 0 0 auto`, with a comment recording
why, because the rule looks removable and is not.

## Progress

### Task 1 — chore/footer-layout-plan

Created this record with the cause, the confirmed plan, and the note on why the earlier
verification passed while the layout was wrong. No other file touched.

### Task 2 — fix/footer-row

Replaced the invalid grid with flex, added the `.site-footer__intro` class the brand block
needed, reset the basis in the mobile media query, and added `tools/check-layout.mjs`.

Both CSS comments explain themselves, because both rules look removable and are not: the
flex block records that the previous track list was invalid rather than merely different,
and the mobile reset records that `flex-basis` sizes the main axis once the direction is
column.

**The check was tested against the bug, not just written.** With the fix reverted it fails
twice over — the stylesheet audit flags
`1.4fr repeat(auto-fit, minmax(150px, 1fr))`, and the geometry check reports "3 children
across 3 row(s)" — and exits non-zero. With the fix in place every assertion passes.

Writing it also surfaced a flaw in the check itself. The first audit implementation flagged
`repeat(auto-fill, minmax(248px, 1fr))` in `.card-grid`, which is **valid**: the `fr` sits
inside the repeat, which is the normal responsive idiom. Only a flexible track *outside* an
auto-repeat is invalid. The audit now strips balanced `repeat(...)` calls and inspects what
remains. A check that cries wolf is worse than no check, because people learn to ignore it.

Measured: 1 row at 1280px, 1 row at 820px, 3 rows at 390px with a largest gap of 24px, and
no horizontal scroll at any width, on all three pages.
