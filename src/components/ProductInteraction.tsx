import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Rocket,
  Loader2,
  CheckCircle2,
  RefreshCw,
  Server,
  GitBranch,
  Package,
} from 'lucide-react'
import { useInView } from '../hooks/useInView'

type DeployState = 'idle' | 'deploying' | 'success'

interface Step {
  label: string
  sublabel: string
}

const steps: Step[] = [
  { label: 'Build', sublabel: 'Compiling & bundling' },
  { label: 'Test', sublabel: 'Running test suite' },
  { label: 'Publish', sublabel: 'Pushing artifact' },
  { label: 'Release', sublabel: 'Updating production' },
]

function useDeploySimulation() {
  const [state, setState] = useState<DeployState>('idle')
  const [currentStep, setCurrentStep] = useState(-1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const startDeploy = useCallback(() => {
    if (state !== 'idle') return
    setState('deploying')
    setCurrentStep(0)
    setCompletedSteps([])

    const stepDuration = 900
    steps.forEach((_, i) => {
      // Mark step as "current"
      setTimeout(() => setCurrentStep(i), i * stepDuration)
      // Mark step as completed
      setTimeout(() => {
        setCompletedSteps((prev) => [...prev, i])
      }, (i + 1) * stepDuration - 100)
    })

    // Final success
    setTimeout(() => {
      setState('success')
      setCurrentStep(-1)
    }, steps.length * stepDuration + 100)
  }, [state])

  const reset = useCallback(() => {
    setState('idle')
    setCurrentStep(-1)
    setCompletedSteps([])
  }, [])

  return { state, currentStep, completedSteps, startDeploy, reset }
}

export default function ProductInteraction() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 })
  const { state, currentStep, completedSteps, startDeploy, reset } = useDeploySimulation()

  return (
    <section
      id="interaction"
      aria-labelledby="interaction-heading"
      className="py-24 sm:py-32 section-padding"
    >
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text side */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-3">
              Deployments
            </p>
            <h2
              id="interaction-heading"
              className="text-3xl sm:text-4xl font-bold text-white tracking-tight text-balance mb-5"
            >
              Deploy with
              <span className="gradient-text-brand"> full visibility.</span>
            </h2>
            <p className="text-surface-400 text-sm sm:text-base leading-relaxed mb-6">
              Trigger releases directly from MyDesk and watch each stage in real time. Every deployment is tied to the tasks and commits that caused it.
            </p>
            <ul className="space-y-3" role="list">
              {[
                { icon: GitBranch, label: 'Branch-level deployment controls' },
                { icon: Package, label: 'Artifact tracking per release' },
                { icon: Server, label: 'Environment health at a glance' },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-brand-500/10 border border-brand-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-brand-400" aria-hidden="true" />
                  </span>
                  <span className="text-sm text-surface-400">{label}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Interactive panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="bg-surface-900/60 border border-surface-800 rounded-2xl overflow-hidden shadow-xl shadow-black/30"
              role="region"
              aria-label="Deployment simulator"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-surface-800">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-violet-500/15 border border-violet-500/25 flex items-center justify-center">
                    <Rocket className="w-3.5 h-3.5 text-violet-400" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-surface-200">Deploy to Production</p>
                    <p className="text-[10px] text-surface-600">mydesk · main</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-surface-600">v2.1.4</span>
              </div>

              {/* Body */}
              <div className="p-5">
                {/* Commit info */}
                <div className="flex items-center gap-2 p-3 bg-surface-800/40 border border-surface-700/40 rounded-lg mb-5">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-400 to-violet-500 flex-shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-surface-300 truncate">
                      feat: add rate limiting to auth endpoints
                    </p>
                    <p className="text-[9px] text-surface-600 font-mono">
                      a3f9c12 · Alex Chen · 2 minutes ago
                    </p>
                  </div>
                </div>

                {/* Pipeline steps */}
                <div className="space-y-2.5 mb-6" role="list" aria-label="Deployment pipeline steps">
                  {steps.map((step, i) => {
                    const isDone = completedSteps.includes(i)
                    const isActive = currentStep === i && !isDone
                    const isPending = state === 'idle' || (currentStep < i && !isDone)

                    return (
                      <div
                        key={step.label}
                        role="listitem"
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
                          isDone
                            ? 'bg-emerald-500/5 border-emerald-500/20'
                            : isActive
                            ? 'bg-brand-500/8 border-brand-500/25'
                            : 'bg-surface-800/30 border-surface-700/30'
                        }`}
                      >
                        <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                          <AnimatePresence mode="wait">
                            {isDone ? (
                              <motion.div
                                key="done"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.25, ease: 'backOut' }}
                              >
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                              </motion.div>
                            ) : isActive ? (
                              <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              >
                                <Loader2
                                  className="w-4 h-4 text-brand-400 animate-spin"
                                  aria-hidden="true"
                                />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="pending"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              >
                                <span className="w-4 h-4 rounded-full border border-surface-700 block" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-xs font-medium ${
                              isDone
                                ? 'text-emerald-400'
                                : isActive
                                ? 'text-brand-300'
                                : 'text-surface-500'
                            }`}
                          >
                            {step.label}
                          </p>
                          {isActive && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-[10px] text-surface-600"
                            >
                              {step.sublabel}…
                            </motion.p>
                          )}
                        </div>
                        {isDone && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[9px] text-emerald-600"
                          >
                            Done
                          </motion.span>
                        )}
                        {isPending && state === 'idle' && (
                          <span className="text-[9px] text-surface-700">Waiting</span>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Action button */}
                <AnimatePresence mode="wait">
                  {state === 'success' ? (
                    <motion.div
                      key="success-state"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-2 p-3 bg-emerald-500/8 border border-emerald-500/20 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" aria-hidden="true" />
                        <div>
                          <p className="text-xs font-semibold text-emerald-400">Deployment complete</p>
                          <p className="text-[10px] text-surface-600">v2.1.4 is live on production</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={reset}
                        className="w-full flex items-center justify-center gap-2 text-xs font-medium px-4 py-2.5 border border-surface-700 hover:border-surface-600 text-surface-400 hover:text-surface-200 rounded-lg transition-all duration-200"
                        aria-label="Reset deployment simulator"
                      >
                        <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                        Try again
                      </button>
                    </motion.div>
                  ) : state === 'deploying' ? (
                    <motion.button
                      key="deploying-state"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      disabled
                      aria-disabled="true"
                      className="w-full flex items-center justify-center gap-2 text-sm font-semibold px-4 py-3 bg-surface-800 text-surface-500 rounded-lg cursor-not-allowed"
                    >
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      Deploying…
                    </motion.button>
                  ) : (
                    <motion.button
                      key="idle-state"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      type="button"
                      onClick={startDeploy}
                      className="w-full flex items-center justify-center gap-2 text-sm font-semibold px-4 py-3 bg-brand-500 hover:bg-brand-400 text-white rounded-lg transition-all duration-200 shadow-lg shadow-brand-500/20 hover:shadow-brand-400/30 hover:-translate-y-0.5 group"
                      aria-label="Start deployment simulation"
                    >
                      <Rocket className="w-4 h-4" aria-hidden="true" />
                      Deploy to Production
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <p className="text-center text-[11px] text-surface-700 mt-3">
              Interactive demo — not a real deployment
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
