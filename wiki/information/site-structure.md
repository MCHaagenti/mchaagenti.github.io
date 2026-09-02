# Site Structure

GitHub Pages serves `docs/` directly. Everything below that folder is the published site.

```
docs/
├── index.html                   # the portal homepage
├── mcreport/index.html          # one folder per project page
├── mctrade/index.html
├── css/
│   ├── main.css                 # tokens and base element styles
│   └── shared/
│       ├── layout.css           # header, nav, footer, breadcrumbs
│       └── components.css       # cards, callouts, accordions, tables, badges
├── js/site.js                   # injects the shared header and footer
└── partials/
    ├── header.html
    └── footer.html
```

A page links its stylesheets in this order and no other: `main.css`, `shared/layout.css`,
`shared/components.css`, then its own `{section}/{section}.css` if it has one.

Adding a project page means adding a folder with its own `index.html`, linking it from the
homepage's navigation blocks, and adding it to the Explore blocks on the sibling project
pages so the pages cross reference each other.

Pages follow one structure: a `container` div, an `h1`, then `section` divs each with an
`id` and an `h2`, ending with the Explore blocks and the footer.

Tables are supported now, but **always wrap one in `.table-wrap`** — that is what makes a
wide table scroll inside its own box instead of scrolling the whole page sideways.

Compose from the components in `DESIGN.md` section 4 before writing any CSS. The binding
form of the rules is [`../../.agents/design/silver-glass.md`](../../.agents/design/silver-glass.md).

## The theme

The visual language is the Silver Glass design system — white, silver, and translucent,
with no dark theme. It is defined in this repository's own CSS under `docs/css/`; nothing
is fetched over the network.

Each site in the ecosystem **vendors its own copy** of the theme, so it has no runtime
dependency on another repository. The theme files above live in this repository, and every
page links them with relative paths.

Never import a stylesheet or script over the network, and never from a raw content URL.
That dependency is exactly what vendoring exists to avoid.

## The design system

The design system is documented in this repository's own `DESIGN.md`, a copy kept in sync
with the canonical `DESIGN.md` in `MCEngine/mcengine.github.io`. Do not change the visual
style beyond what `DESIGN.md` allows; if the system itself needs to change, the canonical
copy changes first.

## Per page styles

Add a local per section stylesheet only for this repository's own custom styling. The
shared theme covers the common case, and a page that needs to fight it usually wants a
different component rather than an override.
