import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type ModalType =
  | 'signin'
  | 'signup'
  | 'pricing'
  | 'changelog'
  | 'roadmap'
  | 'docs'
  | 'api'
  | 'status'
  | 'blog'
  | 'privacy'
  | 'terms'
  | 'security'
  | 'dashboard'
  | null

interface ModalContextValue {
  openModal: (type: ModalType) => void
  closeModal: () => void
  activeModal: ModalType
}

const ModalContext = createContext<ModalContextValue | null>(null)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null)

  const openModal = useCallback((type: ModalType) => {
    setActiveModal(type)
  }, [])

  const closeModal = useCallback(() => {
    setActiveModal(null)
  }, [])

  return (
    <ModalContext.Provider value={{ openModal, closeModal, activeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used inside ModalProvider')
  return ctx
}
