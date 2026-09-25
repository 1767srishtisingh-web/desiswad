import { useId } from 'react';
import { AlertCircle } from 'lucide-react';

function Wrapper({ id, label, hint, error, children, required }) {
  return (
    <div className={`field${error ? ' field--error' : ''}`}>
      <label className="field__label" htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
        {hint ? <span className="field__hint"> — {hint}</span> : null}
      </label>
      {children}
      {error ? (
        <p className="field__error" id={`${id}-error`}>
          <AlertCircle size={14} aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Input({ label, hint, error, required, ...rest }) {
  const auto = useId();
  const id = rest.id || auto;
  return (
    <Wrapper id={id} label={label} hint={hint} error={error} required={required}>
      <input
        {...rest}
        id={id}
        className="field__control"
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
    </Wrapper>
  );
}

export function TextArea({ label, hint, error, required, ...rest }) {
  const auto = useId();
  const id = rest.id || auto;
  return (
    <Wrapper id={id} label={label} hint={hint} error={error} required={required}>
      <textarea
        {...rest}
        id={id}
        className="field__control"
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
    </Wrapper>
  );
}

export function Select({ label, hint, error, required, options = [], ...rest }) {
  const auto = useId();
  const id = rest.id || auto;
  return (
    <Wrapper id={id} label={label} hint={hint} error={error} required={required}>
      <select
        {...rest}
        id={id}
        className="field__control"
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      >
        {options.map((opt) => {
          const value = typeof opt === 'string' ? opt : opt.value;
          const text = typeof opt === 'string' ? opt : opt.label;
          return (
            <option key={value} value={value}>
              {text}
            </option>
          );
        })}
      </select>
    </Wrapper>
  );
}

/** Radio-style chip group — keyboard accessible, no colour-only state. */
export function ChipGroup({ legend, hint, options, value, onChange, name }) {
  return (
    <fieldset className="field" style={{ border: 0, padding: 0, margin: '0 0 1rem' }}>
      <legend className="field__label" style={{ padding: 0 }}>
        {legend}
        {hint ? <span className="field__hint"> — {hint}</span> : null}
      </legend>
      <div className="chips" role="radiogroup" aria-label={legend}>
        {options.map((opt) => {
          const selected = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              name={name}
              aria-checked={selected}
              className={`chip${selected ? ' is-selected' : ''}`}
              onClick={() => onChange(opt.id)}
            >
              {selected ? <span aria-hidden="true">✓</span> : null}
              {opt.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
