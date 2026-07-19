# Website structure — mchaagenti.github.io

This repository's own site structure and how-to guides.

## Website repository structure

Every site in the MCEngine ecosystem shares this repository layout. `{org}` is
this repository's organization/name and `{section}` is a page folder (for
example `home`, `api`, `logs`).

```
{org}.github.io/
├── AGENTS.md                         # agent rules for this repository (this file)
├── INDEX.md                          # repository structure index
├── README.md                         # human-facing project overview
└── docs/                             # served by GitHub Pages (Settings → Pages → branch master, folder /docs)
    ├── index.html                    # homepage
    ├── {section}/index.html          # one folder per page/section
    ├── css/                          # OPTIONAL — only this repo's OWN custom styles
    │   └── {section}/{section}.css   #   per-section stylesheet (custom only)
    ├── js/                           # OPTIONAL — page scripts (e.g. site.js include loader)
    └── partials/                     # OPTIONAL — shared header/footer fragments
        ├── header.html
        └── footer.html
```

### Shared theme — vendored locally

The visual language (design tokens, layout, and components) is the shared
MCEngine "Silver Glass" design system, documented in this repository's own
`DESIGN.md` (a copy kept in sync with the canonical `DESIGN.md` in
`MCEngine/mcengine.github.io`). Each site vendors its own copy of the theme
locally so it has no runtime dependency on another repository:

* The theme files live under `docs/` in this repository — either the modular
  theme (`docs/css/main.css`, `docs/css/shared/layout.css`,
  `docs/css/shared/components.css`) or the single-file theme
  (`docs/styles/main/style.css` plus `docs/scripts/main/script.js`).
* Every page links these local files with **relative** paths. Never import a
  stylesheet or script over the network (`https://mcengine.github.io/...` or raw
  content URLs).
* Add a local `docs/css/{section}/{section}.css` (or extend the single-file
  theme) only for this repository's own custom, per-page styling.
