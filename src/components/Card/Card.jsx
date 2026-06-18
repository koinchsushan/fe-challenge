/**
 * Card
 *
 * Promotional card component. Composes Button internally.
 *
 * Props:
 *   size      — 'lg' | 'sm'
 *   heading   — string
 *   ctaLabel  — string (button label)
 *   ctaIcon   — JSX element (optional icon for the button)
 *   image     — JSX element (decorative graphic, right side)
 *   onClick   — CTA click handler
 */

import { Button } from '../Button/index.js';

export function Card({
  size = 'lg',
  heading = 'Join the family.',
  ctaLabel = 'Join',
  ctaIcon,
  image,
  onClick,
  class: className = '',
  ...rest
}) {
  const isLarge = size === 'lg';

  return (
    <div
      class={[
        'w-fit relative overflow-hidden bg-card-bg rounded-[20px] flex flex-row items-start',
        isLarge ? 'p-lg gap-lg' : 'p-md gap-md',
        className,
      ].join(' ')}
      {...rest}
    >
      {/* Left: heading + CTA */}
      <div class={`flex flex-col items-start z-10 ${isLarge ? "gap-xl" : "gap-5"}`}>
        <p
          class={[
            'text-card-text font-heading leading-[120%]',
            isLarge ? 'text-h5 font-[500]' : 'text-[20px] font-[400]',
          ].join(' ')}
        >
          {heading}
        </p>

        <Button
          variant="primary"
          size="sm"
          iconLeft={ctaIcon}
          onClick={onClick}
        >
          {ctaLabel}
        </Button>
      </div>

      {/* Right: decorative image */}
      {image && (
        <div
          class={[
            'flex-shrink-0 z-10',
            isLarge ? '' : '[&_svg]:w-[84px] [&_svg]:h-[85px]',
          ].join(' ')}
          aria-hidden="true"
        >
          {image}
        </div>
      )}
    </div>
  );
}
