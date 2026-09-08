import { useLayoutEffect, useRef, type ButtonHTMLAttributes, type InputHTMLAttributes, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react';
import { ArrowLeft, Eye, EyeOff, LoaderCircle } from 'lucide-react';

export function AppShell({ children, tone = 'surface' }: { children: ReactNode; tone?: 'surface' | 'cream' }) {
  return <div className={`app-shell app-shell--${tone}`}>{children}</div>;
}

export function Modal({ children, onClose, labelledBy, className = 'bottom-sheet', backdropClassName = '', role = 'dialog', closeOnBackdrop = false }: { children: ReactNode; onClose: () => void; labelledBy: string; className?: string; backdropClassName?: string; role?: 'dialog' | 'alertdialog'; closeOnBackdrop?: boolean }) {
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const backdrop = dialog.parentElement;
    const siblings = backdrop?.parentElement ? Array.from(backdrop.parentElement.children).filter((element) => element !== backdrop) as HTMLElement[] : [];
    const previousSiblingState = siblings.map((element) => ({ element, inert: element.inert, ariaHidden: element.getAttribute('aria-hidden') }));
    siblings.forEach((element) => { element.inert = true; element.setAttribute('aria-hidden', 'true'); });

    const focusableSelector = 'button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])';
    const frame = window.requestAnimationFrame(() => {
      (dialog.querySelector<HTMLElement>('[data-dialog-initial-focus]') || dialog.querySelector<HTMLElement>(focusableSelector) || dialog).focus();
    });
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeRef.current();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)).filter((element) => !element.hidden && element.getAttribute('aria-hidden') !== 'true');
      if (!focusable.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('keydown', handleKeyDown);
      previousSiblingState.forEach(({ element, inert, ariaHidden }) => {
        element.inert = inert;
        if (ariaHidden === null) element.removeAttribute('aria-hidden');
        else element.setAttribute('aria-hidden', ariaHidden);
      });
      window.requestAnimationFrame(() => previousFocus?.isConnected && previousFocus.focus());
    };
  }, []);

  return <div className={`modal-backdrop ${backdropClassName}`.trim()} role="presentation" onMouseDown={(event) => { if (closeOnBackdrop && event.target === event.currentTarget) onClose(); }}><section ref={dialogRef} className={className} role={role} aria-modal="true" aria-labelledby={labelledBy} tabIndex={-1}>{children}</section></div>;
}

export function handleTabKey(event: ReactKeyboardEvent<HTMLButtonElement>, currentIndex: number, count: number, onChange: (index: number) => void) {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const tablist = event.currentTarget.parentElement;
  const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 : event.key === 'ArrowLeft' ? (currentIndex - 1 + count) % count : (currentIndex + 1) % count;
  onChange(nextIndex);
  window.requestAnimationFrame(() => {
    const tabs = tablist?.querySelectorAll<HTMLElement>('[role="tab"]');
    tabs?.[nextIndex]?.focus();
  });
}

export function Page({ children, className = '', labelledBy }: { children: ReactNode; className?: string; labelledBy?: string }) {
  return <main id="main-content" className={`page ${className}`.trim()} aria-labelledby={labelledBy}>{children}</main>;
}

export function AppBar({ title, onBack, meta }: { title: string; onBack: () => void; meta?: string }) {
  return (
    <header className="app-bar">
      <button className="icon-button" type="button" onClick={onBack} aria-label="Go back">
        <ArrowLeft aria-hidden="true" size={21} strokeWidth={2.25} />
      </button>
      <div className="app-bar__title-wrap">
        <h1 className="app-bar__title">{title}</h1>
        {meta ? <span className="app-bar__meta">{meta}</span> : null}
      </div>
      <span className="app-bar__balance" aria-hidden="true" />
    </header>
  );
}

export function BrandMark({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="brand-mark brand-mark--compact" aria-label="Plan Pack Go" translate="no">
        <img src="/assets/plan-pack-go-logo.png" width="42" height="42" alt="" fetchPriority="high" />
        <span>Plan Pack Go</span>
      </div>
    );
  }
  return <img className="brand-logo" src="/assets/plan-pack-go-logo.png" width="220" height="220" alt="Plan Pack Go" fetchPriority="high" />;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  fullWidth?: boolean;
  busy?: boolean;
}

export function Button({ children, className = '', variant = 'primary', fullWidth = false, busy = false, disabled, ...props }: ButtonProps) {
  return (
    <button className={`button button--${variant} ${fullWidth ? 'button--full' : ''} ${className}`.trim()} disabled={disabled || busy} {...props}>
      {busy ? <LoaderCircle className="button__spinner" aria-hidden="true" size={18} /> : null}
      {children}
    </button>
  );
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helper?: string;
  passwordVisible?: boolean;
  onTogglePassword?: () => void;
}

export function TextField({ id, label, error, helper, className = '', passwordVisible, onTogglePassword, ...props }: TextFieldProps) {
  const supportId = `${id}-support`;
  return (
    <div className={`field ${error ? 'field--error' : ''} ${className}`.trim()}>
      <label className="field__label" htmlFor={id}>{label}</label>
      <div className="field__control">
        <input id={id} className="field__input" aria-invalid={Boolean(error)} aria-describedby={error || helper ? supportId : undefined} {...props} />
        {onTogglePassword ? (
          <button className="field__toggle" type="button" onClick={onTogglePassword} aria-label={passwordVisible ? 'Hide password' : 'Show password'}>
            {passwordVisible ? <EyeOff aria-hidden="true" size={20} /> : <Eye aria-hidden="true" size={20} />}
          </button>
        ) : null}
      </div>
      {error || helper ? <p id={supportId} className="field__support" role={error ? 'alert' : undefined}>{error || helper}</p> : null}
    </div>
  );
}

export function Avatar({ initials, label, index = 0 }: { initials: string; label: string; index?: number }) {
  return <span className={`avatar avatar--${(index % 4) + 1}`} title={label} aria-label={label}>{initials}</span>;
}

export function Toast({ message }: { message: string }) {
  return <div className="toast" role="status" aria-live="polite">{message}</div>;
}

export function ProgressBar({ value, label }: { value: number; label: string }) {
  const safeValue = Math.max(0, Math.min(100, Math.round(value)));
  return <div className="progress-track" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={safeValue}><span style={{ width: `${safeValue}%` }} /></div>;
}
