# Button Component Documentation (Initial Pass)

## Source

- Components file: `https://www.figma.com/design/SCpHExkj2GDv5v07Rx9G77/Components?m=auto&t=KxiOQ4jzk2NmlqQy-6`
- File key: `SCpHExkj2GDv5v07Rx9G77`

## Verified component discovery

Design system search confirms multiple published assets named:
- `Primary Button` (component sets)
- `Primary Button/Default/Sm` (component)
- `Primary Button/Default/Md` (component)

This is enough to start implementation for a first React button.

## React API proposal (v1)

- `variant`: `primary`
- `size`: `sm | md`
- `disabled`: `boolean`
- `children`: `ReactNode`
- `onClick`: `MouseEventHandler<HTMLButtonElement>`

Future-ready props (pending Figma variant extraction):
- `state`: `default | hover | focus | active | disabled`
- `loading`: `boolean`
- `iconLeading`, `iconTrailing`: `ReactNode`

## Accessibility baseline

- Use native `button`.
- Keep keyboard behavior by default.
- Provide visible focus styles.
- Respect disabled semantics (`disabled` attribute).

## Token usage policy

- Background, text, border, spacing, radius, and focus styles must come from Design System tokens.
- No hardcoded values in component styles unless explicitly documented as temporary fallback.

## Storybook docs requirements

- Stories:
  - `Primary / Small`
  - `Primary / Medium`
  - `Primary / Disabled`
- Docs page:
  - Purpose
  - Props
  - Accessibility
  - Do / Don't usage

## Validation notes

Deep variant matrix extraction is pending because the shared Figma URL does not include a `node-id` for the button component set.
