# Maison Debrah ET website

Independent Ethiopian-version starting point based on the public pages and product catalogue at [maisondebrah.com](https://maisondebrah.com). The initial copy keeps the same content, logo, and images. It uses public site data captured on 23 October 2026 and 935 public image and logo files saved under `public/media`.

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
```

Open the Local URL printed by Vite. To check the production build:

```powershell
npm.cmd run lint
npm.cmd run build
```

GitHub Pages uses `npm.cmd run build:pages` and the workflow in `.github/workflows/deploy.yml`. The public URL is `https://yohannesmulugeta.github.io/Maisondebrah-et/`. On Pages, navigation uses URL hashes so catalogue and product links continue to work after a browser refresh.

## Edit content with Pages CMS

The homepage announcement and homepage section text live in `src/content/home.json`. The three existing posts live as individual JSON files in `src/content/posts/`; their filenames define their website paths. `.pages.yml` exposes these files and images under `public/media/` to [Pages CMS](https://app.pagescms.org/).

To connect the editor, sign in to Pages CMS with the GitHub account that administers `yohannesmulugeta/Maisondebrah-et`, install its GitHub App for this repository, and open the `main` branch. A CMS save commits to GitHub, which triggers the site's build. Post creation, renaming, and deletion are disabled in this first release to protect existing links; the three existing posts can be edited. Journal card links and images can be edited on the Homepage screen; the build rejects missing images or links that do not resolve to a known page or post.

The original `src/data/posts.json` is retained as an import snapshot, while the site reads posts from `src/content/posts/`. Running `scripts/sync-public-content.mjs` refreshes the original snapshots but does not overwrite CMS-managed homepage or post files. The catalogue and other editorial pages remain snapshot content and are outside this initial CMS setup.

## Deploy on Cloudflare Pages

Cloudflare Pages project `maisondebrah-et` is connected to this GitHub repository with production branch `main`, build command `npm run build`, and output directory `dist`. `.node-version` pins Node.js 24 to match the GitHub Pages workflow. The Cloudflare address is `https://maisondebrah-et.pages.dev/`. It uses normal React routes; the existing GitHub Pages build keeps its `/Maisondebrah-et/` base and hash routes. Verify the Cloudflare site and one real CMS edit before attaching a custom domain.

The browser verification script expects the development server at `http://127.0.0.1:5174/`. Change `origin` in `scripts/verify-local.mjs` if Vite uses another port, then run `node scripts/verify-local.mjs`.

## Public content and boundaries

- `src/data/catalog.json` contains 255 public product records and 31 categories. `pages.json` and `posts.json` retain 23 pages and 3 posts from the public WordPress API; CMS-managed posts are copied into `src/content/posts/`.
- `public/media` contains 935 distinct public media URLs found in those records and the inspected page designs. `src/data/media-manifest.json` records the URLs saved and any failures.
- The image and content sync scripts are under `scripts/`. Running them again refreshes the public snapshot and may change the result if the source website changes.
- Browsing, search, sorting, product galleries, and a browser-stored quotation list work locally. The contact and brochure forms prepare an email in the visitor's email application. Account login and registration link to the original site because its private database and approval rules are unavailable.
- No backend, database, or payment flow is included. GitHub Pages hosts this static copy; it is not connected to the original WordPress site.

Before using copied media or content on a public deployment, confirm you have the rights to do so and obtain the original site's backend/export if identical private workflows are required.

