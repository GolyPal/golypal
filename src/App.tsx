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

function App() {
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

export default App
