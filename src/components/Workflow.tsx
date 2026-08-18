import { motion } from 'framer-motion'
import {
  Lightbulb,
  Code2,
  GitPullRequest,
  Rocket,
  Activity,
} from 'lucide-react'
import { useInView } from '../hooks/useInView'

interface WorkflowStep {
  icon: React.FC<{ className?: string }>
  stage: string
  label: string
  description: string
  color: string
  iconClass: string
  dotClass: string
}

const workflowSteps: WorkflowStep[] = [
  {
    icon: Lightbulb,
    stage: '01',
    label: 'Plan',
    description: 'Break work into structured sprints with clear tasks and priorities.',
    color: 'brand',
    iconClass: 'text-brand-400',
    dotClass: 'bg-brand-400',
  },
  {
    icon: Code2,
    stage: '02',
    label: 'Build',
    description: 'Track development progress, link commits, and stay in context.',
    color: 'violet',
    iconClass: 'text-violet-400',
    dotClass: 'bg-violet-400',
  },
  {
    icon: GitPullRequest,
    stage: '03',
    label: 'Review',
    description: 'Understand code quality and test results before they block a release.',
    color: 'sky',
    iconClass: 'text-sky-400',
    dotClass: 'bg-sky-400',
  },
  {
    icon: Rocket,
    stage: '04',
    label: 'Deploy',
    description: 'Release with confidence and watch each deployment stage in real time.',
    color: 'emerald',
    iconClass: 'text-emerald-400',
    dotClass: 'bg-emerald-400',
  },
  {
    icon: Activity,
    stage: '05',
    label: 'Monitor',
    description: 'Stay on top of production health so the next cycle starts informed.',
    color: 'amber',
    iconClass: 'text-amber-400',
    dotClass: 'bg-amber-400',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const stepVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Workflow() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <section
      id="workflow"
      aria-labelledby="workflow-heading"
      className="py-24 sm:py-32 section-padding bg-surface-900/20"
    >
      <div className="container-max">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-3">
            Workflow
          </p>
          <h2
            id="workflow-heading"
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight text-balance"
          >
            The development loop,
            <span className="gradient-text-brand"> made visible.</span>
          </h2>
          <p className="mt-4 text-surface-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            MyDesk maps to the way development actually works — a continuous loop from idea to production and back.
          </p>
        </motion.div>

        {/* Steps — desktop: horizontal timeline, mobile: vertical list */}
        <motion.ol
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative"
          aria-label="Development workflow steps"
        >
          {/* Desktop connector line */}
          <div
            className="hidden lg:block absolute top-10 left-[calc(10%+20px)] right-[calc(10%+20px)] h-px"
            aria-hidden="true"
          >
            <div className="h-full bg-gradient-to-r from-brand-400/30 via-sky-400/30 to-amber-400/30" />
          </div>

          {/* Mobile connector line */}
          <div
            className="lg:hidden absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-brand-400/30 via-sky-400/30 to-amber-400/30"
            aria-hidden="true"
          />

          {/* Desktop: flex row */}
          <div className="hidden lg:flex items-start justify-between gap-4">
            {workflowSteps.map((step, index) => (
              <DesktopStep key={step.label} step={step} index={index} />
            ))}
          </div>

          {/* Mobile: vertical list */}
          <div className="lg:hidden flex flex-col gap-0">
            {workflowSteps.map((step, index) => (
              <MobileStep key={step.label} step={step} index={index} isLast={index === workflowSteps.length - 1} />
            ))}
          </div>
        </motion.ol>
      </div>
    </section>
  )
}

function DesktopStep({ step, index }: { step: WorkflowStep; index: number }) {
  const { icon: Icon, stage, label, description, iconClass, dotClass } = step

  return (
    <motion.li
      variants={stepVariants}
      className="flex flex-col items-center text-center flex-1 min-w-0 relative z-10"
    >
      {/* Icon circle */}
      <div
        className={`w-20 h-20 rounded-full bg-surface-900 border border-surface-800 flex items-center justify-center mb-4 relative group hover:border-surface-700 transition-colors`}
      >
        <span
          className={`absolute -top-1 -right-1 w-5 h-5 rounded-full ${dotClass} flex items-center justify-center`}
          aria-hidden="true"
        >
          <span className="text-[8px] font-bold text-white">{index + 1}</span>
        </span>
        <Icon className={`w-7 h-7 ${iconClass}`} aria-hidden="true" />
      </div>

      {/* Stage label */}
      <span className="text-[9px] font-mono text-surface-700 tracking-widest mb-1">
        {stage}
      </span>

      {/* Step heading */}
      <h3 className="text-sm font-semibold text-white mb-2">{label}</h3>

      {/* Description */}
      <p className="text-[12px] text-surface-500 leading-relaxed max-w-[160px]">
        {description}
      </p>
    </motion.li>
  )
}

function MobileStep({
  step,
  index,
  isLast,
}: {
  step: WorkflowStep
  index: number
  isLast: boolean
}) {
  const { icon: Icon, stage, label, description, iconClass, dotClass } = step

  return (
    <motion.li
      variants={stepVariants}
      className={`flex gap-5 pl-0 ${!isLast ? 'pb-8' : ''}`}
    >
      {/* Left: dot + line */}
      <div className="flex flex-col items-center">
        <div
          className={`w-12 h-12 rounded-full bg-surface-900 border border-surface-800 flex items-center justify-center relative flex-shrink-0 z-10`}
        >
          <span
            className={`absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full ${dotClass} flex items-center justify-center`}
            aria-hidden="true"
          >
            <span className="text-[7px] font-bold text-white">{index + 1}</span>
          </span>
          <Icon className={`w-5 h-5 ${iconClass}`} aria-hidden="true" />
        </div>
      </div>

      {/* Right: content */}
      <div className="pt-2.5 pb-2 min-w-0">
        <span className="text-[9px] font-mono text-surface-700 tracking-widest block mb-0.5">
          {stage}
        </span>
        <h3 className="text-sm font-semibold text-white mb-1">{label}</h3>
        <p className="text-[12px] text-surface-500 leading-relaxed">{description}</p>
      </div>
    </motion.li>
  )
}
