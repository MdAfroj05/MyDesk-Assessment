import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Hexagon } from 'lucide-react'
import { useModal } from '../context/ModalContext'

const navLinks = [
  { label: 'Product', href: '#product', modal: null },
  { label: 'Features', href: '#features', modal: null },
  { label: 'Workflow', href: '#workflow', modal: null },
  { label: 'Pricing', href: null, modal: 'pricing' },
] as const

export default function Navbar() {
  const { openModal } = useModal()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (link: typeof navLinks[number], closeMobile?: boolean) => {
    if (closeMobile) setMenuOpen(false)
    if (link.modal) {
      openModal(link.modal)
    }
  }

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface-950/90 backdrop-blur-md border-b border-surface-800/60'
          : 'bg-transparent'
      }`}
    >
      <div className="container-max section-padding">
        <nav
          aria-label="Main navigation"
          className="flex items-center justify-between h-16"
        >
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded-sm"
            aria-label="MyDesk — home"
          >
            <div className="relative">
              <Hexagon
                className="w-7 h-7 text-brand-500 fill-brand-500/20 transition-all duration-300 group-hover:text-brand-400 group-hover:fill-brand-400/30"
                aria-hidden="true"
              />
              <span
                className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-brand-300 font-mono"
                aria-hidden="true"
              >
                MD
              </span>
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-white">
              MyDesk
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-6" role="list">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.modal ? (
                  <button
                    type="button"
                    onClick={() => handleNavClick(link)}
                    className="nav-link text-sm font-medium text-surface-400 hover:text-surface-100 transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </button>
                ) : (
                  <a
                    href={link.href ?? '#'}
                    className="nav-link text-sm font-medium text-surface-400 hover:text-surface-100 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => openModal('signin')}
              className="text-sm font-medium text-surface-400 hover:text-surface-100 transition-colors duration-200 px-3 py-1.5 rounded-md hover:bg-surface-800/50 cursor-pointer"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => openModal('signup')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white rounded-md transition-all duration-200 shadow-lg shadow-brand-500/20 hover:shadow-brand-400/30 hover:-translate-y-0.5 cursor-pointer"
            >
              Start Building
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-md text-surface-400 hover:text-surface-100 hover:bg-surface-800 transition-colors"
          >
            {menuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-surface-950/95 backdrop-blur-lg border-b border-surface-800"
          >
            <div className="section-padding py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                link.modal ? (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => handleNavClick(link, true)}
                    className="text-sm font-medium text-surface-300 hover:text-white py-2.5 px-3 rounded-md hover:bg-surface-800 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                ) : (
                  <a
                    key={link.label}
                    href={link.href ?? '#'}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm font-medium text-surface-300 hover:text-white py-2.5 px-3 rounded-md hover:bg-surface-800 transition-colors"
                  >
                    {link.label}
                  </a>
                )
              ))}
              <div className="mt-3 pt-3 border-t border-surface-800 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => { setMenuOpen(false); openModal('signin') }}
                  className="text-sm font-medium text-surface-400 hover:text-white py-2.5 px-3 rounded-md hover:bg-surface-800 transition-colors text-center"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setMenuOpen(false); openModal('signup') }}
                  className="text-sm font-semibold text-white bg-brand-500 hover:bg-brand-400 py-2.5 px-3 rounded-md transition-colors text-center"
                >
                  Start Building
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
