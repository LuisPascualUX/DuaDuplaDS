# Foundations Documentation (Initial Pass)

## Source

- Project: `https://www.figma.com/files/project/544652819`
- Foundations file: `https://www.figma.com/design/q1DhMnfeyHxS2xDPA9dtj8/Foundations?m=auto&t=KxiOQ4jzk2NmlqQy-6`
- File key: `q1DhMnfeyHxS2xDPA9dtj8`

## Verified library context

From the connected design ecosystem, the Design System is currently split into these libraries:

- `Foundations`
- `Components`
- `Icons`
- `Utilities`

This separation is valid and recommended for scale:
- Foundations owns primitive and semantic tokens.
- Components consumes tokens from Foundations/Utilities.
- Icons stays decoupled for independent versioning.

## Token status (verified)

Detected variable collections include `Color` across multiple libraries (`Foundations`, `Components`, `Icons`, `Utilities`).

Current confidence:
- Color tokens: available.
- Typography/spacing/radius/elevation: expected but pending extraction with explicit `node-id`.

## Foundation categories to document in Storybook

1. Color
2. Typography
3. Spacing
4. Radius
5. Elevation
6. Motion
7. Iconography

## Documentation structure proposal

- `/foundations/colors`
- `/foundations/typography`
- `/foundations/spacing`
- `/foundations/radius`
- `/foundations/elevation`
- `/foundations/motion`
- `/foundations/icons`

## Pending for full automation

To produce exhaustive, token-by-token documentation automatically, the MCP workflow needs URLs with `node-id` for each foundations section.
