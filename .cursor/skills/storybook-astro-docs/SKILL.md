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

## Publish readiness checklist

- Storybook build passes.
- Broken links check passes.
- At least one example story per variant.
- Accessibility notes present in docs pages.
