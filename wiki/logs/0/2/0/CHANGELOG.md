# Changelog — 0.2.0

**Date:** 2026-09-02

The site now implements the Silver Glass design system it has documented all along.
`DESIGN.md` was already correct and is unchanged; what was missing was every part of the
implementation.

## Added

- **`docs/css/main.css`** — all 34 design tokens `DESIGN.md` names, plus base element
  styles, the fixed layered silver backdrop, `:focus-visible`, a skip link, and
  reduced-motion handling. **None of these tokens previously existed.**
- **`docs/css/shared/layout.css`** — the sticky glass header, navigation with a dropdown
  and mobile toggle, breadcrumbs, and a multi-column footer. The site previously had no
  header or navigation at all.
- **`docs/css/shared/components.css`** — every component in section 4: hero, panel, card
  grid, feature list, native `<details>` accordion, code, table wrap, badge, chip, button,
  callout, definition list, eyebrow, lead.
- **`docs/js/site.js`** — the runtime include loader, which injects the shared header and
  footer, marks the active link, wires the mobile menu, stamps the footer year, and adds an
  inline SVG favicon.
- **`docs/partials/header.html`** and **`footer.html`** — shared chrome, so navigation
  lives in one file.
- **`.agents/design/silver-glass.md`** — the design system as binding rules, wired into the
  trigger table so it fires whenever CSS is touched.
- Breadcrumbs and a hero on both project pages.

## Changed

- All three pages rebuilt on the component classes, each with a skip link, `<main>`, and
  the four landmarks. `.blocks`/`.block` became `.card-grid`/`.card`; `.warning` became
  `.callout--warn`.
- Tables are now supported and styled. Listings that were converted to `ul` under the old
  theme may be moved back to tables, wrapped in `.table-wrap`.

## Removed

- `docs/styles/main/style.css`, `docs/styles/important/main.css`, and
  `docs/scripts/main/script.js` — the previous theme and its page-transition script. They
  implemented none of `DESIGN.md` and are now unreferenced.

## Notes

**A page must be served over HTTP.** The loader uses `fetch()` to pull in the partials, so
opening a file straight from disk leaves the header and footer empty. GitHub Pages serves
over HTTP, so this affects local inspection only.

**Never add YAML front matter to a partial.** Jekyll only runs Liquid over files that carry
it, and Liquid would consume the `{{ROOT}}` token the loader depends on. Verified against
the served site: no `{{ROOT}}` survives in the rendered DOM. A `.nojekyll` file is not the
answer and remains forbidden.

## Security

- No credentials or secrets. The site makes **no external asset request** — no CDN, font,
  script, or stylesheet. The only external references are ordinary navigation links, and
  the favicon is an inline data URI.
