import { motion } from 'framer-motion'
import { ArrowRight, GitBranch, Zap, Shield } from 'lucide-react'
import { useModal } from '../context/ModalContext'

const pillItems = [
  { icon: GitBranch, label: 'Git-native workflow' },
  { icon: Zap, label: 'Zero config setup' },
  { icon: Shield, label: 'SOC 2 ready' },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  const { openModal } = useModal()

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid opacity-100"
        aria-hidden="true"
      />

      {/* Radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at center, #6366f1 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container-max section-padding w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 mb-8 tracking-wide">
              <span
                className="w-1.5 h-1.5 rounded-full bg-brand-400 pulse-dot"
                aria-hidden="true"
              />
              Now in open beta
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-balance mb-6"
          >
            <span className="text-white">Ship software</span>
            <br />
            <span className="gradient-text-brand">without the chaos.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-surface-400 max-w-2xl leading-relaxed mb-10 text-balance"
          >
            Plan, build, review, and understand your software projects from one
            focused workspace. No more context-switching between eight different
            tools.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
          >
            <button
              type="button"
              onClick={() => openModal('signup')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-semibold px-6 py-3 bg-brand-500 hover:bg-brand-400 text-white rounded-md transition-all duration-200 shadow-xl shadow-brand-500/25 hover:shadow-brand-400/35 hover:-translate-y-0.5 group cursor-pointer"
            >
              Start Building
              <ArrowRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
            <a
              href="#product"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-medium px-6 py-3 border border-surface-700 hover:border-surface-600 text-surface-300 hover:text-white rounded-md transition-all duration-200 hover:bg-surface-800/50"
            >
              Explore the Product
            </a>
          </motion.div>

          {/* Pills */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 mt-10"
          >
            {pillItems.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-xs text-surface-500 px-3 py-1.5 rounded-full border border-surface-800 bg-surface-900/40"
              >
                <Icon className="w-3.5 h-3.5 text-surface-600" aria-hidden="true" />
                {label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 sm:mt-20 max-w-5xl mx-auto"
          aria-hidden="true"
        >
          {/* Browser chrome */}
          <div className="rounded-xl overflow-hidden border border-surface-800 shadow-2xl shadow-black/60">
            {/* Browser top bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-surface-900 border-b border-surface-800">
              <span className="w-3 h-3 rounded-full bg-surface-700" />
              <span className="w-3 h-3 rounded-full bg-surface-700" />
              <span className="w-3 h-3 rounded-full bg-surface-700" />
              <div className="flex-1 mx-4">
                <div className="h-5 bg-surface-800 rounded-md max-w-xs mx-auto flex items-center px-3">
                  <span className="text-[10px] text-surface-600 font-mono">
                    app.mydesk.dev/workspace
                  </span>
                </div>
              </div>
            </div>

            {/* App shell */}
            <div className="bg-surface-950 flex" style={{ minHeight: '380px' }}>
              {/* Sidebar */}
              <div className="hidden sm:flex flex-col w-52 border-r border-surface-800 bg-surface-900/40 p-3 gap-1 flex-shrink-0">
                <div className="px-2 py-1.5 mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-brand-500/20 flex items-center justify-center">
                      <span className="text-[8px] font-bold text-brand-400">MD</span>
                    </div>
                    <span className="text-xs font-semibold text-surface-300">MyDesk</span>
                  </div>
                </div>
                {['Overview', 'Projects', 'Tasks', 'Deployments', 'Insights'].map(
                  (item, i) => (
                    <div
                      key={item}
                      className={`text-xs px-2 py-1.5 rounded-md cursor-default ${
                        i === 0
                          ? 'bg-brand-500/15 text-brand-300 font-medium'
                          : 'text-surface-500'
                      }`}
                    >
                      {item}
                    </div>
                  )
                )}
                <div className="mt-auto pt-3 border-t border-surface-800">
                  <div className="flex items-center gap-2 px-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex-shrink-0" />
                    <div>
                      <div className="text-[10px] font-medium text-surface-400">Alex Chen</div>
                      <div className="text-[9px] text-surface-600">admin</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 p-4 overflow-hidden">
                {/* Page header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[10px] text-surface-600 mb-0.5">Current project</p>
                    <h2 className="text-sm font-semibold text-white">myDesk</h2>
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                    Active Sprint
                  </span>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  {[
                    { label: 'Sprint', value: '68%', sub: 'complete', color: 'brand' },
                    { label: 'Tasks', value: '12', sub: 'completed', color: 'emerald' },
                    { label: 'Tests', value: '248', sub: 'passing', color: 'sky' },
                    { label: 'Deploy', value: 'Live', sub: 'production', color: 'violet' },
                  ].map(({ label, value, sub, color }) => (
                    <div
                      key={label}
                      className="bg-surface-800/50 border border-surface-700/50 rounded-lg p-2.5"
                    >
                      <p className="text-[9px] text-surface-500 uppercase tracking-wider mb-1">{label}</p>
                      <p className={`text-base font-bold text-${color}-400 leading-none`}>{value}</p>
                      <p className="text-[9px] text-surface-600 mt-0.5">{sub}</p>
                    </div>
                  ))}
                </div>

                {/* Bottom row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {/* Task list */}
                  <div className="bg-surface-800/30 border border-surface-700/40 rounded-lg p-3">
                    <p className="text-[10px] font-semibold text-surface-400 uppercase tracking-wider mb-2">Active Tasks</p>
                    {[
                      { name: 'Auth service refactor', status: 'in-progress' },
                      { name: 'API rate limiting', status: 'in-progress' },
                      { name: 'Dashboard metrics', status: 'review' },
                    ].map(({ name, status }) => (
                      <div key={name} className="flex items-center gap-2 py-1">
                        <span
                          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            status === 'in-progress'
                              ? 'bg-brand-400'
                              : 'bg-amber-400'
                          }`}
                        />
                        <span className="text-[10px] text-surface-400 truncate">{name}</span>
                        <span
                          className={`ml-auto text-[9px] px-1.5 py-0.5 rounded font-medium ${
                            status === 'in-progress'
                              ? 'bg-brand-500/10 text-brand-400'
                              : 'bg-amber-500/10 text-amber-400'
                          }`}
                        >
                          {status === 'in-progress' ? 'In Progress' : 'Review'}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* AI panel */}
                  <div className="bg-surface-800/30 border border-surface-700/40 rounded-lg p-3">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="w-3 h-3 rounded bg-violet-500/20 flex items-center justify-center">
                        <span className="text-[7px] text-violet-400">✦</span>
                      </span>
                      <p className="text-[10px] font-semibold text-surface-400 uppercase tracking-wider">Desk Assistant</p>
                    </div>
                    <div className="bg-amber-500/5 border border-amber-500/15 rounded p-2">
                      <p className="text-[10px] text-amber-300/80 leading-relaxed">
                        3 potential issues detected in the latest commit — 2 in{' '}
                        <code className="font-mono text-amber-400">auth.service.ts</code>, 1 in{' '}
                        <code className="font-mono text-amber-400">rate-limiter.ts</code>.
                      </p>
                    </div>
                    <div className="mt-2 flex gap-1.5">
                      <div className="text-[9px] px-2 py-1 rounded bg-surface-700/50 text-surface-400 cursor-default">Review issues</div>
                      <div className="text-[9px] px-2 py-1 rounded bg-surface-700/50 text-surface-400 cursor-default">Dismiss</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-950 to-transparent"
        aria-hidden="true"
      />
    </section>
  )
}
