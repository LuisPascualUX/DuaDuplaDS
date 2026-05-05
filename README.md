# DuaDupla DS Workspace

This repo is intentionally split into two tracks:

## 1) Automation Kit (reusable)

Reusable setup to automate the same workflow with other Design Systems:

- agent topology: `AGENTS.md`
- Cursor rules and skills: `.cursor/rules/`, `.cursor/skills/`
- process and runbooks: `docs/`
- overview: `automation/README.md`

## 2) Storybook App (publishable output)

Living DS documentation site in Astro + Storybook:

- app root: `apps/docs`
- stories and docs: `apps/docs/src/stories`
- static build output: `apps/docs/storybook-static`

## Local development

```bash
cd apps/docs
npm install
npm run storybook
```

Storybook runs at `http://localhost:6006`.

## Build Storybook

```bash
cd apps/docs
npm run build-storybook
```

## Deploy to Vercel

`vercel.json` is already configured to build and publish Storybook from `apps/docs`.

1. Import this GitHub repository in Vercel.
2. Keep detected settings or use `vercel.json`.
3. Deploy preview/production.
