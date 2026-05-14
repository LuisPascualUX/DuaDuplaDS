type TextButtonRenderArgs = {
  baseClass: string;
  size: 'sm' | 'md';
  statusClass: string;
  label: string;
  iconLeft?: boolean;
  iconRight?: boolean;
  iconSrc?: string;
  iconSize?: number;
  disabled?: boolean;
};

type IconButtonRenderArgs = {
  baseClass: string;
  size: 'sm' | 'md';
  statusClass: string;
  iconSrc: string;
  iconSize: number;
  ariaLabel: string;
  disabled?: boolean;
};

export const wrapPlayground = (content: string) =>
  `<div class="ds-playground-center">${content}</div>`;

const renderButtonIcon = (iconSrc: string, iconSize: number) => `
  <span
    class="ds-btn-icon ds-btn-icon-mask"
    aria-hidden="true"
    style="--ds-btn-icon-url: url('${iconSrc}'); --ds-btn-icon-size: ${iconSize}px;"
  ></span>
`;

export const renderTextButton = ({
  baseClass,
  size,
  statusClass,
  label,
  iconLeft = false,
  iconRight = false,
  iconSrc = '',
  iconSize = 16,
  disabled = false,
}: TextButtonRenderArgs) => `
  <button class="${baseClass} ds-btn-${size} ${statusClass}" ${disabled ? 'disabled' : ''}>
    ${iconLeft ? renderButtonIcon(iconSrc, iconSize) : ''}
    <span>${label}</span>
    ${iconRight ? renderButtonIcon(iconSrc, iconSize) : ''}
  </button>
`;

export const renderIconButton = ({
  baseClass,
  size,
  statusClass,
  iconSrc,
  iconSize,
  ariaLabel,
  disabled = false,
}: IconButtonRenderArgs) => `
  <button class="${baseClass} ds-btn-icon-${size} ${statusClass}" aria-label="${ariaLabel}" ${disabled ? 'disabled' : ''}>
    ${renderButtonIcon(iconSrc, iconSize)}
  </button>
`;
