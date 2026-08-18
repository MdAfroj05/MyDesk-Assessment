import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  GitMerge,
  SearchCode,
  Rocket,
} from 'lucide-react'
import { useInView } from '../hooks/useInView'

interface Feature {
  number: string
  icon: React.FC<{ className?: string }>
  title: string
  description: string
  tags: string[]
  accentColor: string
  iconBg: string
}

const features: Feature[] = [
  {
    number: '01',
    icon: LayoutDashboard,
    title: 'Plan',
    description:
      'Turn ideas into structured development plans. Create sprints, assign tasks, and set clear milestones — before a single line of code is written.',
    tags: ['Sprint planning', 'Task management', 'Milestones'],
    accentColor: 'brand',
    iconBg: 'bg-brand-500/10 border-brand-500/20 text-brand-400',
  },
  {
    number: '02',
    icon: GitMerge,
    title: 'Build',
    description:
      'Keep development work organized in one focused workspace. Track branches, link commits to tasks, and maintain context without leaving your flow.',
    tags: ['Git integration', 'Branch tracking', 'Context linking'],
    accentColor: 'violet',
    iconBg: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
  },
  {
    number: '03',
    icon: SearchCode,
    title: 'Review',
    description:
      'Understand progress and identify issues before release. Surface code quality signals and review test results alongside the work they belong to.',
    tags: ['Code review', 'Test results', 'Quality signals'],
    accentColor: 'sky',
    iconBg: 'bg-sky-500/10 border-sky-500/20 text-sky-400',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Deploy',
    description:
      'Track what is happening across your releases. Monitor deployments, compare environments, and understand every change that ships to production.',
    tags: ['Release tracking', 'Environments', 'Deployment health'],
    accentColor: 'emerald',
    iconBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Features() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.08 })

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="py-24 sm:py-32 section-padding"
    >
      <div className="container-max">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 max-w-2xl"
        >
          <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-3">
            Capabilities
          </p>
          <h2
            id="features-heading"
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight text-balance"
          >
            Four stages.
            <span className="gradient-text-brand"> One workspace.</span>
          </h2>
          <p className="mt-4 text-surface-400 text-sm sm:text-base leading-relaxed">
            MyDesk is built around the natural shape of software development — from the first task to the last deployment.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5"
        >
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FeatureCard({ feature }: { feature: Feature }) {
  const { icon: Icon, number, title, description, tags, iconBg } = feature

  return (
    <motion.article
      variants={cardVariants}
      className="group relative bg-surface-900/50 border border-surface-800/70 rounded-2xl p-6 sm:p-7 hover:border-surface-700 hover:bg-surface-900/80 transition-all duration-300"
    >
      {/* Number */}
      <span className="absolute top-6 right-6 text-xs font-mono font-bold text-surface-800 group-hover:text-surface-700 transition-colors select-none">
        {number}
      </span>

      {/* Icon */}
      <div
        className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border ${iconBg} mb-5`}
      >
        <Icon className="w-5 h-5" aria-hidden="true" />
      </div>

      {/* Content */}
      <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-surface-400 leading-relaxed mb-5">{description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-medium px-2 py-1 rounded-md border border-surface-800 bg-surface-800/50 text-surface-500 group-hover:border-surface-700 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  )
}
