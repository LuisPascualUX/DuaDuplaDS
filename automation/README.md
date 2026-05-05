# Automation Kit (Reusable for other DS)

This area contains the reusable operating model to automate Design System documentation workflows across different projects.

## What belongs to automation

- Agent topology and orchestration contracts: `AGENTS.md`
- Cursor rules and skills:
  - `.cursor/rules/`
  - `.cursor/skills/`
- Process and runbooks:
  - `docs/design-system-master-plan.md`
  - `docs/implementation-checklist.md`
  - `docs/storybook-checklist.md`
  - `docs/vercel-runbook.md`
  - `docs/figma-project-input.md`
  - `docs/figma-token-mapping.md`
  - `docs/foundations.md`
  - `docs/components-spec.md`
  - `docs/components-button.md`

## Reuse in another Design System

1. Copy this repository skeleton.
2. Replace Figma links and token JSON source.
3. Keep rules/skills and adapt naming conventions.
4. Re-run the same flow:
   - Figma intake
   - token mapping
   - Storybook docs generation
   - Vercel deploy
