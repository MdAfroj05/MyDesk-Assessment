import { AnimatePresence } from 'framer-motion'
import { useModal } from '../../context/ModalContext'
import { SignInModal } from './SignInModal'
import { SignUpModal } from './SignUpModal'
import { PricingModal } from './PricingModal'
import { InfoModal } from './InfoModal'
import { DashboardModal } from './DashboardModal'

export function ModalHub() {
  const { activeModal } = useModal()

  return (
    <AnimatePresence mode="wait">
      {activeModal === 'signin' && <SignInModal key="signin" />}
      {activeModal === 'signup' && <SignUpModal key="signup" />}
      {activeModal === 'pricing' && <PricingModal key="pricing" />}
      {activeModal === 'dashboard' && <DashboardModal key="dashboard" />}
      {(activeModal === 'changelog' ||
        activeModal === 'roadmap' ||
        activeModal === 'docs' ||
        activeModal === 'api' ||
        activeModal === 'status' ||
        activeModal === 'blog' ||
        activeModal === 'privacy' ||
        activeModal === 'terms' ||
        activeModal === 'security') && (
        <InfoModal key={activeModal} type={activeModal} />
      )}
    </AnimatePresence>
  )
}
