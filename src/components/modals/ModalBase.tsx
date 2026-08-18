import { useEffect, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useModal } from '../../context/ModalContext'

interface ModalBaseProps {
  children: ReactNode
  maxWidth?: string
  /** aria-labelledby id */
  labelId: string
}

export function ModalBase({ children, maxWidth = 'max-w-md', labelId }: ModalBaseProps) {
  const { closeModal } = useModal()

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', handler)
    // Lock scroll
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [closeModal])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelId}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeModal}
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className={`relative w-full ${maxWidth} bg-surface-900 border border-surface-800 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden`}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={closeModal}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 p-1.5 rounded-lg text-surface-500 hover:text-surface-200 hover:bg-surface-800 transition-colors focus-visible:outline-2 focus-visible:outline-brand-400"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>

        {children}
      </motion.div>
    </motion.div>
  )
}
