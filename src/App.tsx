import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Viral from './components/Viral'
import Pain from './components/Pain'
import Benefits from './components/Benefits'
import Solution from './components/Solution'
import Bonus from './components/Bonus'
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
  return (
    <div className="overflow-x-clip">
      <Navbar />
      <Hero />
      <Viral />
      <Pain />
      <Benefits />
      <Solution />
      <Bonus />
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
    </BrowserRouter>
  )
}

export default App
