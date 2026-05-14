# Agentic DS MVP

This MVP prepares the Design System so AI agents can compose UI screens and validate them against DS contracts.

## Files

- `apps/docs/src/agentic/component-registry.json`
  - Machine-readable component inventory.
  - Canonical props, allowed enums, intent tags, and a11y constraints.
  - Current coverage: `button`, `icon-button`, `text-input`, `select`, `checkbox`, `radio-group`, `alert`.
- `apps/docs/src/agentic/composition-rules.json`
  - Cross-component composition constraints (required primary action, icon button a11y checks, etc.).
- `apps/docs/src/agentic/screen-recipes.json`
  - Reusable recipe blueprints for common flows.
- `apps/docs/src/agentic/examples/login-screen.json`
  - Example screen payload for validation.
- `apps/docs/src/agentic/examples/profile-edit-screen.json`
  - Example form-like screen payload for validation.
- `apps/docs/scripts/validate-agentic-screen.mjs`
  - Local validator used by CI/agents to check generated screens.

## Validation command

From repository root:

`npm --prefix apps/docs run validate-agentic-screen -- "src/agentic/examples/login-screen.json"`

`npm --prefix apps/docs run validate-agentic-screen -- "src/agentic/examples/profile-edit-screen.json"`

## Next phase

1. Define per-component layout constraints (slot limits, placement constraints).
2. Add flow-level rules (form submit, navigation, destructive action safety).
3. Add JSON output contract for screen generation agent.
4. Connect generated JSON to runtime renderer for one-click screen previews.
