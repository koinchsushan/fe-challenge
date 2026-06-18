/**
 * Input
 *
 * Props:
 *   label       — string  (floating label text)
 *   state       — 'default' | 'focus' | 'filled' | 'disabled' | 'error' | 'success'
 *   value       — string
 *   onChange    — handler
 *   onClear     — handler (called when × is clicked)
 *   required    — boolean
 *   placeholder — string (used as aria fallback, not shown visually)
 *   id          — string
 */

import { useState, useId } from 'preact/hooks';

// ── Icons ────────────────────────────────────────────────────────────────────

const ClearIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
  </svg>
);

const SuccessIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8l4 4 6-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

// ── State-to-style maps ──────────────────────────────────────────────────────

// Border colour per state
const BORDER_STATE = {
  default:  'border-field-border',
  focus:    'border-[1.5px] border-field-border',
  filled:   'border-[1.5px] border-field-border',
  disabled: 'border-none',
  error:    'border-[1.5px] border-field-border-error',
  success:  'border-[1.5px] border-field-border',
};

// Label colour per state
const LABEL_STATE = {
  default:  'text-field-label',
  focus:    'text-field-label',   
  filled:   'text-field-label',
  disabled: 'text-field-disabled',
  error:    'text-field-error',
  success:  'text-field-label',
};

// Icon colour per state (right-side icon)
const ICON_STATE = {
  default:  'text-field-label',
  focus:    'text-field-label',
  filled:   'text-field-label',
  disabled: 'text-field-disabled',
  error:    'text-field-icon-error',
  success:  'text-field-icon-success',
};

export function Input({
  label = 'Label',
  state: stateProp,
  value: valueProp,
  onChange,
  onClear,
  required = false,
  id: idProp,
  class: className = '',
  ...rest
}) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  // Allow uncontrolled usage when no value/state prop passed
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;

  // Derive state from props or internal state
  const disabled = stateProp === 'disabled' || rest.disabled;
  const state = stateProp ?? (
    disabled       ? 'disabled' :
    isFocused      ? 'focus'    :
    value          ? 'filled'   : 'default'
  );
  const isFloated = state !== 'default';

  const showClear  = (state === 'filled' || state === 'focus' || state === 'default') && value && !disabled;
  const showSuccess = state === 'success';

  function handleChange(e) {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e);
  }

  function handleClear() {
    if (!isControlled) setInternalValue('');
    onClear?.();
  }

  return (
    <div class={['flex flex-col gap-xs', className].filter(Boolean).join(' ')}>
      {/* Field wrapper */}
      <div class="relative w-full">
        {/* Border container */}
        <div
          class={[
            'relative rounded-lg border transition-colors duration-150 h-[52px]',
            BORDER_STATE[state],
            disabled ? 'bg-field-bg-disabled' : state === 'filled' ? 'bg-page-bg' : 'bg-field-bg'
          ].filter(Boolean).join(' ')}
        >
          {/* Floating label */}
          <label
            for={id}
            class={[
              'absolute left-md transition-all duration-150 pointer-events-none font-body select-none',
              LABEL_STATE[state],
              isFloated
                ? 'left-xs -top-sm bg-white px-2xs text-xs'
                : 'top-1/2 -translate-y-1/2 text-base',
              // On error/success bg, label chip needs matching bg
              state === 'error'   ? 'bg-field-bg-error'   : '',
              state === 'success' ? 'bg-field-bg-success'  : '',
              disabled            ? 'bg-field-bg-disabled' : '',
            ].filter(Boolean).join(' ')}
          >
            {label}
          </label>

          {/* Input */}
          <input
            id={id}
            type="text"
            value={value}
            disabled={disabled}
            onInput={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            class={[
              'w-full h-full bg-transparent outline-none font-body text-base',
              state === 'default' ? 'text-field-label' :  state === 'error'   ? 'text-field-error'   :'text-field-text',
              'px-md py-sm',     
              'disabled:text-field-disabled disabled:cursor-not-allowed',
              'placeholder:text-transparent',
            ].join(' ')}
            placeholder={label}
            aria-required={required}
            aria-invalid={state === 'error'}
            {...rest}
          />

          {/* Right icon: clear / success */}
          <div class="absolute right-md top-1/2 -translate-y-1/2 flex items-center">
            {showSuccess && (
              <span class={['w-4 h-4', ICON_STATE.success].join(' ')}>
                <SuccessIcon />
              </span>
            )}
            {showClear && (
              <button
                type="button"
                onClick={handleClear}
                class={[
                  'w-4 h-4 flex items-center justify-center',
                  'rounded-full hover:opacity-70 transition-opacity',
                  ICON_STATE[state],
                ].join(' ')}
                aria-label="Clear input"
              >
                <ClearIcon />
              </button>
            )}
            {state === 'error' && (
              <button
                type="button"
                onClick={handleClear}
                class={['w-4 h-4 flex items-center justify-center', ICON_STATE.error].join(' ')}
                aria-label="Clear input"
              >
                <ClearIcon />
              </button>
            )}
            {state === 'disabled' && value && (
              <span class={['w-4 h-4', ICON_STATE.disabled].join(' ')}>
                <ClearIcon />
              </span>
            )}
          </div>
        </div>
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
