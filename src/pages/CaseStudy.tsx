import { useEffect } from 'react'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useConsultForm } from '../context/ConsultFormContext'

export default function CaseStudy() {
  const { open: openConsult } = useConsultForm()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="overflow-x-clip">
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ backgroundColor: '#1A1A1A' }} className="pt-28 pb-16 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">

          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] transition-colors"
            style={{ color: 'rgba(255,255,255,0.4)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
          >
            <ArrowLeft size={12} />
            Zpět na hlavní stránku
          </Link>

          <p className="mb-5 text-[11px] uppercase tracking-[0.35em]" style={{ color: '#C7A97B' }}>
            Případová studie · Český Těšín · 2024
          </p>

          <h1
            className="max-w-4xl font-serif font-semibold leading-[1.1] tracking-[-0.02em]"
            style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)' }}
          >
            Jak profesionální fotky a video přinesly{' '}
            <em style={{ color: '#C7A97B' }}>23 prohlídek za 4 dny</em>{' '}
            a prodaly byt nad cenou
          </h1>

          <p className="mt-6 max-w-2xl text-[15px] leading-[1.85]" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Podkrovní byt 3+1 na Čapkově ulici ležel na trhu týdny. Fotky z mobilu, nulový zájem, prodávající tlačil na slevu. Po vytvoření profesionální vizuální prezentace se nemovitost prodala za 4 dny — za 3 950 000 Kč místo původních 3 790 000 Kč.
          </p>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 gap-px lg:grid-cols-4" style={{ background: 'rgba(255,255,255,0.06)' }}>
            {[
              { value: '847×', label: 'zobrazení první den', sub: 'průměr okolí: 80–120' },
              { value: '23', label: 'reálných prohlídek', sub: 'za 4 dny' },
              { value: '4 dny', label: 'na trhu', sub: 'předtím 14+ dní' },
              { value: '+160 tis.', label: 'nad původní cenou', sub: '3 950 000 Kč' },
            ].map((stat) => (
              <div key={stat.value} className="px-6 py-8 lg:px-8" style={{ backgroundColor: '#1A1A1A' }}>
                <p className="font-serif font-semibold leading-none" style={{ color: '#C7A97B', fontSize: 'clamp(1.7rem,2.8vw,2.4rem)' }}>
                  {stat.value}
                </p>
                <p className="mt-2 text-[13px] font-medium" style={{ color: '#ffffff' }}>{stat.label}</p>
                <p className="mt-1 text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="editorial-line mb-8" />
              <p className="text-[16px] leading-[1.9] text-warm-gray">
                Ukážu vám, jak jsme jeden podkrovní byt proměnili v nejžádanější nemovitost v okolí. A hlavně — proč tento postup funguje pro každého makléře, který chce prodávat rychleji, za vyšší ceny a bez tlaku na slevu.
              </p>
              <p className="mt-5 text-[15px] leading-[1.85] text-warm-gray">
                Tato případová studie není o marketingovém tahu. Je o konkrétním postupu, konkrétní nemovitosti a konkrétních číslech.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="border border-charcoal/8 p-6 lg:p-8" style={{ backgroundColor: '#F1EEE8' }}>
                <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-warm-gray">Rychlá fakta</p>
                <dl className="space-y-3">
                  {[
                    ['Nemovitost', 'Podkrovní byt 3+1, 78 m²'],
                    ['Lokalita', 'Čapkova ulice, Český Těšín'],
                    ['Původní cena', '3 790 000 Kč'],
                    ['Prodejní cena', '3 950 000 Kč'],
                    ['Doba na trhu', '4 dny'],
                    ['Makléř', 'Adam Kadlubiec'],
                  ].map(([dt, dd]) => (
                    <div key={dt} className="flex justify-between gap-4 border-b border-charcoal/6 pb-3 last:border-0 last:pb-0">
                      <dt className="text-[12px] uppercase tracking-[0.1em] text-warm-gray">{dt}</dt>
                      <dd className="text-right text-[13px] font-medium text-charcoal">{dd}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ADAM ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F1EEE8' }}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="editorial-line mb-8" />
              <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-accent">Klient</p>
              <h2 className="font-serif font-semibold leading-[1.15] tracking-[-0.02em] text-charcoal" style={{ fontSize: 'clamp(1.6rem,3vw,2.5rem)' }}>
                Seznamte se<br />s Adamem
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-[15px] leading-[1.85] text-warm-gray">
                Adam Kadlubiec je realitní makléř, který prodává nemovitosti v segmentu 3–15 milionů korun. Pracuje hlavně s byty a rodinnými domy v Moravskoslezském kraji. Za poslední rok zprostředkoval přes 20 prodejů.
              </p>
              <p className="mt-4 text-[15px] leading-[1.85] text-warm-gray">
                Adam patří mezi makléře, kteří svou práci berou vážně. Sledoval, co funguje na sítích — viděl, že ti nejlepší mají skvělý vizuální obsah. Ale sám nevěděl, jak se k takovému výsledku dostat.
              </p>
              <blockquote className="mt-8 border-l-2 border-accent pl-6">
                <p className="text-[15px] italic leading-[1.8] text-charcoal">
                  „Viděl jsem, jak ostatní makléři mají na sítích skvělý obsah — nemovitosti vypadají jako z katalogu. A já tam měl fotky, u kterých se sám červenám. Věděl jsem, že to poškozuje i můj brand. Ale fotograf, staging, koordinace — to mi přišlo jako noční můra a drahá sranda."
                </p>
                <footer className="mt-3 text-[11px] uppercase tracking-[0.15em] text-warm-gray">
                  — Adam Kadlubiec, realitní makléř
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLÉM ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#0F0F0F' }}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="mb-12 lg:mb-16">
            <div className="editorial-line-light mb-7" />
            <p className="mb-3 text-center text-[11px] uppercase tracking-[0.3em]" style={{ color: '#C7A97B' }}>Diagnóza</p>
            <h2 className="text-center font-serif font-semibold leading-[1.1] tracking-[-0.02em]" style={{ color: '#ffffff', fontSize: 'clamp(1.6rem,3vw,2.5rem)' }}>
              Co přesně nefungovalo — a proč
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-[14px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Problém nebyl v bytě. Byl v tom, jak byl prezentovaný.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {[
              {
                num: '01',
                title: 'Prázdný prostor zabíjí představivost',
                body: 'Kupující vidí prázdné místnosti a nedokáže si představit, jak tam bude žít. Nevidí domov — vidí metry čtvereční. A metry čtvereční nevzbuzují emoce. Emoce prodávají.',
              },
              {
                num: '02',
                title: 'Fotky bez kontextu jsou jen dokumentace',
                body: 'Fotky z mobilu technicky zachytily prostor. Ale nic neprodávaly. Žádný příběh, žádná atmosféra, žádný důvod zastavit se a říct: „tohle chci vidět."',
              },
              {
                num: '03',
                title: 'Chyběl skript, který uvede nemovitost',
                body: 'Video bez scénáře je jen záznam prostoru. Video se skriptem je příběh, který kupujícího vtáhne dovnitř — ještě než fyzicky překročí práh.',
              },
            ].map((card) => (
              <div key={card.num} className="p-7 lg:p-8" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="mb-4 font-serif font-semibold" style={{ fontSize: '2.8rem', color: 'rgba(255,255,255,0.07)', lineHeight: 1 }}>{card.num}</p>
                <h3 className="mb-3 text-[15px] font-semibold leading-snug" style={{ color: '#ffffff' }}>{card.title}</h3>
                <p className="text-[13px] leading-[1.85]" style={{ color: 'rgba(255,255,255,0.5)' }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCES ── */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="mb-12 lg:mb-16">
            <div className="editorial-line mb-7" />
            <p className="mb-3 text-center text-[11px] uppercase tracking-[0.3em] text-accent">Postup</p>
            <h2 className="text-center font-serif font-semibold leading-[1.1] tracking-[-0.02em] text-charcoal" style={{ fontSize: 'clamp(1.6rem,3vw,2.5rem)' }}>
              3 kroky, které proměnily nemovitost
            </h2>
          </div>

          <div className="divide-y divide-charcoal/8">
            {[
              {
                num: '01',
                label: 'Skript na míru',
                title: 'Poznat nemovitost a napsat příběh',
                paras: [
                  'Ke každé nemovitosti přistupuji jako k příběhu, který čeká na vyprávění. Nejdřív prostor nacítím — projdu si ho, pochopím, co v něm je a co v něm může být. Teprve pak začnu přemýšlet o tom, jak ho ukázat.',
                  'U bytu na Čapkově jsem si všiml krásných podkrovních šikmin, výhledu na náměstí, blízkosti nádraží a vlastního kotle — nezávislosti na SVJ. Na základě toho jsem napsal skript přímo pro Adama. Ne „krásný byt v centru", ale: „78 metrů, ve kterých se ráno probudíte s výhledem na náměstí — a za 5 minut jste na nádraží."',
                ],
              },
              {
                num: '02',
                label: 'Foto & Video',
                title: 'Profesionální produkce se záměrem',
                paras: [
                  'Focení a natáčení trvalo zhruba 3 hodiny. Pracoval jsem s přirozeným světlem a kompozicí, která ukazuje prostor tak, jak ho člověk reálně vnímá — ne z rohů s wide objektivem, který zkresluje.',
                  'Video jsem natočil podle skriptu — začátek zastaví pozornost, střed ukazuje prostor a jeho potenciál, závěr vede k akci. Fotky jsem připravil tak, aby každá fungovala samostatně, ale dohromady vyprávěly příběh.',
                ],
              },
              {
                num: '03',
                label: 'AI vizualizace',
                title: 'Ukázat potenciál bez stagingu za desítky tisíc',
                paras: [
                  'Byt byl prázdný. Staging by stál 30–50 tisíc Kč a týden čekání. Místo toho jsem využil AI vizualizaci — za několik hodin jsem měl vizualizace, které ukázaly, jak může byt vypadat zařízený.',
                  'Kupující najednou neviděl prázdné místnosti. Viděl domov. Staging ukazuje jednu variantu za desítky tisíc. AI vizualizace ukáže více variant za zlomek ceny. Celý materiál — fotky, video, AI vizualizace — byl hotový za 48 hodin od převzetí klíčů.',
                ],
              },
            ].map((step) => (
              <div key={step.num} className="grid gap-6 py-10 lg:grid-cols-12 lg:gap-14 lg:py-12">
                <div className="lg:col-span-4">
                  <p className="font-serif font-semibold leading-none text-charcoal/8" style={{ fontSize: '3.5rem' }}>{step.num}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-accent">{step.label}</p>
                  <h3 className="mt-2 font-serif text-[1.2rem] font-semibold leading-snug text-charcoal">{step.title}</h3>
                </div>
                <div className="lg:col-span-8 lg:pt-1">
                  {step.paras.map((p, i) => (
                    <p key={i} className={`text-[14px] leading-[1.9] text-warm-gray ${i > 0 ? 'mt-4' : ''}`}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VÝSLEDKY ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="mb-12">
            <div className="editorial-line-light mb-7" />
            <p className="mb-3 text-center text-[11px] uppercase tracking-[0.3em]" style={{ color: '#C7A97B' }}>Výsledky</p>
            <h2 className="text-center font-serif font-semibold leading-[1.1] tracking-[-0.02em]" style={{ color: '#ffffff', fontSize: 'clamp(1.6rem,3vw,2.5rem)' }}>
              Čísla, která mluví za sebe
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse">
              <thead>
                <tr>
                  <th className="pb-4 text-left text-[10px] uppercase tracking-[0.25em]" style={{ color: 'rgba(255,255,255,0.25)', borderBottom: '1px solid rgba(255,255,255,0.08)', width: '50%' }}>Metrika</th>
                  <th className="pb-4 text-right text-[10px] uppercase tracking-[0.25em]" style={{ color: 'rgba(255,255,255,0.25)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Před</th>
                  <th className="pb-4 text-right text-[10px] uppercase tracking-[0.25em]" style={{ color: '#C7A97B', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Po</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Zobrazení na Sreality / den', '6', '847 (první den)'],
                  ['Počet zájemců', '2 (za 2 týdny)', '23 (za 4 dny)'],
                  ['Doba na trhu', '14+ dní', '4 dny'],
                  ['Prodejní cena', 'Tlak na slevu', '3 950 000 Kč (+160 tis.)'],
                ].map(([metric, before, after]) => (
                  <tr key={metric} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td className="py-4 pr-6 text-[13px]" style={{ color: 'rgba(255,255,255,0.55)' }}>{metric}</td>
                    <td className="py-4 pr-6 text-right text-[13px]" style={{ color: 'rgba(255,255,255,0.25)' }}>{before}</td>
                    <td className="py-4 text-right text-[13px] font-semibold" style={{ color: '#C7A97B' }}>{after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CITÁT ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F1EEE8' }}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <div className="editorial-line mb-10" />
            <blockquote>
              <p className="font-serif font-medium leading-[1.75] text-charcoal" style={{ fontSize: 'clamp(1.05rem,2vw,1.3rem)' }}>
                „Upřímně? Čekal jsem hezké fotky. Dostal jsem kompletní prezentaci, která ten byt prodala za mě. Pavel přijel, prošel si byt, napsal skript, nafotil, natočil a za dva dny mi poslal všechno hotové. Já to jenom nahrál a telefon mi přestal zvonit až po 23. prohlídce. Ten byt se prodal za 4 dny — a ještě nad cenou. Od té doby posílám Pavlovi každou nemovitost."
              </p>
              <footer className="mt-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-charcoal/12" />
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
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="editorial-line-light mb-7" />
              <p className="mb-3 text-[11px] uppercase tracking-[0.3em]" style={{ color: '#C7A97B' }}>Pro koho to funguje</p>
              <h2 className="font-serif font-semibold leading-[1.1] tracking-[-0.02em]" style={{ color: '#ffffff', fontSize: 'clamp(1.6rem,3vw,2.5rem)' }}>
                Funguje tohle i pro vás?
              </h2>
              <p className="mt-4 text-[14px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Nepotřebujete větší rozpočet na reklamu. Potřebujete, aby ten jeden inzerát zastavil scrollování — a přiměl lidi zvednout telefon.
              </p>
              <motion.button
                type="button"
                onClick={openConsult}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group mt-8 inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold tracking-wide text-white transition-colors duration-300"
                style={{ backgroundColor: '#C7A97B' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = '#ffffff', (e.currentTarget as HTMLElement).style.color = '#1A1A1A')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = '#C7A97B', (e.currentTarget as HTMLElement).style.color = '#ffffff')}
              >
                Chci podobné výsledky
                <ArrowRight size={14} />
              </motion.button>
              <p className="mt-3 text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
                Nezávazná konzultace · Zdarma · Do 24 hodin
              </p>
            </div>

            <div className="lg:col-span-7">
              <ul className="space-y-4">
                {[
                  'Prodáváte nemovitosti v segmentu od 3 milionů výš — a víte, že vizuální prezentace rozhoduje o tom, jak rychle a za kolik prodáte.',
                  'Fotíte sami na mobil nebo spolupracujete s fotografem, který dodá hezké fotky — ale chybí vám skript, video a AI vizualizace.',
                  'Řešíte prázdné nebo nevybavené nemovitosti. AI vizualizace ukáže potenciál za zlomek ceny a času stagingu.',
                  'Chcete budovat svůj osobní brand a potřebujete obsah, který vás odliší od stovek ostatních makléřů na Sreality.',
                  'Nechcete nic koordinovat. Předáte klíče — za 48 hodin máte kompletní materiál připravený k publikaci.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(199,169,123,0.15)' }}>
                      <Check size={10} strokeWidth={2.5} style={{ color: '#C7A97B' }} />
                    </span>
                    <p className="text-[13px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.55)' }}>{item}</p>
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
