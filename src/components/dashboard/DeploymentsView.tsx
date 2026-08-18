import { useState } from 'react'
import { Server, GitBranch, Clock, CheckCircle2, XCircle, Loader2, RefreshCw, ChevronDown, ChevronUp, Rocket } from 'lucide-react'

type DeployStatus = 'healthy' | 'building' | 'failed' | 'idle'

interface Deployment {
  id: string
  env: string
  version: string
  branch: string
  author: string
  authorColor: string
  status: DeployStatus
  time: string
  duration: string
  commit: string
  message: string
}

const DEPLOYMENTS: Deployment[] = [
  {
    id: 'd1', env: 'Production', version: 'v2.1.3', branch: 'main',
    author: 'AC', authorColor: 'from-brand-400 to-brand-600',
    status: 'healthy', time: '2h ago', duration: '1m 24s',
    commit: 'a3f9c12', message: 'feat: add rate limiting to auth endpoints',
  },
  {
    id: 'd2', env: 'Staging', version: 'v2.1.4', branch: 'main',
    author: 'JL', authorColor: 'from-emerald-400 to-emerald-600',
    status: 'building', time: 'Just now', duration: '—',
    commit: 'b7e2a09', message: 'fix: JWT expiry edge case on refresh',
  },
  {
    id: 'd3', env: 'Preview', version: 'feat/auth', branch: 'feat/auth-service',
    author: 'MR', authorColor: 'from-violet-400 to-violet-600',
    status: 'healthy', time: '4h ago', duration: '58s',
    commit: 'c1d4f88', message: 'wip: auth service refactor — step 3',
  },
  {
    id: 'd4', env: 'Staging', version: 'v2.1.2', branch: 'main',
    author: 'AC', authorColor: 'from-brand-400 to-brand-600',
    status: 'failed', time: 'Yesterday', duration: '2m 07s',
    commit: 'e9a1b33', message: 'refactor: consolidate middleware pipeline',
  },
]

const statusConfig: Record<DeployStatus, { label: string; icon: React.FC<{ className?: string }>; cls: string; dotCls: string }> = {
  healthy:  { label: 'Healthy',  icon: CheckCircle2, cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', dotCls: 'bg-emerald-400 pulse-dot' },
  building: { label: 'Building', icon: Loader2,      cls: 'bg-brand-500/10   text-brand-400   border-brand-500/20',   dotCls: 'bg-brand-400' },
  failed:   { label: 'Failed',   icon: XCircle,      cls: 'bg-red-500/10     text-red-400     border-red-500/20',     dotCls: 'bg-red-400' },
  idle:     { label: 'Idle',     icon: Clock,        cls: 'bg-surface-700/60 text-surface-400 border-surface-600/30', dotCls: 'bg-surface-500' },
}

export function DeploymentsView() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [redeploying, setRedeploying] = useState<string | null>(null)

  const handleRedeploy = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setRedeploying(id)
    setTimeout(() => setRedeploying(null), 2500)
  }

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Deployments</h3>
          <p className="text-xs text-surface-500 mt-0.5">3 environments · last updated just now</p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-surface-600">
          <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
          <span className="text-emerald-500">Production healthy</span>
        </div>
      </div>

      {/* Environment summary */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { env: 'Production', version: 'v2.1.3', status: 'healthy' as DeployStatus },
          { env: 'Staging',    version: 'v2.1.4', status: 'building' as DeployStatus },
          { env: 'Preview',    version: 'feat/auth', status: 'healthy' as DeployStatus },
        ].map(({ env, version, status }) => {
          const sc = statusConfig[status]
          return (
            <div key={env} className={`border rounded-xl p-3 ${sc.cls}`}>
              <div className="flex items-center gap-1 mb-1">
                <span className={`w-1.5 h-1.5 rounded-full ${sc.dotCls}`} />
                <span className="text-[9px] font-semibold uppercase tracking-wider">{env}</span>
              </div>
              <p className="text-xs font-bold text-white font-mono">{version}</p>
              <p className="text-[9px] mt-0.5 opacity-70">{sc.label}</p>
            </div>
          )
        })}
      </div>

      {/* Deployment log */}
      <p className="text-[10px] font-semibold text-surface-500 uppercase tracking-wider mb-2">Deployment History</p>
      <div className="space-y-2">
        {DEPLOYMENTS.map((d) => {
          const sc = statusConfig[d.status]
          const Icon = sc.icon
          const isExpanded = expanded === d.id
          const isRedeploying = redeploying === d.id

          return (
            <div key={d.id} className="bg-surface-800/40 border border-surface-700/50 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setExpanded(isExpanded ? null : d.id)}
                className="w-full flex items-center gap-3 p-3 hover:bg-surface-800/60 transition-colors text-left"
              >
                {/* Status icon */}
                <div className={`w-7 h-7 rounded-lg border flex items-center justify-center flex-shrink-0 ${sc.cls}`}>
                  <Icon className={`w-3.5 h-3.5 ${d.status === 'building' ? 'animate-spin' : ''}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">{d.env}</span>
                    <code className="text-[10px] font-mono text-surface-500">{d.version}</code>
                    <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded border ${sc.cls}`}>{sc.label}</span>
                  </div>
                  <p className="text-[10px] text-surface-500 truncate mt-0.5">{d.message}</p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <p className="text-[10px] text-surface-500">{d.time}</p>
                    <div className="flex items-center gap-1 justify-end mt-0.5">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${d.authorColor} flex items-center justify-center`}>
                        <span className="text-[7px] font-bold text-white">{d.author}</span>
                      </div>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-surface-600" /> : <ChevronDown className="w-3.5 h-3.5 text-surface-600" />}
                </div>
              </button>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="border-t border-surface-700/50 px-4 py-3 bg-surface-900/40">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {[
                      { label: 'Commit',   value: d.commit,   mono: true },
                      { label: 'Branch',   value: d.branch,   mono: true },
                      { label: 'Duration', value: d.duration, mono: false },
                      { label: 'Author',   value: d.author,   mono: false },
                    ].map(({ label, value, mono }) => (
                      <div key={label}>
                        <p className="text-[9px] text-surface-600 uppercase tracking-wider mb-0.5">{label}</p>
                        <p className={`text-[11px] text-surface-300 ${mono ? 'font-mono' : 'font-medium'}`}>{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {d.status === 'failed' && (
                      <button
                        type="button"
                        onClick={(e) => handleRedeploy(d.id, e)}
                        disabled={!!isRedeploying}
                        className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/25 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {isRedeploying ? <Loader2 className="w-3 h-3 animate-spin" /> : <Rocket className="w-3 h-3" />}
                        {isRedeploying ? 'Redeploying…' : 'Redeploy'}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setExpanded(null) }}
                      className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 text-surface-500 hover:text-surface-300 border border-surface-700 hover:border-surface-600 rounded-lg transition-colors"
                    >
                      <RefreshCw className="w-3 h-3" />
                      View Logs
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
