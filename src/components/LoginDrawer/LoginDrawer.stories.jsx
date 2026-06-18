import { useState } from 'preact/hooks';
import { LoginDrawer } from './LoginDrawer.jsx';
import { Button } from '../Button/index.js';

/** @type {import('@storybook/preact').Meta} */
export default {
  title: 'Components/LoginDrawer',
  component: LoginDrawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['desktop', 'mobile'],
      description: 'desktop: 480×949 — mobile: 375×812',
    },
    isOpen: { control: 'boolean' },
  },
  args: {
    size: 'desktop',
    isOpen: false,
  },
};

// Shared page wrapper
function Page({ size, children }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--surface-page)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-family-body)',
    }}>
      {children}
    </div>
  );
}

// ── Interactive — toggle via button ──────────────────────────────────────────

export const DesktopInteractive = {
  name: 'Desktop — Interactive (480×949)',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Page>
        <Button variant="secondary" size="md" onClick={() => setIsOpen(true)}>
          Open Login Drawer
        </Button>
        <LoginDrawer
          size="desktop"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onContinue={(d) => { console.log('Continue:', d); setIsOpen(false); }}
          onPassword={() => console.log('Password login')}
          onBecomeMember={() => console.log('Become member')}
        />
      </Page>
    );
  },
};

export const MobileInteractive = {
  name: 'Mobile — Interactive (375×812)',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Page>
        <Button variant="secondary" size="sm" onClick={() => setIsOpen(true)}>
          Open Login Drawer
        </Button>
        <LoginDrawer
          size="mobile"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onContinue={(d) => { console.log('Continue:', d); setIsOpen(false); }}
          onPassword={() => console.log('Password login')}
          onBecomeMember={() => console.log('Become member')}
        />
      </Page>
    );
  },
};

// ── Static (pre-opened) — for visual inspection ───────────────────────────────

export const DesktopOpen = {
  name: 'Desktop — Open (static)',
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <Page>
        {!isOpen && (
          <Button variant="secondary" size="md" onClick={() => setIsOpen(true)}>
            Reopen
          </Button>
        )}
        <LoginDrawer
          size="desktop"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onContinue={(d) => console.log('Continue:', d)}
          onPassword={() => console.log('Password')}
          onBecomeMember={() => console.log('Become member')}
        />
      </Page>
    );
  },
};

export const MobileOpen = {
  name: 'Mobile — Open (static)',
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <Page>
        {!isOpen && (
          <Button variant="secondary" size="sm" onClick={() => setIsOpen(true)}>
            Reopen
          </Button>
        )}
        <LoginDrawer
          size="mobile"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onContinue={(d) => console.log('Continue:', d)}
          onPassword={() => console.log('Password')}
          onBecomeMember={() => console.log('Become member')}
        />
      </Page>
    );
  },
};

