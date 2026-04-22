import { Mail, Phone } from 'lucide-react'
import { usePrivacyPolicy } from '../context/PrivacyPolicyContext'

export default function Footer() {
  const year = new Date().getFullYear()
  const { open: openPrivacy } = usePrivacyPolicy()

  return (
    <footer className="bg-cream py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-4">
            <a
              href="#"
              className="font-serif text-2xl font-semibold tracking-tight text-charcoal"
            >
              Pavel Golasowski
            </a>
            <p className="mt-5 max-w-xs text-sm leading-[1.8] text-warm-gray">
              Vizuální produkce pro realitní makléře. Fotografie, video
              a&nbsp;AI vizualizace — vše pod jednou střechou.
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
                  { label: 'Služby', href: '#sluzby' },
                  { label: 'Proces', href: '#proces' },
                  { label: 'Reference', href: '#reference' },
                  { label: 'O mně', href: '#o-mne' },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-warm-gray transition-colors hover:text-charcoal"
                    >
                      {link.label}
                    </a>
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
                  'Fotografie',
                  'Videoprohlídky',
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
                    href="mailto:p.golasowski@icloud.com"
                    className="inline-flex items-center gap-2 text-sm text-warm-gray transition-colors hover:text-charcoal"
                  >
                    <Mail size={13} />
                    p.golasowski@icloud.com
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
            <p className="text-xs text-warm-gray/60">
              IČO: 08438927 &middot; Hrádek 390 &middot; OSVČ
            </p>
            <button
              type="button"
              onClick={openPrivacy}
              className="text-xs text-warm-gray/60 underline underline-offset-2 transition-colors hover:text-warm-gray"
            >
              Zásady ochrany osobních údajů
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
