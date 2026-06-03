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
            Případová studie · Třinec · 2025
          </p>

          <h1
            className="max-w-4xl font-serif font-semibold leading-[1.1] tracking-[-0.02em]"
            style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)' }}
          >
            Jak jedno video oslovilo{' '}
            <em style={{ color: '#C7A97B' }}>220 000 lidí</em>{' '}
            za 14 dní — a přivedlo zájemce, kteří se ozvali sami
          </h1>

          <p className="mt-6 max-w-2xl text-[15px] leading-[1.85]" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Jedno video, přes 220 tisíc oslovených lidí za 14 dní, 400+ nových sledujících a 3 noví zájemci, kteří Adama oslovili napřímo se zájmem o prodej své nemovitosti. Ukážu vám přesný postup, jak jsme to s mým klientem Adamem Kadlubiecem udělali.
          </p>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 gap-px lg:grid-cols-4" style={{ background: 'rgba(255,255,255,0.06)' }}>
            {[
              { value: '220 000+', label: 'oslovených lidí', sub: 'za 14 dní · IG + FB' },
              { value: '400+', label: 'nových sledujících', sub: 'z jednoho videa' },
              { value: '3', label: 'noví zájemci o prodej', sub: 'ozvali se Adamovi sami' },
              { value: '54 s', label: 'délka reelu', sub: 'formát 9:16' },
            ].map((stat) => (
              <div key={stat.label} className="px-6 py-8 lg:px-8" style={{ backgroundColor: '#1A1A1A' }}>
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
                Tahle případová studie není jen o jednom bytě. Je o tom, co jedno dobře postavené video udělá pro makléře — pro jeho jméno, dosah a pozici na trhu.
              </p>
              <p className="mt-5 text-[15px] leading-[1.85] text-warm-gray">
                Adam dělá reality 16 let a videa pro své nemovitosti točil i dřív — někdy sám, někdy s kameramanem. Fungovalo to slušně, ale i ta lepší videa měla typicky pár tisíc zhlédnutí, lajky od kolegů z branže a zájemci o koupi se z nich nijak nehrnuli.
              </p>
              <p className="mt-5 text-[15px] leading-[1.85] text-warm-gray">
                V té situaci je dnes většina makléřů, kteří nemovitosti natáčí: video existuje, vypadá slušně, ale algoritmus ho netlačí dál. Dosah se točí kolem těch, kdo už makléře sledují, a mimo bublinu se dostane málokdy. Bez toho ale potenciální kupující ani prodávající nepřijdou.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="border border-charcoal/8 p-6 lg:p-8" style={{ backgroundColor: '#F1EEE8' }}>
                <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-warm-gray">Rychlá fakta</p>
                <dl className="space-y-3">
                  {[
                    ['Nemovitost', 'Byt 3+1, 66 m²'],
                    ['Stav', 'Původní stav, před rekonstrukcí'],
                    ['Lokalita', 'ul. Seifertova, Třinec'],
                    ['Platformy', 'Instagram + Facebook'],
                    ['Délka videa', '0:54'],
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

      {/* ── PROBLÉM ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="mb-12 lg:mb-16">
            <div className="editorial-line-light mb-7" />
            <p className="mb-3 text-center text-[11px] uppercase tracking-[0.3em]" style={{ color: '#C7A97B' }}>Problém</p>
            <h2 className="text-center font-serif font-semibold leading-[1.1] tracking-[-0.02em]" style={{ color: '#ffffff', fontSize: 'clamp(1.6rem,3vw,2.5rem)' }}>
              Proč videa nemovitostí obvykle nefungují
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-[14px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Algoritmus rozhoduje o osudu videa během prvních dvou až tří sekund. Když v té chvíli člověk uteče, video už šanci nedostane. Tři věci přitom srážejí většinu makléřských videí.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {[
              {
                num: '01',
                title: 'Začínají všechna stejně',
                body: 'Záběr domu zvenku, zpomalený dron, popis dispozice. Pro většinu lidí to není zajímavé — a tak video zůstane bez povšimnutí.',
              },
              {
                num: '02',
                title: 'Ukazují metry, ne místo k životu',
                body: 'Prázdné byty nebo nemovitosti před rekonstrukcí ukážou metry čtvereční, ale ne místo, kde se dá žít. A bez emoce video nikdo neuloží, nepošle dál ani nedokouká.',
              },
              {
                num: '03',
                title: 'Chybí jim skript',
                body: 'Video bez scénáře je jen záznam prostoru. Právě skript dělá z prohlídky příběh — důvod, proč u videa zůstat až do konce a zapamatovat si ho.',
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

      {/* ── PŘÍSTUP ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F1EEE8' }}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="editorial-line mb-8" />
              <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-accent">Přístup</p>
              <h2 className="font-serif font-semibold leading-[1.15] tracking-[-0.02em] text-charcoal" style={{ fontSize: 'clamp(1.6rem,3vw,2.5rem)' }}>
                Každé video<br />má dva cíle
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-[15px] leading-[1.85] text-warm-gray">
                Většina makléřů bere video jako nástroj k prodeji jednoho bytu. Natočí prohlídku, hodí ji na Sreality a sociální sítě a čeká, jestli z toho přijde zájemce.
              </p>
              <p className="mt-4 text-[15px] leading-[1.85] text-warm-gray">
                Já na to koukám jinak. Každé video, které pro makléře natočím, má dva cíle. První je zřejmý — odprezentovat konkrétní nemovitost. Druhý je důležitější a obvykle se přehlíží: dostat makléře do hlavy nejen kupujícím, ale i prodávajícím. Bez jejich důvěry totiž makléř nemá co prodávat.
              </p>
              <p className="mt-4 text-[15px] leading-[1.85] text-warm-gray">
                Právě osobní brand dnes rozhoduje o tom, jestli má makléř plnou kapacitu, nebo musí prodávající aktivně oslovovat a přemlouvat, aby mu svou nemovitost svěřili.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── POSTUP / TŘI PILÍŘE ── */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="mb-12 lg:mb-16">
            <div className="editorial-line mb-7" />
            <p className="mb-3 text-center text-[11px] uppercase tracking-[0.3em] text-accent">Postup</p>
            <h2 className="text-center font-serif font-semibold leading-[1.1] tracking-[-0.02em] text-charcoal" style={{ fontSize: 'clamp(1.6rem,3vw,2.5rem)' }}>
              Tři pilíře, na kterých video stavím
            </h2>
          </div>

          <div className="divide-y divide-charcoal/8">
            {[
              {
                num: '01',
                label: 'Háček',
                title: 'Zastavit pozornost v první vteřině',
                paras: [
                  'Tento reel začíná letícími klíči — obraz, u kterého palec sám zastaví. První vteřina rozhoduje o tom, jestli člověk video uvidí, nebo odscrolluje dál, a proto nad hookem trávím nejvíc času.',
                  'Scénář jsem pak postavil na přednostech bytu: dvě lodžie a dispozice 3+1 v dobré lokalitě.',
                ],
              },
              {
                num: '02',
                label: 'Potenciál',
                title: 'Ukázat potenciál, ne jen prázdné metry',
                paras: [
                  'Tento byt by si zasloužil rekonstrukci. Přes AI vizualizace jsem proto ukázal, jak by mohl vypadat výsledek. Nechci spoléhat na představivost kupujících — rovnou jim ukážu ideální představu. Lidé pak v nemovitosti nevidí jen metry čtvereční, ale místo, kde si dokážou představit svůj život.',
                  'Protože jde o byt vhodný pro mladou rodinu, přizpůsobil jsem i AI vizualizace stylu, který je mladým rodinám blízký. Základ je ale vždy nemovitost důkladně nafotit a natočit — následné úpravy jsou pak mnohem snazší.',
                ],
              },
              {
                num: '03',
                label: 'Střih',
                title: 'Připravit video tak, aby ho algoritmus tlačil',
                paras: [
                  'Formát, tempo ani hudba nejsou dílem náhody. Reel jsem stříhal v poměru 9:16 a délce 54 sekund — sweet spot, kdy algoritmus video tlačí dál a divák ho zároveň zvládne dokoukat. Tempo střihu je laděné na rytmus hudby, titulky podporují vyprávění a cover funguje jako náhled, který sám láká k prokliku.',
                  'Tyhle detaily rozhodují o tom, jestli člověk video dokouká, uloží a sdílí. A přesně tyhle signály algoritmus sleduje — když je má, posouvá video z bubliny makléřových sledujících ven, mezi lidi, kteří o něm dosud neslyšeli.',
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

      {/* ── REEL + VÝSLEDKY ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#0F0F0F' }}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="mb-12 lg:mb-16">
            <div className="editorial-line-light mb-7" />
            <p className="mb-3 text-center text-[11px] uppercase tracking-[0.3em]" style={{ color: '#C7A97B' }}>Výsledky</p>
            <h2 className="text-center font-serif font-semibold leading-[1.1] tracking-[-0.02em]" style={{ color: '#ffffff', fontSize: 'clamp(1.6rem,3vw,2.5rem)' }}>
              Co reel dokázal za 14 dní
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-[14px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Jeden reel pro byt 3+1 v Třinci. Tahle čísla nasbíral za prvních 14 dní na Instagramu a Facebooku.
            </p>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Phone with video */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto w-[230px] sm:w-[260px]">
                <div className="relative overflow-hidden rounded-[2rem] border-[5px] border-white/15 bg-charcoal shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                  <div className="absolute left-1/2 top-2 z-30 h-5 w-16 -translate-x-1/2 rounded-full bg-charcoal" />
                  <div className="aspect-[9/19] w-full overflow-hidden">
                    <video
                      src="/videos/Reel-3.mp4"
                      poster="/videos/Reel-3-poster.jpg"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Numbers grid */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-px sm:grid-cols-2" style={{ background: 'rgba(255,255,255,0.06)' }}>
                {[
                  { value: '220 000+', label: 'oslovených lidí', sub: 'Instagram + Facebook' },
                  { value: '400+', label: 'nových sledujících', sub: 'z jednoho videa' },
                  { value: '3', label: 'noví zájemci o prodej', sub: 'ozvali se sami' },
                  { value: '54 s', label: 'délka reelu', sub: 'formát 9:16' },
                ].map((m) => (
                  <div key={m.label} className="px-6 py-7" style={{ backgroundColor: '#0F0F0F' }}>
                    <p className="font-serif font-semibold leading-none" style={{ color: '#C7A97B', fontSize: 'clamp(1.5rem,2.4vw,2rem)' }}>
                      {m.value}
                    </p>
                    <p className="mt-2 text-[13px] font-medium" style={{ color: '#ffffff' }}>{m.label}</p>
                    <p className="mt-1 text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{m.sub}</p>
                  </div>
                ))}
              </div>

              <div className="mt-px flex flex-col items-start gap-3 border p-7 sm:flex-row sm:items-center sm:gap-6 lg:p-8" style={{ borderColor: 'rgba(199,169,123,0.25)', backgroundColor: 'rgba(199,169,123,0.05)' }}>
                <p className="font-serif font-semibold leading-none" style={{ color: '#C7A97B', fontSize: 'clamp(1.8rem,3vw,2.4rem)' }}>3 zájemci</p>
                <p className="text-[14px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  se Adamovi ozvali sami — se zájmem o prodej své nemovitosti, ne z inzerátu. Líbí se jim, jak umí prezentaci prodávaných nemovitostí pojmout. Do téhle pozice se většina makléřů nedostane ani po letech v branži.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REAKCE ── */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="mb-12 lg:mb-16">
            <div className="editorial-line mb-7" />
            <p className="mb-3 text-center text-[11px] uppercase tracking-[0.3em] text-accent">Reakce</p>
            <h2 className="text-center font-serif font-semibold leading-[1.1] tracking-[-0.02em] text-charcoal" style={{ fontSize: 'clamp(1.6rem,3vw,2.5rem)' }}>
              Co psali lidé pod videem
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-[14px] leading-[1.8] text-warm-gray">
              Reakce přímo na Instagramu a Facebooku — od klientů, kolegů z branže i dalších makléřů.
            </p>
          </div>

          <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scrollbar-hide px-6 sm:gap-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:px-0">
            {['komentare-1.jpg', 'komentare-2.jpg', 'komentare-3.jpg'].map((img, i) => (
              <div key={img} className="w-[78%] flex-none snap-center sm:w-[58%] lg:w-auto">
                <img
                  src={`/images/${img}`}
                  alt={`Komentáře pod videem ${i + 1}`}
                  loading="lazy"
                  className="w-full rounded-xl border border-charcoal/10 shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENZE (placeholder) ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F1EEE8' }}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <div className="editorial-line mb-10" />
            <div
              className="flex flex-col items-center justify-center rounded-sm px-6 py-14 text-center"
              style={{ border: '1px dashed rgba(26,26,26,0.18)' }}
            >
              <p className="text-[11px] uppercase tracking-[0.25em] text-warm-gray">Recenze klienta</p>
              <p className="mt-4 max-w-xl font-serif italic leading-[1.7] text-charcoal/45" style={{ fontSize: 'clamp(1.05rem,2vw,1.3rem)' }}>
                Místo připravené pro slova Adama Kadlubiece o tom, co mu videa přinesla. Doplníme brzy.
              </p>
              <p className="mt-6 text-[11px] uppercase tracking-[0.15em] text-warm-gray">
                Adam Kadlubiec · Realitní makléř, Moravskoslezský kraj
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="editorial-line-light mb-7" />
              <p className="mb-3 text-[11px] uppercase tracking-[0.3em]" style={{ color: '#C7A97B' }}>Spolupráce</p>
              <h2 className="font-serif font-semibold leading-[1.1] tracking-[-0.02em]" style={{ color: '#ffffff', fontSize: 'clamp(1.6rem,3vw,2.5rem)' }}>
                Chcete zviditelnit svůj brand i nemovitosti?
              </h2>
              <p className="mt-4 text-[14px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Vyplňte poptávkový formulář a pojďme nezávazně probrat, jestli může společná spolupráce dávat smysl i pro vás.
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
                Mám zájem o spolupráci
                <ArrowRight size={14} />
              </motion.button>
              <p className="mt-3 text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
                Nezávazná konzultace · Zdarma · Do 24 hodin
              </p>
            </div>

            <div className="lg:col-span-7">
              <ul className="space-y-4">
                {[
                  'Děláte už nějaký obsah — sami nebo s kameramanem — ale vidíte, že to nejede, jak by mělo. Videa mají pár tisíc zhlédnutí a lajky od kolegů z branže, ale nikoho mimo bublinu.',
                  'Chcete budovat osobní brand. Ne kvůli ješitnosti, ale aby si vás majitelé pamatovali dřív, než zvednou telefon — a vybrali si vás, protože vás znají, ne protože jste nejlevnější.',
                  'Nechcete řešit produkci. Hledáte někoho, kdo přijde, navnímá prostor, sepíše skript, nafotí, natočí a pošle vám hotový výstup, který stačí nahrát.',
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
