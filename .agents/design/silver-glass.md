---
name: silver-glass-design
description: The Silver Glass design system as binding rules — tokens, the glass recipe, the opaque-overlay rule, components, and file layers.
---

# Silver Glass — Design Rules

The normative form of the design system for this site. The full reference, including the
prose rationale, is the root [`DESIGN.md`](../../DESIGN.md), which is the human facing
copy kept in sync with the canonical one in `MCEngine/mcengine.github.io`.

**Read this before touching anything under `docs/`.** The two files describe one system
and must change together; if they ever disagree, `DESIGN.md` wins and this file is wrong.

## The rules

1. **Self-contained.** No external font, script, stylesheet, CDN, or runtime network
   call. Ever. Inline small assets as data URIs. A network import is the failure this
   repository vendors its theme to avoid.
2. **Token-driven.** Every colour, radius, shadow, and spacing value resolves to a custom
   property declared on `:root` in `docs/css/main.css`. **Never hard-code a hex outside
   `:root`** — not in a component, not in a page stylesheet.
3. **Layered.** A page links, in this order: `main.css` → `shared/layout.css` →
   `shared/components.css` → `{section}/{section}.css`. Never reorder them, and never add
   a fifth global layer.
4. **Semantic first.** Native elements where they exist — `<details>` for an accordion, a
   real `<button>` for the mobile menu. One `<h1>` per page. Landmarks on `header`, `nav`,
   `main`, `footer`.
5. **Chrome is composed at runtime.** The header and footer are partials injected by
   `docs/js/site.js`, so navigation lives in one file. Never hand-write a header into a
   page.

## The glass recipe

Every raised surface that sits **over the background**:

```css
background: var(--glass);
-webkit-backdrop-filter: var(--blur);
backdrop-filter: var(--blur);
border: 1px solid var(--glass-border);
box-shadow: var(--shadow-sm);
border-radius: var(--radius);
```

Interactive cards lift on hover with `translateY(-4px)` and `--shadow-lg`. Transitions
stay short, `.15s`–`.2s ease`.

## Overlays that cover content are opaque — never glass

An overlay that **covers page content** — the mobile navigation panel, a dropdown, a
modal — uses an opaque background and **must not** rely on blur for legibility:

```css
background: var(--surface-solid);
-webkit-backdrop-filter: none;
backdrop-filter: none;
box-shadow: var(--shadow-md);
```

**Why this is a rule and not a preference.** When such an overlay is nested inside an
element that already has `backdrop-filter` — the blurred sticky header is exactly that —
the child's background paint can be *suppressed* where `backdrop-filter` is unsupported
or disabled, and the content behind bleeds through and becomes unreadable. Blurring
content you are hiding buys nothing anyway.

## Components

Compose from these before writing CSS. They live in `docs/css/shared/components.css`.

| Purpose | Class |
|---|---|
| Intro banner | `.hero` |
| Grouped block | `.panel`, `.section` |
| Card grid | `.card-grid` > `.card` (`.card__icon`, `__title`, `__desc`, `__more`) |
| Stacked highlights | `.feature-list` |
| Accordion | `.accordion` > `details.acc` > `summary` + `.acc__body` |
| Code | `pre`, `code`, `.code-label` |
| Table | `.table-wrap` > `table` — **always** wrap, or a wide table scrolls the page |
| Status label | `.badge` (`--accent`/`--ok`/`--warn`), `.chip`, `.chip-row` |
| Action | `.btn` (`--primary`/`--sponsor`), `.btn-row` |
| Aside | `.callout` (`--info`/`--warn`/`--danger`) |
| Term list | `.deflist` > `.deflist__row` > `.deflist__term` |
| Section kicker | `.eyebrow`, `.lead` |
| Context trail | `.breadcrumbs` (`a`, `.sep`) |

A new `{section}/{section}.css` is for genuinely page-specific layout only — a slot map,
a stat bar. Reaching for one to restyle a component means the component was the wrong
choice.

## File layout

```
docs/
  css/main.css              tokens + base elements
  css/shared/layout.css     header, nav, footer, breadcrumbs
  css/shared/components.css everything in the table above
  css/{section}/{section}.css
  js/site.js                the partial loader
  partials/header.html
  partials/footer.html
```

## The runtime include system

Each page sets two globals in `<head>` before loading `site.js`:

* `window.SITE_ROOT` — the relative path back to the site root: `""` at the root,
  `"../"` one level down.
* `window.PAGE_SECTION` — matched against `data-section` in the header to highlight the
  active link.

Mount points are `<div id="site-header"></div>` and `<div id="site-footer"></div>`.
Internal links inside a partial use the `{{ROOT}}` token, which the loader replaces.

**`{{ROOT}}` and Jekyll.** GitHub Pages runs Jekyll, and Liquid claims the same `{{ }}`
delimiter. Jekyll only runs Liquid over files carrying YAML front matter, so a partial
without front matter passes through untouched — **never add front matter to a partial**.
If the token is ever eaten, change the delimiter. **Never add a `.nojekyll` file**; that
is forbidden by [`../rules/repository.md`](../rules/repository.md).

Because the loader uses `fetch()`, the site must be served over HTTP to test. Opening a
page from the filesystem leaves the header and footer empty.

## Layout traps that fail silently

CSS drops an invalid declaration **without any error**: nothing throws, nothing is logged,
and the page still renders. Structural checks cannot see it. Two rules follow.

* **Never combine an auto-repeat with a flexible or intrinsic track elsewhere in the same
  track list.** `1.4fr repeat(auto-fit, minmax(150px, 1fr))` is invalid, so the whole
  `grid-template-columns` is discarded and the grid collapses to one implicit column. This
  is exactly what stacked the footer. `repeat(auto-fill, minmax(248px, 1fr))` on its own is
  valid and is the intended responsive idiom — the `fr` there is inside the repeat.
* **`flex-basis` sizes the main axis.** Once a container is `flex-direction: column` the
  main axis is vertical, so a basis meant as a width becomes a height and opens dead space.
  Reset it in the media query that flips the direction.

**Run `node tools/check-layout.mjs` after changing any layout rule.** It asserts computed
geometry and audits the stylesheets for the track-list trap above. It is the check that
would have caught the footer.

## Accessibility

* Landmarks and one `<h1>` per page.
* `:focus-visible` is styled in `main.css` — never remove an outline without replacing it.
* `aria-label` on the nav and breadcrumb regions; decorative icons `aria-hidden="true"`.
* Body ink on glass over the silver field meets WCAG AA. **Do not put body text directly
  on `--glass-faint`** without re-checking contrast.
* Every control reachable and operable by keyboard.

## Rebranding

Edit tokens only. Move off silver by adjusting `--silver-*`, `--accent*`, and the
`--backdrop-*` stops; leave the `--glass-*`, shadow, and geometry tokens alone — they are
what makes it this system rather than another one.
