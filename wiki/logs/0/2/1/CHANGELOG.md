# Changelog — 0.2.1

**Date:** 2026-09-02

Fixes the site footer, which stacked its brand and link columns vertically instead of
laying them out in a row.

## Fixed

- **The footer now renders as one row.** `.site-footer__inner` declared
  `grid-template-columns: 1.4fr repeat(auto-fit, minmax(150px, 1fr))`. That track list is
  **invalid** — CSS Grid does not allow an auto-repeat alongside a flexible `fr` track in
  the same list — so the browser discarded the entire declaration and the grid fell back to
  a single implicit column. Replaced with a flex layout, which also adapts if a link column
  is ever added to the shared partial.
- **Dead space under the footer tagline on narrow screens.** Below 700px the layout flips
  to `flex-direction: column`, where `flex-basis` sizes the *vertical* axis; the brand
  block's `280px` basis became a 280px tall box. Reset in the media query.

## Added

- **`tools/check-layout.mjs`** — a layout regression check. It asserts computed geometry
  (the footer is one row at 1280px, stacks at 390px, no horizontal page scroll) and audits
  the stylesheets for a track list that combines an auto-repeat with a flexible track.

## Changed

- `docs/partials/footer.html` — the brand block gained a `site-footer__intro` class so it
  can be targeted; nothing else about the markup or its content changed.
- The design rules and the site structure page now record both silent-failure traps.

## Notes

**Why this shipped in 0.2.0 unnoticed.** An invalid CSS declaration is discarded without an
error: nothing throws, nothing is logged, and the page renders. The 0.2.0 verification
checked landmarks, partial injection, horizontal scroll, and console errors — all of which
passed — but never asserted that a layout rule produced its layout. Structural checks cannot
see a dropped declaration; only geometry can. That is what the new check adds.

No content changed, and no page other than the shared footer is affected.
