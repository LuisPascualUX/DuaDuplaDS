# DuaDupla Storybook

Design System documentation site built with Astro + Storybook, aligned to Figma foundations and component specs.

## Local development

```bash
cd apps/docs
npm install
npm run storybook
```

Storybook runs at `http://localhost:6006`.

## Build

```bash
cd apps/docs
npm run build-storybook
```

Static output is generated in `apps/docs/storybook-static`.

## Deploy to Vercel

This repository includes `vercel.json` configured to:

- install from `apps/docs`
- build Storybook via `npm run build-storybook`
- publish `apps/docs/storybook-static`

In Vercel:

1. Import this GitHub repository.
2. Keep detected settings or use values from `vercel.json`.
3. Deploy.
