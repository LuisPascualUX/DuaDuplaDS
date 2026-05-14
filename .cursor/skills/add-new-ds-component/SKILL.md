---
name: add-new-ds-component
description: >-
  End-to-end workflow to add a new Design System component from a Figma URL: intake,
  token mapping, HTML render module, design-system.css, Storybook stories (Playground,
  States, Anatomy), and build verification. Use when the user runs /add-new-component,
  says "Añadir nuevo componente", or pastes a figma.com/design URL to implement a new
  documented component in apps/docs.
disable-model-invocation: true
---

# Add new DS component (from Figma)

## Preconditions

- User provides **full Figma Design URL** for the component (prefer `node-id=` in query).
- If URL is missing or node is ambiguous, **stop and ask once** before coding.

## Parse Figma URL

- Pattern: `figma.com/design/:fileKey/...?node-id=:a-:b` → `nodeId` = `a:b` (hyphens to colons).
- Branch URLs: `.../design/:fileKey/branch/:branchKey/...` → use `branchKey` as `fileKey`.

## Phase 0 — Load repo contracts (read, do not skip)

- `.cursor/rules/design-system-process.mdc`
- `.cursor/rules/figma-to-react-intake.mdc` (intake artifacts; adapt “React” to this repo’s **HTML + TS** implementation path below)
- `.cursor/rules/storybook-component-anatomy-structure.mdc`
- `.cursor/skills/storybook-astro-docs/SKILL.md` (docs coverage, States/Anatomy, foundations parity where relevant)

## Phase 1 — Design context

1. Before calling Figma MCP tools, read the tool descriptor/schema under the project MCP folder (workspace rules).
2. Call **`get_design_context`** (or equivalent official Figma MCP) with `fileKey` + `nodeId` from the URL.
3. Capture: variant/state matrix, sizing, tokens/colors named in output, a11y notes from design.

## Phase 2 — Specification (docs)

1. Add or extend a **Component** section in `docs/components-spec.md`: purpose, anatomy, props/API for the **render helpers** (args object), states, variants, token usage, Storybook requirements.
2. If the file URL or scope changes project-wide Figma inputs, patch `docs/figma-project-input.md` minimally (do not duplicate long dumps).

## Phase 3 — Implementation target in **this** repository

Stack is **`@storybook/html-vite`** in `apps/docs`, not a published React package:

| Artifact | Location | Pattern |
|----------|----------|---------|
| Render helpers | `apps/docs/src/components/<slug>.ts` | Pure functions returning HTML strings; see `apps/docs/src/components/buttons.ts` |
| Styles | `apps/docs/src/stories/design-system.css` | Token-driven classes (`--ds-*`), BEM-style `ds-*` |
| Stories | `apps/docs/src/stories/<slug>.stories.ts` | `Meta` + `StoryObj`; mirror `button.stories.ts` structure |

Naming: `<slug>` = kebab-case file name aligned to component name (e.g. `text-field`).

## Phase 4 — Storybook stories (required set)

1. **Playground** — interactive controls wired to render helper output.
2. **States** — Figma-style exhibit: white artwork canvas + compact state labels; no redundant component title inside each state block (per `storybook-component-anatomy-structure.mdc`).
3. **Anatomy** — Figma link + optional embed + measurements + blueprint on white canvas.

Include **accessibility** notes (roles, labels, focus, keyboard) in docs description or adjacent copy.

## Phase 5 — Icons (optional)

- If the design uses icons from the DS grid, reference `/iconography/<slug>.svg` and `ICON_REGISTRY` when applicable; do not invent new paths without syncing from Figma.

## Phase 6 — Validate

1. From repo root: `npm run build-storybook` — must succeed before claiming done.
2. Quick manual check in `npm run storybook` if the user needs UX confirmation.

## Phase 7 — Handoff (mandatory format)

Return:

- **Artifacts**: bullet list of created/updated paths.
- **Evidence**: Storybook build result (success / error summary).
- **Risks / open questions**: token gaps, unclear variants, Figma access, etc.
- **Ready for next phase**: e.g. “Ready for GitHub + Vercel” when build is green.

## Checklist file

For a copy-paste checklist, see [checklist.md](checklist.md).

## Do not

- Start coding without token mapping intent (either from Figma output or explicit `docs/figma-token-mapping.md` references).
- Add large unrelated refactors or new markdown files unless required for the component spec.
- Hardcode WCAG labels without computed contrast (follow foundations patterns).
