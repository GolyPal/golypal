import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Viral from './components/Viral'
import Pain from './components/Pain'
import Benefits from './components/Benefits'
import Solution from './components/Solution'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import About from './components/About'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import ConsultFormModal from './components/ConsultFormModal'
import { ConsultFormProvider } from './context/ConsultFormContext'
import { PrivacyPolicyProvider } from './context/PrivacyPolicyContext'
import PrivacyPolicyModal from './components/PrivacyPolicyModal'
import CaseStudy from './pages/CaseStudy'

function HomePage() {
  // Arriving from another page via /#sluzby etc.: the browser tries to jump
  // before React has rendered the section, so scroll once it exists.
  // Mount only; in-page hash links keep their native smooth scroll.
  // instant: a smooth glide down the whole page from another route is slow.
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'instant' })
  }, [])

  return (
    <div className="overflow-x-clip">
      <Navbar />
      <Hero />
      <Viral />
      <Pain />
      <Benefits />
      <Solution />
      <Process />
      <Testimonials />
      <About />
      <FinalCTA />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      {/* With "reduce motion" on, Framer drops transform animations and keeps fades */}
      <MotionConfig reducedMotion="user">
      <PrivacyPolicyProvider>
        <ConsultFormProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pripadova-studie" element={<CaseStudy />} />
          </Routes>
          <ConsultFormModal />
          <PrivacyPolicyModal />
        </ConsultFormProvider>
      </PrivacyPolicyProvider>
      </MotionConfig>
    </BrowserRouter>
  )
}

export default App
