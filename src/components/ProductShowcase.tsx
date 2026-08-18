import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2, Circle, Clock, GitCommit, Server,
  Sparkles, ChevronRight, AlertTriangle,
  LayoutDashboard, FolderGit2, Kanban, Rocket, TrendingUp, FlaskConical,
  X, CheckCircle, Loader2, Users, Star,
} from 'lucide-react'
import { useInView } from '../hooks/useInView'

/* ─── types ─── */
type NavId = 'overview' | 'projects' | 'sprint' | 'deployments' | 'tests' | 'insights'

/* ─── sidebar nav config ─── */
const NAV = [
  { id: 'overview'    as NavId, label: 'Overview',     icon: LayoutDashboard },
  { id: 'projects'    as NavId, label: 'Projects',     icon: FolderGit2 },
  { id: 'sprint'      as NavId, label: 'Sprint Board', icon: Kanban },
  { id: 'deployments' as NavId, label: 'Deployments',  icon: Rocket },
  { id: 'tests'       as NavId, label: 'Test Results', icon: FlaskConical },
  { id: 'insights'    as NavId, label: 'Insights',     icon: TrendingUp },
]

/* ─── shared data ─── */
const TASKS = [
  { name: 'Set up auth middleware',    status: 'done' },
  { name: 'Implement JWT refresh flow', status: 'done' },
  { name: 'Add rate limiting service', status: 'progress' },
  { name: 'Dashboard analytics API',   status: 'progress' },
  { name: 'End-to-end test suite',     status: 'pending' },
]
const ACTIVITY = [
  { user: 'AC', action: 'merged',    target: 'feat/auth-service', time: '12m ago', color: 'from-brand-500 to-brand-600' },
  { user: 'MR', action: 'opened PR', target: 'fix/rate-limiter',  time: '38m ago', color: 'from-violet-500 to-violet-600' },
  { user: 'JL', action: 'deployed',  target: 'v2.1.4 → staging', time: '1h ago',  color: 'from-emerald-500 to-emerald-600' },
]

/* ─── container animation ─── */
const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
}

/* ════════════════════════════════════════════════════ */
export default function ProductShowcase() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [activeNav, setActiveNav] = useState<NavId>('overview')

  return (
    <section id="product" aria-labelledby="product-heading" className="relative py-24 sm:py-32 section-padding overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #6366f1 0%, transparent 70%)', filter: 'blur(80px)' }} aria-hidden="true" />

      <div className="container-max relative z-10">
        {/* section header */}
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="text-center mb-14">
          <motion.p variants={itemVariants} className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-3">Product</motion.p>
          <motion.h2 variants={itemVariants} id="product-heading" className="text-3xl sm:text-4xl font-bold text-white tracking-tight text-balance">
            Everything your team needs,<br className="hidden sm:block" />
            <span className="gradient-text-brand"> in one workspace.</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-4 text-surface-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            MyDesk replaces scattered tabs, Slack threads, and spreadsheets with a single interface built around how development actually works.
          </motion.p>
        </motion.div>

        {/* ── Dashboard shell ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl overflow-hidden border border-surface-800 shadow-2xl shadow-black/50"
          role="region" aria-label="Interactive MyDesk product demo"
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-surface-900 border-b border-surface-800">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" aria-hidden="true" />
            <div className="flex-1 flex justify-center">
              <div className="bg-surface-800 rounded px-3 py-1">
                <span className="text-[10px] text-surface-500 font-mono">app.mydesk.dev</span>
              </div>
            </div>
          </div>

          {/* App body */}
          <div className="flex bg-surface-950" style={{ minHeight: 420 }}>
            {/* ── Sidebar ── */}
            <aside className="hidden lg:flex flex-col w-52 border-r border-surface-800/80 bg-surface-900/30 flex-shrink-0">
              <div className="p-4 border-b border-surface-800/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-brand-500/20 border border-brand-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-bold text-brand-300">MD</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-surface-200">MyDesk</p>
                    <p className="text-[10px] text-surface-600">Workspace</p>
                  </div>
                </div>
              </div>

              <nav className="flex-1 p-3 space-y-0.5" aria-label="Product demo navigation">
                {NAV.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id} type="button"
                    onClick={() => setActiveNav(id)}
                    aria-current={activeNav === id ? 'page' : undefined}
                    className={`w-full flex items-center gap-2.5 text-[11px] px-3 py-2 rounded-lg text-left transition-all duration-150 group ${
                      activeNav === id
                        ? 'bg-brand-500/15 text-brand-300 font-semibold'
                        : 'text-surface-500 hover:text-surface-200 hover:bg-surface-800/50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${activeNav === id ? 'text-brand-400' : 'text-surface-600 group-hover:text-surface-400'}`} aria-hidden="true" />
                    {label}
                    {activeNav === id && <ChevronRight className="ml-auto w-3 h-3 text-brand-500/40" aria-hidden="true" />}
                  </button>
                ))}
              </nav>

              <div className="p-3 border-t border-surface-800/60">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-400 to-violet-500 flex-shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium text-surface-400 truncate">Alex Chen</p>
                    <p className="text-[9px] text-surface-600">Admin</p>
                  </div>
                </div>
              </div>
            </aside>

            {/* ── Main panel ── */}
            <main className="flex-1 overflow-hidden min-w-0">
              {/* Page header */}
              <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-surface-800/60">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] text-surface-600 mb-0.5">
                    <span>Projects</span>
                    <ChevronRight className="w-3 h-3" aria-hidden="true" />
                    <span className="text-surface-400">myDesk</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">myDesk</h3>
                </div>
                <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  Sprint 4 · Active
                </span>
              </div>

              {/* Animated view content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNav}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="p-4"
                >
                  {activeNav === 'overview'    && <OverviewPane />}
                  {activeNav === 'projects'    && <ProjectsPane />}
                  {activeNav === 'sprint'      && <SprintPane />}
                  {activeNav === 'deployments' && <DeploymentsPane />}
                  {activeNav === 'tests'       && <TestsPane />}
                  {activeNav === 'insights'    && <InsightsPane />}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </motion.div>

        <p className="text-center text-[11px] text-surface-700 mt-3">
          Interactive demo — click the sidebar items to explore the product
        </p>
      </div>
    </section>
  )
}

/* ════════ OVERVIEW PANE ════════ */
function OverviewPane() {
  const [dismissed, setDismissed] = useState(false)
  const [reviewing, setReviewing] = useState(false)
  const [reviewDone, setReviewDone] = useState(false)

  const handleReview = () => {
    setReviewing(true)
    setTimeout(() => { setReviewing(false); setReviewDone(true) }, 1500)
  }

  return (
    <div className="space-y-3">
      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { label: 'Sprint Progress', value: '68%',  sub: '5 days left',      bar: 68,   barColor: 'bg-brand-500' },
          { label: 'Tasks',           value: '12',   sub: '5 active · 3 pending', bar: null, barColor: '' },
          { label: 'Tests',           value: '248',  sub: 'All green',         bar: null, barColor: '' },
          { label: 'Production',      value: 'Live', sub: 'Healthy · v2.1.3',  bar: null, barColor: '' },
        ].map(({ label, value, sub, bar, barColor }) => (
          <div key={label} className="bg-surface-900/60 border border-surface-800/70 rounded-xl p-3">
            <p className="text-[9px] text-surface-600 uppercase tracking-wider mb-1">{label}</p>
            <p className="text-lg font-bold text-white leading-none">{value}</p>
            <p className="text-[9px] text-surface-600 mt-0.5">{sub}</p>
            {bar !== null && (
              <div className="mt-1.5 h-1 bg-surface-800 rounded-full">
                <div className={`h-full ${barColor} rounded-full`} style={{ width: `${bar}%` }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* Task board */}
        <div className="bg-surface-900/40 border border-surface-800/60 rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-semibold text-surface-400 uppercase tracking-wider">Task Board</p>
            <span className="text-[9px] text-surface-600">Sprint 4</span>
          </div>
          <div className="divide-y divide-surface-800/40">
            {TASKS.map((t) => (
              <div key={t.name} className="flex items-center gap-2 py-1.5">
                {t.status === 'done'
                  ? <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  : t.status === 'progress'
                  ? <Clock className="w-3 h-3 text-brand-400 flex-shrink-0" />
                  : <Circle className="w-3 h-3 text-surface-600 flex-shrink-0" />}
                <span className={`text-[10px] flex-1 truncate ${t.status === 'done' ? 'line-through text-surface-600' : t.status === 'progress' ? 'text-surface-300' : 'text-surface-500'}`}>{t.name}</span>
                {t.status === 'progress' && <span className="text-[8px] px-1 py-0.5 rounded bg-brand-500/10 text-brand-400 flex-shrink-0">Active</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {/* Activity */}
          <div className="bg-surface-900/40 border border-surface-800/60 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <GitCommit className="w-3 h-3 text-surface-500" />
              <p className="text-[10px] font-semibold text-surface-400 uppercase tracking-wider">Recent Activity</p>
            </div>
            {ACTIVITY.map(({ user, action, target, time, color }) => (
              <div key={target} className="flex items-start gap-1.5 mb-1.5 last:mb-0">
                <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <span className="text-[6px] font-bold text-white">{user}</span>
                </div>
                <div>
                  <p className="text-[9px] text-surface-400 leading-tight">
                    <span className="text-surface-300 font-medium">{user}</span> {action} <code className="font-mono text-brand-300">{target}</code>
                  </p>
                  <p className="text-[8px] text-surface-600">{time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* AI assistant — interactive */}
          {!dismissed && (
            <div className="bg-surface-900/40 border border-amber-500/20 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-3 h-3 text-violet-400" />
                <p className="text-[10px] font-semibold text-surface-400 uppercase tracking-wider">Desk Assistant</p>
              </div>
              {reviewDone ? (
                <div className="flex items-center gap-1.5 p-1.5 bg-emerald-500/8 border border-emerald-500/15 rounded-lg">
                  <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  <p className="text-[9px] text-emerald-300">Issues reviewed and logged. Team notified.</p>
                </div>
              ) : (
                <div className="flex items-start gap-1.5 p-1.5 bg-amber-500/5 border border-amber-500/15 rounded-lg mb-2">
                  <AlertTriangle className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-[9px] text-surface-400 leading-relaxed">
                    <span className="text-amber-300 font-medium">3 issues</span> in{' '}
                    <code className="font-mono text-[8px] text-amber-300/80">auth.service.ts</code> and{' '}
                    <code className="font-mono text-[8px] text-amber-300/80">rate-limiter.ts</code>.
                  </p>
                </div>
              )}
              {!reviewDone && (
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={handleReview}
                    disabled={reviewing}
                    className="flex items-center gap-1 text-[9px] px-2 py-1 rounded bg-brand-500/15 hover:bg-brand-500/25 text-brand-400 transition-colors disabled:opacity-60"
                  >
                    {reviewing ? <Loader2 className="w-2.5 h-2.5 animate-spin" /> : null}
                    {reviewing ? 'Reviewing…' : 'Review issues'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDismissed(true)}
                    className="flex items-center gap-1 text-[9px] px-2 py-1 rounded bg-surface-800 hover:bg-surface-700 text-surface-500 transition-colors"
                  >
                    <X className="w-2.5 h-2.5" />
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          )}
          {dismissed && (
            <div className="bg-surface-900/40 border border-surface-800/50 rounded-xl p-3 text-center">
              <p className="text-[9px] text-surface-600">Assistant dismissed</p>
              <button type="button" onClick={() => setDismissed(false)} className="text-[9px] text-brand-400 hover:text-brand-300 mt-1 transition-colors">Show again</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ════════ PROJECTS PANE ════════ */
const PROJECTS = [
  { name: 'myDesk',         desc: 'Core SaaS — auth, billing, API gateway.',        status: 'active',    progress: 68,  sprint: 'Sprint 4', members: ['AC','MR','JL'], starred: true },
  { name: 'Mobile App v2',  desc: 'React Native rebuild with offline-first arch.',  status: 'active',    progress: 34,  sprint: 'Sprint 2', members: ['JL','SK'],      starred: false },
  { name: 'Data Pipeline',  desc: 'ETL service for analytics and reporting.',       status: 'paused',    progress: 51,  sprint: 'Sprint 1', members: ['AC'],           starred: false },
  { name: 'Design System',  desc: 'Shared component library across products.',      status: 'completed', progress: 100, sprint: 'Sprint 6', members: ['MR','SK'],      starred: true },
]
const memberColors = ['from-brand-400 to-brand-600','from-violet-400 to-violet-600','from-emerald-400 to-emerald-600','from-sky-400 to-sky-600']

function ProjectsPane() {
  const [selected, setSelected] = useState<string | null>(null)
  const proj = PROJECTS.find(p => p.name === selected)

  if (proj) {
    return (
      <div>
        <button type="button" onClick={() => setSelected(null)} className="flex items-center gap-1 text-[10px] text-surface-500 hover:text-surface-300 mb-3 transition-colors">
          <ChevronRight className="w-3 h-3 rotate-180" /> Back
        </button>
        <div className="p-3 bg-surface-800/40 border border-surface-700/50 rounded-xl mb-3">
          <div className="flex items-center gap-2 mb-1">
            <FolderGit2 className="w-4 h-4 text-brand-400" />
            <span className="text-sm font-bold text-white">{proj.name}</span>
            {proj.starred && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}
          </div>
          <p className="text-[10px] text-surface-500">{proj.desc}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[{ l:'Sprint', v: proj.sprint },{ l:'Progress', v: `${proj.progress}%` }].map(({l,v}) => (
            <div key={l} className="bg-surface-800/40 border border-surface-700/40 rounded-lg p-2.5">
              <p className="text-[9px] text-surface-600 uppercase tracking-wider mb-0.5">{l}</p>
              <p className="text-xs font-bold text-white">{v}</p>
            </div>
          ))}
        </div>
        <div className="bg-surface-800/40 border border-surface-700/40 rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Users className="w-3 h-3 text-surface-500" />
            <p className="text-[10px] font-semibold text-surface-400 uppercase tracking-wider">Team</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {proj.members.map((m,i) => (
              <div key={m} className="flex items-center gap-1.5 px-2 py-1 bg-surface-700/40 border border-surface-600/40 rounded-lg">
                <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${memberColors[i%memberColors.length]} flex items-center justify-center`}>
                  <span className="text-[6px] font-bold text-white">{m[0]}</span>
                </div>
                <span className="text-[10px] text-surface-300">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {PROJECTS.map((p) => {
        const statusCls = p.status === 'active' ? 'text-emerald-400' : p.status === 'paused' ? 'text-amber-400' : 'text-surface-500'
        return (
          <button key={p.name} type="button" onClick={() => setSelected(p.name)}
            className="w-full text-left p-3 bg-surface-800/40 hover:bg-surface-800/70 border border-surface-700/50 hover:border-surface-600 rounded-xl transition-all duration-200 group">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <FolderGit2 className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-white truncate">{p.name}</span>
                    {p.starred && <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400 flex-shrink-0" />}
                  </div>
                  <p className="text-[9px] text-surface-500 truncate">{p.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`text-[9px] font-medium capitalize ${statusCls}`}>{p.status}</span>
                <ChevronRight className="w-3 h-3 text-surface-600 group-hover:text-surface-400 transition-colors" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex-1">
                <div className="h-1 bg-surface-700 rounded-full">
                  <div className={`h-full rounded-full ${p.status === 'completed' ? 'bg-emerald-500' : 'bg-brand-500'}`} style={{ width: `${p.progress}%` }} />
                </div>
              </div>
              <div className="flex -space-x-1">
                {p.members.slice(0,3).map((m,i) => (
                  <div key={m} className={`w-4 h-4 rounded-full bg-gradient-to-br ${memberColors[i%memberColors.length]} border border-surface-900 flex items-center justify-center`}>
                    <span className="text-[6px] font-bold text-white">{m[0]}</span>
                  </div>
                ))}
              </div>
              <span className="text-[9px] text-surface-600">{p.progress}%</span>
            </div>
          </button>
        )
      })}
    </div>
  )
}

/* ════════ SPRINT PANE ════════ */
type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done'
interface SprintTask { id: string; title: string; assignee: string; priority: 'high'|'medium'|'low'; status: TaskStatus }
const SPRINT_TASKS: SprintTask[] = [
  { id:'s1', title:'Design system tokens update',  assignee:'MR', priority:'medium', status:'todo' },
  { id:'s2', title:'End-to-end test suite',        assignee:'JL', priority:'high',   status:'todo' },
  { id:'s3', title:'Add rate limiting service',    assignee:'AC', priority:'high',   status:'in-progress' },
  { id:'s4', title:'Dashboard analytics API',      assignee:'AC', priority:'medium', status:'in-progress' },
  { id:'s5', title:'Dashboard metrics UI',         assignee:'MR', priority:'medium', status:'review' },
  { id:'s6', title:'Set up auth middleware',       assignee:'AC', priority:'high',   status:'done' },
]
const CYCLE: TaskStatus[] = ['todo','in-progress','review','done']
const colCfg: { id: TaskStatus; label: string; dot: string }[] = [
  { id:'todo',        label:'To Do',      dot:'bg-surface-500' },
  { id:'in-progress', label:'In Progress',dot:'bg-brand-400' },
  { id:'review',      label:'Review',     dot:'bg-amber-400' },
  { id:'done',        label:'Done',       dot:'bg-emerald-400' },
]
const priCls = { high:'text-red-400', medium:'text-amber-400', low:'text-surface-500' }

function SprintPane() {
  const [tasks, setTasks] = useState<SprintTask[]>(SPRINT_TASKS)
  const advance = (id: string) => setTasks(prev => prev.map(t => {
    if (t.id !== id) return t
    const next = CYCLE[(CYCLE.indexOf(t.status)+1)%CYCLE.length]
    return { ...t, status: next }
  }))

  return (
    <div>
      <p className="text-[9px] text-surface-600 mb-2 flex items-center gap-1">
        <Kanban className="w-3 h-3" /> Click a card to advance its status
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {colCfg.map(col => {
          const colTasks = tasks.filter(t => t.status === col.id)
          return (
            <div key={col.id} className="bg-surface-900/50 border border-surface-800 rounded-xl p-2">
              <div className="flex items-center gap-1.5 mb-2">
                <span className={`w-1.5 h-1.5 rounded-full ${col.dot}`} />
                <span className="text-[9px] font-semibold text-surface-500">{col.label}</span>
                <span className="ml-auto text-[8px] text-surface-600 bg-surface-800 px-1 rounded-full">{colTasks.length}</span>
              </div>
              <div className="space-y-1.5">
                {colTasks.map(task => (
                  <button key={task.id} type="button" onClick={() => advance(task.id)}
                    className="w-full text-left p-2 bg-surface-800/60 hover:bg-surface-700/60 border border-surface-700/50 rounded-lg transition-all group">
                    <p className={`text-[9px] leading-tight mb-1.5 ${task.status === 'done' ? 'text-surface-600 line-through' : 'text-surface-300 group-hover:text-white'} transition-colors`}>{task.title}</p>
                    <div className="flex items-center justify-between">
                      <div className={`w-3.5 h-3.5 rounded-full bg-gradient-to-br ${memberColors[['AC','MR','JL'].indexOf(task.assignee)%memberColors.length]} flex items-center justify-center`}>
                        <span className="text-[6px] font-bold text-white">{task.assignee[0]}</span>
                      </div>
                      <span className={`text-[8px] font-medium capitalize ${priCls[task.priority]}`}>{task.priority}</span>
                    </div>
                  </button>
                ))}
                {colTasks.length === 0 && (
                  <div className="py-3 text-center text-[9px] text-surface-700 border border-dashed border-surface-800 rounded-lg">Empty</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ════════ DEPLOYMENTS PANE ════════ */
function DeploymentsPane() {
  const [expanded, setExpanded] = useState<string|null>(null)
  const DEPLOYS = [
    { id:'d1', env:'Production', version:'v2.1.3', status:'healthy',  time:'2h ago',   branch:'main',       commit:'a3f9c12', msg:'feat: rate limiting on auth endpoints' },
    { id:'d2', env:'Staging',    version:'v2.1.4', status:'building', time:'Just now', branch:'main',       commit:'b7e2a09', msg:'fix: JWT expiry edge case' },
    { id:'d3', env:'Preview',    version:'feat/auth', status:'healthy', time:'4h ago', branch:'feat/auth-service', commit:'c1d4f88', msg:'wip: auth refactor step 3' },
  ]
  const sc: Record<string,{cls:string,dot:string,label:string}> = {
    healthy:  { cls:'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', dot:'bg-emerald-400 pulse-dot', label:'Healthy' },
    building: { cls:'bg-brand-500/10   text-brand-400   border-brand-500/20',   dot:'bg-brand-400',            label:'Building' },
    failed:   { cls:'bg-red-500/10     text-red-400     border-red-500/20',     dot:'bg-red-400',              label:'Failed' },
  }
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-2 mb-3">
        {DEPLOYS.map(d => (
          <div key={d.id} className={`border rounded-xl p-2.5 ${sc[d.status].cls}`}>
            <div className="flex items-center gap-1 mb-0.5">
              <span className={`w-1.5 h-1.5 rounded-full ${sc[d.status].dot}`} />
              <span className="text-[9px] font-semibold uppercase tracking-wider">{d.env}</span>
            </div>
            <p className="text-[11px] font-bold text-white font-mono">{d.version}</p>
            <p className="text-[8px] mt-0.5 opacity-70">{sc[d.status].label}</p>
          </div>
        ))}
      </div>
      {DEPLOYS.map(d => (
        <div key={d.id} className="bg-surface-800/40 border border-surface-700/50 rounded-xl overflow-hidden">
          <button type="button" onClick={() => setExpanded(expanded===d.id ? null : d.id)}
            className="w-full flex items-center gap-2.5 p-3 hover:bg-surface-800/60 transition-colors text-left">
            <div className={`w-6 h-6 rounded-lg border flex items-center justify-center flex-shrink-0 ${sc[d.status].cls}`}>
              <Server className={`w-3 h-3 ${d.status==='building'?'animate-pulse':''}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-white">{d.env}</span>
                <code className="text-[9px] font-mono text-surface-500">{d.version}</code>
              </div>
              <p className="text-[9px] text-surface-500 truncate">{d.msg}</p>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-[9px] text-surface-600">{d.time}</span>
              <ChevronRight className={`w-3 h-3 text-surface-600 transition-transform ${expanded===d.id?'rotate-90':''}`} />
            </div>
          </button>
          {expanded===d.id && (
            <div className="border-t border-surface-700/50 px-4 py-3 bg-surface-900/40">
              <div className="grid grid-cols-2 gap-2">
                {[{l:'Branch',v:d.branch,mono:true},{l:'Commit',v:d.commit,mono:true}].map(({l,v,mono})=>(
                  <div key={l}>
                    <p className="text-[8px] text-surface-600 uppercase tracking-wider mb-0.5">{l}</p>
                    <p className={`text-[10px] text-surface-300 ${mono?'font-mono':''}`}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ════════ TESTS PANE ════════ */
function TestsPane() {
  const [expanded, setExpanded] = useState<string|null>(null)
  const SUITES = [
    { id:'t1', name:'Auth Service',  passed:48, failed:0, skip:2, dur:'3.2s',
      cases:[{n:'Issue JWT on valid login',status:'pass'},{n:'Reject expired tokens',status:'pass'},{n:'Handle concurrent refresh',status:'skip'}] },
    { id:'t2', name:'Rate Limiter',  passed:31, failed:2, skip:0, dur:'1.8s',
      cases:[{n:'Block after 100 req/min',status:'pass'},{n:'Apply per-user limits',status:'fail'},{n:'Return 429 with Retry-After',status:'fail'}] },
    { id:'t3', name:'API Gateway',   passed:87, failed:0, skip:1, dur:'6.1s',
      cases:[{n:'Route to correct service',status:'pass'},{n:'Apply CORS headers',status:'pass'},{n:'Load test (1k rps)',status:'skip'}] },
  ]
  return (
    <div>
      {/* Summary */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        {[{l:'Total',v:248+33+88,cls:'text-white'},{l:'Passed',v:248,cls:'text-emerald-400'},{l:'Failed',v:2,cls:'text-red-400'},{l:'Coverage',v:'87%',cls:'text-sky-400'}].map(({l,v,cls})=>(
          <div key={l} className="bg-surface-800/50 border border-surface-700/50 rounded-xl p-2.5 text-center">
            <p className={`text-base font-bold ${cls}`}>{v}</p>
            <p className="text-[8px] text-surface-600 uppercase tracking-wider mt-0.5">{l}</p>
          </div>
        ))}
      </div>
      {/* Coverage bar */}
      <div className="mb-3 h-1.5 bg-surface-800 rounded-full">
        <div className="h-full bg-sky-500 rounded-full" style={{width:'87%'}} />
      </div>
      {/* Suites */}
      <div className="space-y-1.5">
        {SUITES.map(s => (
          <div key={s.id} className="bg-surface-800/40 border border-surface-700/50 rounded-xl overflow-hidden">
            <button type="button" onClick={()=>setExpanded(expanded===s.id?null:s.id)}
              className="w-full flex items-center gap-2.5 p-2.5 hover:bg-surface-800/60 transition-colors text-left">
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${s.failed>0?'bg-red-500/10 border border-red-500/20':'bg-emerald-500/10 border border-emerald-500/20'}`}>
                {s.failed>0 ? <X className="w-3 h-3 text-red-400"/> : <CheckCircle2 className="w-3 h-3 text-emerald-400"/>}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-white">{s.name}</p>
                <div className="flex gap-2 text-[9px] mt-0.5">
                  <span className="text-emerald-500">{s.passed} passed</span>
                  {s.failed>0 && <span className="text-red-400">{s.failed} failed</span>}
                  {s.skip>0 && <span className="text-surface-600">{s.skip} skipped</span>}
                </div>
              </div>
              <span className="text-[9px] text-surface-600 flex-shrink-0">{s.dur}</span>
              <ChevronRight className={`w-3 h-3 text-surface-600 transition-transform ${expanded===s.id?'rotate-90':''}`} />
            </button>
            {expanded===s.id && (
              <div className="border-t border-surface-700/50 px-3 py-2 bg-surface-900/40 space-y-1">
                {s.cases.map(c=>(
                  <div key={c.n} className="flex items-center gap-2">
                    {c.status==='pass' ? <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400 flex-shrink-0"/>
                      : c.status==='fail' ? <X className="w-2.5 h-2.5 text-red-400 flex-shrink-0"/>
                      : <AlertTriangle className="w-2.5 h-2.5 text-amber-400 flex-shrink-0"/>}
                    <span className={`text-[9px] truncate ${c.status==='fail'?'text-red-300':c.status==='skip'?'text-surface-600':'text-surface-400'}`}>{c.n}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ════════ INSIGHTS PANE ════════ */
function InsightsPane() {
  const metrics = [
    { label:'Velocity',   value:'29 pts', trend:'+12%', up:true,  color:'text-brand-400' },
    { label:'Cycle Time', value:'2.4d',   trend:'-0.6d',up:true,  color:'text-sky-400' },
    { label:'PRs Merged', value:'11',     trend:'+3',   up:true,  color:'text-violet-400' },
    { label:'Deploys',    value:'6',      trend:'+2',   up:true,  color:'text-emerald-400' },
  ]
  const team = [
    { name:'AC · Alex Chen',  tasks:12, color:'bg-brand-500' },
    { name:'MR · Maya Reeves',tasks:8,  color:'bg-violet-500' },
    { name:'JL · Jordan Lee', tasks:9,  color:'bg-emerald-500' },
  ]
  const burndown = [42,39,38,35,33,29,29]

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {metrics.map(m=>(
          <div key={m.label} className="bg-surface-800/50 border border-surface-700/50 rounded-xl p-2.5">
            <p className={`text-base font-bold ${m.color} leading-none`}>{m.value}</p>
            <p className="text-[8px] text-surface-600 uppercase tracking-wider mt-0.5">{m.label}</p>
            <p className={`text-[9px] font-medium mt-1 ${m.up?'text-emerald-400':'text-red-400'}`}>{m.trend}</p>
          </div>
        ))}
      </div>
      {/* Team throughput */}
      <div className="bg-surface-800/30 border border-surface-700/40 rounded-xl p-3">
        <p className="text-[10px] font-semibold text-surface-400 uppercase tracking-wider mb-2">Team Throughput</p>
        <div className="space-y-2">
          {team.map(t=>(
            <div key={t.name}>
              <div className="flex justify-between text-[9px] mb-0.5">
                <span className="text-surface-500">{t.name}</span>
                <span className="text-surface-400 font-medium">{t.tasks} tasks</span>
              </div>
              <div className="h-1.5 bg-surface-700 rounded-full">
                <div className={`h-full ${t.color} rounded-full`} style={{width:`${(t.tasks/15)*100}%`}} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Burndown chart */}
      <div className="bg-surface-800/30 border border-surface-700/40 rounded-xl p-3">
        <p className="text-[10px] font-semibold text-surface-400 uppercase tracking-wider mb-2">Sprint Burndown</p>
        <div className="flex items-end gap-1 h-12">
          {burndown.map((v,i)=>(
            <div key={i} className="flex-1 flex flex-col justify-end h-full" title={`Day ${i+1}: ${v} pts`}>
              <div className="bg-brand-500/70 hover:bg-brand-500 rounded-sm transition-colors" style={{height:`${(v/42)*100}%`}} />
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[8px] text-surface-700 mt-1">
          <span>Day 1</span><span>Today</span>
        </div>
      </div>
    </div>
  )
}
