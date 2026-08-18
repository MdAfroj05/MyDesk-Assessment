import { TrendingUp, TrendingDown, GitMerge, Rocket, Clock, Target, Zap, AlertTriangle } from 'lucide-react'

interface MetricBarProps { label: string; value: number; max: number; color: string; unit?: string }

function MetricBar({ label, value, max, color, unit = '' }: MetricBarProps) {
  const pct = Math.round((value / max) * 100)
  return (
    <div>
      <div className="flex justify-between text-[10px] mb-1">
        <span className="text-surface-400">{label}</span>
        <span className="text-surface-300 font-medium">{value}{unit}</span>
      </div>
      <div className="h-1.5 bg-surface-700 rounded-full">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export function InsightsView() {
  return (
    <div className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">Insights</h3>
          <p className="text-xs text-surface-500 mt-0.5">Sprint 4 · last 14 days</p>
        </div>
        <span className="text-[10px] px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 font-medium">
          Sprint 4
        </span>
      </div>

      {/* Velocity cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Velocity',      value: '29',  unit: 'pts',  trend: '+12%', up: true,  icon: Zap,       color: 'text-brand-400' },
          { label: 'Cycle Time',    value: '2.4', unit: 'd',   trend: '-0.6d', up: true,  icon: Clock,     color: 'text-sky-400' },
          { label: 'PRs Merged',    value: '11',  unit: '',     trend: '+3',    up: true,  icon: GitMerge,  color: 'text-violet-400' },
          { label: 'Deploys',       value: '6',   unit: '',     trend: '+2',    up: true,  icon: Rocket,    color: 'text-emerald-400' },
        ].map(({ label, value, unit, trend, up, icon: Icon, color }) => (
          <div key={label} className="bg-surface-800/50 border border-surface-700/50 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <Icon className={`w-3.5 h-3.5 ${color}`} />
              <span className={`flex items-center gap-0.5 text-[9px] font-medium ${up ? 'text-emerald-400' : 'text-red-400'}`}>
                {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {trend}
              </span>
            </div>
            <p className={`text-xl font-bold ${color} leading-none`}>{value}<span className="text-xs text-surface-600 ml-0.5">{unit}</span></p>
            <p className="text-[9px] text-surface-600 uppercase tracking-wider mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Team performance */}
      <div className="bg-surface-800/30 border border-surface-700/40 rounded-xl p-4">
        <div className="flex items-center gap-1.5 mb-4">
          <Target className="w-3.5 h-3.5 text-brand-400" />
          <p className="text-[11px] font-semibold text-surface-300 uppercase tracking-wider">Team Throughput</p>
        </div>
        <div className="space-y-3">
          <MetricBar label="AC — Alex Chen"    value={12} max={15} color="bg-brand-500"   unit=" tasks" />
          <MetricBar label="MR — Maya Reeves"  value={8}  max={15} color="bg-violet-500"  unit=" tasks" />
          <MetricBar label="JL — Jordan Lee"   value={9}  max={15} color="bg-emerald-500" unit=" tasks" />
        </div>
      </div>

      {/* Sprint burndown */}
      <div className="bg-surface-800/30 border border-surface-700/40 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-semibold text-surface-300 uppercase tracking-wider">Sprint Burndown</p>
          <span className="text-[10px] text-surface-600">29/42 pts done</span>
        </div>
        {/* Simple visual burndown using bars */}
        <div className="flex items-end gap-1 h-14">
          {[42, 39, 38, 35, 33, 29, 29].map((val, i) => {
            const ideal = 42 - (42 / 6) * i
            const height = Math.round((val / 42) * 100)
            const idealH  = Math.round((ideal / 42) * 100)
            return (
              <div key={i} className="flex-1 flex flex-col items-center justify-end gap-0.5 h-full relative">
                {/* Ideal */}
                <div className="absolute bottom-0 w-0.5 bg-surface-600 rounded-full opacity-40" style={{ height: `${idealH}%` }} />
                {/* Actual */}
                <div
                  className="w-full bg-brand-500/70 hover:bg-brand-500 rounded-sm transition-colors cursor-default relative z-10"
                  style={{ height: `${height}%` }}
                  title={`Day ${i + 1}: ${val} pts remaining`}
                />
              </div>
            )
          })}
        </div>
        <div className="flex justify-between text-[9px] text-surface-700 mt-1">
          <span>Day 1</span>
          <span>Today (Day 7)</span>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-brand-500/70" /><span className="text-[9px] text-surface-600">Actual</span></div>
          <div className="flex items-center gap-1"><span className="w-2 h-0.5 bg-surface-600" /><span className="text-[9px] text-surface-600">Ideal</span></div>
        </div>
      </div>

      {/* Code health */}
      <div className="bg-surface-800/30 border border-amber-500/15 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <p className="text-[11px] font-semibold text-surface-300 uppercase tracking-wider">Code Health Signals</p>
        </div>
        <div className="space-y-2.5">
          {[
            { label: 'Test Coverage',     value: 87, max: 100, color: 'bg-sky-500',     unit: '%' },
            { label: 'Lint Score',        value: 94, max: 100, color: 'bg-emerald-500', unit: '%' },
            { label: 'Tech Debt Index',   value: 23, max: 100, color: 'bg-amber-500',   unit: '/100' },
          ].map((m) => (
            <MetricBar key={m.label} {...m} />
          ))}
        </div>
        <p className="text-[10px] text-amber-400/70 mt-3 leading-relaxed">
          2 issues flagged in <code className="font-mono text-[9px]">rate-limiter.ts</code> — review recommended before next release.
        </p>
      </div>
    </div>
  )
}
