'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
}

export default function Button({ children, variant = 'primary', loading, className = '', disabled, ...props }: ButtonProps) {
  const base = 'w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'text-white focus:ring-green-500',
    secondary: 'border focus:ring-green-300',
    ghost: 'underline underline-offset-2',
  };

  const variantStyles = {
    primary: { background: '#1E6F30', color: '#ffffff' },
    secondary: { background: '#ffffff', color: '#1E6F30', borderColor: '#c8dfc8' },
    ghost: { color: '#1E6F30' },
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${disabled || loading ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      style={variantStyles[variant]}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          Aguarde...
        </span>
      ) : children}
    </button>
  );
}
