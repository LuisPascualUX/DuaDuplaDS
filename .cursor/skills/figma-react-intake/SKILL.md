---
name: figma-react-intake
description: Connects a Figma Design System source to a React implementation workflow by collecting file URL, node IDs, variable definitions, component metadata, and token mappings. Use when the user shares a Figma link and wants to start implementing React components.
disable-model-invocation: true
---

# Figma React Intake

## Purpose

Prepare all required context from Figma so React component implementation can start without ambiguity.

## Workflow

1. Validate Figma access with `whoami`.
2. Parse shared URL into `fileKey` and `nodeId`.
3. Read context using `get_design_context`.
4. Extract variables using `get_variable_defs`.
5. Discover libraries using `get_libraries` when needed.
6. Update project docs:
   - `docs/figma-project-input.md`
   - `docs/figma-token-mapping.md`
   - `docs/components-spec.md`

## Intake output contract

- Source URL validated.
- Main node IDs listed for:
  - Foundations
  - Icons
  - Components
- Token categories mapped to code naming.
- Initial React component priority list created.

## Definition of ready for implementation

- At least 5 priority components selected.
- Variant/state matrix captured for each selected component.
- Token fallback policy documented for missing values.
