---
name: design-system-orchestrator
description: Orchestrates an end-to-end Design System workflow from Figma foundations and tokens to React components, GitHub publishing, Storybook documentation in Astro, and Vercel deployment. Use when the user asks to plan, execute, or audit the full delivery process.
disable-model-invocation: true
---

# Design System Orchestrator

## Goal

Drive the full process from design source to published documentation with explicit handoffs and validation gates.

## Execution workflow

1. **Discover**
   - Confirm source Figma assets: foundations, tokens, components.
   - Confirm target stack: React + Storybook + Astro + Vercel.
2. **Plan**
   - Build a phased backlog with acceptance criteria.
   - Define dependencies and blockers per phase.
3. **Implement**
   - Execute each phase with artifact checkpoints.
4. **Validate**
   - Verify tests, docs coverage, and deployment health.
5. **Report**
   - Return status by phase: done, in progress, blocked.

## Required artifacts

- Token dictionary (`docs/tokens.md` or equivalent).
- Component inventory and API contract (`docs/components-spec.md`).
- Implementation checklist (`docs/implementation-checklist.md`).
- Storybook documentation checklist (`docs/storybook-checklist.md`).
- Deployment runbook (`docs/vercel-runbook.md`).

## Success criteria

- Components match foundations and tokens.
- Stories cover major states and variants.
- Documentation is deployable and publicly accessible.
- Project can be handed off without tribal knowledge.
