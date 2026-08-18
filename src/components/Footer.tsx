import { Hexagon } from 'lucide-react'
import { useModal, type ModalType } from '../context/ModalContext'

interface FooterLink {
  label: string
  href?: string
  modal?: ModalType
}

const footerSections: { heading: string; links: FooterLink[] }[] = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Workflow', href: '#workflow' },
      { label: 'Changelog', modal: 'changelog' },
      { label: 'Roadmap', modal: 'roadmap' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Documentation', modal: 'docs' },
      { label: 'API Reference', modal: 'api' },
      { label: 'Status', modal: 'status' },
      { label: 'Blog', modal: 'blog' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', modal: 'privacy' },
      { label: 'Terms of Service', modal: 'terms' },
      { label: 'Security', modal: 'security' },
    ],
  },
]

export default function Footer() {
  const { openModal } = useModal()

  return (
    <footer
      role="contentinfo"
      className="border-t border-surface-800/60 section-padding py-14"
    >
      <div className="container-max">
        {/* Top row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 lg:gap-16 mb-14">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <a
              href="#"
              className="inline-flex items-center gap-2 group mb-4"
              aria-label="MyDesk — home"
            >
              <div className="relative">
                <Hexagon
                  className="w-6 h-6 text-brand-500 fill-brand-500/20"
                  aria-hidden="true"
                />
                <span
                  className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-brand-300 font-mono"
                  aria-hidden="true"
                >
                  MD
                </span>
              </div>
              <span className="text-sm font-semibold tracking-tight text-white">
                MyDesk
              </span>
            </a>
            <p className="text-xs text-surface-600 leading-relaxed max-w-[200px]">
              A developer workspace built around how software development actually works.
            </p>
          </div>

          {/* Link groups */}
          {footerSections.map((section) => (
            <nav
              key={section.heading}
              aria-label={`${section.heading} links`}
            >
              <h3 className="text-[11px] font-semibold text-surface-400 uppercase tracking-widest mb-4">
                {section.heading}
              </h3>
              <ul className="space-y-2.5" role="list">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.modal ? (
                      <button
                        type="button"
                        onClick={() => openModal(link.modal!)}
                        className="text-xs text-surface-600 hover:text-surface-300 transition-colors duration-150 cursor-pointer"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="text-xs text-surface-600 hover:text-surface-300 transition-colors duration-150"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom row */}
        <div className="pt-6 border-t border-surface-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-surface-700">
            © {new Date().getFullYear()} MyDesk. A fictional product built for assessment purposes.
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => openModal('privacy')}
              className="text-[11px] text-surface-700 hover:text-surface-500 transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <button
              type="button"
              onClick={() => openModal('terms')}
              className="text-[11px] text-surface-700 hover:text-surface-500 transition-colors cursor-pointer"
            >
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
