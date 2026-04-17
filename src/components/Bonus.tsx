import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FileText, Image } from 'lucide-react'

const covers = [
  { img: '/images/foto-sluzba.jpg',  title: 'Byt 3+kk',      subtitle: 'Třinec · Lyžbice',    price: '8 490 000 Kč' },
  { img: '/images/ai-po.jpg',        title: 'Byt 4+kk',      subtitle: 'Opava · Kateřinky',   price: '12 900 000 Kč' },
  { img: '/images/ai-po-2.jpg',      title: 'Rodinný dům',   subtitle: 'Ostrava · Poruba',    price: '19 500 000 Kč' },
]

/* ── Reusable dot indicator ── */
function ScrollDots({
  total,
  current,
  onDotClick,
}: {
  total: number
  current: number
  onDotClick: (i: number) => void
}) {
  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          aria-label={`Cover ${i + 1}`}
          className={`rounded-full transition-all duration-300 ${
            i === current
              ? 'h-1.5 w-5 bg-accent/70'
              : 'h-1.5 w-1.5 bg-charcoal/20 hover:bg-charcoal/40'
          }`}
        />
      ))}
    </div>
  )
}

/* ── Single Cover tile ── */
function CoverTile({ cover, className = '' }: { cover: typeof covers[0]; className?: string }) {
  return (
    <div className={`group relative overflow-hidden rounded-lg ${className}`}>
      <img
        src={cover.img}
        alt={cover.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />

      {/* Decorative top */}
      <div className="absolute left-3 right-3 top-3 z-10 flex items-center justify-between">
        <div className="h-[3px] w-8 rounded-full bg-accent/60" />
        <div className="h-5 w-5 rounded-full border border-white/20" />
      </div>

      {/* Info bottom */}
      <div className="absolute bottom-3 left-3 right-3 z-10">
        <p className="text-[7px] font-medium uppercase tracking-wider text-accent lg:text-[8px]">
          Exkluzivní nabídka
        </p>
        <p className="mt-0.5 font-serif text-[10px] font-medium leading-tight text-white lg:text-xs">
          {cover.title}
        </p>
        <p className="mt-0.5 text-[7px] text-white/50 lg:text-[8px]">{cover.subtitle}</p>
        <p className="mt-1 text-[8px] font-medium text-accent lg:text-[9px]">{cover.price}</p>
      </div>
    </div>
  )
}

export default function Bonus() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentIdx, setCurrentIdx] = useState(0)

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    if (max <= 0) return
    setCurrentIdx(Math.round((el.scrollLeft / max) * (covers.length - 1)))
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToIdx = useCallback((i: number) => {
    const el = scrollRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    el.scrollTo({ left: (i / (covers.length - 1)) * max, behavior: 'smooth' })
  }, [])

  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
        {/* Editorial line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex items-center gap-6"
        >
          <div className="editorial-line flex-1" />
        </motion.div>

        {/* Big BONUS label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-6 text-center"
        >
          <span className="font-serif text-[clamp(3.5rem,10vw,7rem)] font-medium leading-none tracking-[-0.02em] text-accent">
            Bonus
          </span>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-14 text-center text-base leading-[1.85] text-warm-gray lg:mb-16 lg:text-[17px]"
        >
          Věci, které jinde platíte zvlášť nebo neřešíte vůbec.
          U{'\u00A0'}mě je máte v{'\u00A0'}ceně.
        </motion.p>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-10">
          {/* Card 01 — Script na míru */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="group relative flex flex-col rounded-2xl bg-white p-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] lg:p-10"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-alternate">
                <FileText size={18} className="text-charcoal" strokeWidth={1.5} />
              </div>
              <span className="font-serif text-sm text-accent/40">01</span>
            </div>
            <h3 className="mb-3 font-serif text-2xl font-medium tracking-tight text-charcoal lg:text-3xl">
              Script na míru
            </h3>
            <p className="text-[15px] leading-[1.85] text-warm-gray lg:text-base">
              Zapomeňte na improvizaci. Scénář připravím na míru — první
              3{'\u00A0'}sekundy rozhodují o{'\u00A0'}pozornosti diváka. Bez správného
              scriptu je můžete ztratit.
            </p>

            <div className="mt-8 flex flex-1 items-center">
              <div className="w-full rounded-xl bg-deep p-6 text-center lg:p-8">
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.15em] text-accent">
                  Ukázka hooku
                </p>
                <p className="font-serif text-lg leading-relaxed text-white/80 italic lg:text-xl">
                  „Čtyři pokoje. Osmdesát metrů m². Jedna otázka — proč tady ještě
                  nebydlíte?"
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 02 — Reels Cover */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="relative flex flex-col rounded-2xl bg-white p-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] lg:p-10"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-alternate">
                <Image size={18} className="text-charcoal" strokeWidth={1.5} />
              </div>
              <span className="font-serif text-sm text-accent/40">02</span>
            </div>
            <h3 className="mb-3 font-serif text-2xl font-medium tracking-tight text-charcoal lg:text-3xl">
              Reels Cover
            </h3>
            <p className="text-[15px] leading-[1.85] text-warm-gray lg:text-base">
              Vizuálně sladěné covery pro vaše reels. Klíčové pro estetiku
              profilu a{'\u00A0'}vyšší proklikovost.
            </p>

            {/* ── MOBILE: horizontal snap, 1 cover at a time ── */}
            <div className="mt-6 sm:hidden">
              {/*
                Stays within the card's natural content area — no negative margin
                tricks that could cause page-level horizontal overflow on Safari.
                w-[220px] per cover: at ~263px card content width, the next cover
                peeks by only ~30px (≈14%) — clearly 1 at a time.
              */}
              <div
                ref={scrollRef}
                className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1"
                style={{ scrollPaddingLeft: '0px' }}
              >
                {covers.map((cover, i) => (
                  <CoverTile
                    key={i}
                    cover={cover}
                    className="w-[220px] flex-none snap-start aspect-[9/16]"
                  />
                ))}
              </div>

              <ScrollDots
                total={covers.length}
                current={currentIdx}
                onDotClick={scrollToIdx}
              />
            </div>

            {/* ── DESKTOP: 3-column grid (unchanged) ── */}
            <div className="mt-auto hidden pt-8 sm:block">
              <div className="grid grid-cols-3 gap-3">
                {covers.map((cover, i) => (
                  <CoverTile key={i} cover={cover} className="aspect-[9/16] w-full" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
