import { Card } from './Card.jsx';

const GeometricGraphic = () => (
  <svg
    width="145"
    height="146"
    viewBox="0 0 145 146"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_2183_4939)">
      <mask id="path-1-inside-1_2183_4939" fill="white">
        <path d="M0 8C0 3.58173 3.58172 0 8 0H136.413C140.831 0 144.413 3.58172 144.413 8V138C144.413 142.418 140.831 146 136.413 146H7.99999C3.58172 146 0 142.418 0 138V8Z" />
      </mask>
      <path
        d="M0 8C0 3.58173 3.58172 0 8 0H136.413C140.831 0 144.413 3.58172 144.413 8V138C144.413 142.418 140.831 146 136.413 146H7.99999C3.58172 146 0 142.418 0 138V8Z"
        fill="var(--surface-page)"
      />
      <path
        d="M1.94922 72.8495H72.1168V143.761L1.94922 72.8495Z"
        fill="var(--surface-brand-primary)"
      />
      <path
        d="M142.284 143.761L72.1168 72.8495L1.94922 2.67896M72.1168 72.8495H1.94922L72.1168 143.761V72.8495Z"
        stroke="black"
        stroke-width="1.5"
      />
    </g>
    <path
      d="M8 1.5H136.413V-1.5H8V1.5ZM142.913 8V138H145.913V8H142.913ZM136.413 144.5H7.99999V147.5H136.413V144.5ZM1.5 138V8H-1.5V138H1.5ZM7.99999 144.5C4.41014 144.5 1.5 141.59 1.5 138H-1.5C-1.5 143.247 2.75329 147.5 7.99999 147.5V144.5ZM142.913 138C142.913 141.59 140.003 144.5 136.413 144.5V147.5C141.66 147.5 145.913 143.247 145.913 138H142.913ZM136.413 1.5C140.003 1.5 142.913 4.41015 142.913 8H145.913C145.913 2.7533 141.66 -1.5 136.413 -1.5V1.5ZM8 -1.5C2.75329 -1.5 -1.5 2.7533 -1.5 8H1.5C1.5 4.41015 4.41015 1.5 8 1.5V-1.5Z"
      fill="black"
      mask="url(#path-1-inside-1_2183_4939)"
    />
    <defs>
      <clipPath id="clip0_2183_4939">
        <path
          d="M0 8C0 3.58173 3.58172 0 8 0H136.413C140.831 0 144.413 3.58172 144.413 8V138C144.413 142.418 140.831 146 136.413 146H7.99999C3.58172 146 0 142.418 0 138V8Z"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
);

const UserIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 10.5V9.5C10 8.96957 9.78929 8.46086 9.41421 8.08579C9.03914 7.71071 8.53043 7.5 8 7.5H4C3.46957 7.5 2.96086 7.71071 2.58579 8.08579C2.21071 8.46086 2 8.96957 2 9.5V10.5M8 3.5C8 4.60457 7.10457 5.5 6 5.5C4.89543 5.5 4 4.60457 4 3.5C4 2.39543 4.89543 1.5 6 1.5C7.10457 1.5 8 2.39543 8 3.5Z"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);


/** @type {import('@storybook/preact').Meta} */
export default {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['lg', 'sm'],
    },
    heading: { control: 'text' },
    ctaLabel: { control: 'text' },
  },
  args: {
    heading: 'Join the family.',
    ctaLabel: 'Join',
  },
};

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground = {
  args: {
    size: 'lg',
    ctaIcon: <UserIcon />,
    image: <GeometricGraphic />,
  },
};

// ── Both sizes — mirrors Figma layout ────────────────────────────────────────

export const AllSizes = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div style={{ width: '392px' }}>
        <Card
          size="lg"
          heading="Join the family."
          ctaLabel="Join"
          ctaIcon={<UserIcon />}
          image={<GeometricGraphic />}
        />
      </div>
      <div style={{ width: '295px' }}>
        <Card
          size="sm"
          heading="Join the family."
          ctaLabel="Join"
          ctaIcon={<UserIcon />}
          image={<GeometricGraphic />}
        />
      </div>
    </div>
  ),
};

// ── Large ─────────────────────────────────────────────────────────────────────

export const Large = {
  name: 'Size — Large',
  render: () => (
    <div style={{ width: '392px' }}>
      <Card
        size="lg"
        heading="Join the family."
        ctaLabel="Join"
        ctaIcon={<UserIcon />}
        image={<GeometricGraphic />}
      />
    </div>
  ),
};

// ── Small ─────────────────────────────────────────────────────────────────────

export const Small = {
  name: 'Size — Small',
  render: () => (
    <div style={{ width: '295px' }}>
      <Card
        size="sm"
        heading="Join the family."
        ctaLabel="Join"
        ctaIcon={<UserIcon />}
        image={<GeometricGraphic />}
      />
    </div>
  ),
};

// ── Drawer use case — matches the Login Drawer design ─────────────────────────

export const DrawerVariant = {
  name: 'Drawer use case (Become a member)',
  render: () => (
    <div style={{ width: '403px' }}>
      <Card
        size="lg"
        heading="Join the family."
        ctaLabel="Become a member"
        ctaIcon={<UserIcon />}
        image={<GeometricGraphic />}
      />
    </div>
  ),
};

