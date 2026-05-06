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
- Button label text must stay on a single line in all variants/states/sizes (no wrapping).

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
- Playground must reflect interactive behavior from default state (`:hover`, `:active`, `:focus-visible`) without changing controls manually.

## Current implementation split

- `Button Primary`
  - Storybook path: `Components/Button Primary`
  - Figma source: `nodeId 50:969` (`COMPONENT_SET`)
  - Supporting docs nodes: `67:4219` (status), `67:4389` (anatomy)
  - Status enum: `Default | Hover | Pressed | Disabled | Focus`
  - Sizes: `sm`, `md`
  - Text prop: `Text` (string)
  - Icon props: `icon left`, `icon right` (boolean, default `true`)
  - Layout contract:
    - Horizontal auto-layout (Hug x Hug), center/center
    - Item spacing: `4`
    - Padding: `Md 12/16`, `Sm 8/12`
    - Corner radius: `999`
  - Focus contract:
    - `focusRing` present in `Status=Focus`
    - Offset: start/end `-2`
    - Height: `46` (Md), `38` (Sm)
  - Color contract:
    - Default bg `#FF1289` / text `#020618`
    - Hover bg `#FF5BA8`
    - Pressed bg `#EF0066`
    - Disabled bg `#CAD5E2` / text `#90A1B9`

- `Button Secondary`
  - Storybook path: `Components/Button Secondary`
  - Figma source: `nodeId 50:936` (`COMPONENT_SET`), section node `67:4587`
  - Status enum: `Default | Hover | Pressed | Disabled | Focused`
  - Sizes: `sm`, `md`
  - Text prop: `Text` (string)
  - Icon props: `icon left`, `icon right` (boolean, default `true`)
  - Layout contract:
    - Horizontal auto-layout (Hug x Hug), center/center
    - Item spacing: `4`
    - Padding: `Md 12/16`, `Sm 8/12`
    - Corner radius: `999`
    - Stroke: `2px`
  - Focus contract:
    - `focusRing` present in `Status=Focused`
    - Offset: start/end `-2`
    - Height: `46` (Md), `38` (Sm)
  - Color contract:
    - Default border/text `#FF1289`
    - Hover border/text `#FF5BA8`, bg `#FEE6EF`
    - Pressed border/text `#EF0066`, bg `#FFCCE3`
    - Disabled border/text `#90A1B9`, bg `#CAD5E2`

- `Button Tertiary`
  - Storybook path: `Components/Button Tertiary`
  - Figma source: `nodeId 63:3161` (`COMPONENT_SET`), section node `67:5209`
  - Status enum: `Default | Hover | Pressed | Disabled | Focused`
  - Sizes: `sm`, `md`
  - Text prop: `Text` (string)
  - Icon props: `icon left`, `icon right` (boolean, default `true`)
  - Layout contract:
    - Horizontal auto-layout (Hug x Hug), center/center
    - Item spacing: `4`
    - Padding: `Md 12/16`, `Sm 8/12`
    - Bottom stroke: `2px` only (`top/start/end = 0`)
  - Focus contract:
    - `focusRing` present in `Status=Focused`
    - Offset: start/end `-2`
    - Height: `46` (Md), `38` (Sm)
    - Type: dashed
  - Color contract:
    - Default border/text `#FF1289`
    - Hover border/text `#FF5BA8`, bg `#FEE6EF`
    - Pressed border/text `#EF0066`, bg `#FFCCE3`
    - Disabled border/text `#90A1B9`, bg `#CAD5E2`

- `Icon Button Primary`
  - Storybook path: `Components/Icon Button Primary`
  - Figma source: `nodeId 74:11934` (`COMPONENT_SET`), section node `81:23133`
  - Status enum: `Default | Hover | Pressed | Disabled | Focus`
  - Sizes: `sm`, `md`
  - Layout contract:
    - Horizontal auto-layout, center/center
    - Fixed width: `32` (Sm), `40` (Md)
    - Padding: `8` (Md), `8` with horizontal `12` in Sm
    - Corner radius: `999`
    - Icon size: `16` (Sm), `24` (Md)
  - Focus contract:
    - `focusRing` present in `Status=Focus`
    - Offset: start/end `-2`
    - Height: `46` (Md), `38` (Sm)
  - Color contract:
    - Default bg `#FF1289`
    - Hover bg `#FF5BA8`
    - Pressed bg `#EF0066`
    - Disabled bg `#CAD5E2`

- `Icon Button Secondary`
  - Storybook path: `Components/Icon Button Secondary`
  - Figma source: `nodeId 75:12079`
  - Status enum: `Default | Hover | Pressed | Disabled | Focused`
  - Sizes: `sm`, `md`
  - Layout contract:
    - Horizontal auto-layout, center/center
    - Fixed width: `32` (Sm), `40` (Md)
    - Padding: `8` (Md), `8` with horizontal `12` in Sm
    - Corner radius: `999`
    - Stroke width: `2`
    - Icon size: `16` (Sm), `24` (Md)
  - Focus contract:
    - `focusRing` present in `Status=Focused`
    - Dashed style
  - Color contract:
    - Default border `#FF1289`
    - Hover border `#FF5BA8`, bg `#FEE6EF`
    - Pressed border `#EF0066`, bg `#FFCCE3`
    - Disabled border `#90A1B9`, bg `#CAD5E2`

- `Icon Button Tertiary`
  - Storybook path: `Components/Icon Button Tertiary`
  - Figma source: `nodeId 75:12348`
  - Status enum: `Default | Hover | Pressed | Disabled | Focused`
  - Sizes: `sm`, `md`
  - Layout contract:
    - Horizontal auto-layout, center/center
    - Fixed width: `32` (Sm), `40` (Md)
    - Padding: `8` (Md), `8` with horizontal `12` in Sm
    - Corner radius: `999`
    - Stroke: `none`
    - Icon size: `16` (Sm), `24` (Md)
  - Focus contract:
    - `focusRing` present in `Status=Focused`
    - Dashed style
  - Color contract:
    - Default icon `#FF1289`
    - Hover icon `#FF5BA8`, bg `#FEE6EF`
    - Pressed icon `#EF0066`, bg `#FFCCE3`
    - Disabled icon `#90A1B9`, bg `#CAD5E2`

## Test requirements
- Render test.
- Interaction test.
- Accessibility assertion for role/name.
