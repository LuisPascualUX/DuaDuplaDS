import type { Meta, StoryObj } from '@storybook/html';
import { renderIconButton, wrapPlayground } from '../components/buttons';

const PLAYGROUND_ICON = '/iconography/circle-plus.svg';

const iconByStatus: Record<'Default' | 'Hover' | 'Pressed' | 'Disabled' | 'Focus', string> = {
  Default: PLAYGROUND_ICON,
  Hover: PLAYGROUND_ICON,
  Pressed: PLAYGROUND_ICON,
  Disabled: PLAYGROUND_ICON,
  Focus: PLAYGROUND_ICON,
};

const figmaIconButtonPrimaryUrl =
  'https://www.figma.com/design/SCpHExkj2GDv5v07Rx9G77/Components?node-id=81-23133&t=oyhem46qxpUxRxBT-4';
const figmaIconButtonPrimaryEmbedUrl = `https://www.figma.com/embed?embed_host=storybook&url=${encodeURIComponent(figmaIconButtonPrimaryUrl)}`;

type IconButtonPrimaryArgs = {
  size: 'sm' | 'md';
  status: 'Default' | 'Hover' | 'Pressed' | 'Disabled' | 'Focus';
};

const meta: Meta<IconButtonPrimaryArgs> = {
  title: 'Components/Icon Button Primary',
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    status: { control: 'inline-radio', options: ['Default', 'Hover', 'Pressed', 'Disabled', 'Focus'] },
  },
  args: {
    size: 'md',
    status: 'Default',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Icon Button Primary alineado al nodo Figma `81:23133` y specs ANOVA (source `74:11934`) con estados y tamaños reales.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<IconButtonPrimaryArgs>;

const statusToClass = (status: IconButtonPrimaryArgs['status']) => {
  switch (status) {
    case 'Hover':
      return 'ds-btn-icon-primary-hover';
    case 'Pressed':
      return 'ds-btn-icon-primary-pressed';
    case 'Disabled':
      return 'ds-btn-icon-primary-disabled';
    case 'Focus':
      return 'ds-btn-icon-primary-focus';
    default:
      return 'ds-btn-icon-primary-default';
  }
};

export const Playground: Story = {
  render: ({ size, status }) => {
    const statusClass = statusToClass(status);
    const disabled = status === 'Disabled';
    const icon = iconByStatus[status];
    const iconSize = size === 'sm' ? 16 : 24;
    return wrapPlayground(
      renderIconButton({
        baseClass: 'ds-btn ds-btn-icon-primary',
        size,
        statusClass,
        iconSrc: icon,
        iconSize,
        ariaLabel: 'Icon Button Primary',
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
        story: 'Guia de uso que combina estados y anatomia del Icon Button Primary.',
      },
    },
  },
  render: () => `
    <section class="ds-panel">
      <header class="ds-detail-header">
        <p class="ds-detail-kicker">Component detail</p>
        <h2 class="ds-detail-title">Icon Button Primary</h2>
        <p class="ds-detail-subtitle">Boton solo-icono para acciones primarias en barras y toolbars. Esta vista de usage combina estados visuales y anatomia tecnica en una sola pagina.</p>
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
            <button class="ds-btn ds-btn-icon-primary ds-btn-icon-sm ds-btn-icon-primary-default" aria-label="Icon Button Primary Sm"><span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span></button>
            <button class="ds-btn ds-btn-icon-primary ds-btn-icon-md ds-btn-icon-primary-default" aria-label="Icon Button Primary Md"><span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="24" height="24" /></span></button>
          </div>
          <aside class="ds-state-content">
            <h3>Default</h3>
            <p>Sizes: Sm, Md</p>
            <p>Background color: #FF1289 <span class="ds-token-inline">bg-interactive-default</span></p>
            <p>Icon size: 16/24 <span class="ds-token-inline">icon-slot-size-sm-md</span></p>
          </aside>
        </div>

        <div class="ds-state-exhibit">
          <div class="ds-state-artwork">
            <button class="ds-btn ds-btn-icon-primary ds-btn-icon-sm ds-btn-icon-primary-hover" aria-label="Icon Button Primary Sm"><span class="ds-btn-icon"><img src="${iconByStatus.Hover}" alt="" width="16" height="16" /></span></button>
            <button class="ds-btn ds-btn-icon-primary ds-btn-icon-md ds-btn-icon-primary-hover" aria-label="Icon Button Primary Md"><span class="ds-btn-icon"><img src="${iconByStatus.Hover}" alt="" width="24" height="24" /></span></button>
          </div>
          <aside class="ds-state-content">
            <h3>Hover</h3>
            <p>Sizes: Sm, Md</p>
            <p>Background color: #FF5BA8 <span class="ds-token-inline">bg-interactive-hover</span></p>
          </aside>
        </div>

        <div class="ds-state-exhibit">
          <div class="ds-state-artwork">
            <button class="ds-btn ds-btn-icon-primary ds-btn-icon-sm ds-btn-icon-primary-pressed" aria-label="Icon Button Primary Sm"><span class="ds-btn-icon"><img src="${iconByStatus.Pressed}" alt="" width="16" height="16" /></span></button>
            <button class="ds-btn ds-btn-icon-primary ds-btn-icon-md ds-btn-icon-primary-pressed" aria-label="Icon Button Primary Md"><span class="ds-btn-icon"><img src="${iconByStatus.Pressed}" alt="" width="24" height="24" /></span></button>
          </div>
          <aside class="ds-state-content">
            <h3>Pressed</h3>
            <p>Sizes: Sm, Md</p>
            <p>Background color: #EF0066 <span class="ds-token-inline">bg-interactive-pressed</span></p>
          </aside>
        </div>

        <div class="ds-state-exhibit">
          <div class="ds-state-artwork">
            <button class="ds-btn ds-btn-icon-primary ds-btn-icon-sm ds-btn-icon-primary-disabled" aria-label="Icon Button Primary Sm" disabled><span class="ds-btn-icon"><img src="${iconByStatus.Disabled}" alt="" width="16" height="16" /></span></button>
            <button class="ds-btn ds-btn-icon-primary ds-btn-icon-md ds-btn-icon-primary-disabled" aria-label="Icon Button Primary Md" disabled><span class="ds-btn-icon"><img src="${iconByStatus.Disabled}" alt="" width="24" height="24" /></span></button>
          </div>
          <aside class="ds-state-content">
            <h3>Disabled</h3>
            <p>Sizes: Sm, Md</p>
            <p>Background color: #CAD5E2 <span class="ds-token-inline">bg-interactive-disabled1</span></p>
          </aside>
        </div>

        <div class="ds-state-exhibit">
          <div class="ds-state-artwork">
            <button class="ds-btn ds-btn-icon-primary ds-btn-icon-sm ds-btn-icon-primary-focus" aria-label="Icon Button Primary Sm"><span class="ds-btn-icon"><img src="${iconByStatus.Focus}" alt="" width="16" height="16" /></span></button>
            <button class="ds-btn ds-btn-icon-primary ds-btn-icon-md ds-btn-icon-primary-focus" aria-label="Icon Button Primary Md"><span class="ds-btn-icon"><img src="${iconByStatus.Focus}" alt="" width="24" height="24" /></span></button>
          </div>
          <aside class="ds-state-content">
            <h3>Focus</h3>
            <p>Sizes: Sm, Md</p>
            <p>Focus ring: 2px dashed #0059F3 <span class="ds-token-inline">border-interactive-focus</span></p>
            <p>Focus ring height: Sm 38px · Md 46px</p>
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
          <a class="ds-figma-link" href="${figmaIconButtonPrimaryUrl}" target="_blank" rel="noopener noreferrer">Open in Figma</a>
        </p>
        <iframe class="ds-figma-embed" src="${figmaIconButtonPrimaryEmbedUrl}" allowfullscreen></iframe>
      </div>

      <div class="ds-col">
        <h3>Visual reference</h3>
        <div class="ds-row">
          <button class="ds-btn ds-btn-icon-primary ds-btn-icon-sm ds-btn-icon-primary-default" aria-label="Icon Button Primary Sm">
            <span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span>
          </button>
          <button class="ds-btn ds-btn-icon-primary ds-btn-icon-md ds-btn-icon-primary-default" aria-label="Icon Button Primary Md">
            <span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="24" height="24" /></span>
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
            <tr><td>Border radius</td><td>999px (pill) <span class="ds-token-inline">radius-full</span></td><td>999px (pill) <span class="ds-token-inline">radius-full</span></td></tr>
            <tr><td>Focus ring height</td><td>38px</td><td>46px</td></tr>
          </tbody>
        </table>
      </div>

      <div class="ds-col">
        <h3>Blueprint</h3>
        <div class="ds-anatomy-figma">
          <div class="ds-anatomy-canvas">
            <div class="ds-anatomy-btn-wrap">
              <button class="ds-btn ds-btn-icon-primary ds-btn-icon-md ds-btn-icon-primary-default ds-anatomy-btn" aria-label="Icon Button Primary">
                <span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="24" height="24" /></span>
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
            <h4>Icon Button Primary</h4>
            <ul>
              <li>Direction: Horizontal</li>
              <li>Alignment: Middle center</li>
              <li>Vertical resizing: Hug</li>
              <li>Horizontal sizing: Fixed width (40/32)</li>
              <li>Padding: 8 (Md) / 8x12 (Sm)</li>
              <li>Focus ring offset: 2px</li>
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
            <p>El estado <span class="ds-token-inline">Focus</span> requiere anillo visible y navegacion por tab sin perdida de contraste.</p>
          </article>
        </div>
      </div>
    </section>
  `,
};
