import { FIGMA_ICONS_LIBRARY_URL, type IconRegistryEntry } from './registry';

/** Misma marca que foundations (Color primitives): enlace a Figma. */
const EXTERNAL_OPEN_ICON = `<svg class="ds-figma-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"></path><path d="M5 5h6V3H3v8h2V5zm14 14h-6v2h8v-8h-2v6zM5 19v-6H3v8h8v-2H5z"></path></svg>`;

const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Texto dentro de `<title>` (SVG pegado en Figma). */
const escapeXmlText = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Evita inyección en `style="color: …"` desde controles de Storybook. */
export const sanitizeColorForPreview = (raw: string): string => {
  const c = raw.trim();
  if (/^#[0-9a-f]{3,8}$/i.test(c)) return c;
  if (/^rgba?\(\s*[\d.]+\s*(,\s*[\d.]+\s*){2}(,\s*[\d.]+\s*)?\)$/i.test(c)) return c;
  return '#111827';
};

const injectSvgAttributes = (
  svgMarkup: string,
  opts: { size: number; strokeWidth: number; ariaLabel: string },
) => {
  const label = escapeAttr(opts.ariaLabel);
  return svgMarkup.replace(/<svg\b([^>]*)>/i, (_match, attrs: string) => {
    const rest = attrs
      .replace(/\sclass\s*=\s*["'][^"']*["']/gi, '')
      .replace(/\spreserveAspectRatio\s*=\s*["'][^"']*["']/gi, '')
      .replace(/\swidth\s*=\s*["'][^"']*["']/gi, '')
      .replace(/\sheight\s*=\s*["'][^"']*["']/gi, '')
      .replace(/\sstyle\s*=\s*["'][^"']*["']/gi, '')
      .replace(/\soverflow\s*=\s*["'][^"']*["']/gi, '')
      .trim();
    const tail = rest ? ` ${rest}` : '';
    return `<svg class="ds-icon-gallery-svg" width="${opts.size}" height="${opts.size}" stroke-width="${opts.strokeWidth}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${label}"${tail}>`;
  });
};

/** Lienzo estándar Figma / DS (zona segura alrededor del trazo). */
const CLIPBOARD_CANVAS = 24;
const VB_EPS = 1e-3;

const fmtTf = (n: number) => String(Math.round(n * 10000) / 10000);

const parseViewBox = (attrs: string): [number, number, number, number] | null => {
  const m = attrs.match(/viewBox\s*=\s*["']([^"']+)["']/i);
  if (!m?.[1]) return null;
  const parts = m[1].trim().split(/[\s,]+/).map(Number);
  if (parts.length !== 4 || parts.some((x) => Number.isNaN(x))) return null;
  return [parts[0]!, parts[1]!, parts[2]!, parts[3]!];
};

const cleanSvgRootAttrsForExport = (attrs: string) =>
  attrs
    .replace(/\sclass="[^"]*"/gi, '')
    .replace(/\sid="[^"]*"/gi, '')
    .replace(/\sstyle="[^"]*"/gi, '')
    .replace(/\sdata-[\w-]+="[^"]*"/gi, '')
    .replace(/\saria-label="[^"]*"/gi, '')
    .replace(/\srole="[^"]*"/gi, '')
    .replace(/\spreserveAspectRatio="[^"]*"/gi, '')
    .replace(/\soverflow="[^"]*"/gi, '')
    .replace(/\swidth="[^"]*"/gi, '')
    .replace(/\sheight="[^"]*"/gi, '')
    .replace(/\sstroke-width="[^"]*"/gi, '')
    .replace(/\sviewBox\s*=\s*["'][^"']*["']/gi, '')
    .trim();

const isDrawableSvgTag = (t: string) =>
  ['path', 'circle', 'ellipse', 'line', 'polyline', 'polygon', 'rect', 'use', 'text'].includes(t);

const skipSvgMetadataTag = (t: string) =>
  ['defs', 'style', 'title', 'desc', 'metadata'].includes(t);

/**
 * Aplica `transform` a paths/formas sueltas (sin `<g>`), para que Figma no
 * inserte una capa Grupo intermedia al pegar — solo frame + vector.
 */
const applyTransformWithoutGroup = (inner: string, transform: string): string => {
  if (typeof DOMParser === 'undefined') {
    return `<g transform="${escapeAttr(transform)}">${inner}</g>`;
  }
  const doc = new DOMParser().parseFromString(
    `<svg xmlns="http://www.w3.org/2000/svg">${inner}</svg>`,
    'image/svg+xml',
  );
  if (doc.querySelector('parsererror')) {
    return `<g transform="${escapeAttr(transform)}">${inner}</g>`;
  }
  const svg = doc.documentElement;
  const mergeTf = (el: Element, add: string) => {
    const p = el.getAttribute('transform')?.trim();
    el.setAttribute('transform', p ? `${add} ${p}` : add);
  };

  const snapshot = Array.from(svg.children);
  for (const child of snapshot) {
    const tag = child.tagName.toLowerCase();
    if (skipSvgMetadataTag(tag)) continue;

    if (isDrawableSvgTag(tag)) {
      mergeTf(child, transform);
    } else if (tag === 'g') {
      const gTf = child.getAttribute('transform')?.trim() ?? '';
      const combined = [transform, gTf].filter(Boolean).join(' ');
      const sub = Array.from(child.children);
      const allDrawable =
        sub.length > 0 && sub.every((c) => isDrawableSvgTag(c.tagName.toLowerCase()));
      if (allDrawable) {
        for (const c of sub) mergeTf(c, combined);
        while (child.firstChild) svg.insertBefore(child.firstChild, child);
        svg.removeChild(child);
      } else {
        mergeTf(child, transform);
      }
    } else {
      mergeTf(child, transform);
    }
  }

  return Array.from(svg.childNodes)
    .map((n) => {
      if (n.nodeType === 1) return (n as Element).outerHTML;
      if (n.nodeType === 8) return '';
      if (n.nodeType === 3) return (n as Text).data.trim() ? (n as Text).data : '';
      return '';
    })
    .join('')
    .trim();
};

export type ClipboardSvgOpts = {
  /** Nombre legible del icono (`<title>` al pegar en Figma). */
  iconName?: string;
  /** Slug estable (`id` en el `<svg>` raíz; válido como identificador XML). */
  iconId?: string;
};

/**
 * Limpia el SVG para pegarlo en Figma/código: mismo lienzo 24×24 que el
 * componente de biblioteca (zona segura), no solo el bounding box del trazo.
 * Los assets de la rejilla suelen traer `viewBox` ajustado al path; aquí se
 * centra (y escala si hace falta) dentro de `0 0 24 24`, aplicando la
 * transformación al `<path>` (sin `<g>`) para igualar la jerarquía de capas.
 */
const normalizeSvgForClipboard = (svgMarkup: string, opts?: ClipboardSvgOpts): string => {
  let text = svgMarkup
    .replace(/fill="var\([^)]*\)"/gi, 'fill="currentColor"')
    .replace(/stroke="var\([^)]*\)"/gi, 'stroke="currentColor"');

  const open = text.match(/^[\s\S]*?<svg\b([^>]*)>/i);
  if (!open) return text.trim();

  const rawAttrs = open[1]!;
  const innerStart = open[0].length;
  const closeIdx = text.lastIndexOf('</svg>');
  if (closeIdx <= innerStart) return text.trim();

  let inner = text.slice(innerStart, closeIdx).trim();
  inner = inner.replace(/\sstyle="[^"]*"/gi, '');

  const tailAttrs = cleanSvgRootAttrsForExport(rawAttrs);
  const xmlns =
    /xmlns\s*=\s*["']http:\/\/www\.w3\.org\/2000\/svg["']/i.test(tailAttrs) ? '' : ' xmlns="http://www.w3.org/2000/svg"';
  const tail = tailAttrs ? ` ${tailAttrs}` : '';
  const titleBlock =
    opts?.iconName && opts.iconName.trim()
      ? `<title>${escapeXmlText(opts.iconName.trim())}</title>`
      : '';
  const rootId =
    opts?.iconId && /^[A-Za-z][\w.-]*$/.test(opts.iconId.trim())
      ? ` id="${escapeAttr(opts.iconId.trim())}"`
      : '';

  const vb = parseViewBox(rawAttrs);
  if (!vb) {
    return `<svg${xmlns}${rootId}${tail} viewBox="0 0 ${CLIPBOARD_CANVAS} ${CLIPBOARD_CANVAS}" width="${CLIPBOARD_CANVAS}" height="${CLIPBOARD_CANVAS}">${titleBlock}${inner}</svg>`;
  }

  const [minX, minY, vw, vh] = vb;
  if (vw <= VB_EPS || vh <= VB_EPS) return text.trim();

  const alreadyCanvas =
    Math.abs(vw - CLIPBOARD_CANVAS) <= VB_EPS &&
    Math.abs(vh - CLIPBOARD_CANVAS) <= VB_EPS &&
    Math.abs(minX) <= VB_EPS &&
    Math.abs(minY) <= VB_EPS;

  let body = inner;
  if (!alreadyCanvas) {
    const cx = minX + vw / 2;
    const cy = minY + vh / 2;
    const needsScale = vw > CLIPBOARD_CANVAS - VB_EPS || vh > CLIPBOARD_CANVAS - VB_EPS;
    const s = needsScale ? Math.min(CLIPBOARD_CANVAS / vw, CLIPBOARD_CANVAS / vh) : 1;
    const tf =
      s < 1 - VB_EPS
        ? `translate(${fmtTf(CLIPBOARD_CANVAS / 2)},${fmtTf(CLIPBOARD_CANVAS / 2)}) scale(${fmtTf(s)}) translate(${fmtTf(-cx)},${fmtTf(-cy)})`
        : `translate(${fmtTf(CLIPBOARD_CANVAS / 2 - cx)},${fmtTf(CLIPBOARD_CANVAS / 2 - cy)})`;
    body = applyTransformWithoutGroup(inner, tf);
  }

  return `<svg${xmlns}${rootId}${tail} viewBox="0 0 ${CLIPBOARD_CANVAS} ${CLIPBOARD_CANVAS}" width="${CLIPBOARD_CANVAS}" height="${CLIPBOARD_CANVAS}">${titleBlock}${body}</svg>`;
};

export const fetchIconSvg = async (path: string): Promise<string> => {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`No se pudo cargar ${path} (${res.status})`);
  return res.text();
};

export type GalleryRenderOpts = {
  size: number;
  strokeWidth: number;
  color: string;
};

const COPY_GLYPH = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>`;
const CHECK_GLYPH = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`;

const cardHtml = (
  icon: IconRegistryEntry,
  svgMarkup: string,
  opts: GalleryRenderOpts,
) => {
  const inner = injectSvgAttributes(svgMarkup, {
    size: opts.size,
    strokeWidth: opts.strokeWidth,
    ariaLabel: icon.name,
  });
  const clipboardSvg = encodeURIComponent(
    normalizeSvgForClipboard(svgMarkup, { iconName: icon.name, iconId: icon.id }),
  );
  const safeName = escapeAttr(icon.name);
  return `
    <article class="ds-icon-gallery-card" role="listitem" data-icon-id="${escapeAttr(icon.id)}">
      <header class="ds-icon-gallery-card__head">
        <span class="ds-icon-gallery-card__name" title="${safeName}">${safeName}</span>
      </header>
      <div class="ds-icon-gallery-card__preview" style="color:${escapeAttr(sanitizeColorForPreview(opts.color))};">
        ${inner}
      </div>
      <footer class="ds-icon-gallery-card__foot">
        <span class="ds-icon-gallery-card__size">${opts.size}px</span>
        <button
          type="button"
          class="ds-icon-copy-btn"
          data-copy-svg="${clipboardSvg}"
          data-icon-name="${safeName}"
          aria-label="Copiar SVG de ${safeName}"
          title="Copiar SVG"
        >
          <span class="ds-icon-copy-btn__icon ds-icon-copy-btn__icon--copy" aria-hidden="true">${COPY_GLYPH}</span>
          <span class="ds-icon-copy-btn__icon ds-icon-copy-btn__icon--check" aria-hidden="true">${CHECK_GLYPH}</span>
          <span class="ds-icon-copy-btn__sr">Copiar SVG</span>
        </button>
      </footer>
    </article>
  `;
};

export const renderGalleryGrid = async (
  icons: IconRegistryEntry[],
  opts: GalleryRenderOpts,
) => {
  const svgs = await Promise.all(icons.map((i) => fetchIconSvg(i.publicPath)));
  const cards = icons.map((icon, idx) => cardHtml(icon, svgs[idx]!, opts)).join('');
  const n = icons.length;
  const countLabel = `${n} Icon${n === 1 ? '' : 's'}`;
  return `
    <div class="ds-icon-gallery">
      <header class="ds-icon-gallery__header">
        <h2 class="ds-icon-gallery__title">Icons Gallery</h2>
        <p class="ds-icon-gallery__count">${countLabel}</p>
        <p class="ds-icon-gallery__subtitle">Size: ${opts.size}px · Stroke: ${opts.strokeWidth} · Color: <code>${escapeAttr(sanitizeColorForPreview(opts.color))}</code></p>
        <p class="ds-muted ds-icon-gallery__links"><a class="ds-figma-link" href="${escapeAttr(FIGMA_ICONS_LIBRARY_URL)}" target="_blank" rel="noopener noreferrer">${EXTERNAL_OPEN_ICON} Go to Figma file</a></p>
      </header>
      <div class="ds-icon-gallery-grid" role="list">
        ${cards}
      </div>
    </div>
  `;
};

const writeToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* cae al fallback */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
};

const flashCopied = (btn: HTMLButtonElement) => {
  btn.classList.add('is-copied');
  const prevLabel = btn.getAttribute('aria-label') ?? '';
  const iconName = btn.getAttribute('data-icon-name') ?? 'icono';
  btn.setAttribute('aria-label', `SVG de ${iconName} copiado`);
  window.setTimeout(() => {
    btn.classList.remove('is-copied');
    if (prevLabel) btn.setAttribute('aria-label', prevLabel);
  }, 1400);
};

/**
 * Registra un listener delegado en `document` para los botones de copiar.
 * Idempotente: aunque Storybook re-renderice el preview, no se duplican.
 */
export const attachGalleryHandlers = (_scope?: ParentNode): void => {
  if (typeof document === 'undefined') return;
  const flag = '__dsIconGalleryCopyBound';
  const doc = document as Document & Record<string, unknown>;
  if (doc[flag]) return;
  doc[flag] = true;
  document.addEventListener('click', (event) => {
    const target = event.target as Element | null;
    if (!target) return;
    const btn = target.closest('.ds-icon-copy-btn') as HTMLButtonElement | null;
    if (!btn) return;
    const encoded = btn.getAttribute('data-copy-svg');
    if (!encoded) return;
    event.preventDefault();
    let svg = '';
    try {
      svg = decodeURIComponent(encoded);
    } catch {
      svg = encoded;
    }
    void writeToClipboard(svg).then((ok) => {
      if (ok) flashCopied(btn);
    });
  });
};
