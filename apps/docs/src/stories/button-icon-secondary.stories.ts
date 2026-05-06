import type { Meta, StoryObj } from '@storybook/html';

const iconByStatusSize: Record<'Default' | 'Hover' | 'Pressed' | 'Disabled' | 'Focused', Record<'sm' | 'md', string>> = {
  Default: {
    sm: 'https://www.figma.com/api/mcp/asset/f5585ed2-4e08-4b8a-9281-bf5bea61185f',
    md: 'https://www.figma.com/api/mcp/asset/3368cf34-f85f-4a58-94bf-8cb57e2528b3',
  },
  Hover: {
    sm: 'https://www.figma.com/api/mcp/asset/d138a6c1-6f1c-4be9-9f0c-32d9c74fb1cc',
    md: 'https://www.figma.com/api/mcp/asset/d80d54a6-0cea-402e-ab10-8465413cb72d',
  },
  Pressed: {
    sm: 'https://www.figma.com/api/mcp/asset/c53b7236-4a62-4f55-9ff7-1d1396616e27',
    md: 'https://www.figma.com/api/mcp/asset/bb1213a9-20bb-411d-a140-8a5fb4dcfc8d',
  },
  Disabled: {
    sm: 'https://www.figma.com/api/mcp/asset/04f9bb19-048c-473a-9169-983470bc4b93',
    md: 'https://www.figma.com/api/mcp/asset/a4cf68bd-25a9-44ea-98b7-81fadff77086',
  },
  Focused: {
    sm: 'https://www.figma.com/api/mcp/asset/f5585ed2-4e08-4b8a-9281-bf5bea61185f',
    md: 'https://www.figma.com/api/mcp/asset/3368cf34-f85f-4a58-94bf-8cb57e2528b3',
  },
};

const figmaIconButtonSecondaryUrl =
  'https://www.figma.com/design/SCpHExkj2GDv5v07Rx9G77/Components?node-id=75-12079&t=oyhem46qxpUxRxBT-4';
const figmaIconButtonSecondaryEmbedUrl = `https://www.figma.com/embed?embed_host=storybook&url=${encodeURIComponent(figmaIconButtonSecondaryUrl)}`;

type IconButtonSecondaryArgs = {
  size: 'sm' | 'md';
  status: 'Default' | 'Hover' | 'Pressed' | 'Disabled' | 'Focused';
};

const meta: Meta<IconButtonSecondaryArgs> = {
  title: 'Components/Icon Button Secondary',
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
        component: 'Icon Button Secondary alineado al nodo Figma `75:12079` con tamaños y estados exactos.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<IconButtonSecondaryArgs>;

const statusToClass = (status: IconButtonSecondaryArgs['status']) => {
  switch (status) {
    case 'Hover':
      return 'ds-btn-icon-secondary-hover';
    case 'Pressed':
      return 'ds-btn-icon-secondary-pressed';
    case 'Disabled':
      return 'ds-btn-icon-secondary-disabled';
    case 'Focused':
      return 'ds-btn-icon-secondary-focused';
    default:
      return 'ds-btn-icon-secondary-default';
  }
};

export const Playground: Story = {
  args: {
    status: "Focused"
  },

  render: ({ size, status }) => {
    const statusClass = statusToClass(status);
    const disabled = status === 'Disabled';
    const icon = iconByStatusSize[status][size];
    const iconSize = size === 'sm' ? 16 : 24;
    return `
      <button class="ds-btn ds-btn-icon-secondary ds-btn-icon-${size} ${statusClass}" aria-label="Icon Button Secondary" ${disabled ? 'disabled' : ''}>
        <span class="ds-btn-icon"><img src="${icon}" alt="" width="${iconSize}" height="${iconSize}" /></span>
      </button>
    `;
  }
};

export const States: Story = {
  render: () => `
    <section class="ds-panel">
      <h2>Status · Icon Button Secondary</h2>
      <p class="ds-muted">Vista alineada al formato de Figma: artwork a la izquierda y especificaciones de estado/tamaño a la derecha.</p>
      <div class="ds-col ds-state-list">
        <div class="ds-state-exhibit">
          <div class="ds-state-artwork ds-state-artwork-stack">
            <button class="ds-btn ds-btn-icon-secondary ds-btn-icon-sm ds-btn-icon-secondary-default" aria-label="Icon Button Secondary Sm"><span class="ds-btn-icon"><img src="${iconByStatusSize.Default.sm}" alt="" width="16" height="16" /></span></button>
            <button class="ds-btn ds-btn-icon-secondary ds-btn-icon-md ds-btn-icon-secondary-default" aria-label="Icon Button Secondary Md"><span class="ds-btn-icon"><img src="${iconByStatusSize.Default.md}" alt="" width="24" height="24" /></span></button>
          </div>
          <aside class="ds-state-content">
            <h3>Default</h3>
            <p>Sizes: Sm, Md</p>
            <p>Border color: #FF1289 <span class="ds-token-inline">border-interactive-default</span></p>
            <p>Icon size: 16/24 <span class="ds-token-inline">icon-slot-size-sm-md</span></p>
          </aside>
        </div>

        <div class="ds-state-exhibit">
          <div class="ds-state-artwork ds-state-artwork-stack">
            <button class="ds-btn ds-btn-icon-secondary ds-btn-icon-sm ds-btn-icon-secondary-hover" aria-label="Icon Button Secondary Sm"><span class="ds-btn-icon"><img src="${iconByStatusSize.Hover.sm}" alt="" width="16" height="16" /></span></button>
            <button class="ds-btn ds-btn-icon-secondary ds-btn-icon-md ds-btn-icon-secondary-hover" aria-label="Icon Button Secondary Md"><span class="ds-btn-icon"><img src="${iconByStatusSize.Hover.md}" alt="" width="24" height="24" /></span></button>
          </div>
          <aside class="ds-state-content">
            <h3>Hover</h3>
            <p>Sizes: Sm, Md</p>
            <p>Background color: #FEE6EF <span class="ds-token-inline">bg-interactive-hoversecondary</span></p>
            <p>Border color: #FF5BA8 <span class="ds-token-inline">border-interactive-hover</span></p>
          </aside>
        </div>

        <div class="ds-state-exhibit">
          <div class="ds-state-artwork ds-state-artwork-stack">
            <button class="ds-btn ds-btn-icon-secondary ds-btn-icon-sm ds-btn-icon-secondary-pressed" aria-label="Icon Button Secondary Sm"><span class="ds-btn-icon"><img src="${iconByStatusSize.Pressed.sm}" alt="" width="16" height="16" /></span></button>
            <button class="ds-btn ds-btn-icon-secondary ds-btn-icon-md ds-btn-icon-secondary-pressed" aria-label="Icon Button Secondary Md"><span class="ds-btn-icon"><img src="${iconByStatusSize.Pressed.md}" alt="" width="24" height="24" /></span></button>
          </div>
          <aside class="ds-state-content">
            <h3>Pressed</h3>
            <p>Sizes: Sm, Md</p>
            <p>Background color: #FFCCE3 <span class="ds-token-inline">bg-interactive-pressedsecondary</span></p>
            <p>Border color: #EF0066 <span class="ds-token-inline">border-interactive-pressed</span></p>
          </aside>
        </div>

        <div class="ds-state-exhibit">
          <div class="ds-state-artwork ds-state-artwork-stack">
            <button class="ds-btn ds-btn-icon-secondary ds-btn-icon-sm ds-btn-icon-secondary-disabled" aria-label="Icon Button Secondary Sm" disabled><span class="ds-btn-icon"><img src="${iconByStatusSize.Disabled.sm}" alt="" width="16" height="16" /></span></button>
            <button class="ds-btn ds-btn-icon-secondary ds-btn-icon-md ds-btn-icon-secondary-disabled" aria-label="Icon Button Secondary Md" disabled><span class="ds-btn-icon"><img src="${iconByStatusSize.Disabled.md}" alt="" width="24" height="24" /></span></button>
          </div>
          <aside class="ds-state-content">
            <h3>Disabled</h3>
            <p>Sizes: Sm, Md</p>
            <p>Background color: #CAD5E2 <span class="ds-token-inline">bg-interactive-disabled1</span></p>
            <p>Border color: #90A1B9 <span class="ds-token-inline">border-interactive-disabled</span></p>
          </aside>
        </div>

        <div class="ds-state-exhibit">
          <div class="ds-state-artwork ds-state-artwork-stack">
            <button class="ds-btn ds-btn-icon-secondary ds-btn-icon-sm ds-btn-icon-secondary-focused" aria-label="Icon Button Secondary Sm"><span class="ds-btn-icon"><img src="${iconByStatusSize.Focused.sm}" alt="" width="16" height="16" /></span></button>
            <button class="ds-btn ds-btn-icon-secondary ds-btn-icon-md ds-btn-icon-secondary-focused" aria-label="Icon Button Secondary Md"><span class="ds-btn-icon"><img src="${iconByStatusSize.Focused.md}" alt="" width="24" height="24" /></span></button>
          </div>
          <aside class="ds-state-content">
            <h3>Focused</h3>
            <p>Sizes: Sm, Md</p>
            <p>Focus ring: 2px dashed #0059F3 <span class="ds-token-inline">border-interactive-focus</span></p>
            <p>Border color: #FF1289 <span class="ds-token-inline">border-interactive-default</span></p>
          </aside>
        </div>
      </div>
    </section>
  `,
};

export const Anatomy: Story = {
  render: () => `
    <section class="ds-panel">
      <h2>Icon Button Secondary anatomy</h2>
      <p class="ds-muted">Medidas de referencia para implementar y revisar consistencia visual.</p>

      <div class="ds-col">
        <h3>Figma live reference</h3>
        <p class="ds-muted">
          <a class="ds-figma-link" href="${figmaIconButtonSecondaryUrl}" target="_blank" rel="noopener noreferrer">Open in Figma</a>
        </p>
        <iframe class="ds-figma-embed" src="${figmaIconButtonSecondaryEmbedUrl}" allowfullscreen></iframe>
      </div>

      <div class="ds-col">
        <h3>Visual reference</h3>
        <div class="ds-row">
          <button class="ds-btn ds-btn-icon-secondary ds-btn-icon-sm ds-btn-icon-secondary-default" aria-label="Icon Button Secondary Sm">
            <span class="ds-btn-icon"><img src="${iconByStatusSize.Default.sm}" alt="" width="16" height="16" /></span>
          </button>
          <button class="ds-btn ds-btn-icon-secondary ds-btn-icon-md ds-btn-icon-secondary-default" aria-label="Icon Button Secondary Md">
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
            <tr><td>Border width</td><td>2px <span class="ds-token-inline">border-interactive-2</span></td><td>2px <span class="ds-token-inline">border-interactive-2</span></td></tr>
            <tr><td>Border radius</td><td>999px (pill) <span class="ds-token-inline">radius-full</span></td><td>999px (pill) <span class="ds-token-inline">radius-full</span></td></tr>
          </tbody>
        </table>
      </div>

      <div class="ds-col">
        <h3>Blueprint</h3>
        <div class="ds-anatomy-figma">
          <div class="ds-anatomy-canvas">
            <div class="ds-anatomy-btn-wrap">
              <button class="ds-btn ds-btn-icon-secondary ds-btn-icon-md ds-btn-icon-secondary-default ds-anatomy-btn" aria-label="Icon Button Secondary">
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
            <h4>Icon Button Secondary</h4>
            <ul>
              <li>Direction: Horizontal</li>
              <li>Alignment: Middle center</li>
              <li>Vertical resizing: Hug</li>
              <li>Horizontal sizing: Fixed width (40/32)</li>
              <li>Padding: 8 (Md) / 8x12 (Sm)</li>
              <li>Stroke: 2px</li>
              <li>Focus ring: dashed</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  `,
};
