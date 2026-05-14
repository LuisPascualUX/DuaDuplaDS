#!/usr/bin/env node
/**
 * Parses a Figma MCP `get_design_context` dump (frame 28:1218 "icons") and:
 * - downloads each symbol SVG to `public/iconography/`
 * - regenerates `src/iconography/registry.ts`
 *
 * Usage:
 *   node scripts/sync-figma-icons-from-context.mjs [path/to/figma-28-1218-design-context.txt]
 *
 * Default input: scripts/figma-28-1218-design-context.txt
 */

import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DEFAULT_INPUT = join(__dirname, 'figma-28-1218-design-context.txt');
const OUT_DIR = join(ROOT, 'public', 'iconography');
const REGISTRY_OUT = join(ROOT, 'src', 'iconography', 'registry.ts');

const inputPath = process.argv[2] || DEFAULT_INPUT;

const slugify = (name) => {
  const s = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return s || 'icon';
};

const normalizeSvg = (raw) => {
  let s = raw.trim();
  s = s.replace(/fill="var\([^)]+\)"/g, 'fill="currentColor"');
  s = s.replace(/stroke="var\([^)]+\)"/g, 'stroke="currentColor"');
  return `${s}\n`;
};

async function fetchSvg(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

async function main() {
  const text = await readFile(inputPath, 'utf8');

  const urlMap = {};
  for (const m of text.matchAll(/^const (imgVector\d*) = "([^"]+)";/gm)) {
    urlMap[m[1]] = m[2];
  }

  const compRe =
    /data-node-id="(28:\d+)" data-name="([^"]+)"[\s\S]*?<img[^>]*?src=\{(imgVector\d*)\}/g;

  const icons = [];
  let x;
  while ((x = compRe.exec(text)) !== null) {
    const [, figmaNodeId, name, imgVar] = x;
    if (name === 'placeholder') continue;
    if (!urlMap[imgVar]) throw new Error(`Missing URL for ${imgVar} (${name})`);
    icons.push({ figmaNodeId, name, imgVar, url: urlMap[imgVar] });
  }

  icons.sort((a, b) => a.name.localeCompare(b.name));

  const slugCounts = new Map();
  const entries = [];

  for (const icon of icons) {
    let slug = slugify(icon.name);
    const c = (slugCounts.get(slug) || 0) + 1;
    slugCounts.set(slug, c);
    if (c > 1) slug = `${slug}-${c}`;

    entries.push({
      ...icon,
      slug,
      filename: `${slug}.svg`,
      publicPath: `/iconography/${slug}.svg`,
    });
  }

  await mkdir(OUT_DIR, { recursive: true });
  for (const f of await readdir(OUT_DIR)) {
    if (f.endsWith('.svg')) await rm(join(OUT_DIR, f));
  }

  const CONCURRENCY = 12;
  let i = 0;
  const worker = async () => {
    while (i < entries.length) {
      const idx = i++;
      const e = entries[idx];
      const svg = normalizeSvg(await fetchSvg(e.url));
      await writeFile(join(OUT_DIR, e.filename), svg, 'utf8');
      process.stdout.write(`\r${idx + 1}/${entries.length} ${e.filename}`.padEnd(72, ' '));
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  process.stdout.write('\n');

  const ts = [
    '/**',
    ' * Iconos sincronizados desde Figma (frame `icons`, nodo `28:1218`).',
    ' * Regenerar con: `node scripts/sync-figma-icons-from-context.mjs`',
    ' */',
    "export const FIGMA_ICONS_LIBRARY_URL =",
    "  'https://www.figma.com/design/oIAmonaBjQ28Ue9fB1bXXj/Icons?node-id=1-107&t=qAamhC0JUgcUaH2m-1';",
    '',
    "export const FIGMA_ICONS_GRID_URL =",
    "  'https://www.figma.com/design/oIAmonaBjQ28Ue9fB1bXXj/Icons?node-id=28-1218&t=qAamhC0JUgcUaH2m-4';",
    '',
    'export type IconRegistryEntry = {',
    '  id: string;',
    '  name: string;',
    '  publicPath: string;',
    '  figmaNodeId?: string;',
    '};',
    '',
    'export const ICON_REGISTRY: IconRegistryEntry[] = [',
    ...entries.map(
      (e) =>
        `  { id: ${JSON.stringify(e.slug)}, name: ${JSON.stringify(e.name)}, publicPath: ${JSON.stringify(e.publicPath)}, figmaNodeId: ${JSON.stringify(e.figmaNodeId)} },`,
    ),
    '];',
    '',
  ].join('\n');

  await writeFile(REGISTRY_OUT, ts, 'utf8');
  console.log(`Wrote ${entries.length} icons → ${OUT_DIR}`);
  console.log(`Wrote registry → ${REGISTRY_OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
