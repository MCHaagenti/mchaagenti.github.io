# Setup

## Working on the site

There is no build step and no package manager. Clone the repository and open
`docs/index.html` in a browser, or serve the folder with any static file server:

```bash
python3 -m http.server --directory docs 8000
```

Then visit `http://localhost:8000`.

## Publishing

GitHub Pages publishes the `docs/` folder on the default branch automatically. There is no
deploy step and no workflow to run: merging to the default branch is the deploy.

Never add a `.nojekyll` file. Pages serves this site's static files without one.

## Environment variables

This repository reads no environment variables. It is a static site with no server side
component and no secrets.

If that ever changes, document the variables here in a code block rather than adding a
`.env.example` file, and use standardized placeholders in examples — `your_{name}_api_key`,
`your_server_api_key` — never realistic values. Infrastructure configuration examples
belong on this page too.

## Verifying a change

There is no test suite. Before finishing, confirm the pages render and every link resolves.
