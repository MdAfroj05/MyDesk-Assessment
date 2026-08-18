import { useState, useId } from 'react'
import { Eye, EyeOff, Hexagon, AlertCircle, ArrowRight } from 'lucide-react'
import { ModalBase } from './ModalBase'
import { useModal } from '../../context/ModalContext'
import { useAuth } from '../../context/AuthContext'

export function SignInModal() {
  const { openModal } = useModal()
  const { login } = useAuth()
  const headingId = useId()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!username.trim()) {
      setError('Please enter your username.')
      return
    }
    if (!password) {
      setError('Please enter your password.')
      return
    }

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      const success = login(username.trim(), password)
      if (success) {
        openModal('dashboard')
      } else {
        setError('Invalid username or password. Check your credentials and try again.')
      }
    }, 900)
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

        <h2 id={headingId} className="text-xl font-bold text-white mb-1">Welcome back</h2>
        <p className="text-sm text-surface-500 mb-6">Sign in to your workspace</p>

        {/* Hint */}
        <div className="flex items-start gap-2 p-3 mb-5 rounded-lg bg-brand-500/8 border border-brand-500/20">
          <AlertCircle className="w-3.5 h-3.5 text-brand-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-[11px] text-brand-300 leading-relaxed">
            Default credentials — username:{' '}
            <code className="font-mono font-semibold">admin</code>, password:{' '}
            <code className="font-mono font-semibold">admin@123</code>
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="signin-username" className="block text-xs font-medium text-surface-400 mb-1.5">
              Username
            </label>
            <input
              id="signin-username"
              type="text"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full px-3.5 py-2.5 bg-surface-800/70 border border-surface-700 hover:border-surface-600 focus:border-brand-500 focus:ring-1 focus:ring-brand-500/40 rounded-lg text-sm text-white placeholder:text-surface-600 outline-none transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="signin-password" className="block text-xs font-medium text-surface-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="signin-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 pr-10 bg-surface-800/70 border border-surface-700 hover:border-surface-600 focus:border-brand-500 focus:ring-1 focus:ring-brand-500/40 rounded-lg text-sm text-white placeholder:text-surface-600 outline-none transition-all"
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
          </div>

          {/* Error */}
          {error && (
            <div role="alert" className="flex items-center gap-2 p-2.5 rounded-lg bg-red-500/10 border border-red-500/20">
              <AlertCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" aria-hidden="true" />
              <p className="text-xs text-red-300">{error}</p>
            </div>
          )}

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
                Signing in…
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-surface-600 mt-5">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => openModal('signup')}
            className="text-brand-400 hover:text-brand-300 font-medium transition-colors"
          >
            Create one
          </button>
        </p>
      </div>
    </ModalBase>
  )
}
