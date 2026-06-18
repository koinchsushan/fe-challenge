/**
 * LoginDrawer
 *
 * Two explicit size variants matching Figma specs:
 *   desktop — 480×949px, h4 heading, md buttons, lg card
 *   mobile  — 5×812px, h5 heading, sm buttons, md card (sm card size)
 *
 * Props:
 *   isOpen              — boolean
 *   size                — 'desktop' | 'mobile'  (default: 'desktop')
 *   onClose             — () => void
 *   onContinue          — ({ customerType, email }) => void
 *   onPassword          — () => void
 *   onBecomeMember      — () => void
 *   customerTypeOptions — Array<{ value, label }>
 */

import { useState, useEffect, useRef } from "preact/hooks";
import { Button } from "../Button/index.js";
import { Input } from "../Input/index.js";
import { Dropdown } from "../Dropdown/index.js";
import { Card } from "../Card/index.js";

// ── Icons ─────────────────────────────────────────────────────────────────────

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    width="24"
    height="24"
  >
    <path
      d="M6 6l12 12M18 6L6 18"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="5" r="3" stroke="currentColor" stroke-width="1.5" />
    <path
      d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
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

const DEFAULT_OPTIONS = [
  { value: "retail", label: "Retail Store Owner" },
  { value: "conv", label: "Convenience Shop" },
  { value: "hosp", label: "Hospitality" },
  { value: "catering", label: "Catering & Events" },
  { value: "online", label: "Online/Delivery Only" },
  { value: "other", label: "Other" },
];

// ── Size config ───────────────────────────────────────────────────────────────
// All size-driven differences in one place — nothing scattered in the JSX.

const SIZE_CONFIG = {
  desktop: {
    panelWidth: "480px",
    panelHeight: "949px",
    headingSize: "text-h4", // ~40px
    buttonSize: "md",
    cardSize: "lg",
    panelPadding: "p-2xl",
    gap: "gap-lg",
    actionGap: "gap-2xl",
  },
  mobile: {
    panelWidth: "375px",
    panelHeight: "812px",
    headingSize: "text-h6", // ~24px
    buttonSize: "md",
    cardSize: "sm",
    panelPadding: "p-lg",
    gap: "gap-md",
    actionGap: "gap-xl",
  },
};

// ── Component ─────────────────────────────────────────────────────────────────

export function LoginDrawer({
  isOpen = false,
  size = "desktop",
  onClose,
  onContinue,
  onPassword,
  onBecomeMember,
  customerTypeOptions = DEFAULT_OPTIONS,
}) {
  const [customerType, setCustomerType] = useState("");
  const [email, setEmail] = useState("");
  const closeButtonRef = useRef(null);
  const drawerRef = useRef(null);

  const cfg = SIZE_CONFIG[size] ?? SIZE_CONFIG.desktop;

  // Focus close button on open
  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  // Escape to close + focus trap
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose?.();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = drawerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [role="combobox"]',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        class="fixed inset-0 z-40 bg-overlay"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Scroll container */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Log into your account"
        class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-3xl px-md"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose?.();
        }}
      >
        {/* Panel — fixed Figma dimensions */}
        <div
          class={[
            "relative bg-drawer-bg rounded-drawer shadow-xl",
            "flex flex-col overflow-hidden",
            cfg.panelPadding,
            cfg.gap,
          ].join(" ")}
          style={{
            width: cfg.panelWidth,
            maxWidth: "100%",
            minHeight: cfg.panelHeight,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            class={[
              "text-text-body ml-auto",
              "hover:opacity-70 transition-opacity",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
              "focus-visible:outline-[var(--border-action-active)]",
            ].join(" ")}
          >
            <CloseIcon />
          </button>

          <div
            class={["flex flex-col overflow-hidden", cfg.actionGap].join(" ")}
          >
            {/* Heading block */}

            <h2
              class={[
                "font-heading text-text-brand font-medium leading-[1.2]",
                cfg.headingSize,
              ].join(" ")}
            >
              Log into your account
            </h2>

            <p class="font-body text-base text-text-body">
              Please enter your email for a one-time-only code
            </p>

            {/* Form fields */}
            <div class={`flex flex-col ${size === "desktop" ? "gap-xl" : "gap-lg"}`}>
              <Dropdown
                label="Customer type"
                options={customerTypeOptions}
                value={customerType}
                onChange={setCustomerType}
              />
              <Input
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onClear={() => setEmail("")}
              />
            </div>

            {/* Action buttons — size driven by config */}
            <div class="flex flex-col gap-md">
              <Button
                variant="secondary"
                size={cfg.buttonSize}
                onClick={() => onContinue?.({ customerType, email })}
                class="w-full justify-center"
              >
                Continue
              </Button>
              <Button
                variant="tertiary"
                size={cfg.buttonSize}
                onClick={onPassword}
                class="w-full justify-center"
              >
                Login with your password
              </Button>
            </div>

            {/* Card — size driven by config */}
            <Card
              size={cfg.cardSize}
              heading="Join the family."
              ctaLabel="Become a member"
              ctaIcon={<UserIcon />}
              image={<GeometricGraphic />}
              onClick={onBecomeMember}
            />
          </div>
        </div>
      </div>
    </>
  );
}
