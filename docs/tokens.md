# Design Tokens Documentation Template

## Token Taxonomy

- Core tokens: raw primitives (color scales, spacing steps, typography scales).
- Alias tokens: semantic aliases over core tokens.
- Component tokens: tokens scoped to component-level usage.

## Naming Convention

Use a consistent structure:

`{category}.{role}.{state}.{scale}`

Examples:
- `color.surface.default`
- `color.text.muted`
- `space.inline.200`
- `radius.control.md`

## Token Categories

## Color
- Background/surface
- Text/icon
- Border/stroke
- Status (success, warning, error, info)

## Typography
- Font family
- Font size
- Line height
- Font weight

## Spacing
- Insets
- Stack
- Inline

## Radius
- Small / medium / large

## Elevation
- Shadow levels

## Motion
- Duration
- Easing

## Mapping to Code

Document token destination in code:
- CSS variables
- Tailwind tokens
- JS/TS token objects

## Versioning Rules

- Additive changes: minor release.
- Breaking renames/removals: major release.
- Fixes without API impact: patch release.
