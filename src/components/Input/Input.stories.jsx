import { useState } from 'preact/hooks';
import { Input } from './Input.jsx';

/** @type {import('@storybook/preact').Meta} */
export default {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'focus', 'filled', 'disabled', 'error', 'success'],
    },
    label:    { control: 'text' },
    required: { control: 'boolean' },
  },
  args: {
    label:    'Input label',
    required: true,
  },
};

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '320px' }}>
        <Input
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClear={() => setValue('')}
        />
      </div>
    );
  },
};

// ── All states — mirrors Figma layout ────────────────────────────────────────

export const AllStates = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '320px' }}>
      {[
        { state: 'default',  value: '', label: 'Label' },
        { state: 'focus',    value: '',             label: 'Label' },
        { state: 'filled',   value: 'Placeholder',  label: 'Label' },
        { state: 'disabled', value: 'Input label',  label: 'Label' },
        { state: 'error',    value: 'Placeholder',  label: 'Label' },
        { state: 'success',  value: 'Placeholder',  label: 'Label' },
      ].map(({ state, value, label }) => (
        <div key={state} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Input
            label={label}
            state={state}
            value={value}
            required
          />
        </div>
      ))}
    </div>
  ),
};

// ── Individual state stories ──────────────────────────────────────────────────

export const Default = {
  render: () => (
    <div style={{ width: '320px' }}>
      <Input label="Label" state="default" value="" required />
    </div>
  ),
};

export const Focus = {
  render: () => (
    <div style={{ width: '320px' }}>
      <Input label="Label" state="focus" value="" required />
    </div>
  ),
};

export const Filled = {
  render: () => (
    <div style={{ width: '320px' }}>
      <Input label="Label" state="filled" value="Placeholder" required />
    </div>
  ),
};

export const Disabled = {
  render: () => (
    <div style={{ width: '320px' }}>
      <Input label="Label" state="disabled" value="Input label" required />
    </div>
  ),
};

export const Error = {
  render: () => (
    <div style={{ width: '320px' }}>
      <Input label="Label" state="error" value="Placeholder" required />
    </div>
  ),
};

export const Success = {
  render: () => (
    <div style={{ width: '320px' }}>
      <Input label="Label" state="success" value="Placeholder" required />
    </div>
  ),
};

// ── Interactive (uncontrolled) ────────────────────────────────────────────────

export const Interactive = {
  name: 'Interactive (type to test)',
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '320px' }}>
        <Input
          label="Email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClear={() => setValue('')}
          required
        />
      </div>
    );
  },
};
