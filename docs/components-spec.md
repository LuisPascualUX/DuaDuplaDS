# Component Specification Template

Use one section per component.

## Component: `Button`

## Purpose
Primary action trigger for user flows.

## Anatomy
- Container
- Label
- Optional leading icon
- Optional trailing icon

## Props API (target React)
- `variant`: `primary | secondary | ghost`
- `size`: `sm | md | lg`
- `disabled`: `boolean`
- `loading`: `boolean`
- `iconLeading`: `ReactNode`
- `iconTrailing`: `ReactNode`

## States
- Default
- Hover
- Focus-visible
- Active
- Disabled
- Loading

## Accessibility
- Native `button` semantics.
- Keyboard activation via Enter/Space.
- Visible focus style.

## Token usage
- Background token
- Text token
- Border token
- Spacing token
- Radius token

## Storybook requirements
- One story per variant.
- One story for disabled/loading.
- One docs page with usage notes.

## Test requirements
- Render test.
- Interaction test.
- Accessibility assertion for role/name.
