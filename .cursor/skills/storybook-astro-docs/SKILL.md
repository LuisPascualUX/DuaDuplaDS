---
name: storybook-astro-docs
description: Documents a Design System in Storybook running in an Astro project, including foundations pages, component docs, examples, and publish readiness checks. Use when the user asks for Storybook or Astro documentation tasks.
disable-model-invocation: true
---

# Storybook Astro Docs

## What this skill does

- Defines documentation IA for a Design System.
- Creates repeatable page templates for foundations and components.
- Enforces minimum docs coverage before deployment.

## Sidebar order (this repo)

- Configured in `apps/docs/.storybook/preview.ts`: `parameters.options.storySort` with roots **Foundations**, **Icons**, **Components**, then `method: 'alphabetical'` for nested groups and story names.
- New `Meta.title` values must start with one of those three prefixes so they appear under the correct root.

## Documentation information architecture

1. Foundations
   - Color, typography, spacing, radius, elevation, motion.
2. Tokens
   - Naming, aliases, semantic tokens, usage guidelines.
3. Components
   - Overview, props, variants, states, accessibility, code examples.
4. Patterns
   - Composition rules and best practices.
5. Changelog
   - Version changes and migration notes.

## Required docs coverage per component

- Purpose and usage.
- Props reference.
- Variants and states.
- Accessibility notes.
- Do and Don't examples.
- `States` exhibit cards with:
  - white artwork preview canvas
  - compact state headings (small visual hierarchy)
  - no redundant component-name line inside each state block
- `Anatomy` previews on white canvas for visual consistency with `States`.

## Foundations visual output contract (required)

- **Colors**
  - Card per token step including token name and values in HEX, OKLCH, and HSL.
  - WCAG status computed from contrast against black/white and shown with visual badge.
- **Typography**
  - Token tables grouped by family, weight, size, line height, and letter spacing.
  - Style preview row for each text style.
- **Grid & Breakpoints**
  - Mobile/tablet/desktop previews with visible column overlays and labeled column-width chips.
  - Preview layout must not overlap or clip in the docs viewport.
- **Aspect ratio**
  - One visual preview per ratio format using proportional containers.
  - Optional reference image cropped by each ratio.

## Publish readiness checklist

- Storybook build passes.
- Broken links check passes.
- At least one example story per variant.
- Accessibility notes present in docs pages.
- Foundations visual output contract is fully satisfied.
