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
            Jak jedno video udělalo{' '}
            <em style={{ color: '#C7A97B' }}>130 000 zhlédnutí</em>{' '}
            — a přivedlo 8 zájemců na jeden byt
          </h1>

          <p className="mt-6 max-w-2xl text-[15px] leading-[1.85]" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Reel pro byt 3+1 v Třinci nasbíral za 10 dní přes 130 tisíc zhlédnutí na Instagramu a Facebooku. Přinesl 8 zájemců o nemovitost — a hlavně posílil osobní brand makléře Adama Kadlubiece natolik, že mu majitelé sami píšou, že chtějí prodávat přes něj.
          </p>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 gap-px lg:grid-cols-4" style={{ background: 'rgba(255,255,255,0.06)' }}>
            {[
              { value: '130 000', label: 'zhlédnutí', sub: 'za 10 dní · IG + FB' },
              { value: '8', label: 'zájemců o byt', sub: 'čistě z videa' },
              { value: '200+', label: 'nových sledujících', sub: 'z jednoho reelu' },
              { value: '1 988', label: 'uložení videa', sub: '1 641 to se mi líbí' },
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
                Tahle případová studie není o jednom bytě. Je o tom, co udělá jedno dobře postavené video pro makléře — pro jeho jméno, jeho dosah a jeho pozici na trhu.
              </p>
              <p className="mt-5 text-[15px] leading-[1.85] text-warm-gray">
                Reel pro byt 3+1 v Třinci jsem natočil a sestříhal tak, aby zastavil scrollování. Za 10 dní udělal přes 130 tisíc zhlédnutí, přinesl 8 zájemců o nemovitost a posunul osobní brand Adama Kadlubiece o kus dál. Konkrétní video, konkrétní čísla.
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

      {/* ── REEL + ČÍSLA ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#0F0F0F' }}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="mb-12 lg:mb-16">
            <div className="editorial-line-light mb-7" />
            <p className="mb-3 text-center text-[11px] uppercase tracking-[0.3em]" style={{ color: '#C7A97B' }}>Reel</p>
            <h2 className="text-center font-serif font-semibold leading-[1.1] tracking-[-0.02em]" style={{ color: '#ffffff', fontSize: 'clamp(1.6rem,3vw,2.5rem)' }}>
              Jeden reel. 54 sekund.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-[14px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Tohle nasbíral za prvních 10 dní na Instagramu a Facebooku.
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
              <div className="grid grid-cols-2 gap-px sm:grid-cols-4 lg:grid-cols-2" style={{ background: 'rgba(255,255,255,0.06)' }}>
                {[
                  { value: '130 000', label: 'zhlédnutí', sub: 'IG 107 272 · FB 20 500' },
                  { value: '9 d 15 h', label: 'doba sledování', sub: 'celkem 28 min navíc' },
                  { value: '1 988', label: 'uložení', sub: 'lidé si video schovali' },
                  { value: '1 641', label: 'to se mi líbí', sub: '57 komentářů · 22 sdílení' },
                  { value: '200+', label: 'nových sledujících', sub: 'z jednoho videa' },
                  { value: '8', label: 'zájemců o byt', sub: 'čistě z videa' },
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
              Stovky reakcí přímo na Instagramu a Facebooku — od klientů, kolegů z branže i dalších makléřů.
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
                Adam Kadlubiec se realitám věnuje 16 let a působí v Moravskoslezském kraji. Ročně realizuje kolem 40 prodejů — byty i rodinné domy. Patří mezi makléře, kteří berou svou práci vážně a vědí, že na dnešním trhu nerozhoduje jen cena, ale i to, jak je makléř vidět.
              </p>
              <p className="mt-4 text-[15px] leading-[1.85] text-warm-gray">
                Videa spolu točíme už delší dobu. Všechna mají nadprůměrná čísla oproti obsahu, který si Adam dělá sám — a právě díky nim mu roste osobní brand. Je víc vidět, lidé mu víc věří a začínají ho oslovovat sami. Reel z Třince je zatím jeho nejúspěšnější.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── POSTUP ── */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="mb-12 lg:mb-16">
            <div className="editorial-line mb-7" />
            <p className="mb-3 text-center text-[11px] uppercase tracking-[0.3em] text-accent">Postup</p>
            <h2 className="text-center font-serif font-semibold leading-[1.1] tracking-[-0.02em] text-charcoal" style={{ fontSize: 'clamp(1.6rem,3vw,2.5rem)' }}>
              Jak takové video vzniklo
            </h2>
          </div>

          <div className="divide-y divide-charcoal/8">
            {[
              {
                num: '01',
                label: 'Skript & hook',
                title: 'Zastavit scrollování v první vteřině',
                paras: [
                  'Reel začíná letícími klíči — obraz, u kterého palec sám zastaví. První vteřina rozhoduje o tom, jestli člověk video uvidí, nebo odscrolluje dál. Proto na ní stavím nejvíc.',
                  'Scénář jsem postavil na přednostech bytu: dvě lodžie, dispozice 3+1 a hlavně potenciál. Byt je v původním stavu, takže příběh neprodává „hotový domov", ale příležitost — prostor, který si nový majitel udělá přesně podle sebe.',
                ],
              },
              {
                num: '02',
                label: 'Foto, video & AI vizualizace',
                title: 'Ukázat potenciál, ne jen prázdné metry',
                paras: [
                  'Prázdný byt v původním stavu sám o sobě emoce nevzbudí. Přes AI vizualizaci jsem proto ukázal, jak může vypadat zařízený a po rekonstrukci — kupující najednou nevidí metry čtvereční, ale místo, kde se dá žít.',
                  'Vše jsem nafotil a natočil profesionálně, s přirozeným světlem a kompozicí, která prostor ukazuje tak, jak ho člověk reálně vnímá.',
                ],
              },
              {
                num: '03',
                label: 'Střih & optimalizace',
                title: 'Připravit video tak, aby ho algoritmus tlačil',
                paras: [
                  'Formát 9:16, délka 54 sekund, dynamický střih, hudba a cover, který funguje i jako náhled. Každý detail je laděný pro Instagram a Facebook — od tempa po titulky.',
                  'Výsledek: video, které lidé nejen vidí, ale dokoukají, uloží a sdílejí. A přesně to ho posouvá k dalším a dalším divákům.',
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

      {/* ── CO TO PŘINESLO ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="mb-12 lg:mb-16">
            <div className="editorial-line-light mb-7" />
            <p className="mb-3 text-center text-[11px] uppercase tracking-[0.3em]" style={{ color: '#C7A97B' }}>Co to přineslo</p>
            <h2 className="text-center font-serif font-semibold leading-[1.1] tracking-[-0.02em]" style={{ color: '#ffffff', fontSize: 'clamp(1.6rem,3vw,2.5rem)' }}>
              Dosah, který se mění na byznys
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-[14px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Zhlédnutí jsou hezká. Ale teprve tohle z nich dělá hodnotu.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {[
              {
                num: '01',
                title: 'Osobní brand, který roste',
                body: '130 tisíc lidí vidělo Adama jako makléře, který umí nemovitost ukázat. Každé takové video ho dělá víc vidět a víc důvěryhodným — a důvěra je to, co v realitách rozhoduje.',
              },
              {
                num: '02',
                title: 'Majitelé se ozývají sami',
                body: 'Po tomhle videu — a dalších — začali Adamovi psát majitelé, že chtějí prodávat přes něj. Poptávka, která přišla za ním, ne naopak. Přesně tohle dělá z obsahu investici, ne náklad.',
              },
              {
                num: '03',
                title: 'Silnější pozice u stolu',
                body: 'Když Adam přijde k novému klientovi, jeho obsah mluví za něj. Nemusí se obhajovat ani soutěžit cenou — vybírají si ho, protože ho znají a věří mu. To je vyjednávací výhoda, kterou peníze nekoupí.',
              },
            ].map((card) => (
              <div key={card.num} className="p-7 lg:p-8" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="mb-4 font-serif font-semibold" style={{ fontSize: '2.8rem', color: 'rgba(255,255,255,0.07)', lineHeight: 1 }}>{card.num}</p>
                <h3 className="mb-3 text-[15px] font-semibold leading-snug" style={{ color: '#ffffff' }}>{card.title}</h3>
                <p className="text-[13px] leading-[1.85]" style={{ color: 'rgba(255,255,255,0.5)' }}>{card.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 border p-7 text-center sm:flex-row sm:justify-center sm:gap-6 lg:p-8" style={{ borderColor: 'rgba(199,169,123,0.25)', backgroundColor: 'rgba(199,169,123,0.05)' }}>
            <p className="font-serif font-semibold leading-none" style={{ color: '#C7A97B', fontSize: 'clamp(2rem,3vw,2.6rem)' }}>8 zájemců</p>
            <p className="max-w-md text-[14px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.6)' }}>
              o byt 3+1 v Třinci se ozvalo čistě z videa — ne z inzerátu. Prohlídky stále běží.
            </p>
          </div>
        </div>
      </section>

      {/* ── CITÁT (placeholder) ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F1EEE8' }}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <div className="editorial-line mb-10" />
            <div
              className="flex flex-col items-center justify-center rounded-sm px-6 py-14 text-center"
              style={{ border: '1px dashed rgba(26,26,26,0.18)' }}
            >
              <p className="text-[11px] uppercase tracking-[0.25em] text-warm-gray">Citát klienta</p>
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
              <p className="mb-3 text-[11px] uppercase tracking-[0.3em]" style={{ color: '#C7A97B' }}>Pro koho to funguje</p>
              <h2 className="font-serif font-semibold leading-[1.1] tracking-[-0.02em]" style={{ color: '#ffffff', fontSize: 'clamp(1.6rem,3vw,2.5rem)' }}>
                Chcete podobné výsledky?
              </h2>
              <p className="mt-4 text-[14px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Nepotřebujete víc inzerátů. Potřebujete obsah, který lidé dokoukají, zapamatují si vás — a sami se vám ozvou.
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
                  'Chcete být vidět — aby vás majitelé znali dřív, než jim vůbec zavoláte.',
                  'Chcete obsah, který lidé dokoukají, uloží a sdílejí — ne další inzerát, co zapadne mezi stovky podobných.',
                  'Chcete příchozí poptávky — aby se majitelé ozývali sami, že chtějí prodávat přes vás.',
                  'Chcete silnější vyjednávací pozici — vybírají si vás, protože vám věří, ne protože jste nejlevnější.',
                  'Chcete budovat osobní brand, který vás odliší od stovek ostatních makléřů na sítích i Sreality.',
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
