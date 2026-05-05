import type { Meta, StoryObj } from '@storybook/html';

const iconByStatus: Record<'Default' | 'Hover' | 'Pressed' | 'Disabled' | 'Focus', string> = {
  Default: 'https://www.figma.com/api/mcp/asset/84468324-2d9f-4ccd-aeb6-bdcca9aceec0',
  Hover: 'https://www.figma.com/api/mcp/asset/c3a0eb95-a771-408b-a1c8-e48e1e9e003c',
  Pressed: 'https://www.figma.com/api/mcp/asset/2c0b2bdb-7aee-4add-82a3-c7575379f317',
  Disabled: 'https://www.figma.com/api/mcp/asset/03a67101-a3ee-4635-a5e8-37a467d58b6c',
  Focus: 'https://www.figma.com/api/mcp/asset/84468324-2d9f-4ccd-aeb6-bdcca9aceec0',
};

type ButtonArgs = {
  label: string;
  size: 'sm' | 'md';
  status: 'Default' | 'Hover' | 'Pressed' | 'Disabled' | 'Focus';
  iconLeft: boolean;
  iconRight: boolean;
};

const meta: Meta<ButtonArgs> = {
  title: 'Components/Button',
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
    label: 'Primary Button',
    size: 'md',
    status: 'Default',
    iconLeft: true,
    iconRight: true,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Button alineado al nodo Figma `50:969` con estados y tamaños reales. Fuente: https://www.figma.com/design/SCpHExkj2GDv5v07Rx9G77/Components?node-id=50-969',
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

export const IconBooleans: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Documentación de `iconLeft` y `iconRight` como boolean para mostrar/ocultar iconos.',
      },
    },
  },
  render: () => `
    <section class="ds-panel">
      <h2>Icon booleans</h2>
      <p class="ds-muted">Combinaciones de visibilidad de iconos left/right.</p>
      <div class="ds-col">
        <div class="ds-row">
          <button class="ds-btn ds-btn-md ds-btn-default"><span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span><span>iconLeft=true iconRight=true</span><span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span></button>
        </div>
        <div class="ds-row">
          <button class="ds-btn ds-btn-md ds-btn-default"><span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span><span>iconLeft=true iconRight=false</span></button>
        </div>
        <div class="ds-row">
          <button class="ds-btn ds-btn-md ds-btn-default"><span>iconLeft=false iconRight=false</span></button>
        </div>
        <div class="ds-row">
          <button class="ds-btn ds-btn-md ds-btn-default"><span>iconLeft=false iconRight=true</span><span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span></button>
        </div>
      </div>
    </section>
  `,
};

export const States: Story = {
  render: () => `
    <section class="ds-panel">
      <h2>Primary Button</h2>
      <p class="ds-muted">Cobertura de estados desde Figma: Default, Hover, Pressed, Disabled, Focus en tamaños Sm y Md.</p>
      <div class="ds-col">
        <div class="ds-row">
          <button class="ds-btn ds-btn-sm ds-btn-default"><span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span><span>Button</span><span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span></button>
          <button class="ds-btn ds-btn-md ds-btn-default"><span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span><span>Button</span><span class="ds-btn-icon"><img src="${iconByStatus.Default}" alt="" width="16" height="16" /></span></button>
        </div>
        <div class="ds-row">
          <button class="ds-btn ds-btn-sm ds-btn-hover"><span class="ds-btn-icon"><img src="${iconByStatus.Hover}" alt="" width="16" height="16" /></span><span>Button</span><span class="ds-btn-icon"><img src="${iconByStatus.Hover}" alt="" width="16" height="16" /></span></button>
          <button class="ds-btn ds-btn-md ds-btn-hover"><span class="ds-btn-icon"><img src="${iconByStatus.Hover}" alt="" width="16" height="16" /></span><span>Button</span><span class="ds-btn-icon"><img src="${iconByStatus.Hover}" alt="" width="16" height="16" /></span></button>
        </div>
        <div class="ds-row">
          <button class="ds-btn ds-btn-sm ds-btn-pressed"><span class="ds-btn-icon"><img src="${iconByStatus.Pressed}" alt="" width="16" height="16" /></span><span>Button</span><span class="ds-btn-icon"><img src="${iconByStatus.Pressed}" alt="" width="16" height="16" /></span></button>
          <button class="ds-btn ds-btn-md ds-btn-pressed"><span class="ds-btn-icon"><img src="${iconByStatus.Pressed}" alt="" width="16" height="16" /></span><span>Button</span><span class="ds-btn-icon"><img src="${iconByStatus.Pressed}" alt="" width="16" height="16" /></span></button>
        </div>
        <div class="ds-row">
          <button class="ds-btn ds-btn-sm ds-btn-disabled" disabled><span class="ds-btn-icon"><img src="${iconByStatus.Disabled}" alt="" width="16" height="16" /></span><span>Button</span><span class="ds-btn-icon"><img src="${iconByStatus.Disabled}" alt="" width="16" height="16" /></span></button>
          <button class="ds-btn ds-btn-md ds-btn-disabled" disabled><span class="ds-btn-icon"><img src="${iconByStatus.Disabled}" alt="" width="16" height="16" /></span><span>Button</span><span class="ds-btn-icon"><img src="${iconByStatus.Disabled}" alt="" width="16" height="16" /></span></button>
        </div>
        <div class="ds-row">
          <button class="ds-btn ds-btn-sm ds-btn-focus"><span class="ds-btn-icon"><img src="${iconByStatus.Focus}" alt="" width="16" height="16" /></span><span>Button</span><span class="ds-btn-icon"><img src="${iconByStatus.Focus}" alt="" width="16" height="16" /></span></button>
          <button class="ds-btn ds-btn-md ds-btn-focus"><span class="ds-btn-icon"><img src="${iconByStatus.Focus}" alt="" width="16" height="16" /></span><span>Button</span><span class="ds-btn-icon"><img src="${iconByStatus.Focus}" alt="" width="16" height="16" /></span></button>
        </div>
      </div>
    </section>
  `,
};
