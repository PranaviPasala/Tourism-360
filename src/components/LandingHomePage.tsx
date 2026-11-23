import React, { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { ArrowRight, Compass, ExternalLink, Eye, EyeOff, Loader2 } from 'lucide-react';
import firebaseConfig from '../../firebase-applet-config.json';
import { auth, db, googleProvider } from '../lib/firebase';

interface LandingHomePageProps {
  onAuthSuccess?: () => void;
}

export const LandingHomePage: React.FC<LandingHomePageProps> = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsProviderEnable, setNeedsProviderEnable] = useState(false);

  const ensureUserProfile = async (
    uid: string,
    userEmail: string,
    name: string,
    mobile: string
  ) => {
    try {
      const userRef = doc(db, 'users', uid);
      const cleanName = (name || 'Traveller').trim().slice(0, 120) || 'Traveller';
      const rawEmail = (userEmail || auth.currentUser?.email || '').trim();
      const cleanEmail = (rawEmail.length >= 3 ? rawEmail : `${uid.slice(0, 12)}@tourism360.app`).slice(0, 160);
      const cleanMobile = (mobile || '').trim().slice(0, 24);

      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        await setDoc(userRef, {
          uid,
          fullName: cleanName,
          email: cleanEmail,
          mobileNumber: cleanMobile,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } else if (name.trim() || mobile.trim()) {
        const existingData = snap.data();
        await updateDoc(userRef, {
          fullName: name.trim() ? cleanName : existingData.fullName || 'Traveller',
          mobileNumber: mobile.trim() ? cleanMobile : existingData.mobileNumber || '',
          updatedAt: serverTimestamp(),
        });
      }
    } catch (err) {
      // Non-blocking: Firebase Auth session is already established even if profile sync retries later
      console.warn('Profile sync warning:', err);
    }
  };

  // Complete sign-in if returning from Google redirect fallback
  useEffect(() => {
    let active = true;
    getRedirectResult(auth)
      .then(async (result) => {
        if (!active || !result?.user) return;
        const user = result.user;
        await user.getIdToken(true);
        await ensureUserProfile(
          user.uid,
          user.email || '',
          user.displayName || 'Traveller',
          user.phoneNumber || ''
        );
        onAuthSuccess?.();
      })
      .catch((err: unknown) => {
        if (!active) return;
        const code = (err as { code?: string })?.code || '';
        if (code && code !== 'auth/no-current-user') {
          setError(err instanceof Error ? err.message : 'Unable to complete Google sign-in redirect.');
        }
      });
    return () => {
      active = false;
    };
  }, [onAuthSuccess]);

  const handleGoogleSignIn = async () => {
    setError(null);
    setNeedsProviderEnable(false);
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await user.getIdToken(true);
      await ensureUserProfile(
        user.uid,
        user.email || email.trim(),
        fullName.trim() || user.displayName || 'Traveller',
        mobileNumber.trim() || user.phoneNumber || ''
      );
      onAuthSuccess?.();
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code || '';
      if (code === 'auth/popup-closed-by-user') {
        setError('Google sign-in window was closed before completing. Please try again.');
      } else if (code === 'auth/popup-blocked') {
        try {
          await signInWithRedirect(auth, googleProvider);
          return;
        } catch {
          setError('Pop-up was blocked by your browser. Please allow pop-ups for this site and click Continue with Google.');
        }
      } else if (code === 'auth/unauthorized-domain') {
        setNeedsProviderEnable(true);
        setError(
          `This domain (${window.location.hostname}) needs to be added under Authentication > Settings > Authorized Domains in Firebase Console.`
        );
      } else if (code === 'auth/network-request-failed') {
        setError('Network error while contacting Google Sign-In. Check your internet connection and retry.');
      } else {
        setError(err instanceof Error ? err.message : 'Unable to sign in with Google.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNeedsProviderEnable(false);

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (mode === 'register') {
      if (fullName.trim().length < 2) {
        setError('Please enter your full name.');
        return;
      }
      const digits = mobileNumber.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 15) {
        setError('Please enter a valid 10–15 digit mobile number.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Password and Confirm Password do not match.');
        return;
      }
    }

    setLoading(true);
    try {
      if (mode === 'register') {
        const credential = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
        await updateProfile(credential.user, { displayName: fullName.trim() });
        await credential.user.getIdToken(true);
        await ensureUserProfile(
          credential.user.uid,
          trimmedEmail,
          fullName.trim(),
          mobileNumber.trim()
        );
        try {
          await sendEmailVerification(credential.user);
        } catch {
          // Optional verification send
        }
        onAuthSuccess?.();
      } else {
        const credential = await signInWithEmailAndPassword(auth, trimmedEmail, password);
        await credential.user.getIdToken(true);
        await ensureUserProfile(
          credential.user.uid,
          credential.user.email || trimmedEmail,
          credential.user.displayName || 'Traveller',
          ''
        );
        onAuthSuccess?.();
      }
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code || '';
      if (code === 'auth/email-already-in-use') {
        setError('An account with this email already exists. Please switch to Sign In.');
      } else if (
        code === 'auth/invalid-credential' ||
        code === 'auth/wrong-password' ||
        code === 'auth/user-not-found'
      ) {
        setError('Invalid email or password. If you previously signed up with Google, click "Continue with Google" below.');
      } else if (code === 'auth/operation-not-allowed') {
        setNeedsProviderEnable(true);
        setError(
          'Email/Password sign-in is not yet enabled in Firebase Console for this project. Click "Continue with Google" below for instant access, or enable Email/Password in Firebase Authentication Providers.'
        );
      } else if (code === 'auth/unauthorized-domain') {
        setNeedsProviderEnable(true);
        setError(
          `Add ${window.location.hostname} to Authorized Domains in Firebase Authentication Settings, or sign in using Google.`
        );
      } else if (code === 'auth/too-many-requests') {
        setError('Too many login attempts. Please wait a minute or use "Continue with Google" below.');
      } else if (code === 'auth/weak-password') {
        setError('Please choose a stronger password (at least 6 characters).');
      } else {
        setError(err instanceof Error ? err.message : 'Authentication failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col">
      {/* Full-bleed background photograph of India */}
      <img
        src="/src/assets/images/hero_india_panorama_1795249606332.jpg"
        alt="Golden hour landscape of Udaipur Lake Pichola and Aravalli hills in India"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/45"
      />

      {/* Top-Left Corner Brand Header */}
      <header className="relative z-10 w-full px-6 sm:px-10 pt-5 sm:pt-7">
        <div className="inline-flex items-center gap-3">
          <Compass className="w-9 h-9 sm:w-11 sm:h-11 text-orange-400 shrink-0" />
          <span className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-white">
            Tourism 360
          </span>
        </div>
      </header>

      {/* Parallel layout: Left Quotation, Right Sign In / Register */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 sm:px-10 py-8 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: Meaningful Tourism 360 Quotation */}
        <section className="md:col-span-6 lg:col-span-7 text-white flex flex-col justify-center">
          <blockquote className="max-w-2xl">
            <p
              className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-[3.3rem] font-normal italic leading-[1.22] tracking-tight text-emerald-50"
              style={{ textWrap: 'balance' }}
            >
              “Explore India’s iconic wonders, uncover its hidden heritage, celebrate living crafts and cuisine, and travel in ways that empower every local community.”
            </p>
          </blockquote>
        </section>

        {/* Right Side: Parallel Sign In / Register Card */}
        <section className="md:col-span-6 lg:col-span-5 w-full max-w-md md:ml-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-100 p-6 sm:p-8 text-slate-900">
          {/* Mode Switcher */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-emerald-50 rounded-xl mb-4 border border-emerald-100">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setError(null);
                setNeedsProviderEnable(false);
              }}
              className={`py-2 px-4 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                mode === 'signin'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-slate-600 hover:text-emerald-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setError(null);
                setNeedsProviderEnable(false);
              }}
              className={`py-2 px-4 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                mode === 'register'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-slate-600 hover:text-emerald-900'
              }`}
            >
              Register
            </button>
          </div>

          <div className="mb-3">
            <h1 className="font-display text-xl font-semibold text-slate-900">
              {mode === 'signin' ? 'Sign In to Tourism 360' : 'Register Your Account'}
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              {mode === 'signin'
                ? 'Access destinations across India, hidden culture, hotels, and your trip planner.'
                : 'Enter your details below to create your Tourism 360 profile.'}
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-4 p-3 rounded-lg bg-orange-50 border border-orange-200 text-xs sm:text-sm text-orange-900 leading-relaxed space-y-2"
            >
              <p>{error}</p>
              {needsProviderEnable && (
                <a
                  href={`https://console.firebase.google.com/project/${firebaseConfig.projectId}/authentication/providers`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-orange-950 underline hover:text-orange-700"
                >
                  <span>Open Firebase Auth Sign-in Providers</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}

          <form onSubmit={handleEmailSubmit} className="space-y-3" noValidate>
            {mode === 'register' && (
              <div>
                <label htmlFor="auth-fullname" className="block text-xs font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  id="auth-fullname"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                />
              </div>
            )}

            <div>
              <label htmlFor="auth-email" className="block text-xs font-medium text-slate-700 mb-1">
                Email Address
              </label>
              <input
                id="auth-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
              />
            </div>

            {mode === 'register' && (
              <div>
                <label htmlFor="auth-mobile" className="block text-xs font-medium text-slate-700 mb-1">
                  Mobile Number
                </label>
                <input
                  id="auth-mobile"
                  type="tel"
                  required
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                />
              </div>
            )}

            <div>
              <label htmlFor="auth-password" className="block text-xs font-medium text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="auth-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full px-3.5 py-2 pr-10 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-800"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label htmlFor="auth-confirm" className="block text-xs font-medium text-slate-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="auth-confirm"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2.5 px-5 bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>{mode === 'signin' ? 'Sign In' : 'Register & Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Continue with Google After Password */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-500">or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={handleGoogleSignIn}
            className="w-full inline-flex items-center justify-center gap-2.5 py-2.5 px-4 bg-white border border-slate-300 hover:bg-emerald-50 hover:border-emerald-300 text-slate-800 text-sm font-semibold rounded-lg transition-colors"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </section>
      </main>
    </div>
  );
};
