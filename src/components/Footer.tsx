import { Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePrivacyPolicy } from '../context/PrivacyPolicyContext'
import { SectionLink } from './Navbar'
import { InstagramIcon, LinkedInIcon } from './SocialIcons'

export default function Footer() {
  const year = new Date().getFullYear()
  const { open: openPrivacy } = usePrivacyPolicy()

  return (
    <footer className="bg-cream py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0 })}
              className="font-serif text-2xl font-semibold tracking-tight text-charcoal"
            >
              Pavel Golasowski
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-[1.8] text-warm-gray">
              Vizuální produkce pro realitní makléře. Video, fotografie
              a&nbsp;AI vizualizace. Vše pod jednou střechou.
            </p>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-charcoal">
                Navigace
              </h4>
              <ul className="space-y-3">
                {[
                  { label: 'Služby', href: '/#sluzby' },
                  { label: 'Proces', href: '/#proces' },
                  { label: 'Reference', href: '/#reference' },
                  { label: 'O mně', href: '/#o-mne' },
                ].map((link) => (
                  <li key={link.href}>
                    <SectionLink
                      href={link.href}
                      className="text-sm text-warm-gray transition-colors hover:text-charcoal"
                    >
                      {link.label}
                    </SectionLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-charcoal">
                Služby
              </h4>
              <ul className="space-y-3">
                {[
                  'Reels',
                  'Fotografie',
                  'AI vizualizace',
                  'Virtuální staging',
                ].map((item) => (
                  <li key={item}>
                    <span className="text-sm text-warm-gray">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-charcoal">
                Kontakt
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:info@golasvisuals.com"
                    className="inline-flex items-center gap-2 text-sm text-warm-gray transition-colors hover:text-charcoal"
                  >
                    <Mail size={13} />
                    info@golasvisuals.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+420737248144"
                    className="inline-flex items-center gap-2 text-sm text-warm-gray transition-colors hover:text-charcoal"
                  >
                    <Phone size={13} />
                    +420 737 248 144
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/golypal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-warm-gray transition-colors hover:text-charcoal"
                  >
                    <InstagramIcon />
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/pavel-golasowski-b11889136/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-warm-gray transition-colors hover:text-charcoal"
                  >
                    <LinkedInIcon />
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-charcoal/6 pt-8 sm:flex-row sm:items-center lg:mt-20">
          <p className="text-xs text-warm-gray">
            &copy; {year} Pavel Golasowski. Všechna práva vyhrazena.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p className="text-xs text-warm-gray">
              IČO: 08438927 &middot; Hrádek 390 &middot; OSVČ
            </p>
            <button
              type="button"
              onClick={openPrivacy}
              className="text-xs text-warm-gray underline underline-offset-2 transition-colors hover:text-charcoal"
            >
              Zásady ochrany osobních údajů
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
