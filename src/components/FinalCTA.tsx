import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useInView } from '../hooks/useInView'
import { useModal } from '../context/ModalContext'

export default function FinalCTA() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 })
  const { openModal } = useModal()

  return (
    <section
      id="start"
      aria-labelledby="cta-heading"
      className="py-24 sm:py-32 section-padding"
    >
      <div className="container-max">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden border border-surface-800 bg-surface-900/50 px-8 py-16 sm:px-16 sm:py-20 text-center"
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] opacity-15"
              style={{
                background: 'radial-gradient(ellipse at top, #6366f1 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
          </div>

          {/* Grid overlay */}
          <div
            className="absolute inset-0 bg-grid-pattern bg-grid opacity-50 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <h2
              id="cta-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance mb-5 leading-tight"
            >
              Your next release deserves
              <br className="hidden sm:block" />
              <span className="gradient-text-brand"> a better workflow.</span>
            </h2>

            <p className="text-surface-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-10">
              Bring your development workflow into one focused workspace. From the first task to the last deployment.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => openModal('signup')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-semibold px-7 py-3.5 bg-brand-500 hover:bg-brand-400 text-white rounded-lg transition-all duration-200 shadow-xl shadow-brand-500/25 hover:shadow-brand-400/35 hover:-translate-y-0.5 group cursor-pointer"
              >
                Start Building
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
              <a
                href="#product"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-medium px-7 py-3.5 border border-surface-700 hover:border-surface-600 text-surface-300 hover:text-white rounded-lg transition-all duration-200 hover:bg-surface-800/50"
              >
                Explore the Product
              </a>
            </div>

            <p className="mt-8 text-xs text-surface-600">
              No credit card required. Available in open beta.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
