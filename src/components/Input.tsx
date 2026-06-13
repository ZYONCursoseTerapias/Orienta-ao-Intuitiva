'use client';

import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { normalizeWhatsApp } from '@/lib/validation';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className = '', type, onBlur, ...props }, ref) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\W+/g, '-')}`;

    // Para campos tel, aplica máscara visual ao sair do campo
    const [displayValue, setDisplayValue] = useState(props.value as string ?? '');

    function handleTelBlur(e: React.FocusEvent<HTMLInputElement>) {
      const normalized = normalizeWhatsApp(e.target.value);
      if (normalized) {
        setDisplayValue(normalized);
        // propaga como evento sintético para que o onChange do pai atualize o state
        const nativeInput = e.target;
        const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
        nativeSetter?.call(nativeInput, normalized);
        nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
      onBlur?.(e);
    }

    const isTel = type === 'tel';

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={inputId} className="text-sm font-medium" style={{ color: '#1E6F30' }}>
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={`border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition ${className}`}
          style={{
            background: '#fafafa',
            borderColor: error ? '#f87171' : '#c8dfc8',
            color: '#1a1a1a',
          }}
          onBlur={isTel ? handleTelBlur : onBlur}
          {...props}
        />
        {hint && !error && <p className="text-xs" style={{ color: '#98BE98' }}>{hint}</p>}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
