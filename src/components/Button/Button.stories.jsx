import { Button } from './Button.jsx';

// Chevron icons matching the Figma design
const ChevronLeft = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 12L6 8L10 4"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const ChevronRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 12L10 8L6 4"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="5" r="3" stroke="currentColor" stroke-width="1.5" />
    <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
  </svg>
);

// ── Story metadata ────────────────────────────────────────────────────────────

/** @type {import('@storybook/preact').Meta} */
export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Visual style of the button',
    },
    size: {
      control: 'radio',
      options: ['md', 'sm'],
      description: 'Size of the button',
    },
    disabled: {
      control: 'boolean',
    },
    children: {
      control: 'text',
      description: 'Button label',
    },
  },
  args: {
    children: 'Button label',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
};

// ── Single interactive story (controls panel) ─────────────────────────────────

export const Playground = {
  args: {
    iconLeft: <ChevronLeft />,
    iconRight: <ChevronRight />,
  },
};

// ── Variant showcase — mirrors the Figma layout ───────────────────────────────

export const AllVariants = {
  name: 'All Variants & States',
  render: () => {
    const variants = ['primary', 'secondary', 'tertiary'];
    const sizes    = ['md', 'sm'];
    const states   = [
      { label: 'Default',  props: {} },
      { label: 'Disabled', props: { disabled: true } },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {variants.map(variant => (
          <section key={variant}>
            <h3 style={{
              fontFamily: 'var(--font-family-body)',
              fontSize: '14px',
              fontWeight: 600,
              textTransform: 'capitalize',
              marginBottom: '16px',
              color: 'var(--text-headings)',
            }}>
              {variant}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {states.map(({ label, props }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    width: '64px',
                    fontSize: '12px',
                    color: 'var(--text-passive)',
                    fontFamily: 'var(--font-family-body)',
                  }}>
                    {label}
                  </span>
                  {sizes.map(size => (
                    <Button
                      key={size}
                      variant={variant}
                      size={size}
                      iconLeft={<ChevronLeft />}
                      iconRight={<ChevronRight />}
                      {...props}
                    >
                      Button label
                    </Button>
                  ))}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  },
};

// ── Individual variant stories ────────────────────────────────────────────────

export const Primary = {
  args: { variant: 'primary', iconLeft: <ChevronLeft />, iconRight: <ChevronRight /> },
};

export const Secondary = {
  args: { variant: 'secondary', iconLeft: <ChevronLeft />, iconRight: <ChevronRight /> },
};

export const Tertiary = {
  args: { variant: 'tertiary', iconLeft: <ChevronLeft />, iconRight: <ChevronRight /> },
};

export const Disabled = {
  args: { disabled: true, iconLeft: <ChevronLeft />, iconRight: <ChevronRight /> },
};

export const SmallSize = {
  name: 'Size — Small',
  args: { size: 'sm', iconLeft: <ChevronLeft />, iconRight: <ChevronRight /> },
};

export const WithIconOnly = {
  name: 'With User Icon (Card use case)',
  args: {
    variant: 'primary',
    size: 'sm',
    iconLeft: <UserIcon />,
    children: 'Become a member',
  },
};

export const NoIcons = {
  name: 'No Icons (Drawer use case)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
      <Button variant="secondary" size="md">Continue</Button>
      <Button variant="tertiary" size="md">Login with your password</Button>
    </div>
  ),
};
