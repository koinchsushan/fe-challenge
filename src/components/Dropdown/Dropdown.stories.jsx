import { useState } from 'preact/hooks';
import { Dropdown } from './Dropdown.jsx';

const CUSTOMER_TYPES = [
  { value: 'retail',   label: 'Retail Store Owner' },
  { value: 'conv',     label: 'Convenience Shop' },
  { value: 'hosp',     label: 'Hospitality' },
  { value: 'catering', label: 'Catering & Events' },
  { value: 'online',   label: 'Online/Delivery Only' },
];

/** @type {import('@storybook/preact').Meta} */
export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'focus', 'selected', 'disabled', 'opened'],
    },
    label:    { control: 'text' },
    required: { control: 'boolean' },
  },
  args: {
    label:    'Label',
    options:  CUSTOMER_TYPES,
    required: true,
  },
};

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '320px' }}>
        <Dropdown {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

// ── All states — mirrors Figma layout ─────────────────────────────────────────

export const AllStates = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '320px' }}>
      {[
        { state: 'default',  value: '',        label: 'Default' },
        { state: 'focus',    value: '',        label: 'Focus' },
        { state: 'selected', value: 'retail',  label: 'Selected' },
        { state: 'disabled', value: 'retail',  label: 'Disabled' },
      ].map(({ state, value, label }) => (
        <div key={state} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Dropdown
            label="Label"
            options={CUSTOMER_TYPES}
            state={state}
            value={value}
            required
          />
        </div>
      ))}
    </div>
  ),
};

// ── Opened state ──────────────────────────────────────────────────────────────

export const Opened = {
  name: 'Opened (list visible)',
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '320px', paddingBottom: '280px' }}>
        <Dropdown
          label="Label"
          options={CUSTOMER_TYPES}
          state="opened"
          value={value}
          onChange={setValue}
          required
        />
      </div>
    );
  },
};

// ── Individual states ─────────────────────────────────────────────────────────

export const Default = {
  render: () => (
    <div style={{ width: '320px' }}>
      <Dropdown label="Label" options={CUSTOMER_TYPES} state="default" required />
    </div>
  ),
};

export const Selected = {
  render: () => (
    <div style={{ width: '320px' }}>
      <Dropdown label="Label" options={CUSTOMER_TYPES} state="selected" value="retail" required />
    </div>
  ),
};

export const Disabled = {
  render: () => (
    <div style={{ width: '320px' }}>
      <Dropdown label="Label" options={CUSTOMER_TYPES} state="disabled" value="retail" required />
    </div>
  ),
};

// ── Interactive ───────────────────────────────────────────────────────────────

export const Interactive = {
  name: 'Interactive (click to open)',
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '320px', paddingBottom: '280px' }}>
        <Dropdown
          label="Customer type"
          options={CUSTOMER_TYPES}
          value={value}
          onChange={setValue}
          required
        />
      </div>
    );
  },
};
