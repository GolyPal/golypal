import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { usePrivacyPolicy } from '../context/PrivacyPolicyContext'

export default function PrivacyPolicyModal() {
  const { isOpen, close } = usePrivacyPolicy()

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-[200] bg-charcoal/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-modal-title"
            className="fixed inset-0 z-[201] flex items-center justify-center px-4 py-8 sm:py-12"
          >
            <div className="relative flex w-full max-w-[640px] flex-col bg-cream shadow-2xl max-h-[85vh]">
              {/* Header */}
              <div className="flex-none border-b border-charcoal/8 px-8 pb-5 pt-10 sm:px-12">
                <p className="text-[10px] uppercase tracking-[0.35em] text-accent">Právní informace</p>
                <h2
                  id="privacy-modal-title"
                  className="mt-1.5 font-serif text-xl font-medium text-charcoal"
                >
                  Zásady ochrany osobních údajů
                </h2>
              </div>

              <button
                type="button"
                onClick={close}
                aria-label="Zavřít"
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center text-charcoal/40 transition-colors hover:text-charcoal"
              >
                <X size={18} />
              </button>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-8 py-8 sm:px-12">
                <div className="space-y-7 text-[14px] leading-[1.8] text-warm-gray">

                  <section>
                    <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal">
                      Správce osobních údajů
                    </h3>
                    <p>
                      Pavel Golasowski, IČO: 08438927, Hrádek 390,
                      e-mail:{' '}
                      <a href="mailto:p.golasowski@icloud.com" className="text-charcoal underline underline-offset-2 hover:text-accent transition-colors">
                        p.golasowski@icloud.com
                      </a>
                      , tel.:{' '}
                      <a href="tel:+420737248144" className="text-charcoal underline underline-offset-2 hover:text-accent transition-colors">
                        +420 737 248 144
                      </a>
                    </p>
                    <p className="mt-1">
                      Zapsán v živnostenském rejstříku vedeném příslušným živnostenským úřadem.
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal">
                      Jaké osobní údaje zpracovávám
                    </h3>
                    <p>
                      Prostřednictvím poptávkového formuláře na tomto webu shromažďuji tyto
                      osobní údaje: jméno a příjmení, telefonní číslo, e-mailovou adresu,
                      odkaz na sociální sítě, oblast působení a orientační počet zakázek
                      měsíčně.
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal">
                      Účel a právní základ zpracování
                    </h3>
                    <p>
                      Údaje zpracovávám výhradně za účelem zodpovězení vaší poptávky
                      a domluvení nezávazné konzultace. Právním základem je váš souhlas
                      podle čl. 6 odst. 1 písm. a) nařízení GDPR (Nařízení Evropského
                      parlamentu a Rady (EU) 2016/679).
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal">
                      Příjemci a zpracovatelé
                    </h3>
                    <p>
                      Odeslaný formulář zpracovává společnost Formspree, Inc. (USA) jako
                      zpracovatel ve smyslu čl. 28 GDPR na základě standardních smluvních
                      doložek (SCC). Vaše údaje nepředávám žádné jiné třetí straně ani
                      je nevyužívám k marketingovým účelům.
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal">
                      Doba uchovávání
                    </h3>
                    <p>
                      Osobní údaje uchovávám po dobu nezbytně nutnou k vyřízení vaší
                      poptávky, nejdéle však 2 roky od jejich poskytnutí, nebo do
                      odvolání vašeho souhlasu — podle toho, co nastane dříve.
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal">
                      Vaše práva
                    </h3>
                    <p>Jako subjekt údajů máte právo:</p>
                    <ul className="mt-2 space-y-1 pl-4">
                      {[
                        'na přístup ke svým osobním údajům,',
                        'na opravu nepřesných nebo neúplných údajů,',
                        'na výmaz osobních údajů („právo být zapomenut"),',
                        'na omezení zpracování,',
                        'na přenositelnost údajů,',
                        'kdykoli odvolat udělený souhlas — bez dopadu na zákonnost zpracování před odvoláním.',
                      ].map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-[0.4em] h-1 w-1 flex-none rounded-full bg-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3">
                      Žádost uplatněte na{' '}
                      <a href="mailto:p.golasowski@icloud.com" className="text-charcoal underline underline-offset-2 hover:text-accent transition-colors">
                        p.golasowski@icloud.com
                      </a>
                      . Máte také právo podat stížnost u dozorového orgánu —{' '}
                      <a
                        href="https://www.uoou.cz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-charcoal underline underline-offset-2 hover:text-accent transition-colors"
                      >
                        Úřadu pro ochranu osobních údajů (www.uoou.cz)
                      </a>
                      .
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal">
                      Soubory cookies
                    </h3>
                    <p>
                      Tento web nepoužívá analytické ani sledovací cookies. Technické
                      soubory cookies nezbytné pro správné zobrazení webu (např. fonty
                      načítané ze serverů Google) mohou přenášet IP adresu návštěvníka
                      na servery třetí strany. Tyto přenosy se řídí zásadami ochrany
                      soukromí Google.
                    </p>
                  </section>

                  <p className="text-[12px] text-warm-gray/60">
                    Tyto zásady jsou účinné od 22. 4. 2026.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex-none border-t border-charcoal/8 px-8 py-5 sm:px-12">
                <button
                  type="button"
                  onClick={close}
                  className="text-[13px] font-medium uppercase tracking-[0.2em] text-warm-gray transition-colors hover:text-charcoal"
                >
                  Zavřít
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
