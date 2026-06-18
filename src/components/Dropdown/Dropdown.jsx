/**
 * Dropdown
 *
 * Props:
 *   label    — string (floating label)
 *   options  — Array<{ value: string, label: string }>
 *   value    — string (controlled selected value)
 *   onChange — (value: string) => void
 *   state    — 'default' | 'focus' | 'selected' | 'disabled' | 'opened'
 *   required — boolean
 *   icon     — JSX element (left icon, defaults to clock)
 *   id       — string
 */

import { useState, useRef, useEffect, useId } from 'preact/hooks';

// ── Icons ─────────────────────────────────────────────────────────────────────

const ClockIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5" />
    <path d="M8 5v3.5l2 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

const ChevronDown = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

const ChevronUp = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 10l4-4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

// ── State maps ────────────────────────────────────────────────────────────────

const BORDER_STATE = {
  default:  'border-field-border',
  focus:    'border-[1.5px] border-field-border',
  selected: 'border-[1.5px] border-field-border',
  disabled: 'border-none',
  opened:   'border-[1.5px] border-field-border',
};
const LABEL_STATE = {
  default:  'text-field-label',
  focus:    'text-field-label',
  selected: 'text-field-label',
  disabled: 'text-field-disabled',
  opened:   'text-field-label',
};

const ICON_STATE = {
  default:  'text-field-label',
  focus:    'text-field-label',
  selected: 'text-field-label',
  disabled: 'text-field-disabled',
  opened:   'text-field-label',
};

export function Dropdown({
  label = 'Label',
  options = [],
  value: valueProp,
  onChange,
  state: stateProp,
  required = false,
  icon,
  id: idProp,
  class: className = '',
}) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const listId = `${id}-list`;

  const [isOpen, setIsOpen] = useState(stateProp === 'opened');
  const [internalValue, setInternalValue] = useState('');
  const containerRef = useRef(null);

  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;
  const disabled = stateProp === 'disabled';

  // Derive display state
  const state = stateProp ?? (
    disabled  ? 'disabled' :
    isOpen    ? 'opened'   :
    value     ? 'selected' : 'default'
  );

  const isFloated = state !== 'default';

  const selectedLabel = options.find(o => o.value === value)?.label ?? value;

  // Close on outside click
  useEffect(() => {
    function handleOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  function handleToggle() {
    if (disabled) return;
    setIsOpen(prev => !prev);
  }

  function handleSelect(optionValue) {
    if (!isControlled) setInternalValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
  }

  // Keyboard navigation
  function handleKeyDown(e) {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(prev => !prev);
    }
    if (e.key === 'Escape') setIsOpen(false);
    if (e.key === 'ArrowDown' && isOpen) {
      e.preventDefault();
      const firstOption = containerRef.current?.querySelector('[role="option"]');
      firstOption?.focus();
    }
  }

  function handleOptionKeyDown(e, optionValue) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect(optionValue);
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
      containerRef.current?.querySelector('[role="combobox"]')?.focus();
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      e.target.nextElementSibling?.focus();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      e.target.previousElementSibling?.focus() ??
        containerRef.current?.querySelector('[role="combobox"]')?.focus();
    }
  }

  return (
    <div
      class={['flex flex-col gap-xs', className].filter(Boolean).join(' ')}
      ref={containerRef}
    >
      {/* Trigger + floating list — wrapped in relative so the list anchors to this */}
      <div class="relative">
        {/* Trigger */}
      <div
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-haspopup="listbox"
        aria-labelledby={`${id}-label`}
        aria-required={required}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        onClick={handleToggle}
        class={[
          'relative rounded-lg border transition-colors duration-150',
          'flex items-center gap-xs px-sm cursor-pointer select-none',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
          'focus-visible:outline-[var(--border-action-active)]',
          BORDER_STATE[state],
          disabled ? 'bg-field-bg-disabled cursor-not-allowed' : state === 'selected' ? 'bg-page-bg' : 'bg-field-bg',
        ].filter(Boolean).join(' ')}
        style={{ minHeight: '52px' }}
      >
        {/* Left icon */}
        <span class={['w-4 h-4 flex-shrink-0', ICON_STATE[state]].join(' ')}>
          {icon ?? <ClockIcon />}
        </span>

        {/* Floating label */}
        <span
          id={`${id}-label`}
          class={[
            'absolute transition-all duration-150 pointer-events-none font-body select-none',
              LABEL_STATE[state],
              isFloated
                ? 'left-xs -top-sm bg-white px-2xs text-xs rounded-lg'
                : 'top-1/2 -translate-y-1/2 text-base left-2xl ',
            disabled ? 'bg-field-bg-disabled' : '',
          ].filter(Boolean).join(' ')}
        >
          {label}
        </span>

        {/* Selected value text */}
        {(state === 'selected' || state === 'opened') && selectedLabel && (
          <span class="flex-1 pt-sm pb-xs text-base text-field-text font-body truncate">
            {selectedLabel}
          </span>
        )}

        {/* Spacer when no value shown */}
        {!(state === 'selected' || state === 'opened') && (
          <span class="flex-1" />
        )}

        {/* Chevron */}
        <span class={['w-4 h-4 flex-shrink-0 ml-auto', ICON_STATE[state]].join(' ')}>
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </span>
      </div>


        {/* Dropdown list */}
      {isOpen && options.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          class={[
            'absolute left-0 right-0 z-50',
            'rounded-field border border-field-border bg-field-bg shadow-md',
            'py-xs m-0 p-0 list-none overflow-y-auto max-h-[240px]',
          ].join(' ')}
          style={{ top: 'calc(100% + 4px)' }}
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              tabIndex={0}
              onKeyDown={(e) => handleOptionKeyDown(e, option.value)}
              onClick={() => handleSelect(option.value)}
              class={[
                'px-md py-sm text-base font-body text-field-text cursor-pointer',
                'hover:bg-[var(--surface-hover)] transition-colors duration-100',
                'focus-visible:outline-none focus-visible:bg-[var(--surface-hover)]',
                option.value === value ? 'font-semibold' : '',
              ].filter(Boolean).join(' ')}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      </div>

      

      {/* Required text */}
      {required && (
        <div class="text-[12px] text-field-disabled p-0.5 leading-none">
          <span class="text-[#FF9500]">*</span>
          required
        </div>
      )}
    </div>
  );
}
