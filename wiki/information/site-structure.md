# Site Structure

GitHub Pages serves `docs/` directly. Everything below that folder is the published site.

```
docs/
├── index.html                   # the portal homepage
├── mcreport/index.html          # one folder per project page
├── mctrade/index.html
├── styles/
│   ├── main/style.css           # vendored theme: tokens, components, page transitions
│   └── important/main.css       # vendored centered container card layout
└── scripts/
    └── main/script.js           # vendored page transition controller
```

Adding a project page means adding a folder with its own `index.html`, linking it from the
homepage's navigation blocks, and adding it to the Explore blocks on the sibling project
pages so the pages cross reference each other.

Pages follow one structure: a `container` div, an `h1`, then `section` divs each with an
`id` and an `h2`, ending with the Explore blocks and the footer.

**The vendored theme styles no tables.** Use the `ul` and `strong code` idiom the existing
pages use for field and command listings. Adding table CSS locally would be changing the
design system, which has to happen in the canonical `DESIGN.md` first.

## The vendored theme

The visual language is the shared MCEngine "Silver Glass" design system — white, silver,
modern, with page transitions and no dark theme.

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
