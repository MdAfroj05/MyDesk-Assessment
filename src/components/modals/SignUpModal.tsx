import { useState, useId } from 'react'
import { Eye, EyeOff, Hexagon, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react'
import { ModalBase } from './ModalBase'
import { useModal } from '../../context/ModalContext'

export function SignUpModal() {
  const { openModal } = useModal()
  const headingId = useId()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Full name is required.'
    if (!email.trim()) {
      e.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = 'Please enter a valid email.'
    }
    if (!password) {
      e.password = 'Password is required.'
    } else if (password.length < 6) {
      e.password = 'Password must be at least 6 characters.'
    }
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      openModal('dashboard')
    }, 1000)
  }

  const passwordStrength = password.length === 0
    ? null
    : password.length < 6
    ? 'weak'
    : password.length < 10
    ? 'fair'
    : 'strong'

  const strengthConfig = {
    weak:   { label: 'Weak',   color: 'bg-red-500',   textColor: 'text-red-400',   bars: 1 },
    fair:   { label: 'Fair',   color: 'bg-amber-500',  textColor: 'text-amber-400',  bars: 2 },
    strong: { label: 'Strong', color: 'bg-emerald-500', textColor: 'text-emerald-400', bars: 3 },
  }

  return (
    <ModalBase labelId={headingId} maxWidth="max-w-sm">
      <div className="px-8 pt-8 pb-7">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-7">
          <div className="relative">
            <Hexagon className="w-7 h-7 text-brand-500 fill-brand-500/20" aria-hidden="true" />
            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-brand-300 font-mono" aria-hidden="true">MD</span>
          </div>
          <span className="text-sm font-semibold text-white">MyDesk</span>
        </div>

        <h2 id={headingId} className="text-xl font-bold text-white mb-1">Start building</h2>
        <p className="text-sm text-surface-500 mb-6">Create your free MyDesk workspace</p>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="signup-name" className="block text-xs font-medium text-surface-400 mb-1.5">
              Full name
            </label>
            <input
              id="signup-name"
              type="text"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Chen"
              className={`w-full px-3.5 py-2.5 bg-surface-800/70 border rounded-lg text-sm text-white placeholder:text-surface-600 outline-none transition-all
                ${errors.name ? 'border-red-500/60 focus:border-red-500' : 'border-surface-700 hover:border-surface-600 focus:border-brand-500 focus:ring-1 focus:ring-brand-500/40'}`}
            />
            {errors.name && (
              <p className="flex items-center gap-1 mt-1 text-[11px] text-red-400">
                <AlertCircle className="w-3 h-3" aria-hidden="true" />{errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="signup-email" className="block text-xs font-medium text-surface-400 mb-1.5">
              Work email
            </label>
            <input
              id="signup-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className={`w-full px-3.5 py-2.5 bg-surface-800/70 border rounded-lg text-sm text-white placeholder:text-surface-600 outline-none transition-all
                ${errors.email ? 'border-red-500/60 focus:border-red-500' : 'border-surface-700 hover:border-surface-600 focus:border-brand-500 focus:ring-1 focus:ring-brand-500/40'}`}
            />
            {errors.email && (
              <p className="flex items-center gap-1 mt-1 text-[11px] text-red-400">
                <AlertCircle className="w-3 h-3" aria-hidden="true" />{errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="signup-password" className="block text-xs font-medium text-surface-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className={`w-full px-3.5 py-2.5 pr-10 bg-surface-800/70 border rounded-lg text-sm text-white placeholder:text-surface-600 outline-none transition-all
                  ${errors.password ? 'border-red-500/60 focus:border-red-500' : 'border-surface-700 hover:border-surface-600 focus:border-brand-500 focus:ring-1 focus:ring-brand-500/40'}`}
              />
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-600 hover:text-surface-400 transition-colors"
              >
                {showPassword
                  ? <EyeOff className="w-4 h-4" aria-hidden="true" />
                  : <Eye className="w-4 h-4" aria-hidden="true" />}
              </button>
            </div>
            {/* Password strength */}
            {passwordStrength && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        i <= strengthConfig[passwordStrength].bars
                          ? strengthConfig[passwordStrength].color
                          : 'bg-surface-700'
                      }`}
                    />
                  ))}
                </div>
                <p className={`text-[10px] font-medium ${strengthConfig[passwordStrength].textColor}`}>
                  {strengthConfig[passwordStrength].label} password
                </p>
              </div>
            )}
            {errors.password && (
              <p className="flex items-center gap-1 mt-1 text-[11px] text-red-400">
                <AlertCircle className="w-3 h-3" aria-hidden="true" />{errors.password}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            aria-disabled={loading}
            className="w-full flex items-center justify-center gap-2 text-sm font-semibold px-4 py-2.5 bg-brand-500 hover:bg-brand-400 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 shadow-lg shadow-brand-500/20 group mt-1"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                Creating workspace…
              </>
            ) : (
              <>
                Create Free Account
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </>
            )}
          </button>

          {/* Terms note */}
          <p className="text-[10px] text-surface-600 text-center leading-relaxed">
            By signing up you agree to our{' '}
            <button type="button" onClick={() => openModal('terms')} className="text-surface-500 hover:text-surface-300 underline underline-offset-2 transition-colors">Terms</button>
            {' '}and{' '}
            <button type="button" onClick={() => openModal('privacy')} className="text-surface-500 hover:text-surface-300 underline underline-offset-2 transition-colors">Privacy Policy</button>.
          </p>
        </form>

        {/* Switch to sign in */}
        <p className="text-center text-xs text-surface-600 mt-4">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => openModal('signin')}
            className="text-brand-400 hover:text-brand-300 font-medium transition-colors"
          >
            Sign in
          </button>
        </p>
      </div>
    </ModalBase>
  )
}
