# Añadir nuevo componente (Design System)

Actúa como el agente **`ds-new-component-from-figma`** definido en `AGENTS.md`.

## Entrada obligatoria

- **URL completa de Figma** del componente (`https://www.figma.com/design/...`). Lo ideal es que incluya `node-id=...` (nodo del componente o del component set). Si falta, pide al usuario el enlace con el nodo seleccionado en Figma **antes** de escribir código.

## Qué hacer

1. Lee **entero** el skill del proyecto: `.cursor/skills/add-new-ds-component/SKILL.md` y ejecuta sus fases **en orden**.
2. No implementes markup/CSS “a ciegas”: obtén contexto de diseño (p. ej. MCP Figma `get_design_context` con `fileKey` y `nodeId` parseados de la URL) salvo que el usuario pida explícitamente saltarse Figma.
3. Cierra con: archivos creados o modificados, riesgos abiertos, y evidencia de **`npm run build-storybook`** desde la raíz del repo (o explica el fallo).

Si el usuario no pegó aún la URL de Figma, pídesela una sola vez con este formato de ejemplo: `https://www.figma.com/design/<fileKey>/...?node-id=12-345`.
