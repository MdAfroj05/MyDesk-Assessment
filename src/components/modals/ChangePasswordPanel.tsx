import { useState } from 'react'
import { Eye, EyeOff, AlertCircle, CheckCircle2, ShieldCheck, KeyRound } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

type Strength = 'weak' | 'fair' | 'strong' | 'great'

function getStrength(pwd: string): Strength | null {
  if (!pwd) return null
  const len = pwd.length
  const hasUpper = /[A-Z]/.test(pwd)
  const hasNumber = /\d/.test(pwd)
  const hasSymbol = /[^A-Za-z0-9]/.test(pwd)
  const score = [len >= 8, hasUpper, hasNumber, hasSymbol].filter(Boolean).length
  if (score <= 1) return 'weak'
  if (score === 2) return 'fair'
  if (score === 3) return 'strong'
  return 'great'
}

const strengthConfig: Record<
  Strength,
  { label: string; bars: number; barColor: string; textColor: string; tip: string }
> = {
  weak:   { label: 'Weak',      bars: 1, barColor: 'bg-red-500',    textColor: 'text-red-400',    tip: 'Add uppercase letters, numbers, or symbols.' },
  fair:   { label: 'Fair',      bars: 2, barColor: 'bg-amber-500',  textColor: 'text-amber-400',  tip: 'Getting better — add more variety.' },
  strong: { label: 'Strong',    bars: 3, barColor: 'bg-brand-500',  textColor: 'text-brand-400',  tip: 'Good password. Add a symbol to make it great.' },
  great:  { label: 'Great',     bars: 4, barColor: 'bg-emerald-500',textColor: 'text-emerald-400',tip: 'Excellent password.' },
}

export function ChangePasswordPanel() {
  const { changePassword } = useAuth()

  const [currentPwd, setCurrentPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const strength = getStrength(newPwd)
  const strengthInfo = strength ? strengthConfig[strength] : null

  const validate = (): Record<string, string> => {
    const e: Record<string, string> = {}
    if (!currentPwd) e.current = 'Current password is required.'
    if (!newPwd) {
      e.new = 'New password is required.'
    } else if (newPwd.length < 6) {
      e.new = 'Password must be at least 6 characters.'
    } else if (newPwd === currentPwd) {
      e.new = 'New password must be different from the current one.'
    }
    if (!confirmPwd) {
      e.confirm = 'Please confirm your new password.'
    } else if (confirmPwd !== newPwd) {
      e.confirm = 'Passwords do not match.'
    }
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')
    setSuccess(false)

    const errors = validate()
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const ok = changePassword(currentPwd, newPwd)
      if (ok) {
        setSuccess(true)
        setCurrentPwd('')
        setNewPwd('')
        setConfirmPwd('')
        setFieldErrors({})
      } else {
        setSubmitError('Current password is incorrect. Please try again.')
      }
    }, 800)
  }

  const handleReset = () => {
    setSuccess(false)
    setSubmitError('')
    setFieldErrors({})
  }

  return (
    <div className="max-w-md">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center flex-shrink-0">
          <KeyRound className="w-4 h-4 text-brand-400" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Change Password</h3>
          <p className="text-xs text-surface-500">Update your account password</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {success ? (
          /* ── Success state ── */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center py-8"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
              <ShieldCheck className="w-7 h-7 text-emerald-400" aria-hidden="true" />
            </div>
            <h4 className="text-base font-bold text-white mb-1">Password updated</h4>
            <p className="text-sm text-surface-500 mb-6 leading-relaxed">
              Your password has been changed successfully.
              <br />
              Use the new password next time you sign in.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="text-sm font-medium px-5 py-2.5 border border-surface-700 hover:border-surface-600 text-surface-300 hover:text-white rounded-lg transition-all duration-200 hover:bg-surface-800/50"
            >
              Change again
            </button>
          </motion.div>
        ) : (
          /* ── Form state ── */
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4"
            aria-label="Change password form"
          >
            {/* Current password */}
            <div>
              <label
                htmlFor="cp-current"
                className="block text-xs font-medium text-surface-400 mb-1.5"
              >
                Current password
              </label>
              <div className="relative">
                <input
                  id="cp-current"
                  type={showCurrent ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={currentPwd}
                  onChange={(e) => {
                    setCurrentPwd(e.target.value)
                    setFieldErrors((prev) => { const n = { ...prev }; delete n.current; return n })
                  }}
                  placeholder="Enter current password"
                  className={`w-full px-3.5 py-2.5 pr-10 bg-surface-800/70 border rounded-lg text-sm text-white placeholder:text-surface-600 outline-none transition-all
                    ${fieldErrors.current
                      ? 'border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500/20'
                      : 'border-surface-700 hover:border-surface-600 focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30'
                    }`}
                />
                <button
                  type="button"
                  aria-label={showCurrent ? 'Hide current password' : 'Show current password'}
                  onClick={() => setShowCurrent((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-600 hover:text-surface-400 transition-colors"
                >
                  {showCurrent ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
                </button>
              </div>
              {fieldErrors.current && (
                <p className="flex items-center gap-1 mt-1.5 text-[11px] text-red-400">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                  {fieldErrors.current}
                </p>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-surface-800/60" />

            {/* New password */}
            <div>
              <label
                htmlFor="cp-new"
                className="block text-xs font-medium text-surface-400 mb-1.5"
              >
                New password
              </label>
              <div className="relative">
                <input
                  id="cp-new"
                  type={showNew ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={newPwd}
                  onChange={(e) => {
                    setNewPwd(e.target.value)
                    setFieldErrors((prev) => { const n = { ...prev }; delete n.new; return n })
                  }}
                  placeholder="Minimum 6 characters"
                  className={`w-full px-3.5 py-2.5 pr-10 bg-surface-800/70 border rounded-lg text-sm text-white placeholder:text-surface-600 outline-none transition-all
                    ${fieldErrors.new
                      ? 'border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500/20'
                      : 'border-surface-700 hover:border-surface-600 focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30'
                    }`}
                />
                <button
                  type="button"
                  aria-label={showNew ? 'Hide new password' : 'Show new password'}
                  onClick={() => setShowNew((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-600 hover:text-surface-400 transition-colors"
                >
                  {showNew ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
                </button>
              </div>

              {/* Strength meter */}
              {strengthInfo && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1" aria-hidden="true">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i <= strengthInfo.bars ? strengthInfo.barColor : 'bg-surface-700'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-semibold ${strengthInfo.textColor}`}>
                      {strengthInfo.label}
                    </span>
                    <span className="text-[10px] text-surface-600">{strengthInfo.tip}</span>
                  </div>
                </div>
              )}

              {fieldErrors.new && (
                <p className="flex items-center gap-1 mt-1.5 text-[11px] text-red-400">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                  {fieldErrors.new}
                </p>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label
                htmlFor="cp-confirm"
                className="block text-xs font-medium text-surface-400 mb-1.5"
              >
                Confirm new password
              </label>
              <div className="relative">
                <input
                  id="cp-confirm"
                  type={showConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={confirmPwd}
                  onChange={(e) => {
                    setConfirmPwd(e.target.value)
                    setFieldErrors((prev) => { const n = { ...prev }; delete n.confirm; return n })
                  }}
                  placeholder="Re-enter new password"
                  className={`w-full px-3.5 py-2.5 pr-10 bg-surface-800/70 border rounded-lg text-sm text-white placeholder:text-surface-600 outline-none transition-all
                    ${fieldErrors.confirm
                      ? 'border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500/20'
                      : confirmPwd && confirmPwd === newPwd
                      ? 'border-emerald-500/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20'
                      : 'border-surface-700 hover:border-surface-600 focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30'
                    }`}
                />
                {/* Match indicator */}
                {confirmPwd && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    {confirmPwd === newPwd
                      ? <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                      : <AlertCircle className="w-4 h-4 text-red-400" aria-hidden="true" />
                    }
                  </span>
                )}
                {/* Only show eye toggle when passwords don't match yet */}
                {!confirmPwd && (
                  <button
                    type="button"
                    aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-600 hover:text-surface-400 transition-colors"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
                  </button>
                )}
              </div>
              {fieldErrors.confirm && (
                <p className="flex items-center gap-1 mt-1.5 text-[11px] text-red-400">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                  {fieldErrors.confirm}
                </p>
              )}
            </div>

            {/* Server-level error */}
            {submitError && (
              <div
                role="alert"
                className="flex items-center gap-2 p-2.5 rounded-lg bg-red-500/10 border border-red-500/20"
              >
                <AlertCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" aria-hidden="true" />
                <p className="text-xs text-red-300">{submitError}</p>
              </div>
            )}

            {/* Password rules hint */}
            <div className="p-3 rounded-lg bg-surface-800/40 border border-surface-700/40">
              <p className="text-[10px] font-semibold text-surface-500 uppercase tracking-wider mb-1.5">
                Password requirements
              </p>
              <ul className="space-y-0.5" role="list">
                {[
                  { rule: 'At least 6 characters', met: newPwd.length >= 6 },
                  { rule: 'Different from current password', met: !!newPwd && newPwd !== currentPwd },
                  { rule: 'Uppercase letter (recommended)', met: /[A-Z]/.test(newPwd) },
                  { rule: 'Number or symbol (recommended)', met: /[\d^!@#$%&*]/.test(newPwd) },
                ].map(({ rule, met }) => (
                  <li key={rule} className="flex items-center gap-1.5">
                    <span
                      className={`w-3 h-3 rounded-full flex items-center justify-center flex-shrink-0 ${
                        met ? 'text-emerald-400' : 'text-surface-700'
                      }`}
                      aria-hidden="true"
                    >
                      {met ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-surface-700 block" />
                      )}
                    </span>
                    <span className={`text-[10px] ${met ? 'text-surface-400' : 'text-surface-600'}`}>
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              aria-disabled={loading}
              className="w-full flex items-center justify-center gap-2 text-sm font-semibold px-4 py-2.5 bg-brand-500 hover:bg-brand-400 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 shadow-lg shadow-brand-500/20"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                  Updating password…
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                  Update Password
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
