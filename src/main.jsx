import { useState } from 'preact/hooks';
import { render } from 'preact';
import './styles/global.css';
import './app.css';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { Input } from './components/Input';
import { Dropdown } from './components/Dropdown';
import { LoginDrawer } from './components/LoginDrawer';

const CUSTOMER_TYPES = [
  { value: 'retail', label: 'Retail Store Owner' },
  { value: 'conv', label: 'Convenience Shop' },
  { value: 'hosp', label: 'Hospitality' },
  { value: 'catering', label: 'Catering & Events' },
  { value: 'online', label: 'Online/Delivery Only' },
];

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M10 12L6 8L10 4"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="5" r="3" stroke="currentColor" stroke-width="1.5" />
    <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
  </svg>
);

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

export function App() {
  const [email, setEmail] = useState('hello@brand.com');
  const [customerType, setCustomerType] = useState('retail');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <main class="showcase-page" data-theme="brand-a">
      <div class="showcase-shell">
        <section class="showcase-hero panel panel-hero">
          <div class="hero-copy">
            <p class="eyebrow">Component showcase</p>
            <p class="hero-text">
              These are the same custom components assembled in Storybook, now arranged in a real page so the app can demonstrate the full system in context.
            </p>
            <div class="hero-actions">
              <Button variant="primary" size="md" iconLeft={<ArrowLeftIcon />} iconRight={<ArrowRightIcon />}>
                Primary action
              </Button>
              <Button variant="secondary" size="md">
                Secondary action
              </Button>
              <Button variant="tertiary" size="md" disabled>
                Disabled state
              </Button>
            </div>
          </div>

          <div class="hero-spotlight">
            <div class="hero-spotlight-card">
              <span class="hero-spotlight-label">Live preview</span>
              <p>Interactive inputs, dropdowns, cards, and the login drawer all render directly in the app shell.</p>
            </div>
          </div>
        </section>

        <section class="showcase-grid">
          <article class="panel">
            <div class="panel-heading">
              <p class="eyebrow">Buttons</p>
              <h2>Variants and sizes</h2>
            </div>
            <div class="stacked-samples">
              <div class="button-row">
                <Button variant="primary" size="md" iconLeft={<ArrowLeftIcon />} iconRight={<ArrowRightIcon />}>
                  Primary
                </Button>
                <Button variant="secondary" size="md" iconLeft={<ArrowLeftIcon />} iconRight={<ArrowRightIcon />}>
                  Secondary
                </Button>
                <Button variant="tertiary" size="md" iconLeft={<ArrowLeftIcon />} iconRight={<ArrowRightIcon />}>
                  Tertiary
                </Button>
              </div>
              <div class="button-row compact">
                <Button variant="primary" size="sm" iconLeft={<UserIcon />}>
                  Small action
                </Button>
                <Button variant="secondary" size="sm">
                  Small secondary
                </Button>
              </div>
            </div>
          </article>

          <article class="panel">
            <div class="panel-heading">
              <p class="eyebrow">Cards</p>
              <h2>Promotional variants</h2>
            </div>
            <div class="card-stack">
              <div class="card-wrap card-wrap-large">
                <Card
                  size="lg"
                  heading="Join the family."
                  ctaLabel="Join"
                  ctaIcon={<UserIcon />}
                  image={<GeometricGraphic />}
                />
              </div>
              <div class="card-wrap card-wrap-small">
                <Card
                  size="sm"
                  heading="Join the family."
                  ctaLabel="Join"
                  ctaIcon={<UserIcon />}
                  image={<GeometricGraphic />}
                />
              </div>
            </div>
          </article>

          <article class="panel">
            <div class="panel-heading">
              <p class="eyebrow">Forms</p>
              <h2>Input and dropdown states</h2>
            </div>
            <div class="form-stack">
              <Input
                label="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                onClear={() => setEmail('')}
                required
              />
              <Dropdown
                label="Customer type"
                options={CUSTOMER_TYPES}
                value={customerType}
                onChange={setCustomerType}
                required
              />
            </div>
          </article>

          <article class="panel panel-wide">
            <div class="panel-heading panel-heading-inline">
              <div>
                <p class="eyebrow">Login drawer</p>
                <h2>Full-screen interaction</h2>
              </div>
              <Button variant="secondary" size="md" onClick={() => setIsDrawerOpen(true)}>
                Open drawer
              </Button>
            </div>
            <p class="panel-copy">
              This keeps the drawer wired into the live app so you can test the flow without switching back to Storybook.
            </p>

            {isDrawerOpen && <div class="login-drawer-reserve" aria-hidden="true" />}

            <LoginDrawer
              size="desktop"
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              onContinue={({ customerType: selectedType, email: selectedEmail }) => {
                console.log('Continue', { customerType: selectedType, email: selectedEmail });
                setIsDrawerOpen(false);
              }}
              onPassword={() => console.log('Password login')}
              onBecomeMember={() => console.log('Become member')}
            />
          </article>
        </section>
      </div>
    </main>
  );
}

render(<App />, document.getElementById('app'));