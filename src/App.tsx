import { AuthProvider } from './context/AuthContext'
import { ModalProvider } from './context/ModalContext'
import { ModalHub } from './components/modals/ModalHub'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductShowcase from './components/ProductShowcase'
import Features from './components/Features'
import ProductInteraction from './components/ProductInteraction'
import Workflow from './components/Workflow'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <div className="min-h-screen bg-surface-950 text-surface-100">
          <Navbar />
          <main>
            <Hero />
            <ProductShowcase />
            <Features />
            <ProductInteraction />
            <Workflow />
            <FinalCTA />
          </main>
          <Footer />
        </div>
        <ModalHub />
      </ModalProvider>
    </AuthProvider>
  )
}
