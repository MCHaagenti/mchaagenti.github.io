# MCHaagenti Portal Overview

`mchaagenti.github.io` is the MCHaagenti documentation portal. It explains how the
MCHaagenti projects work, in prose, for people evaluating or using them.

## Hosting

* **Platform:** [github.com](https://github.com)
* **Organization:** [MCHaagenti](https://github.com/MCHaagenti)
* **Repository:** [mchaagenti.github.io](https://github.com/MCHaagenti/mchaagenti.github.io)

The site is served by GitHub Pages from the `docs/` folder on the default branch
(Settings → Pages → branch `master`, folder `/docs`).

## What it publishes

| Page | Covers |
|---|---|
| `/` | The documentation portal, with navigation blocks to every project. |
| `/mctrade/` | MCTrade, the item to item trading market. |

## What it is not

The pages are explanatory. They do not carry source code listings — those live in each
project's own repository. The site has no build step, no package manifest, and no runtime
dependency on any other repository.

The layout and theme are described in [`site-structure.md`](site-structure.md).
