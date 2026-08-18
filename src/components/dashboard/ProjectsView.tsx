import { useState } from 'react'
import { FolderGit2, Users, Calendar, ChevronRight, Plus, Star, GitBranch } from 'lucide-react'

interface Project {
  name: string
  description: string
  status: 'active' | 'paused' | 'completed'
  sprint: string
  progress: number
  members: string[]
  branches: number
  dueDate: string
  starred: boolean
}

const PROJECTS: Project[] = [
  {
    name: 'myDesk',
    description: 'Core SaaS platform — auth, billing, and API gateway.',
    status: 'active',
    sprint: 'Sprint 4',
    progress: 68,
    members: ['AC', 'MR', 'JL'],
    branches: 7,
    dueDate: 'Aug 30',
    starred: true,
  },
  {
    name: 'Mobile App v2',
    description: 'React Native rebuild with offline-first architecture.',
    status: 'active',
    sprint: 'Sprint 2',
    progress: 34,
    members: ['JL', 'SK'],
    branches: 4,
    dueDate: 'Sep 14',
    starred: false,
  },
  {
    name: 'Data Pipeline',
    description: 'ETL service for analytics and reporting.',
    status: 'paused',
    sprint: 'Sprint 1',
    progress: 51,
    members: ['AC'],
    branches: 2,
    dueDate: 'Oct 01',
    starred: false,
  },
  {
    name: 'Design System',
    description: 'Shared component library across all products.',
    status: 'completed',
    sprint: 'Sprint 6',
    progress: 100,
    members: ['MR', 'SK', 'AC'],
    branches: 1,
    dueDate: 'Jul 15',
    starred: true,
  },
]

const statusConfig = {
  active:    { label: 'Active',    cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  paused:    { label: 'Paused',    cls: 'bg-amber-500/10   text-amber-400   border-amber-500/20' },
  completed: { label: 'Completed', cls: 'bg-surface-700/60 text-surface-400 border-surface-600/30' },
}

const memberColors = ['from-brand-400 to-brand-600', 'from-violet-400 to-violet-600', 'from-sky-400 to-sky-600', 'from-emerald-400 to-emerald-600']

export function ProjectsView() {
  const [selected, setSelected] = useState<string | null>(null)
  const selectedProject = PROJECTS.find((p) => p.name === selected)

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Projects</h3>
          <p className="text-xs text-surface-500 mt-0.5">{PROJECTS.length} projects in workspace</p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/25 rounded-lg transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          New Project
        </button>
      </div>

      {!selectedProject ? (
        <div className="space-y-2">
          {PROJECTS.map((p) => {
            const sc = statusConfig[p.status]
            return (
              <button
                key={p.name}
                type="button"
                onClick={() => setSelected(p.name)}
                className="w-full text-left p-4 bg-surface-800/40 hover:bg-surface-800/70 border border-surface-700/50 hover:border-surface-600 rounded-xl transition-all duration-200 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-brand-500/15 border border-brand-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FolderGit2 className="w-4 h-4 text-brand-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-white truncate">{p.name}</p>
                        {p.starred && <Star className="w-3 h-3 text-amber-400 fill-amber-400 flex-shrink-0" />}
                      </div>
                      <p className="text-[11px] text-surface-500 mt-0.5 truncate">{p.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full border ${sc.cls}`}>{sc.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-surface-600 group-hover:text-surface-400 transition-colors" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-[9px] text-surface-600 mb-1">
                      <span>{p.sprint}</span><span>{p.progress}%</span>
                    </div>
                    <div className="h-1 bg-surface-700 rounded-full">
                      <div
                        className={`h-full rounded-full ${p.status === 'completed' ? 'bg-emerald-500' : 'bg-brand-500'}`}
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-surface-600">
                    <div className="flex -space-x-1">
                      {p.members.map((m, i) => (
                        <div key={m} className={`w-4 h-4 rounded-full bg-gradient-to-br ${memberColors[i % memberColors.length]} border border-surface-900 flex items-center justify-center`}>
                          <span className="text-[7px] font-bold text-white">{m[0]}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitBranch className="w-3 h-3" />
                      <span>{p.branches}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{p.dueDate}</span>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      ) : (
        <ProjectDetail project={selectedProject} onBack={() => setSelected(null)} />
      )}
    </div>
  )
}

function ProjectDetail({ project: p, onBack }: { project: Project; onBack: () => void }) {
  const sc = statusConfig[p.status]
  return (
    <div>
      <button type="button" onClick={onBack} className="flex items-center gap-1.5 text-xs text-surface-500 hover:text-surface-300 mb-4 transition-colors">
        <ChevronRight className="w-3 h-3 rotate-180" />
        Back to Projects
      </button>
      <div className="flex items-start gap-3 mb-5 p-4 bg-surface-800/40 border border-surface-700/50 rounded-xl">
        <div className="w-10 h-10 rounded-xl bg-brand-500/15 border border-brand-500/20 flex items-center justify-center flex-shrink-0">
          <FolderGit2 className="w-5 h-5 text-brand-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-bold text-white">{p.name}</h4>
            {p.starred && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
            <span className={`ml-auto text-[9px] font-medium px-2 py-0.5 rounded-full border ${sc.cls}`}>{sc.label}</span>
          </div>
          <p className="text-xs text-surface-500">{p.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { label: 'Sprint', value: p.sprint },
          { label: 'Progress', value: `${p.progress}%` },
          { label: 'Due Date', value: p.dueDate },
          { label: 'Branches', value: String(p.branches) },
        ].map(({ label, value }) => (
          <div key={label} className="bg-surface-800/40 border border-surface-700/40 rounded-lg p-3">
            <p className="text-[9px] text-surface-600 uppercase tracking-wider mb-1">{label}</p>
            <p className="text-sm font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>
      <div className="bg-surface-800/40 border border-surface-700/40 rounded-xl p-4">
        <div className="flex items-center gap-1.5 mb-3">
          <Users className="w-3.5 h-3.5 text-surface-500" />
          <p className="text-[11px] font-semibold text-surface-400 uppercase tracking-wider">Team Members</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {p.members.map((m, i) => (
            <div key={m} className="flex items-center gap-2 px-2.5 py-1.5 bg-surface-700/40 border border-surface-600/40 rounded-lg">
              <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${memberColors[i % memberColors.length]} flex items-center justify-center`}>
                <span className="text-[7px] font-bold text-white">{m}</span>
              </div>
              <span className="text-[10px] text-surface-300 font-medium">{m}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
