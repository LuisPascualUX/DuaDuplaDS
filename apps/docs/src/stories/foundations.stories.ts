import type { Meta, StoryObj } from '@storybook/html';
import rawTokens from '../../../../DuaDuplaDStokens.json';

const tokens = rawTokens as Record<string, any>;
const primitiveColors = tokens['_Primitives / Color'].color;
const typography = tokens['_Primitives / Typography'];
const spacing = tokens['_primitivesSpacing'];
const radii = tokens.borderRadii;

const figmaLinks = {
  color:
    'https://www.figma.com/design/q1DhMnfeyHxS2xDPA9dtj8/Foundations?node-id=257-6711&t=cOB2wW5ckLSUcD5M-4',
  typography:
    'https://www.figma.com/design/q1DhMnfeyHxS2xDPA9dtj8/Foundations?node-id=113-3452&t=cOB2wW5ckLSUcD5M-4',
  spacing:
    'https://www.figma.com/design/q1DhMnfeyHxS2xDPA9dtj8/Foundations?node-id=118-773&t=cOB2wW5ckLSUcD5M-4',
  radii:
    'https://www.figma.com/design/q1DhMnfeyHxS2xDPA9dtj8/Foundations?node-id=120-1309&t=cOB2wW5ckLSUcD5M-4',
  grid:
    'https://www.figma.com/design/q1DhMnfeyHxS2xDPA9dtj8/Foundations?node-id=232-453&t=cOB2wW5ckLSUcD5M-4',
  aspect:
    'https://www.figma.com/design/q1DhMnfeyHxS2xDPA9dtj8/Foundations?node-id=238-296&t=cOB2wW5ckLSUcD5M-4',
  focus:
    'https://www.figma.com/design/q1DhMnfeyHxS2xDPA9dtj8/Foundations?node-id=238-404&t=cOB2wW5ckLSUcD5M-4',
};

const externalOpenIcon = `<svg class="ds-figma-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"></path><path d="M5 5h6V3H3v8h2V5zm14 14h-6v2h8v-8h-2v6zM5 19v-6H3v8h8v-2H5z"></path></svg>`;

const mapScale = (scale: Record<string, { $value: string }>) =>
  Object.entries(scale).map(([name, node]) => ({ name, value: node.$value }));

const swatchesHtml = (title: string, group: Record<string, { $value: string }>) => `
  <section class="ds-col">
    <h3>${title}</h3>
    <div class="ds-grid">
      ${mapScale(group).map((item) => colorCardHtml(`${title.toLowerCase()}${item.name}`, item.name, item.value)).join('')}
    </div>
  </section>
`;

const hexToRgb = (hex: string) => {
  const normalized = hex.replace('#', '');
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized;
  const r = Number.parseInt(full.slice(0, 2), 16);
  const g = Number.parseInt(full.slice(2, 4), 16);
  const b = Number.parseInt(full.slice(4, 6), 16);
  return { r, g, b };
};

const rgbToHsl = ({ r, g, b }: { r: number; g: number; b: number }) => {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case rn:
        h = 60 * (((gn - bn) / d) % 6);
        break;
      case gn:
        h = 60 * ((bn - rn) / d + 2);
        break;
      default:
        h = 60 * ((rn - gn) / d + 4);
        break;
    }
  }
  if (h < 0) h += 360;
  return { h: Math.round(h), s: Number(s.toFixed(3)), l: Number(l.toFixed(3)) };
};

const srgbToLinear = (v: number) => {
  const n = v / 255;
  return n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
};

const relativeLuminance = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  const rl = srgbToLinear(r);
  const gl = srgbToLinear(g);
  const bl = srgbToLinear(b);
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
};

const contrastRatio = (a: string, b: string) => {
  const l1 = relativeLuminance(a);
  const l2 = relativeLuminance(b);
  const light = Math.max(l1, l2);
  const dark = Math.min(l1, l2);
  return (light + 0.05) / (dark + 0.05);
};

const toOklch = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  const rl = srgbToLinear(r);
  const gl = srgbToLinear(g);
  const bl = srgbToLinear(b);
  const l = 0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl;
  const m = 0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl;
  const s = 0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const b2 = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
  const C = Math.sqrt(a * a + b2 * b2);
  const h = (Math.atan2(b2, a) * 180) / Math.PI;
  const hue = h >= 0 ? h : h + 360;
  return {
    l: Number((L * 100).toFixed(1)),
    c: Number(C.toFixed(3)),
    h: Number(hue.toFixed(2)),
  };
};

const wcagBadge = (hex: string) => {
  const blackRatio = contrastRatio(hex, '#000000');
  const whiteRatio = contrastRatio(hex, '#ffffff');

  // Pick text color with best contrast for normal text WCAG checks.
  const useBlack = blackRatio >= whiteRatio;
  const selectedRatio = useBlack ? blackRatio : whiteRatio;
  const on = useBlack ? 'on black' : 'on white';

  // WCAG 2.1 thresholds for normal text.
  const grade = selectedRatio >= 7 ? 'AAA' : selectedRatio >= 4.5 ? 'AA' : 'Fail';

  return {
    grade,
    ratio: Number(selectedRatio.toFixed(2)),
    on,
    blackRatio: Number(blackRatio.toFixed(2)),
    whiteRatio: Number(whiteRatio.toFixed(2)),
    isOk: grade !== 'Fail',
  };
};

const wcagOkIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.97016 4.97004C9.11103 4.83593 9.29848 4.76179 9.49298 4.76326C9.68747 4.76473 9.87378 4.8417 10.0126 4.97793C10.1514 5.11416 10.2319 5.29899 10.237 5.49342C10.2422 5.68785 10.1716 5.87667 10.0402 6.02004L6.05016 11.01C5.98155 11.0839 5.89874 11.1432 5.80669 11.1844C5.71464 11.2256 5.61523 11.2478 5.51441 11.2496C5.41359 11.2515 5.31343 11.233 5.21991 11.1953C5.1264 11.1575 5.04146 11.1013 4.97016 11.03L2.32416 8.38404C2.25047 8.31538 2.19137 8.23258 2.15038 8.14058C2.10938 8.04858 2.08734 7.94927 2.08557 7.84857C2.08379 7.74786 2.10231 7.64783 2.14003 7.55445C2.17776 7.46106 2.2339 7.37622 2.30512 7.305C2.37634 7.23379 2.46117 7.17764 2.55456 7.13992C2.64795 7.1022 2.74798 7.08367 2.84868 7.08545C2.94938 7.08723 3.0487 7.10927 3.1407 7.15026C3.2327 7.19125 3.3155 7.25036 3.38416 7.32404L5.47816 9.41704L8.95016 4.99204L8.97016 4.97004ZM8.05016 10.11L8.97016 11.03C9.04144 11.1012 9.12632 11.1573 9.21974 11.1949C9.31316 11.2325 9.4132 11.251 9.5139 11.2491C9.6146 11.2472 9.71389 11.2251 9.80585 11.184C9.89781 11.143 9.98056 11.0838 10.0492 11.01L14.0412 6.02004C14.1129 5.94924 14.1696 5.86472 14.2079 5.77152C14.2462 5.67832 14.2654 5.57835 14.2642 5.47758C14.263 5.37682 14.2415 5.27732 14.2011 5.18504C14.1606 5.09276 14.1019 5.00958 14.0286 4.94047C13.9552 4.87137 13.8687 4.81775 13.7742 4.78282C13.6797 4.74789 13.5791 4.73237 13.4784 4.73718C13.3778 4.742 13.2791 4.76705 13.1883 4.81084C13.0976 4.85462 13.0166 4.91625 12.9502 4.99204L9.47716 9.41704L8.99216 8.93104L8.05016 10.11Z" fill="#00C767"/></svg>`;
const wcagKoIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.00456 9.07682L10.6987 11.7679C10.8416 11.9107 11.0355 11.9909 11.2377 11.9909C11.4399 11.9909 11.6338 11.9107 11.7767 11.7679C11.9197 11.6251 12 11.4314 12 11.2295C12 11.0275 11.9197 10.8338 11.7767 10.691L9.08159 8L11.7762 5.30895C11.847 5.23825 11.9031 5.15431 11.9414 5.06195C11.9796 4.96958 11.9993 4.87058 11.9993 4.77062C11.9993 4.67065 11.9796 4.57166 11.9412 4.47931C11.9029 4.38696 11.8468 4.30305 11.776 4.23238C11.7052 4.16171 11.6212 4.10566 11.5287 4.06742C11.4362 4.02919 11.3371 4.00952 11.237 4.00954C11.1369 4.00957 11.0378 4.02928 10.9454 4.06756C10.8529 4.10584 10.7689 4.16193 10.6982 4.23264L8.00456 6.92368L5.31044 4.23264C5.24018 4.1599 5.15611 4.10187 5.06316 4.06194C4.9702 4.022 4.87022 4.00096 4.76903 4.00003C4.66785 3.99911 4.56749 4.01832 4.47382 4.05655C4.38015 4.09478 4.29504 4.15126 4.22345 4.22269C4.15187 4.29413 4.09525 4.37909 4.05688 4.47262C4.01852 4.56615 3.99919 4.66637 4.00003 4.76744C4.00086 4.86851 4.02183 4.9684 4.06173 5.06129C4.10162 5.15417 4.15963 5.23819 4.23238 5.30845L6.92752 8L4.23289 10.6916C4.16014 10.7618 4.10213 10.8458 4.06223 10.9387C4.02234 11.0316 4.00136 11.1315 4.00053 11.2326C3.9997 11.3336 4.01903 11.4339 4.05739 11.5274C4.09575 11.6209 4.15238 11.7059 4.22396 11.7773C4.29555 11.8487 4.38066 11.9052 4.47433 11.9435C4.568 11.9817 4.66836 12.0009 4.76954 12C4.87073 11.999 4.97071 11.978 5.06367 11.9381C5.15662 11.8981 5.24068 11.8401 5.31095 11.7674L8.00456 9.07682Z" fill="#FF2D2D"/></svg>`;

const colorCardHtml = (tokenName: string, step: string, hex: string) => {
  const hsl = rgbToHsl(hexToRgb(hex));
  const oklch = toOklch(hex);
  const wcag = wcagBadge(hex);
  const stepTextColor = wcag.on === 'on white' ? '#FFFFFF' : '#000000';
  return `
    <article class="ds-swatch-v2">
      <div class="ds-token-chip">${tokenName}</div>
      <div class="ds-swatch-v2-color" style="background:${hex}">
        <span class="ds-wcag-badge">${wcag.isOk ? wcagOkIcon : wcagKoIcon} ${wcag.grade} ${wcag.ratio} (${wcag.on})</span>
        <span class="ds-step-label" style="color:${stepTextColor}">${step}</span>
      </div>
      <div class="ds-swatch-v2-meta">
        <div><span>HEX:</span><strong>${hex.toUpperCase()}</strong></div>
        <div><span>OKLCH:</span><strong>${oklch.l}% - ${oklch.c} - ${oklch.h}</strong></div>
        <div><span>HSL:</span><strong>${hsl.h} - ${hsl.s} - ${hsl.l}</strong></div>
        <div><span>WCAG:</span><strong>black ${wcag.blackRatio} / white ${wcag.whiteRatio}</strong></div>
      </div>
    </article>
  `;
};

const meta: Meta = {
  title: 'Foundations/Design Tokens',
  parameters: {
    docs: {
      description: {
        component:
          'Foundations renderizadas desde `DuaDuplaDStokens.json` y contrastadas con nodos de Figma enlazados por sección.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const ColorPrimitives: Story = {
  render: () => `
    <section class="ds-panel">
      <h2>Color primitives (from JSON tokens)</h2>
      <p class="ds-muted"><a class="ds-figma-link" href="${figmaLinks.color}" target="_blank" rel="noopener noreferrer">${externalOpenIcon} Go to Figma file</a></p>
      ${swatchesHtml('Primary', primitiveColors.primary)}
      ${swatchesHtml('Accent', primitiveColors.accent)}
      ${swatchesHtml('Feedback / Green', primitiveColors.feedback.green)}
      ${swatchesHtml('Feedback / Red', primitiveColors.feedback.red)}
      ${swatchesHtml('Feedback / Amber', primitiveColors.feedback.amber)}
      ${swatchesHtml('Feedback / Sky', primitiveColors.feedback.sky)}
    </section>
  `,
};

export const TypographyScale: Story = {
  render: () => `
    <section class="ds-panel">
      <h2>Typography primitives</h2>
      <p class="ds-muted"><a class="ds-figma-link" href="${figmaLinks.typography}" target="_blank" rel="noopener noreferrer">${externalOpenIcon} Go to Figma file</a></p>
      <div class="ds-col">
        <h3>Family</h3>
        <table class="ds-table">
          <thead><tr><th>Token</th><th>Value</th></tr></thead>
          <tbody>
            ${Object.entries(typography.family)
              .map(([k, v]: [string, any]) => `<tr><td>family.${k}</td><td>${v.$value}</td></tr>`)
              .join('')}
          </tbody>
        </table>

        <h3>Weight</h3>
        <table class="ds-table">
          <thead><tr><th>Token</th><th>Value</th></tr></thead>
          <tbody>
            ${Object.entries(typography.weight)
              .map(([k, v]: [string, any]) => `<tr><td>weight.${k}</td><td>${v.$value}</td></tr>`)
              .join('')}
          </tbody>
        </table>

        <h3>Size</h3>
        <table class="ds-table">
          <thead><tr><th>Token</th><th>Value</th></tr></thead>
          <tbody>
            ${Object.entries(typography.size)
              .map(([k, v]: [string, any]) => `<tr><td>size.${k}</td><td>${v.$value}px</td></tr>`)
              .join('')}
          </tbody>
        </table>

        <h3>Line height</h3>
        <table class="ds-table">
          <thead><tr><th>Token</th><th>Value</th></tr></thead>
          <tbody>
            ${Object.entries(typography['line-height'])
              .map(([k, v]: [string, any]) => `<tr><td>line-height.${k}</td><td>${v.$value}px</td></tr>`)
              .join('')}
          </tbody>
        </table>

        <h3>Letter spacing</h3>
        <table class="ds-table">
          <thead><tr><th>Token</th><th>Value</th></tr></thead>
          <tbody>
            ${Object.entries(typography['letter-spacing'])
              .map(([k, v]: [string, any]) => `<tr><td>letter-spacing.${k}</td><td>${v.$value}</td></tr>`)
              .join('')}
          </tbody>
        </table>
      </div>
      <div class="ds-col ds-grid-previews">
        <h3>Style previews</h3>

        ${[
          {
            name: 'Display Lg',
            token: 'family01-light-800-800-neg2',
            specsLeft: 'Aeonik<br/>Light',
            specsRight: 'Size: 80px - 5rem<br/>Line height: 80px - 5rem<br/>Letter spacing -1px',
            sample: 'This is a Display Lg text on two lines',
            style: "font-family:aeonik, Inter, 'Avenir Next', sans-serif; font-size:80px; line-height:80px; font-weight:250; letter-spacing:-1px;",
          },
          {
            name: 'Display Md',
            token: 'family01-light-700-700-neg2',
            specsLeft: 'Aeonik<br/>Light',
            specsRight: 'Size: 60px - 3.75rem<br/>Line height: 60px - 3.75rem<br/>Letter spacing -1px',
            sample: 'This is a Display Md text on two lines',
            style: "font-family:aeonik, Inter, 'Avenir Next', sans-serif; font-size:60px; line-height:60px; font-weight:250; letter-spacing:-1px;",
          },
          {
            name: 'Display Sm',
            token: 'family01-regular-600-600-none',
            specsLeft: 'Aeonik<br/>Regular',
            specsRight: 'Size: 40px - 2.5rem<br/>Line height: 44px - 2.75rem<br/>Letter spacing 0px',
            sample: 'This is a Display Sm text on two lines',
            style: "font-family:aeonik, Inter, 'Avenir Next', sans-serif; font-size:40px; line-height:44px; font-weight:400; letter-spacing:0px;",
          },
          {
            name: 'Headline Lg',
            token: 'family01-bold-500-500-none',
            specsLeft: 'Aeonik<br/>Bold',
            specsRight: 'Size: 32px - 2rem<br/>Line height: 38px - 2.375rem<br/>Letter spacing 0px',
            sample: 'This is a Headline Lg text on two lines',
            style: "font-family:aeonik, Inter, 'Avenir Next', sans-serif; font-size:32px; line-height:38px; font-weight:700; letter-spacing:0px;",
          },
          {
            name: 'Headline Md',
            token: 'family01-bold-400-400-none',
            specsLeft: 'Aeonik<br/>Bold',
            specsRight: 'Size: 28px - 1.75rem<br/>Line height: 28px - 1.75rem<br/>Letter spacing 0px',
            sample: 'This is a Headline Md text on two lines',
            style: "font-family:aeonik, Inter, 'Avenir Next', sans-serif; font-size:28px; line-height:28px; font-weight:700; letter-spacing:0px;",
          },
          {
            name: 'Title',
            token: 'family01-regular-300-300-none',
            specsLeft: 'Aeonik<br/>Regular',
            specsRight: 'Size: 24px - 1.5rem<br/>Line height: 24px - 1.5rem<br/>Letter spacing 0px',
            sample: 'This is a Title text on two lines. This is a Title text on two lines.',
            style: "font-family:aeonik, Inter, 'Avenir Next', sans-serif; font-size:24px; line-height:24px; font-weight:400; letter-spacing:0px;",
          },
          {
            name: 'Subtitle',
            token: 'family01-regular-200-200-none',
            specsLeft: 'Aeonik<br/>Regular',
            specsRight: 'Size: 20px - 1.25rem<br/>Line height: 22px - 1.375rem<br/>Letter spacing 0px',
            sample: 'This is a Subtitle text on two lines. This is a Subtitle text on two lines.',
            style: "font-family:aeonik, Inter, 'Avenir Next', sans-serif; font-size:20px; line-height:22px; font-weight:400; letter-spacing:0px;",
          },
          {
            name: 'Body Base',
            token: 'family01-regular-100-100-none',
            specsLeft: 'Aeonik<br/>Regular',
            specsRight: 'Size: 16px - 1rem<br/>Line height: 18px - 1.125rem<br/>Letter spacing 0px',
            sample: 'This is a Body Base text on two lines. This is a Body Base text on two lines.',
            style: "font-family:aeonik, Inter, 'Avenir Next', sans-serif; font-size:16px; line-height:18px; font-weight:400; letter-spacing:0px;",
          },
          {
            name: 'Body Bold',
            token: 'family01-bold-100-100-1',
            specsLeft: 'Aeonik<br/>Bold',
            specsRight: 'Size: 16px - 1rem<br/>Line height: 18px - 1.125rem<br/>Letter spacing 1px',
            sample: 'This is a Body Bold text on two lines. This is a Body Bold text on two lines.',
            style: "font-family:aeonik, Inter, 'Avenir Next', sans-serif; font-size:16px; line-height:18px; font-weight:700; letter-spacing:1px;",
          },
          {
            name: 'Body Code',
            token: 'family02-regular-75-75-none',
            specsLeft: 'Geist Mono<br/>Regular',
            specsRight: 'Size: 14px - 0.875rem<br/>Line height: 16px - 1rem<br/>Letter spacing 0px',
            sample: 'This is a Body Code text on two lines. This is a Body Code text on two lines.',
            style: "font-family:'geist mono', ui-monospace, SFMono-Regular, Menlo, monospace; font-size:14px; line-height:16px; font-weight:400; letter-spacing:0px;",
          },
          {
            name: 'Body Small',
            token: 'family01-regular-75-75-1',
            specsLeft: 'Aeonik<br/>Regular',
            specsRight: 'Size: 14px - 0.875rem<br/>Line height: 16px - 1rem<br/>Letter spacing 1px',
            sample: 'This is a Body Small text on two lines. This is a Body Small text on two lines.',
            style: "font-family:aeonik, Inter, 'Avenir Next', sans-serif; font-size:14px; line-height:16px; font-weight:400; letter-spacing:1px;",
          },
          {
            name: 'Caption',
            token: 'family01-regular-50-50-none',
            specsLeft: 'Aeonik<br/>Regular',
            specsRight: 'Size: 12px - 0.75rem<br/>Line height: 12px - 0.75rem<br/>Uppercase',
            sample: 'THIS IS A ONE-LINE CAPTION TEXT.',
            style: "font-family:aeonik, Inter, 'Avenir Next', sans-serif; font-size:12px; line-height:12px; font-weight:400; letter-spacing:0px; text-transform:uppercase;",
          },
        ]
          .map(
            (row) => `
          <div class="ds-typo-row">
            <div class="ds-typo-left">
              <h4>${row.name}</h4>
              <p class="ds-typo-token">${row.token}</p>
              ${
                row.specsLeft && row.specsRight
                  ? `<div class="ds-typo-spec-grid"><p class="ds-typo-spec">${row.specsLeft}</p><p class="ds-typo-spec">${row.specsRight}</p></div>`
                  : `<p class="ds-typo-spec">${row.specs}</p>`
              }
            </div>
            <div class="ds-typo-sample" style="${row.style}">${row.sample}</div>
          </div>
        `,
          )
          .join('')}
      </div>
    </section>
  `,
};

export const SpacingScale: Story = {
  render: () => `
    <section class="ds-panel">
      <h2>Spacing primitives</h2>
      <p class="ds-muted"><a class="ds-figma-link" href="${figmaLinks.spacing}" target="_blank" rel="noopener noreferrer">${externalOpenIcon} Go to Figma file</a></p>
      <div class="ds-col">
        <h3>Grid8</h3>
        <table class="ds-table">
          <thead><tr><th>Token</th><th>Px</th><th>Preview</th></tr></thead>
          <tbody>
            ${Object.entries(spacing.grid8)
              .map(
                ([k, v]: [string, any]) =>
                  `<tr><td>grid8.${k}</td><td>${v.$value}px</td><td><div style="height:10px;background:#ff1289;width:${Math.max(v.$value, 2)}px"></div></td></tr>`,
              )
              .join('')}
          </tbody>
        </table>
        <h3>Fibonacci</h3>
        <table class="ds-table">
          <thead><tr><th>Token</th><th>Px</th><th>Preview</th></tr></thead>
          <tbody>
            ${Object.entries(spacing.fibonacci)
              .map(
                ([k, v]: [string, any]) =>
                  `<tr><td>fibonacci.${k}</td><td>${v.$value}px</td><td><div style="height:10px;background:#00a6f4;width:${Math.max(v.$value, 2)}px"></div></td></tr>`,
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </section>
  `,
};

export const BorderRadii: Story = {
  render: () => `
    <section class="ds-panel">
      <h2>Border radii</h2>
      <p class="ds-muted"><a class="ds-figma-link" href="${figmaLinks.radii}" target="_blank" rel="noopener noreferrer">${externalOpenIcon} Go to Figma file</a></p>
      <div class="ds-row">
        ${Object.entries(radii)
          .map(([k, v]: [string, any]) => {
            const radius = `${v.$value}px`;
            return `<div class="ds-col"><span class="ds-badge">${k} = ${radius}</span><div style="width:120px;height:56px;border:2px solid #45556c;border-radius:${radius};background:#fff"></div></div>`;
          })
          .join('')}
      </div>
    </section>
  `,
};

export const GridAndBreakpoints: Story = {
  render: () => `
    <section class="ds-panel">
      <h2>Grid & breakpoints</h2>
      <p class="ds-muted"><a class="ds-figma-link" href="${figmaLinks.grid}" target="_blank" rel="noopener noreferrer">${externalOpenIcon} Go to Figma file</a></p>
      <table class="ds-table">
        <thead><tr><th>Viewport</th><th>Columns</th><th>Margin</th><th>Gutter</th></tr></thead>
        <tbody>
          <tr><td>Mobile 375</td><td>4</td><td>16px</td><td>12px</td></tr>
          <tr><td>Tablet 768</td><td>6</td><td>32px</td><td>20px</td></tr>
          <tr><td>Desktop 1440</td><td>12</td><td>60px</td><td>24px</td></tr>
        </tbody>
      </table>
      <div class="ds-col" style="margin-top:16px">
        <h3>Grid previews</h3>

        <div class="ds-grid-figma-row">
          <aside class="ds-grid-figma-info">
            <h4>Mobile</h4>
            <p>Standard: 375px<br/>320px - 599px</p>
          </aside>
          <div class="ds-grid-figma-preview-wrap">
            <p class="ds-grid-figma-meta">4 columns | Margin: 16px | Gutter: 12px</p>
            <div class="ds-grid-figma-preview ds-grid-figma-mobile">
              <span></span><span></span><span></span><span></span>
              <div class="ds-grid-chip ds-grid-chip-1">1 Column</div>
              <div class="ds-grid-mobile-twocols">
                <div class="ds-grid-chip ds-grid-chip-2">2 Columns</div>
                <div class="ds-grid-chip ds-grid-chip-2">2 Columns</div>
              </div>
            </div>
          </div>
        </div>

        <div class="ds-grid-figma-row" style="margin-top:56px">
          <aside class="ds-grid-figma-info">
            <h4>Tablet</h4>
            <p>Standard: 768px<br/>600px - 1135px</p>
          </aside>
          <div class="ds-grid-figma-preview-wrap">
            <p class="ds-grid-figma-meta">6 columns | Margin: 32px | Gutter: 20px</p>
            <div class="ds-grid-figma-preview ds-grid-figma-tablet">
              <span></span><span></span><span></span><span></span><span></span><span></span>
              <div class="ds-grid-chip ds-grid-chip-1">1 Column</div>
              <div class="ds-grid-tablet-twocols">
                <div class="ds-grid-chip ds-grid-chip-2">2 Columns</div>
                <div class="ds-grid-chip ds-grid-chip-2">2 Columns</div>
              </div>
              <div class="ds-grid-tablet-threecols">
                <div class="ds-grid-chip ds-grid-chip-2">3 Columns</div>
                <div class="ds-grid-chip ds-grid-chip-2">3 Columns</div>
                <div class="ds-grid-chip ds-grid-chip-2">3 Columns</div>
              </div>
            </div>
          </div>
        </div>

        <div class="ds-grid-figma-row" style="margin-top:56px">
          <aside class="ds-grid-figma-info">
            <h4>Desktop</h4>
            <p>Standard: 1440px<br/>1136px - Larger</p>
          </aside>
          <div class="ds-grid-figma-preview-wrap">
            <p class="ds-grid-figma-meta">12 columns | Margin: 60px | Gutter: 24px</p>
            <div class="ds-grid-figma-preview ds-grid-figma-desktop">
              <span></span><span></span><span></span><span></span><span></span><span></span>
              <span></span><span></span><span></span><span></span><span></span><span></span>
              <div class="ds-grid-chip ds-grid-chip-1">1 Column</div>
              <div class="ds-grid-desktop-twocols">
                <div class="ds-grid-chip ds-grid-chip-2">2 Columns</div>
                <div class="ds-grid-chip ds-grid-chip-2">2 Columns</div>
              </div>
              <div class="ds-grid-desktop-threecols">
                <div class="ds-grid-chip ds-grid-chip-3">3 Columns</div>
                <div class="ds-grid-chip ds-grid-chip-3">3 Columns</div>
                <div class="ds-grid-chip ds-grid-chip-3">3 Columns</div>
              </div>
              <div class="ds-grid-desktop-fourcols">
                <div class="ds-grid-chip ds-grid-chip-4">4 Columns</div>
                <div class="ds-grid-chip ds-grid-chip-4">4 Columns</div>
                <div class="ds-grid-chip ds-grid-chip-4">4 Columns</div>
                <div class="ds-grid-chip ds-grid-chip-4">4 Columns</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
};

export const AspectRatios: Story = {
  render: () => {
    const aspectItems = [
      { label: '16:9', ratio: '16 / 9' },
      { label: '5:4', ratio: '5 / 4' },
      { label: '1:1', ratio: '1 / 1' },
      { label: '4:5', ratio: '4 / 5' },
      { label: '1:2', ratio: '1 / 2' },
    ];

    return `
    <section class="ds-panel">
      <h2>Aspect ratios</h2>
      <p class="ds-muted"><a class="ds-figma-link" href="${figmaLinks.aspect}" target="_blank" rel="noopener noreferrer">${externalOpenIcon} Go to Figma file</a></p>
      <div class="ds-aspect-grid">
        ${aspectItems
          .map(
            (item) => `
              <article class="ds-aspect-card">
                <div class="ds-aspect-preview" style="aspect-ratio: ${item.ratio};">
                  <img
                    class="ds-aspect-image"
                    src="https://picsum.photos/800/500"
                    alt="Reference preview"
                    loading="lazy"
                  />
                  <span class="ds-aspect-overlay">${item.label}</span>
                </div>
                <div class="ds-aspect-meta">
                  <span class="ds-badge">${item.label}</span>
                  <span class="ds-aspect-code">aspect-ratio: ${item.ratio};</span>
                </div>
              </article>
            `,
          )
          .join('')}
      </div>
    </section>
  `;
  },
};

export const FocusRing: Story = {
  render: () => `
    <section class="ds-panel">
      <h2>Focus ring</h2>
      <p class="ds-muted"><a class="ds-figma-link" href="${figmaLinks.focus}" target="_blank" rel="noopener noreferrer">${externalOpenIcon} Go to Figma file</a></p>
      <div class="ds-row">
        <div style="width:205px;height:82px;border:2px solid #0059f3"></div>
        <div style="width:205px;height:82px;border:2px dashed #0059f3;border-radius:8px"></div>
        <div style="width:205px;height:82px;border:2px solid #0059f3;border-radius:999px"></div>
        <div style="width:205px;height:82px;border:2px dashed #0059f3;border-radius:999px"></div>
      </div>
    </section>
  `,
};
