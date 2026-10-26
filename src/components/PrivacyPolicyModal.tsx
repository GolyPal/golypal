import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { usePrivacyPolicy } from '../context/PrivacyPolicyContext'
import { useDialogFocus } from '../hooks/useDialogFocus'

export default function PrivacyPolicyModal() {
  const { isOpen, close } = usePrivacyPolicy()
  const dialogRef = useRef<HTMLDivElement>(null)

  useDialogFocus(dialogRef, isOpen, close)

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [isOpen])

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
            <div ref={dialogRef} className="relative flex w-full max-w-[640px] flex-col bg-cream shadow-2xl max-h-[85vh]">
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
                      Pavel Golasowski, IČO: 08438927, se sídlem Hrádek 390, 739&nbsp;97 Hrádek,
                      e‑mail:{' '}
                      <a href="mailto:info@golasvisuals.com" className="text-charcoal underline underline-offset-2 hover:text-accent transition-colors">
                        info@golasvisuals.com
                      </a>
                      , tel.:{' '}
                      <a href="tel:+420737248144" className="text-charcoal underline underline-offset-2 hover:text-accent transition-colors">
                        +420 737 248 144
                      </a>
                      .
                    </p>
                    <p className="mt-1">
                      Fyzická osoba podnikající, zapsaná v živnostenském rejstříku vedeném Živnostenským úřadem Třinec, Smetanova 498, 739&nbsp;61 Třinec.
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal">
                      Jaké osobní údaje zpracovávám
                    </h3>
                    <p>
                      Prostřednictvím poptávkového formuláře: jméno a příjmení, telefon, e-mail, odkaz na sociální sítě (nepovinný) a vaše odpovědi z dotazníku, tedy roli v realitách, jak aktuálně řešíte foto a video, typy nemovitostí, oblast působení, orientační počet zakázek měsíčně a odkud jste se o mně dozvěděli. Při odeslání formuláře a při zobrazení webu se navíc zpracovávají technické údaje, jako je IP adresa a typ prohlížeče.
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal">
                      Účel a právní základ zpracování
                    </h3>
                    <p>
                      Údaje zpracovávám, abych mohl odpovědět na vaši poptávku, domluvit nezávaznou konzultaci a připravit nabídku spolupráce. Jde o kroky před případným uzavřením smlouvy, které provádím na vaši žádost, tedy podle čl. 6 odst. 1 písm. b) nařízení (EU) 2016/679 (GDPR). Pokud spolupráce vznikne, zpracovávám údaje dále pro plnění smlouvy a pro splnění zákonných povinností, například účetních a daňových.
                    </p>
                    <p className="mt-3">
                      Údaje nevyužívám k zasílání obchodních sdělení ani k marketingu. Nedochází k automatizovanému rozhodování ani profilování.
                    </p>
                    <p className="mt-3">
                      Návštěvnost webu měřím službou Vercel Web Analytics, abych věděl, které stránky lidé čtou, odkud přicházejí a kolik poptávek web přinesl. Měření nepoužívá cookies ani nic neukládá do vašeho zařízení. Návštěvy se rozlišují jen pomocí dočasného otisku vytvořeného z technických údajů požadavku, který se po 24 hodinách zahazuje, a statistiky vidím pouze souhrnně, bez možnosti zjistit, kdo jste. Právním základem je můj oprávněný zájem na zlepšování webu (čl. 6 odst. 1 písm. f) GDPR), proti kterému můžete vznést námitku.
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal">
                      Je poskytnutí údajů povinné?
                    </h3>
                    <p>
                      Poskytnutí údajů je dobrovolné a nevyplývá ze zákona. Bez jména, telefonu a e-mailu vám ale nemohu na poptávku odpovědět. Nepovinné odpovědi v dotazníku můžete přeskočit.
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal">
                      Příjemci a předávání mimo EU
                    </h3>
                    <p>
                      Odeslaný formulář pro mě technicky zpracovává společnost Formspree, Inc. (USA), která poptávky doručuje na můj e-mail a ukládá je v archivu formuláře. Formspree je zpracovatelem ve smyslu čl. 28 GDPR a předání údajů do USA je zajištěno standardními smluvními doložkami schválenými Evropskou komisí (čl. 46 GDPR).
                    </p>
                    <p className="mt-3">
                      Web je provozován na hostingu společnosti Vercel Inc. (USA), která při zobrazení stránek zpracovává technické údaje v provozních záznamech serveru a pro mě vytváří souhrnné statistiky návštěvnosti. Vercel je certifikován v rámci EU-U.S. Data Privacy Framework, pro který Evropská komise vydala rozhodnutí o odpovídající ochraně (čl. 45 GDPR).
                    </p>
                    <p className="mt-3">
                      Poptávky dostávám do e-mailové schránky u společnosti Apple (iCloud). Jiným třetím stranám vaše údaje nepředávám.
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal">
                      Doba uchovávání
                    </h3>
                    <p>
                      Údaje z poptávky uchovávám po dobu nezbytnou k jejímu vyřízení, nejdéle 2 roky od odeslání, pokud nevznikne spolupráce. Pokud spolupráce vznikne, uchovávám je po dobu jejího trvání a poté jen v rozsahu a po dobu, kterou vyžadují právní předpisy (např. účetní a daňové).
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal">
                      Vaše práva
                    </h3>
                    <p>Máte právo:</p>
                    <ul className="mt-2 space-y-1 pl-4">
                      {[
                        'na přístup ke svým osobním údajům,',
                        'na opravu nepřesných nebo neúplných údajů,',
                        'na výmaz osobních údajů („právo být zapomenut“),',
                        'na omezení zpracování,',
                        'na přenositelnost údajů,',
                        'vznést námitku proti zpracování.',
                      ].map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-[0.4em] h-1 w-1 flex-none rounded-full bg-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3">
                      Žádost stačí poslat na{' '}
                      <a href="mailto:info@golasvisuals.com" className="text-charcoal underline underline-offset-2 hover:text-accent transition-colors">
                        info@golasvisuals.com
                      </a>
                      , vyřídím ji bez zbytečného odkladu, nejpozději do jednoho měsíce. Máte také
                      právo podat stížnost u dozorového úřadu, kterým je{' '}
                      <a
                        href="https://uoou.gov.cz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-charcoal underline underline-offset-2 hover:text-accent transition-colors"
                      >
                        Úřad pro ochranu osobních údajů
                      </a>
                      , Pplk. Sochora 27, 170 00 Praha 7.
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal">
                      Soubory cookies
                    </h3>
                    <p>
                      Tento web nepoužívá žádné cookies. Návštěvnost měřím bez cookies, jak je popsáno výše, a nepoužívám reklamní ani sledovací nástroje třetích stran. Písma, fotografie i videa se načítají přímo z tohoto webu, ne ze serverů třetích stran.
                    </p>
                  </section>

                  <p className="text-[12px] text-warm-gray">
                    Tyto zásady jsou účinné od 26. 10. 2026.
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
