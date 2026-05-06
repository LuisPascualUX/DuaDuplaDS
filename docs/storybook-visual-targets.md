# Storybook Visual Targets

This document defines reusable visual acceptance criteria for Design System documentation in Storybook.

## 1) Foundations

### Colors
- Render one swatch card per token step.
- Include token label and values: HEX, OKLCH, HSL.
- Show WCAG badge computed from actual contrast ratio (not hardcoded).
- Badge/icon position and text color must remain readable across light/dark swatches.

### Typography
- Group token lists by:
  - family
  - weight
  - size
  - line height
  - letter spacing
- Include one style preview per text style.
- Keep top-left alignment and consistent spacing between rows/sections.

### Grid and breakpoints
- Include dedicated previews for mobile, tablet, and desktop.
- Show column overlays and labeled chips for representative column spans.
- Ensure previews do not overlap, clip, or overflow the panel.
- Maintain proportional preview scaling so all content is visible in Storybook viewport.

### Aspect ratio
- Show each supported ratio with its own proportional preview container.
- Optional: include a reference image to demonstrate crop behavior.

### Focus ring
- Show all focus treatments required by the system (solid/dashed and shape variations if applicable).

## 2) Components (starting set)

For each component documented in the first release (for example `Button Primary`, `Button Secondary`):
- Story for playground/controls.
- State matrix (default, hover, pressed, disabled, focus) in Figma-style exhibit layout:
  - left: artwork preview block on white canvas
  - right: compact state label + component attributes + color/token values
  - avoid repeating the component name in every state card when already present in story context
- Variant/size coverage.
- Icon toggles/slots where applicable.
- Accessibility notes and keyboard behavior summary.
- Button labels must remain single-line in all showcased states/sizes; no wrap in preview cards or playground.
- Token references should be visually distinguishable (token chip/pill style), not plain text.
- Anatomy story with:
  - Figma live reference (link + embed)
  - Visual reference on white preview canvas
  - Measurements table
  - Blueprint/inspect-like section

## 3) Quality gate before publish

Before merge/deploy, validate:
- `storybook build` succeeds.
- Visual checks against Figma references for foundations and first component batch.
- No clipping/overlap regressions at default docs viewport.
