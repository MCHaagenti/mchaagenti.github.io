# mchaagenti.github.io

The MCHaagenti documentation portal — a static site explaining how the MCHaagenti projects
work, served by GitHub Pages.

## Project Overview

* **Platform:** [github.com](https://github.com)
* **Organization:** [MCHaagenti](https://github.com/MCHaagenti)
* **Repository:** [mchaagenti.github.io](https://github.com/MCHaagenti/mchaagenti.github.io)

## Quick start

No build step and no dependencies. Serve the published folder and open it:

```bash
python3 -m http.server --directory docs 8000
```

## Documentation

- [Overview](wiki/information/overview.md) — what the portal is and what it publishes.
- [Site structure](wiki/information/site-structure.md) — the layout under `docs/` and the
  vendored theme.
- [Setup](wiki/environments/setup.md) — working on the site and how it is published.
- [`DESIGN.md`](DESIGN.md) — the design system the site must stay within.

The full map of the documentation is
[`.agents/index/project-wiki-index.md`](.agents/index/project-wiki-index.md).

## Working with agents

Agent instructions start at [`AGENTS.md`](AGENTS.md). Universal conventions are not kept in
this repository; they are served by the `lxagents-agents-base` MCP connector.

## License

Copyright (c) 2026 MCHaagenti. All rights reserved.
Please see the [`LICENSE`](LICENSE) file for details regarding usage and distribution.
