import { useState, type FormEvent } from 'react';
import { Button, BrandMark, Page, TextField } from '../components/ui';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SplashScreen() {
  return (
    <Page className="splash-page">
      <div className="splash-art" aria-hidden="true">
        <span className="route-dot" />
        <span className="route-line" />
        <img className="splash-mascot" src="/assets/mascot-master-transparent.png" width="92" height="92" alt="" fetchPriority="high" />
        <span className="route-check">✓</span>
      </div>
      <BrandMark />
      <p className="splash-slogan">Plan smart. Pack right. Go ready.</p>
    </Page>
  );
}

interface LoginErrors { email?: string; password?: string }

export function LoginScreen({ onLogin, onSignUp }: { onLogin: () => void; onSignUp: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next: LoginErrors = {};
    if (!email) next.email = 'Enter your email address.';
    else if (!emailPattern.test(email)) next.email = 'Enter a valid email address.';
    if (!password) next.password = 'Enter your password.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) {
      window.setTimeout(() => document.querySelector<HTMLInputElement>('[aria-invalid="true"]')?.focus(), 0);
      return;
    }
    setSubmitting(true);
    window.setTimeout(onLogin, 650);
  };

  return (
    <Page className="auth-page" labelledBy="login-title">
      <div className="auth-brand-row"><BrandMark compact /></div>
      <section className="auth-heading">
        <h1 id="login-title">Welcome back</h1>
      </section>
      <form className="form-stack" onSubmit={submit} noValidate>
        <TextField id="login-email" name="email" label="Email" type="email" inputMode="email" autoComplete="email" spellCheck={false} placeholder="alex.tan@example.com" value={email} error={errors.email} onChange={(event) => setEmail(event.target.value)} onBlur={validate} />
        <TextField id="login-password" name="password" label="Password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Enter your password" value={password} error={errors.password} passwordVisible={showPassword} onTogglePassword={() => setShowPassword((value) => !value)} onChange={(event) => setPassword(event.target.value)} onBlur={validate} />
        <Button type="submit" fullWidth busy={submitting}>{submitting ? 'Logging in…' : 'Log In'}</Button>
        <div className="divider" aria-hidden="true"><span>or</span></div>
        <Button type="button" variant="secondary" fullWidth onClick={onLogin}><span className="google-mark" aria-hidden="true">G</span>Continue with Google</Button>
      </form>
      <p className="auth-switch">New to Plan Pack Go? <button className="text-link" type="button" onClick={onSignUp}>Sign Up</button></p>
    </Page>
  );
}

interface SignUpErrors { name?: string; email?: string; password?: string; confirm?: string }

export function SignUpScreen({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) {
  const [values, setValues] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState<SignUpErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next: SignUpErrors = {};
    if (!values.name.trim()) next.name = 'Enter your name.';
    if (!values.email) next.email = 'Enter your email address.';
    else if (!emailPattern.test(values.email)) next.email = 'Enter a valid email address.';
    if (!values.password) next.password = 'Create a password.';
    if (!values.confirm) next.confirm = 'Confirm your password.';
    else if (values.confirm !== values.password) next.confirm = 'Passwords do not match.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const update = (field: keyof typeof values, value: string) => setValues((current) => ({ ...current, [field]: value }));
  const validateField = (field: keyof typeof values) => {
    let message = '';
    if (field === 'name' && !values.name.trim()) message = 'Enter your name.';
    if (field === 'email' && !values.email) message = 'Enter your email address.';
    else if (field === 'email' && !emailPattern.test(values.email)) message = 'Enter a valid email address.';
    if (field === 'password' && !values.password) message = 'Create a password.';
    if (field === 'confirm' && !values.confirm) message = 'Confirm your password.';
    else if (field === 'confirm' && values.confirm !== values.password) message = 'Passwords do not match.';
    setErrors((current) => ({ ...current, [field]: message || undefined }));
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) {
      window.setTimeout(() => document.querySelector<HTMLInputElement>('[aria-invalid="true"]')?.focus(), 0);
      return;
    }
    setSubmitting(true);
    window.setTimeout(onComplete, 650);
  };

  return (
    <Page className="auth-page auth-page--signup" labelledBy="signup-title">
      <button className="back-link" type="button" onClick={onBack}><span aria-hidden="true">←</span> Back</button>
      <section className="auth-heading auth-heading--compact">
        <h1 id="signup-title">Create your account</h1>
      </section>
      <form className="form-stack" onSubmit={submit} noValidate>
        <TextField id="signup-name" name="name" label="Name" autoComplete="name" placeholder="Alex Tan" value={values.name} error={errors.name} onChange={(event) => update('name', event.target.value)} onBlur={() => validateField('name')} />
        <TextField id="signup-email" name="email" label="Email" type="email" inputMode="email" autoComplete="email" spellCheck={false} placeholder="alex.tan@example.com" value={values.email} error={errors.email} onChange={(event) => update('email', event.target.value)} onBlur={() => validateField('email')} />
        <TextField id="signup-password" name="password" label="Password" type="password" autoComplete="new-password" placeholder="Create a password" value={values.password} error={errors.password} onChange={(event) => update('password', event.target.value)} onBlur={() => validateField('password')} />
        <TextField id="signup-confirm" name="confirmPassword" label="Confirm Password" type="password" autoComplete="new-password" placeholder="Enter it again" value={values.confirm} error={errors.confirm} onChange={(event) => update('confirm', event.target.value)} onBlur={() => validateField('confirm')} />
        <Button type="submit" fullWidth busy={submitting}>{submitting ? 'Creating account…' : 'Create Account'}</Button>
      </form>
      <p className="auth-switch">Already have an account? <button className="text-link" type="button" onClick={onBack}>Log In</button></p>
    </Page>
  );
}
