import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    quote:
      'S Pavlem spolupracuji při prezentaci nemovitostí a jeho práci můžu jednoznačně doporučit. Díky jeho fotkám a videím mají naše zakázky výrazně lepší ohlas — videa dosahují vyšší sledovanosti a pomáhají oslovit širší publikum. Oceňuji hlavně jeho spolehlivost, rychlost a schopnost přicházet s vlastními nápady, které posouvají prezentaci nemovitostí na vyšší úroveň.',
    name: 'Adam Kadlubiec',
    role: 'Realitní makléř, Gentleman Reality',
    initial: 'A',
  },
  {
    quote:
      'S Pavlem spolupracuji už několik let v rámci Slash PR a jeho práci můžu jednoznačně doporučit. V poslední době se podílí i na developerských projektech, kde efektivně využívá AI k oživení vizualizací a posouvá jejich prezentaci na výrazně vyšší úroveň. Díky tomu působí projekty realističtěji, atraktivněji a mají silnější dopad na klienty. Oceňuji také jeho spolehlivost a schopnost dodat kvalitní výsledek včas.',
    name: 'Markéta Dvořáčková',
    role: 'Managing Partner, Slash PR',
    initial: 'M',
  },
  {
    quote:
      'S panem Golasowskim jsme realizovali focení našich firemních prostor. Díky jeho práci máme kvalitní vizuální materiály, které využíváme napříč marketingem — od webu po kampaně. Fotografie pomohly sjednotit naši prezentaci a posunout ji na úroveň, která odpovídá našemu postavení na trhu. Spolupráce byla profesionální a bezproblémová.',
    name: 'Karireal\u00A0a.s.',
    role: 'Autorizovaný dealer Škoda a VW',
    initial: 'K',
  },
  {
    quote:
      'Spolupráce s Pavlem byla perfektní. Profi chování na místě a všechny následné požadavky na finální úpravy rychle a ochotně zapracovával. U nás i u klienta naprostá spokojenost.',
    name: 'Ondřej Kaloud',
    role: 'Social Media Manager',
    initial: 'O',
  },
]

/* ── Dot progress indicator (mobile) ── */
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
    <div className="mt-5 flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          aria-label={`Přejít na referenci ${i + 1}`}
          className={`rounded-full transition-all duration-300 ${
            i === current
              ? 'h-1.5 w-5 bg-accent/70'
              : 'h-1.5 w-1.5 bg-white/25 hover:bg-white/40'
          }`}
        />
      ))}
    </div>
  )
}

/* ── Single testimonial card ── */
function TestimonialCard({
  t,
  delay = 0,
  animate = true,
}: {
  t: (typeof testimonials)[0]
  delay?: number
  animate?: boolean
}) {
  const inner = (
    <div className="flex h-full flex-col rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-sm lg:p-10">
      {/* Opening quote mark */}
      <span
        aria-hidden="true"
        className="mb-4 block font-serif text-5xl leading-none text-accent/50 lg:text-6xl"
      >
        &ldquo;
      </span>

      <blockquote className="flex-1 font-serif text-[15px] font-light italic leading-[1.75] text-white/80 lg:text-base">
        {t.quote}
      </blockquote>

      <div className="mt-8 flex items-center gap-4">
        {/* Avatar circle */}
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-accent/30 bg-accent/10">
          <span className="font-serif text-base font-medium text-accent">
            {t.initial}
          </span>
        </div>
        <div>
          <p className="font-serif text-[15px] font-medium text-white">
            {t.name}
          </p>
          <p className="mt-0.5 text-[11px] uppercase tracking-[0.2em] text-white/40">
            {t.role}
          </p>
        </div>
      </div>
    </div>
  )

  if (!animate) return inner

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay }}
      className="h-full"
    >
      {inner}
    </motion.div>
  )
}

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentIdx, setCurrentIdx] = useState(0)

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    if (max <= 0) return
    setCurrentIdx(Math.round((el.scrollLeft / max) * (testimonials.length - 1)))
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
    el.scrollTo({ left: (i / (testimonials.length - 1)) * max, behavior: 'smooth' })
  }, [])

  return (
    <section
      id="reference"
      className="relative overflow-hidden bg-deep py-24 lg:py-32"
    >
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.03] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-16">
        {/* Editorial section header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex items-center gap-6"
        >
          <div className="editorial-line-light flex-1" />
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9 }}
          className="mb-14 text-center lg:mb-16"
        >
          <h2 className="font-serif text-[clamp(1.6rem,3.5vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.01em] text-white">
            Co o mé práci říkají <em className="text-accent">klienti</em>
          </h2>
        </motion.div>

        {/* ── MOBILE: horizontal snap scroll ── */}
        <div className="sm:hidden">
          <div
            ref={scrollRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1"
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="w-full flex-none snap-start"
              >
                <TestimonialCard t={t} animate={false} />
              </div>
            ))}
          </div>

          <ScrollDots
            total={testimonials.length}
            current={currentIdx}
            onDotClick={scrollToIdx}
          />
        </div>

        {/* ── DESKTOP: 2×2 grid, all cards visible at once ── */}
        <div className="hidden sm:grid sm:grid-cols-2 sm:gap-5 lg:gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
