import type { Meta, StoryObj } from '@storybook/html';

const iconByStatusSize: Record<'Default' | 'Hover' | 'Pressed' | 'Disabled' | 'Focused', Record<'sm' | 'md', string>> = {
  Default: {
    sm: 'https://www.figma.com/api/mcp/asset/3b6e88c4-7e6e-49ca-900b-88cc1bcff9d4',
    md: 'https://www.figma.com/api/mcp/asset/ce2c7ba0-a4ef-4ac1-877b-9b56ed6f08e0',
  },
  Hover: {
    sm: 'https://www.figma.com/api/mcp/asset/fcf48eb8-36e0-4736-8868-2005525fd9af',
    md: 'https://www.figma.com/api/mcp/asset/b93a4718-7dee-4f2c-9a9b-72b4a7b7b025',
  },
  Pressed: {
    sm: 'https://www.figma.com/api/mcp/asset/09048490-138e-43cc-a181-c52d9915d967',
    md: 'https://www.figma.com/api/mcp/asset/70724993-6c13-47bf-8e49-6ea6b48d6896',
  },
  Disabled: {
    sm: 'https://www.figma.com/api/mcp/asset/dea4a540-b839-4c6f-bb14-db2d460da5d7',
    md: 'https://www.figma.com/api/mcp/asset/cf5d8277-c359-41f3-87dc-35f84d0c88ab',
  },
  Focused: {
    sm: 'https://www.figma.com/api/mcp/asset/3b6e88c4-7e6e-49ca-900b-88cc1bcff9d4',
    md: 'https://www.figma.com/api/mcp/asset/ce2c7ba0-a4ef-4ac1-877b-9b56ed6f08e0',
  },
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
    return `
      <button class="ds-btn ds-btn-icon-tertiary ds-btn-icon-${size} ${statusClass}" aria-label="Icon Button Tertiary" ${disabled ? 'disabled' : ''}>
        <span class="ds-btn-icon"><img src="${icon}" alt="" width="${iconSize}" height="${iconSize}" /></span>
      </button>
    `;
  },
};

export const States: Story = {
  render: () => `
    <section class="ds-panel">
      <h2>Status · Icon Button Tertiary</h2>
      <p class="ds-muted">Vista alineada al formato de Figma: artwork a la izquierda y especificaciones de estado/tamaño a la derecha.</p>
      <div class="ds-col ds-state-list">
        <div class="ds-state-exhibit">
          <div class="ds-state-artwork ds-state-artwork-stack">
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
          <div class="ds-state-artwork ds-state-artwork-stack">
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
          <div class="ds-state-artwork ds-state-artwork-stack">
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
          <div class="ds-state-artwork ds-state-artwork-stack">
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
          <div class="ds-state-artwork ds-state-artwork-stack">
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
    </section>
  `,
};

export const Anatomy: Story = {
  render: () => `
    <section class="ds-panel">
      <h2>Icon Button Tertiary anatomy</h2>
      <p class="ds-muted">Medidas de referencia para implementar y revisar consistencia visual.</p>

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
    </section>
  `,
};
