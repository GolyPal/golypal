import { useState, useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Menu, Phone, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useConsultForm } from '../context/ConsultFormContext'
import Logo from './Logo'

const navLinks = [
  { label: 'Služby', href: '/#sluzby' },
  { label: 'Proces', href: '/#proces' },
  { label: 'Reference', href: '/#reference' },
  { label: 'O mně', href: '/#o-mne' },
]

/* On the home page a plain hash link, so smooth scroll works without reload.
   Elsewhere a router Link: the home page mounts and scrolls to the hash. */
export function SectionLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string
  className: string
  onClick?: () => void
  children: ReactNode
}) {
  const isHome = useLocation().pathname === '/'
  return isHome ? (
    <a href={href.replace('/', '')} className={className} onClick={onClick}>
      {children}
    </a>
  ) : (
    <Link to={href} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}

const desktopLinkClass =
  'relative isolate whitespace-nowrap text-[13px] font-medium uppercase tracking-[0.08em] text-warm-gray transition-colors duration-300 hover:text-on-brand before:absolute before:-inset-x-4 before:-inset-y-2 before:-z-10 before:scale-90 before:rounded-full before:bg-brand before:opacity-0 before:transition-[opacity,scale] before:duration-300 hover:before:scale-100 hover:before:opacity-100 xl:tracking-[0.12em]'

const mobileLinkClass =
  'block rounded-lg px-4 py-3.5 text-[15px] font-medium text-warm-gray transition-colors hover:bg-brand hover:text-on-brand'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { open: openConsult } = useConsultForm()

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
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-500 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
          : 'bg-cream'
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
        <div className="flex h-20 items-center justify-between lg:h-24">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0 })}
            aria-label="GolasVisuals, úvodní stránka"
            className="text-charcoal"
          >
            <Logo className="h-[22px] w-auto lg:h-6 xl:h-7" />
          </Link>

          {/* Full nav only from lg: between 768 and 1024 px it didn't fit and
              wrapped onto two lines, so tablets keep the menu button. */}
          <div className="hidden items-center gap-7 lg:flex xl:gap-12">
            {navLinks.map((link) => (
              <SectionLink key={link.href} href={link.href} className={desktopLinkClass}>
                {link.label}
              </SectionLink>
            ))}
            <Link to="/pripadova-studie" className={desktopLinkClass}>
              Případová studie
            </Link>
            <button
              type="button"
              onClick={openConsult}
              className="whitespace-nowrap rounded-full bg-cta px-6 py-2.5 text-[13px] font-semibold tracking-wide text-on-cta transition-colors duration-300 hover:bg-cta/85 xl:px-7"
            >
              Konzultace zdarma
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="-mr-2 flex h-11 w-11 items-center justify-center text-charcoal transition-colors lg:hidden"
            aria-label={mobileOpen ? 'Zavřít menu' : 'Menu'}
            aria-expanded={mobileOpen}
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
            className="overflow-hidden bg-cream/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-8">
              {[...navLinks, { label: 'Případová studie', href: '/pripadova-studie' }].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.href.startsWith('/#') ? (
                    <SectionLink href={link.href} onClick={() => setMobileOpen(false)} className={mobileLinkClass}>
                      {link.label}
                    </SectionLink>
                  ) : (
                    <Link to={link.href} onClick={() => setMobileOpen(false)} className={mobileLinkClass}>
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false)
                  openConsult()
                }}
                className="mt-4 rounded-full bg-cta px-6 py-3.5 text-center text-sm font-semibold text-on-cta transition-colors hover:bg-cta/85"
              >
                Konzultace zdarma
              </button>

              {/* Direct contact under a light divider */}
              <div className="mt-6 flex flex-col gap-1 border-t border-charcoal/10 pt-5">
                <a
                  href="mailto:info@golasvisuals.com"
                  className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-[15px] text-warm-gray transition-colors hover:text-charcoal"
                >
                  <Mail size={17} strokeWidth={1.75} />
                  info@golasvisuals.com
                </a>
                <a
                  href="tel:+420737248144"
                  className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-[15px] text-warm-gray transition-colors hover:text-charcoal"
                >
                  <Phone size={17} strokeWidth={1.75} />
                  +420 737 248 144
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
