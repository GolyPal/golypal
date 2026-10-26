import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, Check, Volume2, VolumeX } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useConsultForm } from '../context/ConsultFormContext'
import { usePageMeta } from '../hooks/usePageMeta'
import { ctaArrowRight, ctaClass } from '../components/cta'

/* Phone reel with sound toggle. Autoplays muted (browser policy); the
   button lets visitors unmute. Pauses when scrolled out of view so the
   audio never keeps playing off-screen. */
function ReelPlayer() {
  const [muted, setMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  const toggleMute = () => {
    const v = videoRef.current
    if (v) v.muted = !muted
    setMuted((m) => !m)
  }

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current
        if (!v) return
        if (entry.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className="relative mx-auto w-[230px] sm:w-[260px]">
      <div className="relative overflow-hidden rounded-[2rem] border-[5px] border-neutral-900 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
        <div className="absolute left-1/2 top-2 z-30 h-5 w-16 -translate-x-1/2 rounded-full bg-black" />
        <div className="aspect-[9/19] w-full overflow-hidden">
          <video
            ref={videoRef}
            src="/videos/mosty-reel.mp4"
            poster="/videos/mosty-reel-poster.jpg"
            autoPlay
            loop
            muted={muted}
            playsInline
            preload="auto"
            onLoadedMetadata={(e) => { e.currentTarget.muted = muted }}
            className="h-full w-full object-cover"
          />
        </div>
        <button
          onClick={toggleMute}
          aria-label={muted ? 'Zapnout zvuk' : 'Vypnout zvuk'}
          className="absolute bottom-3 right-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white/80 backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-black/60 hover:text-white"
        >
          {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
      </div>
    </div>
  )
}

/* Key phrase in body copy: semibold lime on dark sections. */
function K({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-accent">{children}</strong>
}

export default function CaseStudy() {
  const { open: openConsult } = useConsultForm()
  usePageMeta({
    title: 'Případová studie: dům prodaný přes sociální sítě do 30 dnů | GolasVisuals',
    description:
      'Jeden reel, 28 300 zhlédnutí a přes 30 poptávek. Jak video pro dvougenerační dům v Mostech u Jablunkova pomohlo prodat nemovitost do 30 dnů.',
    path: '/pripadova-studie',
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="overflow-x-clip">
      <Navbar />

      {/* ── HERO ── */}
      <section className="bg-charcoal pt-28 pb-16 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-subtle transition-colors hover:text-white"
          >
            <ArrowLeft size={12} />
            Zpět na hlavní stránku
          </Link>

          <p className="mb-6 text-center text-[13px] uppercase tracking-[0.35em] text-accent lg:text-[14px]">
            Případová studie
          </p>

          <h1 className="mx-auto max-w-4xl text-center font-serif text-[clamp(1.8rem,4.5vw,3.2rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white">
            Jak <em className="text-accent">prodat</em> dům přes sociální sítě <em className="text-accent">do&nbsp;30&nbsp;dnů</em>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-center text-[15px] leading-[1.85] text-white">
            Reel pro dvougenerační rodinný dům v Mostech u Jablunkova nebyl jen hezká prezentace. Fungoval jako prodejní kanál: díky jednomu slovu v komentářích přivedl makléři Adamovi Kadlubiecovi přes 30 poptávek, dal mu silnou pozici při jednání o ceně a nakonec i další zakázku ze stejné obce.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-px bg-white/[0.06] lg:grid-cols-4">
            {[
              { value: '30+', label: 'poptávek', sub: 'z jednoho videa' },
              { value: 'do\u00A030\u00A0dnů', label: 'prodáno', sub: 'dvougenerační dům 7+2' },
              { value: '28 300', label: 'zhlédnutí', sub: '95 komentářů · 24 sdílení' },
              { value: '+1', label: 'nová zakázka', sub: 'další dům ve stejné obci' },
            ].map((stat) => (
              <div key={stat.label} className="bg-charcoal px-6 py-8 lg:px-8">
                <p className="font-serif text-[clamp(1.7rem,2.8vw,2.4rem)] font-semibold leading-none text-accent">
                  {stat.value}
                </p>
                <p className="mt-3 text-[15px] font-medium text-white">{stat.label}</p>
                <p className="mt-1 text-[13px] leading-snug text-white/65">{stat.sub}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={openConsult}
              className={ctaClass()}
            >
              Mám zájem o spolupráci
              <ArrowRight size={15} className={ctaArrowRight} />
            </button>
          </div>
        </div>
      </section>

      {/* ── ZAKÁZKA ── */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="mb-10 lg:mb-14">
            <div className="editorial-line mb-7" />
            <p className="mb-3 text-center text-[11px] uppercase tracking-[0.3em] text-accent">Zakázka</p>
            <h2 className="text-center font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-charcoal">
              Dvougenerační dům <em className="text-accent">7+2</em> v Mostech u Jablunkova
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-[14px] leading-[1.8] text-warm-gray">
              Prezentace pro makléře Adama Kadlubiece z Gentlemen Reality · srpen 2026
            </p>
          </div>

          <div className="mx-auto max-w-[960px] overflow-hidden rounded-2xl border border-charcoal/10 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
            <img
              src="/images/mosty-pozemek.webp"
              alt="Letecký snímek nemovitosti v Mostech u Jablunkova s vyznačeným rodinným domem 7+2, garáží a pozemkem 1 271 m²"
              loading="lazy"
              className="block w-full"
            />

            <dl className="grid grid-cols-2 gap-px border-t border-charcoal/10 bg-charcoal/10 lg:grid-cols-4">
            {[
              { label: 'Dispozice', value: '7+2', sub: 'dvougenerační rodinný dům' },
              { label: 'Pozemek', value: '1 271 m²', sub: 's garáží' },
              { label: 'Dodáno', value: 'Reel, fotky, cover', sub: 'srpen 2026' },
              { label: 'Makléř', value: 'Adam Kadlubiec', sub: 'Gentlemen Reality · 16 let v realitách' },
            ].map((f) => (
              <div key={f.label} className="bg-cream-dark px-5 py-6 lg:px-7">
                <dt className="text-[10px] uppercase tracking-[0.25em] text-warm-gray">{f.label}</dt>
                <dd className="mt-2 font-serif text-[clamp(1.05rem,1.6vw,1.3rem)] font-semibold leading-snug text-charcoal">{f.value}</dd>
                <dd className="mt-1 text-[12px] leading-snug text-warm-gray">{f.sub}</dd>
              </div>
            ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── JAK TO FUNGOVALO ── */}
      <section className="bg-deep py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="mb-12 lg:mb-16">
            <div className="editorial-line-light mb-7" />
            <p className="mb-3 text-center text-[11px] uppercase tracking-[0.3em] text-accent">Jak to fungovalo</p>
            <h2 className="text-center font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white">
              Jedno slovo, které sbíralo <em className="text-accent">poptávky</em>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-[14px] leading-[1.8] text-white">
              Místo obvyklého „pro více informací volejte“ jsme do videa dali jasnou výzvu: <K>napsat do komentáře jedno slovo</K>.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {[
              {
                num: '01',
                title: 'Napište „Mosty“',
                body: <>Ve videu i v popisku zazněla jednoduchá výzva: napište do komentáře <K>„Mosty“</K> a pošlu vám kompletní informace. Pro zájemce je to otázka <K>pár vteřin</K>. Žádné hledání čísla ani vyplňování formuláře.</>,
              },
              {
                num: '02',
                title: 'Automatická odpověď',
                body: <>Adam si klíčové slovo napojil přes <K>ManyChat</K>. Každému, kdo napsal „Mosty“, <K>automaticky přišla zpráva</K> s kompletními informacemi o domě. Bez ručního obepisování a bez čekání na odpověď.</>,
              },
              {
                num: '03',
                title: 'Komentáře táhnou dosah',
                body: <>Každý komentář je pro algoritmus <K>signál</K>, že video lidi zajímá. Čím víc lidí napsalo „Mosty“, tím víc dalších lidí ho uvidělo. Video tak <K>sbíralo poptávky a zároveň samo sebe posouvalo dál</K>.</>,
              },
            ].map((card) => (
              <div key={card.num} className="rounded-2xl border border-white/[0.07] p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/40 hover:bg-white/[0.04] hover:shadow-[0_16px_40px_rgba(0,0,0,0.25)] lg:p-8">
                <p className="mb-4 font-serif text-[2.8rem] font-semibold leading-none text-white">{card.num}</p>
                <h3 className="mb-3 text-[15px] font-semibold leading-snug text-accent">{card.title}</h3>
                <p className="text-[13px] leading-[1.85] text-white">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VÝSLEDKY ── */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="mb-12 lg:mb-16">
            <div className="editorial-line mb-7" />
            <p className="mb-3 text-center text-[11px] uppercase tracking-[0.3em] text-accent">Výsledky</p>
            <h2 className="text-center font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-charcoal">
              Co jedno video <em className="text-accent">dokázalo</em>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-[14px] leading-[1.8] text-warm-gray">
              Reel pro rodinný dům v Mostech u Jablunkova, zveřejněný v srpnu 2026.
            </p>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <ReelPlayer />
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-px bg-charcoal/10">
                {[
                  { value: '30+', label: 'poptávek', sub: 'jen z tohoto videa' },
                  { value: '28 300', label: 'zhlédnutí', sub: 'stav k říjnu 2026' },
                  { value: '95', label: 'komentářů', sub: 'pod videem' },
                  { value: '24', label: 'sdílení', sub: 'lidé ho posílali dál' },
                ].map((m) => (
                  <div key={m.label} className="bg-cream px-6 py-9 lg:px-8 lg:py-10">
                    <p className="font-serif text-[clamp(2.2rem,4vw,3.4rem)] font-semibold leading-none text-charcoal">
                      {m.value}
                    </p>
                    <p className="mt-4 text-[16px] font-medium text-charcoal">{m.label}</p>
                    <p className="mt-1 text-[13px] leading-snug text-warm-gray">{m.sub}</p>
                  </div>
                ))}
              </div>

              <div className="mt-px flex flex-col items-start gap-3 bg-charcoal p-7 sm:flex-row sm:items-center sm:gap-6 lg:p-8">
                <p className="shrink-0 font-serif text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold leading-tight text-accent">
                  Prodáno do 30 dnů
                </p>
                <p className="text-[14px] leading-[1.7] text-white">
                  Mezi desítkami poptávek byli i <K>vážní zájemci</K>, takže dvougenerační dům 7+2 na kupce dlouho nečekal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CO ADAM ZÍSKAL ── */}
      <section className="bg-charcoal py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="mb-12 lg:mb-16">
            <div className="editorial-line-light mb-7" />
            <p className="mb-3 text-center text-[11px] uppercase tracking-[0.3em] text-accent">Co Adam získal</p>
            <h2 className="text-center font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white">
              Víc než jen <em className="text-accent">prodaný dům</em>
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {[
              {
                label: 'Vyjednávání',
                title: 'Silná pozice při jednání o ceně',
                body: <>Díky <K>desítkám poptávek</K> měl Adam v ruce <K>silnou páku</K>. Když se kupující snažili smlouvat o slevě, mohl s klidem odpovědět: „Mám tu další zájemce. Pokud dům nevezmete vy, vezme ho někdo jiný.“ O ceně tak nejednal pod tlakem, ale <K>z pozice síly</K>.</>,
              },
              {
                label: 'Nová zakázka',
                title: 'Další rodina z Mostů se ozvala sama',
                body: <>Další rodina z Mostů u Jablunkova věděla, že se tenhle dům <K>díky videu rychle prodal</K>. Oslovila proto Adama, že chce svůj rodinný dům prodat taky, a to <K>přes něj</K>. Bez obvolávání, bez přesvědčování.</>,
              },
            ].map((card) => (
              <div key={card.label} className="rounded-2xl border border-white/[0.07] p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/40 hover:bg-white/[0.04] hover:shadow-[0_16px_40px_rgba(0,0,0,0.25)] lg:p-10">
                <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-white">{card.label}</p>
                <h3 className="mb-4 font-serif text-[1.35rem] font-semibold leading-snug text-accent lg:text-[1.6rem]">{card.title}</h3>
                <p className="text-[14px] leading-[1.85] text-white">{card.body}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-2xl text-center font-serif text-[clamp(1.1rem,2vw,1.35rem)] italic leading-[1.6] text-white">
            Přesně takhle funguje <K>osobní brand</K> v praxi: jedna úspěšná prezentace prodá nemovitost a zároveň makléři <K>přivede dalšího klienta</K>.
          </p>
        </div>
      </section>

      {/* ── REAKCE + RECENZE ── */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="editorial-line mb-8" style={{ marginLeft: 0 }} />
              <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-accent">Reakce</p>
              <h2 className="font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-charcoal">
                Komentáře plné slova <em className="text-accent">„Mosty“</em>
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-[1.85] text-warm-gray">
                Každý takový komentář znamenal <strong className="font-semibold text-charcoal">zájemce</strong>, kterému <strong className="font-semibold text-charcoal">automaticky odešly kompletní informace</strong> o domě. Pod komentáři vidíte i odpovědi. Ty za Adama poslala automatizace.
              </p>

              <figure className="mt-10 border-l-2 border-charcoal pl-6 lg:pl-8">
                <blockquote className="font-serif text-[clamp(1.1rem,1.8vw,1.3rem)] italic leading-[1.7] text-charcoal">
                  „Na jedno video mi přišlo přes třicet poptávek a díky klíčovému slovu v komentářích jsem nikoho nemusel ručně obepisovat. Dům jsem prodal do měsíce, a když se kupující snažili smlouvat o slevě, měl jsem v ruce silné argumenty. A navíc se mi ze stejné obce ozvala další rodina, že chce prodávat přese mě.“
                </blockquote>
                <figcaption className="mt-5 text-[11px] uppercase tracking-[0.15em] text-warm-gray">
                  Adam Kadlubiec · Gentlemen Reality
                </figcaption>
              </figure>
            </div>

            <div className="lg:col-span-5">
              <figure className="mx-auto max-w-[360px]">
                <img
                  src="/images/mosty-komentare.webp"
                  alt="Komentáře pod videem: lidé píšou „Mosty“ a dostávají automatickou odpověď"
                  loading="lazy"
                  className="w-full rounded-xl border border-charcoal/10 shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
                />
                <figcaption className="mt-3 text-center text-[11px] text-warm-gray">
                  Jména komentujících jsou z ohledu na jejich soukromí rozmazaná.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-deep py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          {/* Phones centre the heading block; from sm up it sits left */}
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="text-center sm:text-left lg:col-span-5">
              <div className="editorial-line-light mb-7 sm:ml-0!" />
              <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-accent">Spolupráce</p>
              <h2 className="font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white">
                Chcete, aby vaše videa taky <em className="text-accent">prodávala</em>?
              </h2>
              <p className="mt-4 text-[14px] leading-[1.8] text-white">
                Vyplňte poptávkový formulář a pojďme nezávazně probrat, jestli může společná spolupráce dávat smysl i pro vás.
              </p>
              <button
                type="button"
                onClick={openConsult}
                className={`${ctaClass()} mt-8`}
              >
                Mám zájem o spolupráci
                <ArrowRight size={15} className={ctaArrowRight} />
              </button>
            </div>

            <div className="lg:col-span-7">
              <ul className="space-y-4">
                {[
                  <>Děláte už nějaký obsah, sami nebo s kameramanem, ale vidíte, že <K>to nejede, jak by mělo</K>. Videa mají pár tisíc zhlédnutí a lajky od kolegů z branže, ale nikoho mimo bublinu.</>,
                  <>Chcete, aby video nemovitosti nebylo jen hezká prezentace, ale <K>přivádělo vám skutečné poptávky</K> a pomáhalo prodat.</>,
                  <>Chcete <K>budovat osobní brand</K>. Ne kvůli ješitnosti, ale aby si vás majitelé pamatovali dřív, než zvednou telefon, a vybrali si vás, protože vás znají.</>,
                  <><K>Nechcete řešit produkci</K>. Hledáte někoho, kdo přijde, navnímá prostor, nafotí, natočí a pošle vám <K>hotový výstup</K>, který stačí nahrát.</>,
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent/15">
                      <Check size={10} strokeWidth={2.5} className="text-accent" />
                    </span>
                    <p className="text-[13px] leading-[1.75] text-white">{item}</p>
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
