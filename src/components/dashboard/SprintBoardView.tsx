import { useState } from 'react'
import { CheckCircle2, Circle, Clock, AlertCircle, GripVertical } from 'lucide-react'

type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done'

interface Task {
  id: string
  title: string
  assignee: string
  priority: 'high' | 'medium' | 'low'
  status: TaskStatus
  points: number
}

const INITIAL_TASKS: Task[] = [
  { id: 't1', title: 'Design system tokens update',        assignee: 'MR', priority: 'medium', status: 'todo',        points: 3 },
  { id: 't2', title: 'End-to-end test suite',             assignee: 'JL', priority: 'high',   status: 'todo',        points: 8 },
  { id: 't3', title: 'Add rate limiting service',          assignee: 'AC', priority: 'high',   status: 'in-progress', points: 5 },
  { id: 't4', title: 'Dashboard analytics API',            assignee: 'AC', priority: 'medium', status: 'in-progress', points: 5 },
  { id: 't5', title: 'Dashboard metrics UI',               assignee: 'MR', priority: 'medium', status: 'review',      points: 3 },
  { id: 't6', title: 'Set up auth middleware',             assignee: 'AC', priority: 'high',   status: 'done',        points: 5 },
  { id: 't7', title: 'Implement JWT refresh flow',         assignee: 'JL', priority: 'high',   status: 'done',        points: 8 },
  { id: 't8', title: 'Write API documentation',            assignee: 'MR', priority: 'low',    status: 'todo',        points: 2 },
]

const columns: { id: TaskStatus; label: string; color: string; dotColor: string }[] = [
  { id: 'todo',        label: 'To Do',       color: 'border-surface-700/60',  dotColor: 'bg-surface-500' },
  { id: 'in-progress', label: 'In Progress', color: 'border-brand-500/30',    dotColor: 'bg-brand-400' },
  { id: 'review',      label: 'Review',      color: 'border-amber-500/30',    dotColor: 'bg-amber-400' },
  { id: 'done',        label: 'Done',        color: 'border-emerald-500/30',  dotColor: 'bg-emerald-400' },
]

const priorityConfig = {
  high:   { label: 'High',   cls: 'text-red-400 bg-red-500/10 border-red-500/20' },
  medium: { label: 'Med',    cls: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  low:    { label: 'Low',    cls: 'text-surface-500 bg-surface-700/40 border-surface-600/30' },
}

const assigneeColors: Record<string, string> = {
  AC: 'from-brand-400 to-brand-600',
  MR: 'from-violet-400 to-violet-600',
  JL: 'from-emerald-400 to-emerald-600',
  SK: 'from-sky-400 to-sky-600',
}

function statusIcon(s: TaskStatus) {
  if (s === 'done')        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
  if (s === 'in-progress') return <Clock className="w-3.5 h-3.5 text-brand-400" />
  if (s === 'review')      return <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
  return <Circle className="w-3.5 h-3.5 text-surface-600" />
}

const CYCLE: TaskStatus[] = ['todo', 'in-progress', 'review', 'done']

export function SprintBoardView() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)

  const advanceStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t
        const idx = CYCLE.indexOf(t.status)
        const next = CYCLE[(idx + 1) % CYCLE.length]
        return { ...t, status: next }
      })
    )
  }

  const totalPoints = tasks.reduce((s, t) => s + t.points, 0)
  const donePoints  = tasks.filter((t) => t.status === 'done').reduce((s, t) => s + t.points, 0)

  return (
    <div className="p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Sprint Board</h3>
          <p className="text-xs text-surface-500 mt-0.5">
            Sprint 4 · {donePoints}/{totalPoints} story points
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-20 h-1.5 bg-surface-700 rounded-full">
            <div className="h-full bg-brand-500 rounded-full transition-all duration-500" style={{ width: `${Math.round((donePoints / totalPoints) * 100)}%` }} />
          </div>
          <span className="text-[10px] text-surface-500">{Math.round((donePoints / totalPoints) * 100)}%</span>
        </div>
      </div>

      {/* Hint */}
      <p className="text-[10px] text-surface-600 mb-3 flex items-center gap-1">
        <GripVertical className="w-3 h-3" />
        Click any task card to advance its status
      </p>

      {/* Columns */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id)
          return (
            <div key={col.id} className={`bg-surface-900/50 border ${col.color} rounded-xl p-3`}>
              {/* Col header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${col.dotColor}`} />
                  <span className="text-[10px] font-semibold text-surface-400">{col.label}</span>
                </div>
                <span className="text-[9px] text-surface-600 bg-surface-800 px-1.5 py-0.5 rounded-full">
                  {colTasks.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-2">
                {colTasks.map((task) => {
                  const pc = priorityConfig[task.priority]
                  return (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => advanceStatus(task.id)}
                      title={col.id !== 'done' ? 'Click to advance status' : 'Task complete'}
                      className="w-full text-left p-2.5 bg-surface-800/60 hover:bg-surface-800 border border-surface-700/50 hover:border-surface-600 rounded-lg transition-all duration-200 group"
                    >
                      <div className="flex items-start gap-1.5 mb-2">
                        {statusIcon(task.status)}
                        <p className={`text-[11px] leading-tight flex-1 ${task.status === 'done' ? 'text-surface-600 line-through' : 'text-surface-300 group-hover:text-white'} transition-colors`}>
                          {task.title}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${assigneeColors[task.assignee] ?? 'from-surface-500 to-surface-600'} flex items-center justify-center`}>
                            <span className="text-[7px] font-bold text-white">{task.assignee[0]}</span>
                          </div>
                          <span className="text-[9px] text-surface-600">{task.points}pt</span>
                        </div>
                        <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded border ${pc.cls}`}>{pc.label}</span>
                      </div>
                    </button>
                  )
                })}
                {colTasks.length === 0 && (
                  <div className="py-4 text-center text-[10px] text-surface-700 border border-dashed border-surface-800 rounded-lg">
                    No tasks
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
