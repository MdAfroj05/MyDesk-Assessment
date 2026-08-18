import { useState } from 'react'
import { CheckCircle2, XCircle, AlertCircle, FlaskConical, ChevronDown, ChevronUp, Clock } from 'lucide-react'

interface TestSuite {
  id: string
  name: string
  passed: number
  failed: number
  skipped: number
  duration: string
  lastRun: string
  cases: { name: string; status: 'pass' | 'fail' | 'skip'; duration: string }[]
}

const SUITES: TestSuite[] = [
  {
    id: 's1', name: 'Auth Service', passed: 48, failed: 0, skipped: 2, duration: '3.2s', lastRun: '8m ago',
    cases: [
      { name: 'should issue JWT on valid login',        status: 'pass', duration: '12ms' },
      { name: 'should reject expired tokens',           status: 'pass', duration: '8ms' },
      { name: 'should refresh token within window',     status: 'pass', duration: '15ms' },
      { name: 'should handle concurrent refresh calls', status: 'skip', duration: '—' },
    ],
  },
  {
    id: 's2', name: 'Rate Limiter', passed: 31, failed: 2, skipped: 0, duration: '1.8s', lastRun: '8m ago',
    cases: [
      { name: 'should block after 100 req/min',         status: 'pass', duration: '22ms' },
      { name: 'should reset window correctly',          status: 'pass', duration: '18ms' },
      { name: 'should apply per-user limits',           status: 'fail', duration: '34ms' },
      { name: 'should return 429 with Retry-After',     status: 'fail', duration: '11ms' },
    ],
  },
  {
    id: 's3', name: 'API Gateway',  passed: 87, failed: 0, skipped: 1, duration: '6.1s', lastRun: '8m ago',
    cases: [
      { name: 'should route requests to correct service', status: 'pass', duration: '5ms' },
      { name: 'should apply CORS headers',               status: 'pass', duration: '4ms' },
      { name: 'should strip internal headers',           status: 'pass', duration: '6ms' },
      { name: 'load test (1k rps)',                      status: 'skip', duration: '—' },
    ],
  },
  {
    id: 's4', name: 'Dashboard UI', passed: 82, failed: 0, skipped: 5, duration: '9.4s', lastRun: '8m ago',
    cases: [
      { name: 'renders sprint progress card',   status: 'pass', duration: '44ms' },
      { name: 'renders task board correctly',   status: 'pass', duration: '51ms' },
      { name: 'handles empty state',            status: 'pass', duration: '28ms' },
      { name: 'mobile responsive layout',       status: 'skip', duration: '—' },
    ],
  },
]

export function TestResultsView() {
  const [expanded, setExpanded] = useState<string | null>(null)

  const totalPassed  = SUITES.reduce((s, t) => s + t.passed, 0)
  const totalFailed  = SUITES.reduce((s, t) => s + t.failed, 0)
  const totalSkipped = SUITES.reduce((s, t) => s + t.skipped, 0)
  const total = totalPassed + totalFailed + totalSkipped
  const coveragePct = 87

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Test Results</h3>
          <p className="text-xs text-surface-500 mt-0.5">Latest run · 8 minutes ago</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
          <span className="text-[10px] text-emerald-500 font-medium">Passing</span>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { label: 'Total',   value: total,        cls: 'text-white' },
          { label: 'Passed',  value: totalPassed,  cls: 'text-emerald-400' },
          { label: 'Failed',  value: totalFailed,  cls: 'text-red-400' },
          { label: 'Skipped', value: totalSkipped, cls: 'text-amber-400' },
        ].map(({ label, value, cls }) => (
          <div key={label} className="bg-surface-800/50 border border-surface-700/50 rounded-xl p-3 text-center">
            <p className={`text-xl font-bold ${cls}`}>{value}</p>
            <p className="text-[9px] text-surface-600 uppercase tracking-wider mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Coverage bar */}
      <div className="mb-4 p-3 bg-surface-800/40 border border-surface-700/40 rounded-xl">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <FlaskConical className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[11px] font-semibold text-surface-300">Code Coverage</span>
          </div>
          <span className="text-sm font-bold text-sky-400">{coveragePct}%</span>
        </div>
        <div className="h-2 bg-surface-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-500 to-sky-400 rounded-full transition-all duration-700"
            style={{ width: `${coveragePct}%` }}
            role="progressbar"
            aria-valuenow={coveragePct}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <div className="flex justify-between text-[9px] text-surface-600 mt-1">
          <span>Target: 80%</span>
          <span className="text-emerald-500">+7% above target</span>
        </div>
      </div>

      {/* Suite list */}
      <p className="text-[10px] font-semibold text-surface-500 uppercase tracking-wider mb-2">Test Suites</p>
      <div className="space-y-2">
        {SUITES.map((suite) => {
          const isExpanded = expanded === suite.id
          const hasFailed = suite.failed > 0
          return (
            <div key={suite.id} className="bg-surface-800/40 border border-surface-700/50 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setExpanded(isExpanded ? null : suite.id)}
                className="w-full flex items-center gap-3 p-3 hover:bg-surface-800/60 transition-colors text-left"
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${hasFailed ? 'bg-red-500/10 border border-red-500/20' : 'bg-emerald-500/10 border border-emerald-500/20'}`}>
                  {hasFailed
                    ? <XCircle className="w-3.5 h-3.5 text-red-400" />
                    : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white">{suite.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-emerald-500">{suite.passed} passed</span>
                    {suite.failed > 0 && <span className="text-[10px] text-red-400">{suite.failed} failed</span>}
                    {suite.skipped > 0 && <span className="text-[10px] text-surface-600">{suite.skipped} skipped</span>}
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-[10px] text-surface-600">
                      <Clock className="w-3 h-3" />{suite.duration}
                    </div>
                    <p className="text-[9px] text-surface-700">{suite.lastRun}</p>
                  </div>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-surface-600" /> : <ChevronDown className="w-3.5 h-3.5 text-surface-600" />}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-surface-700/50 px-4 py-3 bg-surface-900/40 space-y-1.5">
                  {suite.cases.map((c) => (
                    <div key={c.name} className="flex items-center gap-2.5">
                      {c.status === 'pass' ? <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                        : c.status === 'fail' ? <XCircle className="w-3 h-3 text-red-400 flex-shrink-0" />
                        : <AlertCircle className="w-3 h-3 text-amber-400 flex-shrink-0" />}
                      <span className={`text-[11px] flex-1 truncate ${c.status === 'fail' ? 'text-red-300' : c.status === 'skip' ? 'text-surface-600' : 'text-surface-400'}`}>
                        {c.name}
                      </span>
                      <span className="text-[9px] text-surface-600 font-mono flex-shrink-0">{c.duration}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
