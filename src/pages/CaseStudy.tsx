import { useEffect } from 'react'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useConsultForm } from '../context/ConsultFormContext'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export default function CaseStudy() {
  const { open: openConsult } = useConsultForm()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="overflow-x-clip">
      <Navbar />

      {/* ── HERO ── */}
      <section className="bg-charcoal pt-32 pb-20 lg:pt-44 lg:pb-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            {/* Back link */}
            <motion.div variants={fadeUp} className="mb-10">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.25em] text-white/40 transition-colors hover:text-white/70"
              >
                <ArrowLeft size={13} />
                Zpět na hlavní stránku
              </Link>
            </motion.div>

            {/* Tag */}
            <motion.p variants={fadeUp} className="mb-5 text-[11px] uppercase tracking-[0.35em] text-accent">
              Případová studie · Český Těšín · 2024
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="max-w-4xl font-serif text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white"
            >
              Jak profesionální fotky a video přinesly{' '}
              <em className="text-accent">23 prohlídek za 4 dny</em>{' '}
              a prodaly byt nad cenou
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-[16px] leading-[1.8] text-white/60">
              Podkrovní byt 3+1 na Čapkově ulici ležel na trhu týdny. Fotky z mobilu, nulový zájem, prodávající tlačil na slevu. Po vytvoření profesionální vizuální prezentace se nemovitost prodala za 4 dny — za 3 950 000 Kč místo původních 3 790 000 Kč.
            </motion.p>

            {/* Key stats */}
            <motion.div
              variants={fadeUp}
              className="mt-14 grid grid-cols-2 gap-px border border-white/8 bg-white/8 lg:grid-cols-4"
            >
              {[
                { value: '847×', label: 'zobrazení první den', sub: 'průměr okolí: 80–120' },
                { value: '23', label: 'reálných prohlídek', sub: 'za 4 dny' },
                { value: '4 dny', label: 'na trhu', sub: 'předtím 14+ dní bez výsledku' },
                { value: '+160 tis.', label: 'nad původní cenou', sub: '3 950 000 Kč' },
              ].map((stat) => (
                <div key={stat.value} className="bg-charcoal px-8 py-8">
                  <p className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-none text-accent">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[13px] font-medium text-white">{stat.label}</p>
                  <p className="mt-1 text-[11px] text-white/40">{stat.sub}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="editorial-line mb-8" />
              <p className="text-[17px] leading-[1.85] text-warm-gray">
                Ukážu vám, jak jsme jeden podkrovní byt proměnili v nejžádanější nemovitost v okolí. A hlavně — proč tento postup funguje pro každého makléře, který chce prodávat rychleji, za vyšší ceny a bez tlaku na slevu.
              </p>
              <p className="mt-6 text-[15px] leading-[1.85] text-warm-gray">
                Tato případová studie není o marketingovém tahu. Je o konkrétním postupu, konkrétní nemovitosti a konkrétních číslech — které si můžete ověřit.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="border border-charcoal/8 bg-alternate p-8">
                <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-warm-gray">Rychlá fakta</p>
                <dl className="space-y-4">
                  {[
                    { dt: 'Nemovitost', dd: 'Podkrovní byt 3+1, 78 m²' },
                    { dt: 'Lokalita', dd: 'Čapkova ulice, Český Těšín' },
                    { dt: 'Původní cena', dd: '3 790 000 Kč' },
                    { dt: 'Prodejní cena', dd: '3 950 000 Kč' },
                    { dt: 'Doba na trhu po prezentaci', dd: '4 dny' },
                    { dt: 'Makléř', dd: 'Adam Kadlubiec' },
                  ].map(({ dt, dd }) => (
                    <div key={dt} className="flex justify-between gap-4 border-b border-charcoal/6 pb-4 last:border-0 last:pb-0">
                      <dt className="text-[12px] uppercase tracking-[0.1em] text-warm-gray">{dt}</dt>
                      <dd className="text-right text-[14px] font-medium text-charcoal">{dd}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ADAM ── */}
      <section className="bg-alternate py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="editorial-line mb-8" />
              <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-accent">Klient</p>
              <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-charcoal">
                Seznamte se s&nbsp;Adamem
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-2">
              <p className="text-[15px] leading-[1.85] text-warm-gray">
                Adam Kadlubiec je realitní makléř, který prodává nemovitosti v segmentu 3–15 milionů korun. Pracuje hlavně s byty a rodinnými domy v Moravskoslezském kraji. Za poslední rok zprostředkoval přes 20 prodejů.
              </p>
              <p className="mt-5 text-[15px] leading-[1.85] text-warm-gray">
                Adam patří mezi makléře, kteří svou práci berou vážně. Sledoval, co funguje na sítích — viděl, že ti nejlepší mají skvělý vizuální obsah. Ale sám nevěděl, jak se k takovému výsledku dostat.
              </p>
              {/* His quote */}
              <blockquote className="mt-8 border-l-2 border-accent pl-6">
                <p className="text-[15px] italic leading-[1.8] text-charcoal">
                  „Viděl jsem, jak ostatní makléři mají na sítích skvělý obsah — nemovitosti vypadají jako z katalogu. A já tam měl fotky, u kterých se sám červenám. Věděl jsem, že to poškozuje i můj brand. Ale fotograf, staging, koordinace — to mi přišlo jako noční můra a drahá sranda."
                </p>
                <footer className="mt-4 text-[12px] uppercase tracking-[0.15em] text-warm-gray">
                  — Adam Kadlubiec, realitní makléř
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLÉM ── */}
      <section className="bg-deep py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="mb-14 text-center">
            <div className="editorial-line-light mb-8" />
            <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-accent">Diagnóza</p>
            <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white">
              Co přesně nefungovalo — a proč
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.8] text-white/50">
              Problém nebyl v bytě. Byt byl výborný — dobrá lokalita, rozumná cena, solidní stav. Problém byl v tom, jak byl prezentovaný.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {[
              {
                num: '01',
                title: 'Prázdný prostor zabíjí představivost',
                body: 'Když kupující otevře inzerát a vidí prázdné místnosti, nedokáže si představit, jak tam bude žít. Nevidí domov — vidí metry čtvereční. A metry čtvereční nevzbuzují emoce. Emoce prodávají.',
              },
              {
                num: '02',
                title: 'Fotky bez kontextu jsou jen dokumentace',
                body: 'Fotky z mobilu technicky zachytily prostor. Ale nic neprodávaly. Žádný příběh, žádná atmosféra, žádný důvod zastavit se a říct: „tohle chci vidět."',
              },
              {
                num: '03',
                title: 'Chyběl skript, který by nemovitost uvedl',
                body: 'Video bez scénáře je jen záznam prostoru. Video se skriptem je příběh, který kupujícího vtáhne dovnitř — ještě než fyzicky překročí práh.',
              },
            ].map((card) => (
              <div key={card.num} className="border border-white/6 p-8">
                <p className="mb-5 font-serif text-4xl font-semibold text-white/10">{card.num}</p>
                <h3 className="mb-4 text-[16px] font-semibold leading-snug text-white">{card.title}</h3>
                <p className="text-[14px] leading-[1.8] text-white/50">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCES ── */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="mb-16 lg:mb-20">
            <div className="editorial-line mb-8" />
            <p className="mb-4 text-center text-[11px] uppercase tracking-[0.3em] text-accent">Postup</p>
            <h2 className="text-center font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-charcoal">
              3 kroky, které proměnily nemovitost
            </h2>
          </div>

          <div className="space-y-0 divide-y divide-charcoal/6">
            {[
              {
                num: '01',
                label: 'Skript na míru',
                title: 'Poznat nemovitost a napsat příběh',
                body: `Ke každé nemovitosti přistupuji jako k příběhu, který čeká na vyprávění. Nejdřív prostor nacítím — projdu si ho, pochopím, co v něm je a co v něm může být. Teprve pak začnu přemýšlet o tom, jak ho ukázat.

U bytu na Čapkově jsem si všiml krásných podkrovních šikmin, výhledu na náměstí, blízkosti nádraží a vlastního kotle — nezávislosti na SVJ. Na základě toho jsem napsal skript přímo pro Adama.

Skript neříkal „krásný byt v centru." Říkal: „78 metrů, ve kterých se ráno probudíte s výhledem na náměstí — a za 5 minut jste na nádraží."`,
              },
              {
                num: '02',
                label: 'Foto & Video',
                title: 'Profesionální produkce se záměrem',
                body: `Druhý den jsem přijel s vybavením. Focení a natáčení trvalo zhruba 3 hodiny. Pracoval jsem s přirozeným světlem, s kompozicí, která ukazuje prostor tak, jak ho člověk reálně vnímá — ne z rohů s wide objektivem, který zkresluje.

Video jsem natočil podle skriptu — jako provázení bytem, kde každý záběr má svůj důvod. Začátek zastaví pozornost, střed ukazuje prostor a jeho potenciál, závěr vede k akci.

Fotky pro Sreality jsem připravil tak, aby každá z nich fungovala samostatně — ale dohromady vyprávěly příběh.`,
              },
              {
                num: '03',
                label: 'AI vizualizace',
                title: 'Ukázat potenciál bez stagingu za desítky tisíc',
                body: `Byt byl prázdný. Staging by stál 30–50 tisíc Kč a týden čekání. Místo toho jsem využil AI vizualizaci — konkrétně Higgs Field a další nástroje pro postprodukci.

Za několik hodin jsem měl vizualizace, které ukázaly, jak může byt vypadat zařízený. Obývák s pohovkou pod šikminou. Ložnice s postelí u okna s výhledem. Kuchyň s jídelním stolem.

Kupující najednou neviděl prázdné místnosti. Viděl domov. Staging ukazuje jednu variantu za desítky tisíc. AI vizualizace ukáže více variant za zlomek ceny — a kupující si vybere tu, která mu sedí.`,
              },
            ].map((step) => (
              <div key={step.num} className="grid gap-8 py-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-4">
                  <p className="font-serif text-5xl font-semibold text-charcoal/8">{step.num}</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-accent">{step.label}</p>
                  <h3 className="mt-3 font-serif text-[1.35rem] font-semibold leading-snug text-charcoal">
                    {step.title}
                  </h3>
                </div>
                <div className="lg:col-span-8">
                  {step.body.split('\n\n').map((para, i) => (
                    <p key={i} className={`text-[15px] leading-[1.85] text-warm-gray ${i > 0 ? 'mt-5' : ''}`}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 border-t border-charcoal/6 pt-8 text-[14px] leading-[1.7] text-warm-gray">
            <strong className="font-semibold text-charcoal">Celý materiál</strong> — fotky, video, AI vizualizace — byl hotový za 48 hodin od převzetí klíčů. Adam dostal vše připravené k publikaci na Sreality i na sociální sítě. Žádné koordinování, žádné opravování, žádná překvapení.
          </p>
        </div>
      </section>

      {/* ── VÝSLEDKY ── */}
      <section className="bg-charcoal py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="mb-14 text-center">
            <div className="editorial-line-light mb-8" />
            <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-accent">Výsledky</p>
            <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white">
              Čísla, která mluví za sebe
            </h2>
          </div>

          {/* Before / After table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr>
                  <th className="border-b border-white/8 pb-4 text-left text-[10px] uppercase tracking-[0.25em] text-white/30 w-1/2">Metrika</th>
                  <th className="border-b border-white/8 pb-4 text-right text-[10px] uppercase tracking-[0.25em] text-white/30">Před</th>
                  <th className="border-b border-white/8 pb-4 text-right text-[10px] uppercase tracking-[0.25em] text-accent">Po</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: 'Zobrazení na Sreality / den', before: '6', after: '847 (první den)' },
                  { metric: 'Počet zájemců', before: '2 (za 2 týdny)', after: '23 (za 4 dny)' },
                  { metric: 'Doba na trhu', before: '14+ dní', after: '4 dny' },
                  { metric: 'Prodejní cena', before: 'Tlak na slevu', after: '3 950 000 Kč (+160 000 Kč)' },
                ].map((row) => (
                  <tr key={row.metric} className="border-b border-white/6">
                    <td className="py-5 pr-8 text-[14px] text-white/60">{row.metric}</td>
                    <td className="py-5 pr-8 text-right text-[14px] text-white/30">{row.before}</td>
                    <td className="py-5 text-right text-[14px] font-semibold text-accent">{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CITÁT ── */}
      <section className="bg-alternate py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <div className="editorial-line mb-10" />
            <blockquote>
              <p className="font-serif text-[clamp(1.15rem,2.5vw,1.5rem)] font-medium leading-[1.7] text-charcoal">
                „Upřímně? Čekal jsem hezké fotky. Dostal jsem kompletní prezentaci, která ten byt prodala za mě. Pavel přijel, prošel si byt, napsal skript, nafotil, natočil a za dva dny mi poslal všechno hotové. Já to jenom nahrál a telefon mi přestal zvonit až po 23. prohlídce. Ten byt se prodal za 4 dny — a ještě nad cenou. Od té doby posílám Pavlovi každou nemovitost."
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-charcoal/10" />
                <div className="text-right">
                  <p className="text-[13px] font-semibold text-charcoal">Adam Kadlubiec</p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-[0.15em] text-warm-gray">Realitní makléř · Moravskoslezský kraj</p>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-charcoal py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="editorial-line-light mb-8" />
              <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-accent">Pro koho to funguje</p>
              <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white">
                Funguje tohle i pro vás?
              </h2>
              <p className="mt-5 text-[15px] leading-[1.8] text-white/50">
                Nepotřebujete větší rozpočet na reklamu. Nepotřebujete víc inzerátů. Potřebujete, aby ten jeden inzerát zastavil scrollování.
              </p>
              <button
                type="button"
                onClick={openConsult}
                className="group mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-9 py-4 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-white hover:text-charcoal"
              >
                Chci podobné výsledky
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </button>
              <p className="mt-4 text-[12px] text-white/25">Nezávazná konzultace · Zdarma · Do 24 hodin</p>
            </div>

            <div className="lg:col-span-7">
              <ul className="space-y-4">
                {[
                  'Prodáváte nemovitosti v segmentu od 3 milionů výš — a víte, že vizuální prezentace rozhoduje o tom, jak rychle a za kolik prodáte.',
                  'Fotíte sami na mobil nebo spolupracujete s fotografem, který dodá hezké fotky — ale žádný příběh. Chybí vám skript, video, AI vizualizace.',
                  'Řešíte prázdné nebo nevybavené nemovitosti — a víte, že staging je drahý a časově náročný. AI vizualizace ukáže potenciál za zlomek ceny.',
                  'Chcete budovat svůj osobní brand a potřebujete obsah, který vás odliší od stovek ostatních makléřů na Sreality.',
                  'Nechcete nic koordinovat. Předáte klíče, za 48 hodin máte kompletní materiál připravený k publikaci.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent/20">
                      <Check size={11} className="text-accent" strokeWidth={2.5} />
                    </span>
                    <p className="text-[14px] leading-[1.75] text-white/60">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
