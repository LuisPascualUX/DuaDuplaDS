import type { Meta, StoryObj } from '@storybook/html';
import { renderIconButton, wrapPlayground } from '../components/buttons';

const PLAYGROUND_ICON = '/iconography/circle-plus.svg';

const iconByStatusSize: Record<'Default' | 'Hover' | 'Pressed' | 'Disabled' | 'Focused', Record<'sm' | 'md', string>> = {
  Default: { sm: PLAYGROUND_ICON, md: PLAYGROUND_ICON },
  Hover: { sm: PLAYGROUND_ICON, md: PLAYGROUND_ICON },
  Pressed: { sm: PLAYGROUND_ICON, md: PLAYGROUND_ICON },
  Disabled: { sm: PLAYGROUND_ICON, md: PLAYGROUND_ICON },
  Focused: { sm: PLAYGROUND_ICON, md: PLAYGROUND_ICON },
};

const figmaIconButtonTertiaryUrl =
  'https://www.figma.com/design/SCpHExkj2GDv5v07Rx9G77/Components?node-id=75-12348&t=oyhem46qxpUxRxBT-4';
const figmaIconButtonTertiaryEmbedUrl = `https://www.figma.com/embed?embed_host=storybook&url=${encodeURIComponent(figmaIconButtonTertiaryUrl)}`;

type IconButtonTertiaryArgs = {
  size: 'sm' | 'md';
  status: 'Default' | 'Hover' | 'Pressed' | 'Disabled' | 'Focused';
};

const meta: Meta<IconButtonTertiaryArgs> = {
  title: 'Components/Icon Button Tertiary',
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    status: { control: 'inline-radio', options: ['Default', 'Hover', 'Pressed', 'Disabled', 'Focused'] },
  },
  args: {
    size: 'md',
    status: 'Default',
  },
  parameters: {
    docs: {
      description: {
        component: 'Icon Button Tertiary alineado al nodo Figma `75:12348` con tamaños y estados exactos.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<IconButtonTertiaryArgs>;

const statusToClass = (status: IconButtonTertiaryArgs['status']) => {
  switch (status) {
    case 'Hover':
      return 'ds-btn-icon-tertiary-hover';
    case 'Pressed':
      return 'ds-btn-icon-tertiary-pressed';
    case 'Disabled':
      return 'ds-btn-icon-tertiary-disabled';
    case 'Focused':
      return 'ds-btn-icon-tertiary-focused';
    default:
      return 'ds-btn-icon-tertiary-default';
  }
};

export const Playground: Story = {
  render: ({ size, status }) => {
    const statusClass = statusToClass(status);
    const disabled = status === 'Disabled';
    const icon = iconByStatusSize[status][size];
    const iconSize = size === 'sm' ? 16 : 24;
    return wrapPlayground(
      renderIconButton({
        baseClass: 'ds-btn ds-btn-icon-tertiary',
        size,
        statusClass,
        iconSrc: icon,
        iconSize,
        ariaLabel: 'Icon Button Tertiary',
        disabled,
      }),
    );
  },
};

export const Usage: Story = {
  parameters: {
    controls: { disable: true },
    options: {
      showToolbar: false,
    },
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: 'docs',
    docs: {
      canvas: {
        withToolbar: false,
      },
      description: {
        story: 'Guia de uso que combina estados y anatomia del Icon Button Tertiary.',
      },
    },
  },
  render: () => `
    <section class="ds-panel">
      <header class="ds-detail-header">
        <p class="ds-detail-kicker">Component detail</p>
        <h2 class="ds-detail-title">Icon Button Tertiary</h2>
        <p class="ds-detail-subtitle">Boton solo-icono sin contenedor (ghost) para acciones discretas en barras y toolbars. Esta vista de usage combina estados visuales y anatomia tecnica en una sola pagina.</p>
        <div class="ds-detail-meta">
          <span class="ds-badge">Type: Icon-only action</span>
          <span class="ds-badge">Sizes: Sm, Md</span>
          <span class="ds-badge">States: 5</span>
        </div>
      </header>
      <div class="ds-detail-section">
        <h3>States</h3>
        <p class="ds-muted">Vista alineada al formato de Figma: artwork a la izquierda y especificaciones de estado/tamano a la derecha.</p>
      </div>
      <div class="ds-col ds-state-list">
        <div class="ds-state-exhibit">
          <div class="ds-state-artwork">
            <button class="ds-btn ds-btn-icon-tertiary ds-btn-icon-sm ds-btn-icon-tertiary-default" aria-label="Icon Button Tertiary Sm"><span class="ds-btn-icon"><img src="${iconByStatusSize.Default.sm}" alt="" width="16" height="16" /></span></button>
            <button class="ds-btn ds-btn-icon-tertiary ds-btn-icon-md ds-btn-icon-tertiary-default" aria-label="Icon Button Tertiary Md"><span class="ds-btn-icon"><img src="${iconByStatusSize.Default.md}" alt="" width="24" height="24" /></span></button>
          </div>
          <aside class="ds-state-content">
            <h3>Default</h3>
            <p>Sizes: Sm, Md</p>
            <p>Icon color: #FF1289 <span class="ds-token-inline">fg-interactivetertiary-default</span></p>
            <p>Icon size: 16/24 <span class="ds-token-inline">icon-slot-size-sm-md</span></p>
          </aside>
        </div>

        <div class="ds-state-exhibit">
          <div class="ds-state-artwork">
            <button class="ds-btn ds-btn-icon-tertiary ds-btn-icon-sm ds-btn-icon-tertiary-hover" aria-label="Icon Button Tertiary Sm"><span class="ds-btn-icon"><img src="${iconByStatusSize.Hover.sm}" alt="" width="16" height="16" /></span></button>
            <button class="ds-btn ds-btn-icon-tertiary ds-btn-icon-md ds-btn-icon-tertiary-hover" aria-label="Icon Button Tertiary Md"><span class="ds-btn-icon"><img src="${iconByStatusSize.Hover.md}" alt="" width="24" height="24" /></span></button>
          </div>
          <aside class="ds-state-content">
            <h3>Hover</h3>
            <p>Sizes: Sm, Md</p>
            <p>Background color: #FEE6EF <span class="ds-token-inline">bg-interactive-hoversecondary</span></p>
            <p>Icon color: #FF5BA8 <span class="ds-token-inline">fg-interactive-hover</span></p>
          </aside>
        </div>

        <div class="ds-state-exhibit">
          <div class="ds-state-artwork">
            <button class="ds-btn ds-btn-icon-tertiary ds-btn-icon-sm ds-btn-icon-tertiary-pressed" aria-label="Icon Button Tertiary Sm"><span class="ds-btn-icon"><img src="${iconByStatusSize.Pressed.sm}" alt="" width="16" height="16" /></span></button>
            <button class="ds-btn ds-btn-icon-tertiary ds-btn-icon-md ds-btn-icon-tertiary-pressed" aria-label="Icon Button Tertiary Md"><span class="ds-btn-icon"><img src="${iconByStatusSize.Pressed.md}" alt="" width="24" height="24" /></span></button>
          </div>
          <aside class="ds-state-content">
            <h3>Pressed</h3>
            <p>Sizes: Sm, Md</p>
            <p>Background color: #FFCCE3 <span class="ds-token-inline">bg-interactive-pressedsecondary</span></p>
            <p>Icon color: #EF0066 <span class="ds-token-inline">fg-interactive-pressed</span></p>
          </aside>
        </div>

        <div class="ds-state-exhibit">
          <div class="ds-state-artwork">
            <button class="ds-btn ds-btn-icon-tertiary ds-btn-icon-sm ds-btn-icon-tertiary-disabled" aria-label="Icon Button Tertiary Sm" disabled><span class="ds-btn-icon"><img src="${iconByStatusSize.Disabled.sm}" alt="" width="16" height="16" /></span></button>
            <button class="ds-btn ds-btn-icon-tertiary ds-btn-icon-md ds-btn-icon-tertiary-disabled" aria-label="Icon Button Tertiary Md" disabled><span class="ds-btn-icon"><img src="${iconByStatusSize.Disabled.md}" alt="" width="24" height="24" /></span></button>
          </div>
          <aside class="ds-state-content">
            <h3>Disabled</h3>
            <p>Sizes: Sm, Md</p>
            <p>Background color: #CAD5E2 <span class="ds-token-inline">bg-interactive-disabled1</span></p>
            <p>Icon color: #90A1B9 <span class="ds-token-inline">fg-interactive-disabled</span></p>
          </aside>
        </div>

        <div class="ds-state-exhibit">
          <div class="ds-state-artwork">
            <button class="ds-btn ds-btn-icon-tertiary ds-btn-icon-sm ds-btn-icon-tertiary-focused" aria-label="Icon Button Tertiary Sm"><span class="ds-btn-icon"><img src="${iconByStatusSize.Focused.sm}" alt="" width="16" height="16" /></span></button>
            <button class="ds-btn ds-btn-icon-tertiary ds-btn-icon-md ds-btn-icon-tertiary-focused" aria-label="Icon Button Tertiary Md"><span class="ds-btn-icon"><img src="${iconByStatusSize.Focused.md}" alt="" width="24" height="24" /></span></button>
          </div>
          <aside class="ds-state-content">
            <h3>Focused</h3>
            <p>Sizes: Sm, Md</p>
            <p>Focus ring: 2px dashed #0059F3 <span class="ds-token-inline">border-interactive-focus</span></p>
            <p>Icon color: #FF1289 <span class="ds-token-inline">fg-interactivetertiary-default</span></p>
          </aside>
        </div>
      </div>

      <div class="ds-col ds-detail-section">
        <h3>Anatomy</h3>
        <p class="ds-muted">Medidas de referencia para implementar y revisar consistencia visual con trazabilidad directa a Figma.</p>
      </div>

      <div class="ds-col">
        <h3>Figma live reference</h3>
        <p class="ds-muted">
          <a class="ds-figma-link" href="${figmaIconButtonTertiaryUrl}" target="_blank" rel="noopener noreferrer">Open in Figma</a>
        </p>
        <iframe class="ds-figma-embed" src="${figmaIconButtonTertiaryEmbedUrl}" allowfullscreen></iframe>
      </div>

      <div class="ds-col">
        <h3>Visual reference</h3>
        <div class="ds-row">
          <button class="ds-btn ds-btn-icon-tertiary ds-btn-icon-sm ds-btn-icon-tertiary-default" aria-label="Icon Button Tertiary Sm">
            <span class="ds-btn-icon"><img src="${iconByStatusSize.Default.sm}" alt="" width="16" height="16" /></span>
          </button>
          <button class="ds-btn ds-btn-icon-tertiary ds-btn-icon-md ds-btn-icon-tertiary-default" aria-label="Icon Button Tertiary Md">
            <span class="ds-btn-icon"><img src="${iconByStatusSize.Default.md}" alt="" width="24" height="24" /></span>
          </button>
        </div>
      </div>

      <div class="ds-col">
        <h3>Measurements</h3>
        <table class="ds-table">
          <thead><tr><th>Property</th><th>Sm</th><th>Md</th></tr></thead>
          <tbody>
            <tr><td>Button width</td><td>32px <span class="ds-token-inline">icon-button-width-sm</span></td><td>40px <span class="ds-token-inline">icon-button-width-md</span></td></tr>
            <tr><td>Padding</td><td>8px 12px <span class="ds-token-inline">grid8-8</span> <span class="ds-token-inline">grid8-12</span></td><td>8px <span class="ds-token-inline">grid8-8</span></td></tr>
            <tr><td>Icon size</td><td>16px <span class="ds-token-inline">icon-slot-size-sm</span></td><td>24px <span class="ds-token-inline">icon-slot-size-md</span></td></tr>
            <tr><td>Border</td><td>none</td><td>none</td></tr>
            <tr><td>Border radius</td><td>999px (pill) <span class="ds-token-inline">radius-full</span></td><td>999px (pill) <span class="ds-token-inline">radius-full</span></td></tr>
          </tbody>
        </table>
      </div>

      <div class="ds-col">
        <h3>Blueprint</h3>
        <div class="ds-anatomy-figma">
          <div class="ds-anatomy-canvas">
            <div class="ds-anatomy-btn-wrap">
              <button class="ds-btn ds-btn-icon-tertiary ds-btn-icon-md ds-btn-icon-tertiary-default ds-anatomy-btn" aria-label="Icon Button Tertiary">
                <span class="ds-btn-icon"><img src="${iconByStatusSize.Default.md}" alt="" width="24" height="24" /></span>
              </button>
              <span class="ds-tag ds-tag-gap">0</span>
              <span class="ds-tag ds-tag-top">8</span>
              <span class="ds-tag ds-tag-left">8</span>
              <span class="ds-tag ds-tag-right">8</span>
              <span class="ds-tag ds-tag-bottom">8</span>
              <span class="ds-anatomy-line ds-anatomy-line-h"></span>
              <span class="ds-anatomy-line ds-anatomy-line-v"></span>
            </div>
          </div>
          <aside class="ds-anatomy-specs">
            <h4>Icon Button Tertiary</h4>
            <ul>
              <li>Direction: Horizontal</li>
              <li>Alignment: Middle center</li>
              <li>Vertical resizing: Hug</li>
              <li>Horizontal sizing: Fixed width (40/32)</li>
              <li>Padding: 8 (Md) / 8x12 (Sm)</li>
              <li>Stroke: none</li>
              <li>Focus ring: dashed</li>
            </ul>
          </aside>
        </div>
      </div>

      <div class="ds-col ds-detail-section">
        <h3>Accessibility notes</h3>
        <div class="ds-detail-a11y">
          <article>
            <h4>aria-label requerido</h4>
            <p>Al no haber texto visible, el boton debe declarar siempre <span class="ds-token-inline">aria-label</span> con el proposito de la accion.</p>
          </article>
          <article>
            <h4>Keyboard</h4>
            <p>El estado <span class="ds-token-inline">Focused</span> requiere anillo visible y suficiente contraste sobre el fondo aun sin contenedor visible.</p>
          </article>
        </div>
      </div>
    </section>
  `,
};
