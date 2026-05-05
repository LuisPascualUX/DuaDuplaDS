# Figma to Code Token Mapping

Use this table-style structure while implementing.

## Libraries and keys (verified)

- Foundations: `lk-3fb76950d11afd4c82a63e1b69f7e71100d4812990a325a187f213acd62420e731899a860029149a1e70f6e10b355ac48cca7d9ea18a552b69c9f01e139c0859`
- Components: `lk-0f6a16af66d13650377e5a73147b9c06044483283b4d345d0271ca3cd9cc71981dcb4dc712aeb5fbbdf9e264f3c4d0c800d5cafeb066a49527b56566c32b6bd7`
- Icons: `lk-fe64e23fad21677f988fc81719a88c2cfb6c42c2e5d1f93585f767db53bae4694037bd2b2a255ad18e6f0176d15db74307021911fd865b55d6dd553b5c09a164`
- Utilities: `lk-eaa2c82afea364fa86bb1cc17ca05ffc286fcf30867ca0ae675cdc1fa05e99cfc4f03429f63153d80defaf8e6ad3da001976866b7f6f3e4cbd4352b11fa18027`

## Color
- Figma token: `color.surface.default` -> Code token: `--ds-color-surface-default`
- Figma token: `color.text.default` -> Code token: `--ds-color-text-default`

## Typography
- Figma token: `typography.body.md.size` -> Code token: `--ds-font-size-body-md`
- Figma token: `typography.body.md.lineHeight` -> Code token: `--ds-line-height-body-md`

## Spacing
- Figma token: `space.200` -> Code token: `--ds-space-200`
- Figma token: `space.300` -> Code token: `--ds-space-300`

## Radius
- Figma token: `radius.md` -> Code token: `--ds-radius-md`

## Elevation
- Figma token: `elevation.100` -> Code token: `--ds-shadow-100`

## Rules

- Prefer semantic tokens over raw values in components.
- Never hard-code color/spacing values if a token exists.
- If token does not exist, document the fallback and create follow-up task.
