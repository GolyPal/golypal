import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Služby', href: '#sluzby' },
  { label: 'Proces', href: '#proces' },
  { label: 'Reference', href: '#reference' },
  { label: 'O mně', href: '#o-mne' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
          : 'bg-cream'
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
        <div className="flex h-20 items-center justify-between lg:h-24">
          <a
            href="#"
            className="font-serif text-xl font-semibold tracking-tight text-charcoal transition-colors duration-300 lg:text-2xl"
          >
            Pavel Golasowski
          </a>

          <div className="hidden items-center gap-10 md:flex lg:gap-12">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium uppercase tracking-[0.12em] text-warm-gray transition-colors duration-300 hover:text-charcoal"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#konzultace"
              className="rounded-full bg-charcoal px-7 py-2.5 text-[13px] font-semibold tracking-wide text-white transition-all duration-300 hover:bg-accent"
            >
              Konzultace zdarma
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-charcoal transition-colors md:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-cream/98 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-lg px-4 py-3.5 text-[15px] font-medium text-warm-gray transition-colors hover:text-charcoal"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#konzultace"
                onClick={() => setMobileOpen(false)}
                className="mt-4 rounded-full bg-charcoal px-6 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-accent"
              >
                Konzultace zdarma
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
