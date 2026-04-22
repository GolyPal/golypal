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

function App() {
  return (
    <PrivacyPolicyProvider>
      <ConsultFormProvider>
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
          <ConsultFormModal />
          <PrivacyPolicyModal />
        </div>
      </ConsultFormProvider>
    </PrivacyPolicyProvider>
  )
}

export default App
