import { CheckCircle2, Clock, GitCommit, Sparkles, AlertTriangle } from 'lucide-react'
import type { useAuth } from '../../context/AuthContext'

type User = ReturnType<typeof useAuth>['user']

export function OverviewView({ user }: { user: User }) {
  return (
    <div className="p-5 space-y-4">
      {/* Welcome banner */}
      <div className="flex items-start justify-between p-4 bg-brand-500/8 border border-brand-500/20 rounded-xl">
        <div>
          <p className="text-xs text-brand-400 font-medium mb-0.5">Signed in ✓</p>
          <p className="text-base font-bold text-white">Welcome back, {user?.name ?? 'admin'}</p>
          <p className="text-xs text-surface-500 mt-0.5">myDesk · Sprint 4</p>
        </div>
        <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium flex-shrink-0">
          Active
        </span>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Sprint',     value: '68%',  sub: '5 days left',      color: 'text-brand-400',   bar: 68 },
          { label: 'Tasks Done', value: '12',   sub: '5 in progress',    color: 'text-emerald-400', bar: null },
          { label: 'Tests',      value: '248',  sub: 'All green',        color: 'text-sky-400',     bar: null },
          { label: 'Production', value: 'Live', sub: 'v2.1.3 · Healthy', color: 'text-violet-400',  bar: null },
        ].map(({ label, value, sub, color, bar }) => (
          <div key={label} className="bg-surface-800/50 border border-surface-700/50 rounded-xl p-3">
            <p className="text-[9px] text-surface-600 uppercase tracking-wider mb-1.5">{label}</p>
            <p className={`text-xl font-bold ${color} leading-none`}>{value}</p>
            <p className="text-[10px] text-surface-600 mt-1">{sub}</p>
            {bar !== null && (
              <div className="mt-2 h-1 bg-surface-700 rounded-full">
                <div className="h-full bg-brand-500 rounded-full" style={{ width: `${bar}%` }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Two column */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Tasks */}
        <div className="bg-surface-800/30 border border-surface-700/40 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-semibold text-surface-400 uppercase tracking-wider">Task Board</p>
            <span className="text-[9px] text-surface-600">Sprint 4</span>
          </div>
          <div className="space-y-2">
            {[
              { name: 'Auth service refactor',  status: 'progress' },
              { name: 'API rate limiting',       status: 'progress' },
              { name: 'Dashboard metrics API',   status: 'review' },
              { name: 'Set up auth middleware',  status: 'done' },
              { name: 'JWT refresh flow',        status: 'done' },
            ].map(({ name, status }) => (
              <div key={name} className="flex items-center gap-2.5">
                {status === 'done'
                  ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  : <Clock className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />}
                <span className={`text-[11px] flex-1 truncate ${status === 'done' ? 'text-surface-600 line-through' : 'text-surface-300'}`}>{name}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium flex-shrink-0 ${
                  status === 'done' ? 'bg-emerald-500/10 text-emerald-500'
                  : status === 'review' ? 'bg-amber-500/10 text-amber-400'
                  : 'bg-brand-500/10 text-brand-400'
                }`}>{status === 'done' ? 'Done' : status === 'review' ? 'Review' : 'Active'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {/* Activity */}
          <div className="bg-surface-800/30 border border-surface-700/40 rounded-xl p-4">
            <div className="flex items-center gap-1.5 mb-3">
              <GitCommit className="w-3.5 h-3.5 text-surface-500" />
              <p className="text-[11px] font-semibold text-surface-400 uppercase tracking-wider">Recent Activity</p>
            </div>
            {[
              { user: 'AC', action: 'merged',    target: 'feat/auth-service', time: '12m ago', color: 'from-brand-500 to-brand-600' },
              { user: 'MR', action: 'opened PR', target: 'fix/rate-limiter',  time: '38m ago', color: 'from-violet-500 to-violet-600' },
              { user: 'JL', action: 'deployed',  target: 'v2.1.4 → staging', time: '1h ago',  color: 'from-emerald-500 to-emerald-600' },
            ].map(({ user: u, action, target, time, color }) => (
              <div key={target} className="flex items-start gap-2 mb-2 last:mb-0">
                <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <span className="text-[7px] font-bold text-white">{u}</span>
                </div>
                <div>
                  <p className="text-[10px] text-surface-400"><span className="font-medium text-surface-300">{u}</span> {action} <code className="font-mono text-brand-300 text-[10px]">{target}</code></p>
                  <p className="text-[9px] text-surface-600">{time}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Deployments mini */}
          <div className="bg-surface-800/30 border border-surface-700/40 rounded-xl p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Server className="w-3.5 h-3.5 text-violet-400" />
              <p className="text-[11px] font-semibold text-surface-400 uppercase tracking-wider">Deployments</p>
            </div>
            {[
              { env: 'Production', version: 'v2.1.3',    status: 'healthy' },
              { env: 'Staging',    version: 'v2.1.4',    status: 'healthy' },
              { env: 'Preview',    version: 'feat/auth', status: 'building' },
            ].map(({ env, version, status }) => (
              <div key={env} className="flex items-center justify-between py-1.5 border-b border-surface-800/60 last:border-0">
                <div>
                  <p className="text-[11px] font-medium text-surface-300">{env}</p>
                  <p className="text-[9px] text-surface-600 font-mono">{version}</p>
                </div>
                <span className={`flex items-center gap-1 text-[9px] font-medium px-1.5 py-0.5 rounded ${status === 'healthy' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${status === 'healthy' ? 'bg-emerald-400 pulse-dot' : 'bg-amber-400'}`} />
                  {status === 'healthy' ? 'Healthy' : 'Building'}
                </span>
              </div>
            ))}
          </div>
          {/* AI */}
          <div className="bg-surface-800/30 border border-amber-500/15 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <p className="text-[11px] font-semibold text-surface-400 uppercase tracking-wider">Desk Assistant</p>
            </div>
            <div className="flex items-start gap-1.5 p-2 bg-amber-500/5 border border-amber-500/15 rounded-lg">
              <AlertTriangle className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-[10px] text-surface-400 leading-relaxed">
                <span className="text-amber-300 font-medium">3 potential issues</span> detected.{' '}
                <code className="font-mono text-[9px] text-amber-300/70">auth.service.ts</code> and{' '}
                <code className="font-mono text-[9px] text-amber-300/70">rate-limiter.ts</code> flagged.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
