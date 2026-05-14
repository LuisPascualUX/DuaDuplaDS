# Design System Agents

This repository uses a reusable multi-agent workflow to design, build, document, and publish a Design System. The structure is intended to be copied to other projects with the same stack (Figma -> React -> Storybook in Astro -> Vercel).

## Agent Topology

### 1) `orchestrator-agent`
- Owns planning and sequencing across all phases.
- Decides acceptance criteria and Definition of Done for each phase.
- Opens and closes handoffs between specialized agents.

### 2) `figma-intake-agent`
- Validates Figma access and parses shared file/node URLs.
- Ensures foundations, iconography, and component scopes are identifiable.
- Produces the first implementation-ready handoff packet.

### 3) `figma-foundations-agent`
- Extracts foundations, tokens, and components from Figma.
- Produces token inventories and component specs.
- Flags ambiguity in naming, states, variants, and accessibility.

### 4) `react-implementation-agent`
- Implements React components and component APIs.
- Maps design tokens to code tokens.
- Adds tests and usage examples for each component.

### 5) `repo-release-agent`
- Prepares repository structure and quality gates.
- Maintains versioning and changelog strategy.
- Handles release checks before publishing to GitHub.

### 6) `storybook-astro-agent`
- Documents foundations and components in Astro + Storybook.
- Builds MDX/Docs pages and stories for each component state.
- Enforces docs coverage for props, a11y notes, and examples.
- Enforces `States` and `Anatomy` formatting conventions for reusability:
  - White preview canvases for state artwork and anatomy blueprint sections.
  - State heading labels kept compact (small-size headings).
  - No repeated component-name line inside each state detail block.
- Enforces visual parity for foundations previews:
  - Color cards with token name, HEX, OKLCH, HSL, and computed WCAG badge.
  - Typography grouped by family, weight, size, line height, and letter spacing.
  - Grid/breakpoint previews (mobile/tablet/desktop) with proportional column chips.
  - Aspect ratio previews with real proportional media cropping.

### 7) `vercel-deploy-agent`
- Prepares Vercel configuration and environment variables.
- Runs preview and production deployment checklist.
- Validates URLs, redirects, and docs availability.

### 8) `ds-new-component-from-figma-agent`
- **Trigger:** User runs Cursor command **`/add-new-component`**, says **“Añadir nuevo componente”**, or pastes a **Figma Design** URL to implement **one** new documented component.
- **Inputs:** Full `figma.com/design/...` URL (ideally with `node-id=`). If missing, ask once before coding.
- **Process:** Follow project skill **`.cursor/skills/add-new-ds-component/SKILL.md`** end-to-end (intake → `docs/components-spec.md` → `apps/docs/src/components/*.ts` → `design-system.css` → `apps/docs/src/stories/*.stories.ts` → `npm run build-storybook`).
- **Stack note:** In **this** repository, Phase 2 output is **Storybook HTML + TypeScript render helpers** under `apps/docs`, not a separate npm React package, unless the backlog explicitly targets React extraction.
- **Handoff:** Same contract as other agents (artifacts, evidence, risks, “Ready for next phase”).

## Cursor automation (slash command)

| Command | Purpose |
|---------|---------|
| `/add-new-component` | Injects instructions to act as `ds-new-component-from-figma-agent` and to read **`add-new-ds-component`** skill. User must supply the Figma component URL. |

Supporting files: `.cursor/commands/add-new-component.md`, `.cursor/rules/ds-new-component-from-figma.mdc`, `.cursor/skills/add-new-ds-component/SKILL.md`, `checklist.md`.

## Handoff Contracts

Each agent must provide:
- Output artifacts (files created/updated).
- Validation evidence (tests, build, screenshots, or logs).
- Open risks and pending decisions.
- Clear "Ready for next phase" statement.

## Reusable setup for new projects

When reusing this agent model in another Design System project:
- Keep agent names and responsibilities unchanged when possible.
- Replace only project-specific references (Figma URLs, token source files, package manager, deployment URL).
- Preserve the same quality gates and handoff contract format.
- Keep Storybook output parity requirements as a non-optional acceptance target.

## Global Definition of Done

- Foundations and tokens are documented and versioned.
- React components are implemented with consistent APIs.
- Source code is pushed to GitHub with CI passing.
- Storybook documentation is complete and navigable.
- Documentation site is deployed on Vercel successfully.
