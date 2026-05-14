import type { Meta, StoryObj } from '@storybook/html';
import { FIGMA_ICONS_GRID_URL, FIGMA_ICONS_LIBRARY_URL, ICON_REGISTRY } from '../iconography/registry';
import {
  attachGalleryHandlers,
  renderGalleryGrid,
  sanitizeColorForPreview,
} from '../iconography/gallery-render';

type GalleryArgs = {
  size: number;
  strokeWidth: number;
  color: string;
};

const meta: Meta<GalleryArgs> = {
  title: 'Icons/Icon Gallery',
  argTypes: {
    size: {
      control: { type: 'number', min: 12, max: 48, step: 2 },
      description: 'Tamaño del icono en la rejilla (Playground).',
    },
    strokeWidth: {
      control: { type: 'number', min: 0.5, max: 3, step: 0.25 },
      description: 'Grosor de trazo en el elemento raíz SVG (útil para iconos stroke; en fill casi no afecta).',
    },
    color: {
      control: 'color',
      description: 'Color vía `currentColor` en SVGs que lo soporten.',
    },
  },
  args: {
    size: 24,
    strokeWidth: 2,
    color: '#111827',
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Galería de iconos del DS. Los SVG viven en \`apps/docs/public/iconography/\` y el listado generado en [\`registry.ts\`](../iconography/registry.ts). Rejilla en Figma: [28:1218](${FIGMA_ICONS_GRID_URL}). Biblioteca: [Icons](${FIGMA_ICONS_LIBRARY_URL}). Sincronizar: \`npm run sync-icons\` en \`apps/docs\`. Al copiar SVG: lienzo **24×24**, transform en el **path** (sin grupo intermedio) y \`<title>\` + \`id\` en el raíz para acercar la jerarquía al pegar en Figma (frame + vector).`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<GalleryArgs>;

const mountAsyncHtml = (loader: () => Promise<string>) => {
  const root = document.createElement('div');
  root.className = 'ds-icon-gallery-loading';
  root.setAttribute('role', 'status');
  root.textContent = 'Cargando iconos…';
  loader()
    .then((html) => {
      root.className = '';
      root.removeAttribute('role');
      root.innerHTML = html;
      attachGalleryHandlers(root);
    })
    .catch((e) => {
      const msg = e instanceof Error ? e.message : String(e);
      root.className = 'ds-icon-gallery-error';
      root.setAttribute('role', 'alert');
      root.textContent = msg;
    });
  return root;
};

export const Playground: Story = {
  render: ({ size, strokeWidth, color }) =>
    mountAsyncHtml(() => {
      return renderGalleryGrid(ICON_REGISTRY, {
        size,
        strokeWidth,
        color: sanitizeColorForPreview(color),
      });
    }),
};
