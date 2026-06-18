import { forwardRef } from 'preact/compat';

/**
 * Button
 *
 * Props:
 *   variant   — 'primary' | 'secondary' | 'tertiary'
 *   size      — 'md' | 'sm'
 *   disabled  — boolean
 *   iconLeft  — JSX element (optional)
 *   iconRight — JSX element (optional)
 *   onClick   — handler
 *   children  — label text
 */

const BASE =
  'flex flex-row items-center justify-center font-body font-medium ' +
  'rounded-btn transition-colors duration-150 cursor-pointer ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-[var(--border-action-active)] ' +
  'disabled:cursor-not-allowed select-none';

const SIZE = {
  md: 'px-md py-md text-action-md [&_svg]:w-4 [&_svg]:h-4',
  sm: 'px-md  py-sm text-action-sm [&_svg]:w-3 [&_svg]:h-3',
};

const VARIANT = {
  primary: {
    base:     'bg-btn-primary text-btn-on-primary border-0',
    hover:    'hover:bg-btn-hover-primary hover:text-btn-text-inverse',
    disabled: 'disabled:bg-btn-disabled disabled:text-btn-text-disabled disabled:border-0',
  },
  secondary: {
    base:     'bg-btn-secondary text-btn-on-secondary border-0',
    hover:    'hover:bg-btn-hover-sec hover:text-btn-on-tertiary',
    disabled: 'disabled:bg-btn-disabled disabled:text-btn-text-disabled disabled:border-0',
  },
  tertiary: {
    base:     'bg-transparent text-btn-text-active border border-btn-border',
    hover:    'hover:bg-btn-hover-primary hover:text-btn-text-inverse hover:border-transparent',
    disabled: 'disabled:bg-btn-disabled disabled:text-btn-text-disabled disabled:border disabled:border-btn-border-dis',
  },
};

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  iconLeft,
  iconRight,
  onClick,
  class: className = '',
  children,
  ...rest
}) {
  const v = VARIANT[variant] ?? VARIANT.primary;
  const classes = [
    BASE,
    SIZE[size],
    v.base,
    v.hover,
    v.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      class={classes}
      disabled={disabled}
      onClick={onClick}
      type="button"
      {...rest}
    >
      {iconLeft  && <span class="flex items-center" aria-hidden="true">{iconLeft}</span>}
      {children  && <span class="px-xs whitespace-nowrap"> {children} </span>}
      {iconRight && <span class="flex items-center" aria-hidden="true">{iconRight}</span>}
    </button>
  );
}
