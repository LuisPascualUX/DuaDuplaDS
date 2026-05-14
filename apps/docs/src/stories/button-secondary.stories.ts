import type { Meta, StoryObj } from '@storybook/html';
import { renderTextButton, wrapPlayground } from '../components/buttons';

const PLAYGROUND_ICON = '/iconography/circle-plus.svg';

const iconByStatus: Record<'Default' | 'Hover' | 'Pressed' | 'Disabled' | 'Focused', string> = {
  Default: PLAYGROUND_ICON,
  Hover: PLAYGROUND_ICON,
  Pressed: PLAYGROUND_ICON,
  Disabled: PLAYGROUND_ICON,
  Focused: PLAYGROUND_ICON,
};

const figmaButtonSecondaryUrl =
  'https://www.figma.com/design/SCpHExkj2GDv5v07Rx9G77/Components?node-id=67-4587&t=oyhem46qxpUxRxBT-4';
const figmaButtonSecondaryEmbedUrl = `https://www.figma.com/embed?embed_host=storybook&url=${encodeURIComponent(figmaButtonSecondaryUrl)}`;

type ButtonSecondaryArgs = {
  label: string;
  size: 'sm' | 'md';
  status: 'Default' | 'Hover' | 'Pressed' | 'Disabled' | 'Focused';
  iconLeft: boolean;
  iconRight: boolean;
};

const meta: Meta<ButtonSecondaryArgs> = {
  title: 'Components/Button Secondary',
  argTypes: {
    label: { control: 'text' },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    status: { control: 'inline-radio', options: ['Default', 'Hover', 'Pressed', 'Disabled', 'Focused'] },
    iconLeft: { control: 'boolean' },
    iconRight: { control: 'boolean' },
  },
  args: {
    label: 'Button Secondary',
    size: 'md',
    status: 'Default',
    iconLeft: true,
    iconRight: true,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Button Secondary alineado al nodo Figma `67:4587` con estados y tamaños reales. Fuente: https://www.figma.com/design/SCpHExkj2GDv5v07Rx9G77/Components?node-id=67-4587',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonSecondaryArgs>;

const statusToClass = (status: ButtonSecondaryArgs['status']) => {
  switch (status) {
    case 'Hover':
      return 'ds-btn-secondary-hover';
    case 'Pressed':
      return 'ds-btn-secondary-pressed';
    case 'Disabled':
      return 'ds-btn-secondary-disabled';
    case 'Focused':
      return 'ds-btn-secondary-focus';
    default:
      return 'ds-btn-secondary-default';
  }
};

export const Playground: Story = {
  render: ({ label, size, status, iconLeft, iconRight }) => {
    const statusClass = statusToClass(status);
    const disabled = status === 'Disabled';
    const icon = iconByStatus[status];
    return wrapPlayground(
      renderTextButton({
        baseClass: 'ds-btn ds-btn-secondary',
        size,
        statusClass,
        label,
        iconLeft,
        iconRight,
        iconSrc: icon,
        iconSize: 16,
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
        story: 'Guia de uso que combina estados y anatomia del Button Secondary.',
      },
    },
  },
  render: () => `
    <section class="ds-panel">
      <header class="ds-detail-header">
        <p class="ds-detail-kicker">Component detail</p>
        <h2 class="ds-detail-title">Button Secondary</h2>
        <p class="ds-detail-subtitle">Boton secundario (outlined) para acciones de jerarquia media. Esta vista de usage combina estados visuales y anatomia tecnica en una sola pagina.</p>
        <div class="ds-detail-meta">
          <span class="ds-badge">Type: Action button</span>
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
            <button class="ds-btn ds-btn-secondary ds-btn-sm ds-btn-secondary-default"><span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span><span>Button Secondary</span><span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span></button>
            <button class="ds-btn ds-btn-secondary ds-btn-md ds-btn-secondary-default"><span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span><span>Button Secondary</span><span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span></button>
          </div>
          <aside class="ds-state-content">
            <h3>Default</h3>
            <p>Sizes: Sm, Md</p>
            <p>Border color: #FF1289 <span class="ds-token-inline">border-interactive-default</span></p>
            <p>Text color: #FF1289 <span class="ds-token-inline">fg-interactivesecondary-default</span></p>
          </aside>
        </div>

        <div class="ds-state-exhibit">
          <div class="ds-state-artwork">
            <button class="ds-btn ds-btn-secondary ds-btn-sm ds-btn-secondary-hover"><span class="ds-btn-icon"><img src="${iconByStatus.Hover}" alt="" width="16" height="16" /></span><span>Button Secondary</span><span class="ds-btn-icon"><img src="${iconByStatus.Hover}" alt="" width="16" height="16" /></span></button>
            <button class="ds-btn ds-btn-secondary ds-btn-md ds-btn-secondary-hover"><span class="ds-btn-icon"><img src="${iconByStatus.Hover}" alt="" width="16" height="16" /></span><span>Button Secondary</span><span class="ds-btn-icon"><img src="${iconByStatus.Hover}" alt="" width="16" height="16" /></span></button>
          </div>
          <aside class="ds-state-content">
            <h3>Hover</h3>
            <p>Sizes: Sm, Md</p>
            <p>Background color: #FEE6EF <span class="ds-token-inline">bg-interactive-hoversecondary</span></p>
            <p>Border/text color: #FF5BA8 <span class="ds-token-inline">border/fg-interactive-hover</span></p>
          </aside>
        </div>

        <div class="ds-state-exhibit">
          <div class="ds-state-artwork">
            <button class="ds-btn ds-btn-secondary ds-btn-sm ds-btn-secondary-pressed"><span class="ds-btn-icon"><img src="${iconByStatus.Pressed}" alt="" width="16" height="16" /></span><span>Button Secondary</span><span class="ds-btn-icon"><img src="${iconByStatus.Pressed}" alt="" width="16" height="16" /></span></button>
            <button class="ds-btn ds-btn-secondary ds-btn-md ds-btn-secondary-pressed"><span class="ds-btn-icon"><img src="${iconByStatus.Pressed}" alt="" width="16" height="16" /></span><span>Button Secondary</span><span class="ds-btn-icon"><img src="${iconByStatus.Pressed}" alt="" width="16" height="16" /></span></button>
          </div>
          <aside class="ds-state-content">
            <h3>Pressed</h3>
            <p>Sizes: Sm, Md</p>
            <p>Background color: #FFCCE3 <span class="ds-token-inline">bg-interactive-pressedsecondary</span></p>
            <p>Border/text color: #EF0066 <span class="ds-token-inline">border/fg-interactive-pressed</span></p>
          </aside>
        </div>

        <div class="ds-state-exhibit">
          <div class="ds-state-artwork">
            <button class="ds-btn ds-btn-secondary ds-btn-sm ds-btn-secondary-disabled" disabled><span class="ds-btn-icon"><img src="${iconByStatus.Disabled}" alt="" width="16" height="16" /></span><span>Button Secondary</span><span class="ds-btn-icon"><img src="${iconByStatus.Disabled}" alt="" width="16" height="16" /></span></button>
            <button class="ds-btn ds-btn-secondary ds-btn-md ds-btn-secondary-disabled" disabled><span class="ds-btn-icon"><img src="${iconByStatus.Disabled}" alt="" width="16" height="16" /></span><span>Button Secondary</span><span class="ds-btn-icon"><img src="${iconByStatus.Disabled}" alt="" width="16" height="16" /></span></button>
          </div>
          <aside class="ds-state-content">
            <h3>Disabled</h3>
            <p>Sizes: Sm, Md</p>
            <p>Background color: #CAD5E2 <span class="ds-token-inline">bg-interactive-disabled1</span></p>
            <p>Border/text color: #90A1B9 <span class="ds-token-inline">border/fg-interactive-disabled</span></p>
          </aside>
        </div>

        <div class="ds-state-exhibit">
          <div class="ds-state-artwork">
            <button class="ds-btn ds-btn-secondary ds-btn-sm ds-btn-secondary-focus"><span class="ds-btn-icon"><img src="${iconByStatus.Focused}" alt="" width="16" height="16" /></span><span>Button Secondary</span><span class="ds-btn-icon"><img src="${iconByStatus.Focused}" alt="" width="16" height="16" /></span></button>
            <button class="ds-btn ds-btn-secondary ds-btn-md ds-btn-secondary-focus"><span class="ds-btn-icon"><img src="${iconByStatus.Focused}" alt="" width="16" height="16" /></span><span>Button Secondary</span><span class="ds-btn-icon"><img src="${iconByStatus.Focused}" alt="" width="16" height="16" /></span></button>
          </div>
          <aside class="ds-state-content">
            <h3>Focused</h3>
            <p>Sizes: Sm, Md</p>
            <p>Border color: #FF1289 <span class="ds-token-inline">border-interactive-default</span></p>
            <p>Focus ring: 2px dashed #0059F3 <span class="ds-token-inline">border-interactive-focus</span></p>
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
          <a class="ds-figma-link" href="${figmaButtonSecondaryUrl}" target="_blank" rel="noopener noreferrer">Open in Figma</a>
        </p>
        <iframe
          class="ds-figma-embed"
          src="${figmaButtonSecondaryEmbedUrl}"
          allowfullscreen
        ></iframe>
      </div>

      <div class="ds-col">
        <h3>Visual reference</h3>
        <div class="ds-row">
          <button class="ds-btn ds-btn-secondary ds-btn-sm ds-btn-secondary-default">
            <span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span>
            <span>Button Secondary Sm</span>
            <span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span>
          </button>
          <button class="ds-btn ds-btn-secondary ds-btn-md ds-btn-secondary-default">
            <span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span>
            <span>Button Secondary Md</span>
            <span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span>
          </button>
        </div>
      </div>

      <div class="ds-col">
        <h3>Measurements</h3>
        <table class="ds-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Sm</th>
              <th>Md</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Padding</td><td>8px 12px <span class="ds-token-inline">grid8-8</span> <span class="ds-token-inline">grid8-12</span></td><td>12px 16px <span class="ds-token-inline">grid8-12</span> <span class="ds-token-inline">grid8-16</span></td></tr>
            <tr><td>Gap (icon-text)</td><td>4px <span class="ds-token-inline">grid8-4</span></td><td>4px <span class="ds-token-inline">grid8-4</span></td></tr>
            <tr><td>Icon frame</td><td>16px x 16px <span class="ds-token-inline">icon-slot-size-16</span></td><td>16px x 16px <span class="ds-token-inline">icon-slot-size-16</span></td></tr>
            <tr><td>Border radius</td><td>999px (pill) <span class="ds-token-inline">radius-full</span></td><td>999px (pill) <span class="ds-token-inline">radius-full</span></td></tr>
            <tr><td>Border width</td><td>2px <span class="ds-token-inline">border-width-2</span></td><td>2px <span class="ds-token-inline">border-width-2</span></td></tr>
            <tr><td>Focus ring height</td><td>38px</td><td>46px</td></tr>
            <tr><td>Font size</td><td>14px <span class="ds-token-inline">size-75</span></td><td>16px <span class="ds-token-inline">size-100</span></td></tr>
            <tr><td>Line height</td><td>18px <span class="ds-token-inline">line-height-100</span></td><td>18px <span class="ds-token-inline">line-height-100</span></td></tr>
            <tr><td>Outer margin</td><td>Not defined (layout-owned)</td><td>Not defined (layout-owned)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="ds-col">
        <h3>Blueprint</h3>
        <div class="ds-anatomy-figma">
          <div class="ds-anatomy-canvas">
            <div class="ds-anatomy-btn-wrap">
              <button class="ds-btn ds-btn-secondary ds-btn-md ds-btn-secondary-default ds-anatomy-btn">
                <span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span>
                <span>Button Secondary</span>
                <span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span>
              </button>
              <span class="ds-tag ds-tag-gap">4</span>
              <span class="ds-tag ds-tag-top">12</span>
              <span class="ds-tag ds-tag-left">16</span>
              <span class="ds-tag ds-tag-right">16</span>
              <span class="ds-tag ds-tag-bottom">12</span>
              <span class="ds-anatomy-line ds-anatomy-line-h"></span>
              <span class="ds-anatomy-line ds-anatomy-line-v"></span>
            </div>
          </div>

          <aside class="ds-anatomy-specs">
            <h4>Button Secondary</h4>
            <ul>
              <li>Direction: Horizontal</li>
              <li>Alignment: Middle center</li>
              <li>Vertical resizing: Hug</li>
              <li>Horizontal resizing: Hug</li>
              <li>Item spacing: 4</li>
              <li>Padding top: 12 <span class="ds-token-inline">grid8-12</span></li>
              <li>Padding bottom: 12 <span class="ds-token-inline">grid8-12</span></li>
              <li>Padding left: 16 <span class="ds-token-inline">grid8-16</span></li>
              <li>Padding right: 16 <span class="ds-token-inline">grid8-16</span></li>
            </ul>
          </aside>
        </div>
      </div>

      <div class="ds-col ds-detail-section">
        <h3>Accessibility notes</h3>
        <div class="ds-detail-a11y">
          <article>
            <h4>Keyboard</h4>
            <p>El estado <span class="ds-token-inline">Focused</span> requiere anillo visible y navegacion por tab sin perdida de contraste sobre el borde.</p>
          </article>
          <article>
            <h4>Disabled behavior</h4>
            <p>Cuando esta deshabilitado no debe responder a hover o click y debe mantener semantica disabled en HTML.</p>
          </article>
        </div>
      </div>
    </section>
  `,
};
