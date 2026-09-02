# Changelog — 0.1.1

**Date:** 2026-09-02

Content release. The portal now documents both MCHaagenti plugins rather than one, and
both project pages describe the universal jar the plugins now ship as.

## Added

- **`docs/mcreport/index.html`** — the MCReport documentation page. The portal previously
  had no page for MCReport at all. It covers how a report flows, every command, the native
  OpenRouter assistant, semantic search, the per-model embedding table, the database
  backends, the architecture, thread safety, and getting started.
- **A "One jar for every platform" section** on both project pages, explaining that each
  plugin now ships as a single universal jar that detects the server at enable time.
- **An MCReport block** on the homepage, and Explore blocks cross linking the two project
  pages.

## Changed

- The homepage About list now says what MCHaagenti builds, rather than only inviting the
  reader to pick a project.
- The MCTrade page's architecture list includes the `engine` module, and notes that platform
  entry points now supply only their `SyncExecutor`.
- The MCTrade Getting Started step no longer tells the reader to choose a jar per platform.
- `wiki/information/site-structure.md` records the page structure new pages follow, and that
  **the vendored theme styles no tables** — listings use the `ul` idiom instead, because
  adding table CSS would be a local change to a synchronized design system.

## Notes

No file under `docs/styles/` or `docs/scripts/` changed, so the theme is untouched and the
site has no new runtime dependency. There is still no build step.
