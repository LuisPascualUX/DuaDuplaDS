import type { Meta, StoryObj } from '@storybook/html';

const iconByStatus: Record<'Default' | 'Hover' | 'Pressed' | 'Disabled' | 'Focus', string> = {
  Default: 'https://www.figma.com/api/mcp/asset/84468324-2d9f-4ccd-aeb6-bdcca9aceec0',
  Hover: 'https://www.figma.com/api/mcp/asset/c3a0eb95-a771-408b-a1c8-e48e1e9e003c',
  Pressed: 'https://www.figma.com/api/mcp/asset/2c0b2bdb-7aee-4add-82a3-c7575379f317',
  Disabled: 'https://www.figma.com/api/mcp/asset/03a67101-a3ee-4635-a5e8-37a467d58b6c',
  Focus: 'https://www.figma.com/api/mcp/asset/84468324-2d9f-4ccd-aeb6-bdcca9aceec0',
};

const figmaButtonAnatomyUrl =
  'https://www.figma.com/design/SCpHExkj2GDv5v07Rx9G77/Components?node-id=67-4389&t=oyhem46qxpUxRxBT-4';
const figmaButtonAnatomyEmbedUrl = `https://www.figma.com/embed?embed_host=storybook&url=${encodeURIComponent(figmaButtonAnatomyUrl)}`;

type ButtonArgs = {
  label: string;
  size: 'sm' | 'md';
  status: 'Default' | 'Hover' | 'Pressed' | 'Disabled' | 'Focus';
  iconLeft: boolean;
  iconRight: boolean;
};

const meta: Meta<ButtonArgs> = {
  title: 'Components/Button Primary',
  argTypes: {
    label: { control: 'text' },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    status: { control: 'inline-radio', options: ['Default', 'Hover', 'Pressed', 'Disabled', 'Focus'] },
    iconLeft: {
      control: 'boolean',
      description: 'Muestra u oculta el icono izquierdo',
    },
    iconRight: {
      control: 'boolean',
      description: 'Muestra u oculta el icono derecho',
    },
  },
  args: {
    label: 'Button Primary',
    size: 'md',
    status: 'Default',
    iconLeft: true,
    iconRight: true,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Button Primary alineado al nodo Figma `50:969` con estados y tamaños reales. Fuente: https://www.figma.com/design/SCpHExkj2GDv5v07Rx9G77/Components?node-id=50-969',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonArgs>;

const statusToClass = (status: ButtonArgs['status']) => {
  switch (status) {
    case 'Hover':
      return 'ds-btn-hover';
    case 'Pressed':
      return 'ds-btn-pressed';
    case 'Disabled':
      return 'ds-btn-disabled';
    case 'Focus':
      return 'ds-btn-focus';
    default:
      return 'ds-btn-default';
  }
};

export const Playground: Story = {
  render: ({ label, size, status, iconLeft, iconRight }) => {
    const statusClass = statusToClass(status);
    const disabled = status === 'Disabled';
    const icon = iconByStatus[status];
    return `
      <button class="ds-btn ds-btn-${size} ${statusClass}" ${disabled ? 'disabled' : ''}>
        ${iconLeft ? `<span class="ds-btn-icon"><img src="${icon}" alt="" width="16" height="16" /></span>` : ''}
        <span>${label}</span>
        ${iconRight ? `<span class="ds-btn-icon"><img src="${icon}" alt="" width="16" height="16" /></span>` : ''}
      </button>
    `;
  },
};

export const States: Story = {
  render: () => `
    <section class="ds-panel">
      <h2>Status · Button Primary</h2>
      <p class="ds-muted">Vista alineada al formato de Figma: artwork a la izquierda y especificaciones de estado/tamaño a la derecha.</p>
      <div class="ds-col ds-state-list">
        <div class="ds-state-exhibit">
          <div class="ds-state-artwork">
            <button class="ds-btn ds-btn-sm ds-btn-default"><span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span><span>Button Primary</span><span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span></button>
            <button class="ds-btn ds-btn-md ds-btn-default"><span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span><span>Button Primary</span><span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span></button>
          </div>
          <aside class="ds-state-content">
            <h3>Default</h3>
            <p><strong>Button Primary</strong></p>
            <p>Sizes: Sm, Md</p>
            <p>Background color: #FF1289 <span class="ds-token-inline">bg-interactive-default</span></p>
            <p>Text color: #020618 <span class="ds-token-inline">fg-interactiveprimary-default</span></p>
          </aside>
        </div>

        <div class="ds-state-exhibit">
          <div class="ds-state-artwork">
            <button class="ds-btn ds-btn-sm ds-btn-hover"><span class="ds-btn-icon"><img src="${iconByStatus.Hover}" alt="" width="16" height="16" /></span><span>Button Primary</span><span class="ds-btn-icon"><img src="${iconByStatus.Hover}" alt="" width="16" height="16" /></span></button>
            <button class="ds-btn ds-btn-md ds-btn-hover"><span class="ds-btn-icon"><img src="${iconByStatus.Hover}" alt="" width="16" height="16" /></span><span>Button Primary</span><span class="ds-btn-icon"><img src="${iconByStatus.Hover}" alt="" width="16" height="16" /></span></button>
          </div>
          <aside class="ds-state-content">
            <h3>Hover</h3>
            <p><strong>Button Primary</strong></p>
            <p>Sizes: Sm, Md</p>
            <p>Background color: #FF5BA8 <span class="ds-token-inline">bg-interactive-hover</span></p>
          </aside>
        </div>

        <div class="ds-state-exhibit">
          <div class="ds-state-artwork">
            <button class="ds-btn ds-btn-sm ds-btn-pressed"><span class="ds-btn-icon"><img src="${iconByStatus.Pressed}" alt="" width="16" height="16" /></span><span>Button Primary</span><span class="ds-btn-icon"><img src="${iconByStatus.Pressed}" alt="" width="16" height="16" /></span></button>
            <button class="ds-btn ds-btn-md ds-btn-pressed"><span class="ds-btn-icon"><img src="${iconByStatus.Pressed}" alt="" width="16" height="16" /></span><span>Button Primary</span><span class="ds-btn-icon"><img src="${iconByStatus.Pressed}" alt="" width="16" height="16" /></span></button>
          </div>
          <aside class="ds-state-content">
            <h3>Pressed</h3>
            <p><strong>Button Primary</strong></p>
            <p>Sizes: Sm, Md</p>
            <p>Background color: #EF0066 <span class="ds-token-inline">bg-interactive-pressed</span></p>
          </aside>
        </div>

        <div class="ds-state-exhibit">
          <div class="ds-state-artwork">
            <button class="ds-btn ds-btn-sm ds-btn-disabled" disabled><span class="ds-btn-icon"><img src="${iconByStatus.Disabled}" alt="" width="16" height="16" /></span><span>Button Primary</span><span class="ds-btn-icon"><img src="${iconByStatus.Disabled}" alt="" width="16" height="16" /></span></button>
            <button class="ds-btn ds-btn-md ds-btn-disabled" disabled><span class="ds-btn-icon"><img src="${iconByStatus.Disabled}" alt="" width="16" height="16" /></span><span>Button Primary</span><span class="ds-btn-icon"><img src="${iconByStatus.Disabled}" alt="" width="16" height="16" /></span></button>
          </div>
          <aside class="ds-state-content">
            <h3>Disabled</h3>
            <p><strong>Button Primary</strong></p>
            <p>Sizes: Sm, Md</p>
            <p>Background color: #CAD5E2 <span class="ds-token-inline">bg-interactive-disabled1</span></p>
            <p>Text color: #90A1B9 <span class="ds-token-inline">fg-interactiveprimary-disabled</span></p>
          </aside>
        </div>

        <div class="ds-state-exhibit">
          <div class="ds-state-artwork">
            <button class="ds-btn ds-btn-sm ds-btn-focus"><span class="ds-btn-icon"><img src="${iconByStatus.Focus}" alt="" width="16" height="16" /></span><span>Button Primary</span><span class="ds-btn-icon"><img src="${iconByStatus.Focus}" alt="" width="16" height="16" /></span></button>
            <button class="ds-btn ds-btn-md ds-btn-focus"><span class="ds-btn-icon"><img src="${iconByStatus.Focus}" alt="" width="16" height="16" /></span><span>Button Primary</span><span class="ds-btn-icon"><img src="${iconByStatus.Focus}" alt="" width="16" height="16" /></span></button>
          </div>
          <aside class="ds-state-content">
            <h3>Focus</h3>
            <p><strong>Button Primary</strong></p>
            <p>Sizes: Sm, Md</p>
            <p>Focus ring: 2px dashed #0059F3 <span class="ds-token-inline">border-interactive-focus</span></p>
            <p>Focus ring height: Sm 38px · Md 46px</p>
          </aside>
        </div>
      </div>
    </section>
  `,
};

export const Anatomy: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Anatomía del botón con medidas base de layout y espaciado para tamaños `sm` y `md`.',
      },
    },
  },
  render: () => `
    <section class="ds-panel">
      <h2>Button Primary anatomy</h2>
      <p class="ds-muted">Medidas de referencia para implementar y revisar consistencia visual.</p>

      <div class="ds-col">
        <h3>Figma live reference</h3>
        <p class="ds-muted">
          <a class="ds-figma-link" href="${figmaButtonAnatomyUrl}" target="_blank" rel="noopener noreferrer">Open in Figma</a>
        </p>
        <iframe
          class="ds-figma-embed"
          src="${figmaButtonAnatomyEmbedUrl}"
          allowfullscreen
        ></iframe>
      </div>

      <div class="ds-col">
        <h3>Visual reference</h3>
        <div class="ds-row">
          <button class="ds-btn ds-btn-sm ds-btn-default">
            <span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span>
            <span>Button Primary Sm</span>
            <span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span>
          </button>
          <button class="ds-btn ds-btn-md ds-btn-default">
            <span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span>
            <span>Button Primary Md</span>
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
            <tr><td>Focus ring height</td><td>38px</td><td>46px</td></tr>
            <tr><td>Font size</td><td>14px <span class="ds-token-inline">size-75</span></td><td>16px <span class="ds-token-inline">size-100</span></td></tr>
            <tr><td>Line height</td><td>18px <span class="ds-token-inline">line-height-100</span></td><td>18px <span class="ds-token-inline">line-height-100</span></td></tr>
            <tr><td>Border</td><td>1px solid transparent</td><td>1px solid transparent</td></tr>
            <tr><td>Outer margin</td><td>Not defined (layout-owned)</td><td>Not defined (layout-owned)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="ds-col">
        <h3>Blueprint</h3>
        <div class="ds-anatomy-figma">
          <div class="ds-anatomy-canvas">
            <div class="ds-anatomy-btn-wrap">
              <button class="ds-btn ds-btn-md ds-btn-default ds-anatomy-btn">
                <span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span>
                <span>Button Primary</span>
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
            <h4>Button Primary</h4>
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
    </section>
  `,
};
