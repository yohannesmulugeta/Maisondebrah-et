# Maison Debrah ET: improvement plan

## Starting point

This repository is an independent copy of the public-site recreation. It contains 255 product records, 31 categories, 23 pages, 3 posts, and 935 media files. The initial ET release keeps the current content, logo, and images. It does not connect to the original WordPress database.

## Scope for the next design pass

- Keep product names, descriptions, page copy, logo, and image files as approved. Do not change `src/data/` or `public/media/` during visual and interaction work.
- Improve the presentation for visitors in Ethiopia through clearer navigation, stronger mobile layouts, consistent spacing and typography, and easier catalogue discovery. Do not assume a new language, currency, address, phone number, or business process without verified information.
- Keep this repository and its deployment independent from `yohannesmulugeta/Maisondebrah`.

## Stages

1. **Audit:** Review the homepage, catalogue, category and product pages, collection, hospitality, business, and contact pages at desktop, tablet, and narrow mobile widths. Record visual gaps, navigation friction, accessibility issues, image failures, and slow pages. Check the live ET deployment against the committed build.
2. **Design:** Agree on a small visual system using the existing brand: type scale, spacing, colors, image crops, buttons, cards, and page templates. Prepare desktop and mobile examples for the homepage, catalogue, and product detail page before a broad rollout.
3. **Implement:** Apply the approved system to shared components first, then the page templates. Preserve all existing content and media references. Make search, filters, galleries, and quotation actions clear and keyboard accessible. Keep forms honest about their email-app behavior until a verified backend exists.
4. **Optimize:** Reduce the large JavaScript bundle where practical, load below-the-fold media lazily, and add appropriate page titles and descriptions. Check whether image sizes can be improved without changing their visible content.
5. **Verify and publish:** Run lint, type checking, production build, and browser checks at desktop, 390 px, and 320 px. Confirm routes, images, forms, and the quotation list on the deployed ET URL. Verify the original repository and site remain untouched.

## Expected files and risks

Likely implementation files: `src/App.tsx`, `src/App.css`, `index.html`, and focused browser checks under `scripts/`. Any new configuration should stay in this repository. No database migration is planned. Main risks are broken GitHub Pages subpaths, visual regressions across 255 products, and implying that email-draft forms or the original-site account links are native ET services.

The next change should start with the audit and three representative page designs. Do not roll out a new look to all pages until those examples have been reviewed.
