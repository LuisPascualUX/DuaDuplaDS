# Checklist — nuevo componente DS

Copiar y marcar en el resumen final del agente.

## Intake y especificación

- [ ] URL Figma validada; `fileKey` y `nodeId` extraídos (`-` → `:` en node-id).
- [ ] Contexto de diseño obtenido (p. ej. MCP `get_design_context`).
- [ ] Sección añadida o actualizada en `docs/components-spec.md` (API, estados, variantes, a11y, tokens).

## Implementación (este repo: HTML + Storybook)

- [ ] `apps/docs/src/components/<nombre>.ts` — funciones de render (patrón `buttons.ts`).
- [ ] `apps/docs/src/stories/design-system.css` — clases/token visual sin valores mágicos no documentados.
- [ ] `apps/docs/src/stories/<nombre>.stories.ts` — **Playground**, **States**, **Anatomy** según reglas del repo.
- [ ] Imports de CSS en stories si aplica; enlaces/embed Figma en Anatomy cuando corresponda.

## Calidad

- [ ] `npm run build-storybook` (desde raíz: `npm run build-storybook`) sin errores.
- [ ] Notas mínimas de accesibilidad en docs/story o descripción del story.

## Entrega

- [ ] Lista de archivos tocados + “Ready for GitHub/Vercel” o bloqueos.
