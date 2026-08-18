import { useState, useId } from 'react'
import {
  LayoutDashboard, FolderGit2, Kanban, Rocket,
  FlaskConical, TrendingUp, Settings, LogOut,
  Bell, User, KeyRound, Hexagon, ChevronRight,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ModalBase } from './ModalBase'
import { useModal } from '../../context/ModalContext'
import { useAuth } from '../../context/AuthContext'
import { ChangePasswordPanel } from './ChangePasswordPanel'
import { OverviewView }     from '../dashboard/OverviewView'
import { ProjectsView }     from '../dashboard/ProjectsView'
import { SprintBoardView }  from '../dashboard/SprintBoardView'
import { DeploymentsView }  from '../dashboard/DeploymentsView'
import { TestResultsView }  from '../dashboard/TestResultsView'
import { InsightsView }     from '../dashboard/InsightsView'

type NavItem = 'overview' | 'projects' | 'sprint' | 'deployments' | 'tests' | 'insights' | 'settings'
type SettingsSub = 'profile' | 'password'

const NAV_ITEMS: { id: NavItem; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
  { id: 'overview',     label: 'Overview',     icon: LayoutDashboard },
  { id: 'projects',     label: 'Projects',     icon: FolderGit2 },
  { id: 'sprint',       label: 'Sprint Board', icon: Kanban },
  { id: 'deployments',  label: 'Deployments',  icon: Rocket },
  { id: 'tests',        label: 'Test Results', icon: FlaskConical, badge: '2' },
  { id: 'insights',     label: 'Insights',     icon: TrendingUp },
]

export function DashboardModal() {
  const { closeModal } = useModal()
  const { logout, user } = useAuth()
  const headingId = useId()

  const [active, setActive]         = useState<NavItem>('overview')
  const [settingsSub, setSettingsSub] = useState<SettingsSub>('profile')

  const handleSignOut = () => { logout(); closeModal() }

  return (
    <ModalBase labelId={headingId} maxWidth="max-w-4xl">
      <div className="flex" style={{ height: 'min(86vh, 640px)' }}>

        {/* ── Sidebar ── */}
        <aside className="flex flex-col w-48 flex-shrink-0 border-r border-surface-800 bg-surface-900/50">
          {/* Logo strip */}
          <div className="flex items-center gap-2 px-4 py-4 border-b border-surface-800">
            <div className="relative flex-shrink-0">
              <Hexagon className="w-6 h-6 text-brand-500 fill-brand-500/20" aria-hidden="true" />
              <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-brand-300 font-mono" aria-hidden="true">MD</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white leading-none">MyDesk</p>
              <p className="text-[10px] text-surface-600 truncate mt-0.5">myDesk</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto" aria-label="Dashboard navigation">
            {NAV_ITEMS.map(({ id, label, icon: Icon, badge }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                aria-current={active === id ? 'page' : undefined}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all duration-150 group ${
                  active === id
                    ? 'bg-brand-500/15 text-brand-300 font-medium'
                    : 'text-surface-500 hover:text-surface-200 hover:bg-surface-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${active === id ? 'text-brand-400' : 'text-surface-600 group-hover:text-surface-400'}`} aria-hidden="true" />
                <span className="text-xs flex-1 truncate">{label}</span>
                {badge && (
                  <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[8px] font-bold flex items-center justify-center flex-shrink-0">
                    {badge}
                  </span>
                )}
                {active === id && <ChevronRight className="w-3 h-3 text-brand-500/50 flex-shrink-0" aria-hidden="true" />}
              </button>
            ))}
          </nav>

          {/* Settings + user */}
          <div className="p-2 border-t border-surface-800 space-y-0.5">
            <button
              type="button"
              onClick={() => setActive('settings')}
              aria-current={active === 'settings' ? 'page' : undefined}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all duration-150 group ${
                active === 'settings'
                  ? 'bg-brand-500/15 text-brand-300 font-medium'
                  : 'text-surface-500 hover:text-surface-200 hover:bg-surface-800/60'
              }`}
            >
              <Settings className={`w-3.5 h-3.5 flex-shrink-0 ${active === 'settings' ? 'text-brand-400' : 'text-surface-600 group-hover:text-surface-400'}`} aria-hidden="true" />
              <span className="text-xs flex-1">Settings</span>
            </button>

            {/* User row */}
            <button
              type="button"
              onClick={() => { setActive('settings'); setSettingsSub('profile') }}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-surface-800/60 transition-colors"
              aria-label="Open profile settings"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-400 to-violet-500 flex-shrink-0 flex items-center justify-center">
                <span className="text-[8px] font-bold text-white">{(user?.name ?? 'A')[0].toUpperCase()}</span>
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="text-[10px] font-medium text-surface-300 truncate">{user?.name ?? 'Admin'}</p>
                <p className="text-[9px] text-surface-600 truncate">{user?.role ?? 'Administrator'}</p>
              </div>
            </button>

            <button
              type="button"
              onClick={handleSignOut}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-surface-600 hover:text-red-400 hover:bg-red-500/5 transition-all duration-150"
              aria-label="Sign out"
            >
              <LogOut className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
              <span className="text-xs">Sign out</span>
            </button>
          </div>
        </aside>

        {/* ── Main content ── */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Topbar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-surface-800 flex-shrink-0">
            <div>
              <h2 id={headingId} className="text-sm font-semibold text-white capitalize">
                {active === 'sprint' ? 'Sprint Board'
                  : active === 'tests' ? 'Test Results'
                  : active}
              </h2>
              <p className="text-[10px] text-surface-600">myDesk · Sprint 4</p>
            </div>
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-surface-500 hover:text-surface-300 cursor-pointer transition-colors" aria-label="Notifications" />
              <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                Active sprint
              </span>
            </div>
          </div>

          {/* View content */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="h-full"
              >
                {active === 'overview'    && <OverviewView user={user} />}
                {active === 'projects'    && <ProjectsView />}
                {active === 'sprint'      && <SprintBoardView />}
                {active === 'deployments' && <DeploymentsView />}
                {active === 'tests'       && <TestResultsView />}
                {active === 'insights'    && <InsightsView />}
                {active === 'settings'    && (
                  <SettingsView
                    user={user}
                    sub={settingsSub}
                    onSubChange={setSettingsSub}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </ModalBase>
  )
}

/* ─── Settings view ─── */
function SettingsView({
  user,
  sub,
  onSubChange,
}: {
  user: ReturnType<typeof useAuth>['user']
  sub: SettingsSub
  onSubChange: (s: SettingsSub) => void
}) {
  return (
    <div className="flex h-full">
      {/* Settings sub-nav */}
      <nav className="w-36 flex-shrink-0 border-r border-surface-800 p-2 space-y-0.5" aria-label="Settings sections">
        {([ { id: 'profile', label: 'Profile', icon: User }, { id: 'password', label: 'Password', icon: KeyRound } ] as { id: SettingsSub; label: string; icon: React.FC<{ className?: string }> }[]).map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" onClick={() => onSubChange(id)}
            aria-current={sub === id ? 'page' : undefined}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors ${sub === id ? 'bg-brand-500/15 text-brand-300' : 'text-surface-500 hover:text-surface-200 hover:bg-surface-800/50'}`}>
            <Icon className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
            {label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <div className="flex-1 p-5 overflow-y-auto scrollbar-thin min-w-0">
        <AnimatePresence mode="wait">
          {sub === 'profile' ? (
            <motion.div key="profile" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <ProfilePanel user={user} />
            </motion.div>
          ) : (
            <motion.div key="password" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <ChangePasswordPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ─── Profile panel ─── */
function ProfilePanel({ user }: { user: ReturnType<typeof useAuth>['user'] }) {
  return (
    <div className="max-w-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-violet-400" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Profile</h3>
          <p className="text-xs text-surface-500">Your account information</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-5 p-4 bg-surface-800/40 border border-surface-700/50 rounded-xl">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-400 to-violet-500 flex items-center justify-center flex-shrink-0">
          <span className="text-lg font-bold text-white">{(user?.name ?? 'A')[0].toUpperCase()}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{user?.name ?? 'Admin'}</p>
          <p className="text-xs text-surface-500 mt-0.5">{user?.role ?? 'Administrator'}</p>
          <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] px-2 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 pulse-dot" aria-hidden="true" />
            Active session
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {[
          { label: 'Username', value: user?.username ?? 'admin' },
          { label: 'Email',    value: user?.email    ?? 'admin@mydesk.dev' },
          { label: 'Role',     value: user?.role     ?? 'Administrator' },
        ].map(({ label, value }) => (
          <div key={label}>
            <label className="block text-xs font-medium text-surface-500 mb-1.5">{label}</label>
            <div className="px-3.5 py-2.5 bg-surface-800/40 border border-surface-700/40 rounded-lg text-sm text-surface-300 select-all">{value}</div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[11px] text-surface-700">This is a demo workspace. Profile editing is not available in beta.</p>
    </div>
  )
}
