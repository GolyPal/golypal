import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

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

const AUTOPLAY_MS = 7500
const FADE_MS = 350

export default function Testimonials() {
  const count = testimonials.length
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState(0)
  const [visible, setVisible] = useState(true)
  const [paused, setPaused] = useState(false)
  const swapTimer = useRef<number | null>(null)

  const goTo = useCallback(
    (nextIdx: number) => {
      setIndex(prev => {
        const normalized = ((nextIdx % count) + count) % count
        return normalized === prev ? prev : normalized
      })
    },
    [count],
  )

  // Fade out, swap content, fade in
  useEffect(() => {
    if (index === displayed) return
    setVisible(false)
    if (swapTimer.current) window.clearTimeout(swapTimer.current)
    swapTimer.current = window.setTimeout(() => {
      setDisplayed(index)
      setVisible(true)
    }, FADE_MS)
    return () => {
      if (swapTimer.current) window.clearTimeout(swapTimer.current)
    }
  }, [index, displayed])

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    if (paused) return
    const id = window.setTimeout(
      () => setIndex(i => (i + 1) % count),
      AUTOPLAY_MS,
    )
    return () => window.clearTimeout(id)
  }, [index, paused, count])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const current = testimonials[displayed]

  return (
    <section
      id="reference"
      className="relative overflow-hidden bg-deep py-24 lg:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Decorative giant initial in background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span
          key={current.initial}
          className="select-none font-serif text-[clamp(22rem,48vw,44rem)] font-medium leading-none text-accent opacity-[0.05]"
          style={{
            transition: `opacity ${FADE_MS}ms ease-out`,
            opacity: visible ? 0.05 : 0,
          }}
        >
          {current.initial}
        </span>
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
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">
            Reference
          </span>
          <div className="editorial-line-light flex-1" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9 }}
          className="mb-16 text-center lg:mb-24"
        >
          <h2 className="font-serif text-[clamp(1.6rem,3.5vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.01em] text-white">
            Co o mé práci říkají <em className="text-accent">klienti</em>
          </h2>
        </motion.div>

        {/* Stage */}
        <div className="relative mx-auto min-h-[380px] max-w-3xl lg:min-h-[440px]">
          {/* Opening quotation mark */}
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 font-serif text-[6rem] leading-none text-accent/70 lg:-top-14 lg:text-[8rem]"
          >
            &ldquo;
          </motion.span>

          <div
            className="text-center"
            style={{
              transition: `opacity ${FADE_MS}ms ease-out, transform ${FADE_MS}ms ease-out`,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(8px)',
            }}
          >
            <blockquote className="font-serif text-[clamp(1.15rem,1.9vw,1.65rem)] font-light italic leading-[1.5] text-white/90">
              {current.quote}
            </blockquote>

            <div className="mt-12 flex items-center justify-center gap-5 lg:mt-14">
              <span className="h-px w-10 bg-accent/50 lg:w-14" />
              <div className="text-center">
                <p className="font-serif text-lg text-white lg:text-xl">
                  {current.name}
                </p>
                <p className="mt-1.5 text-[10px] uppercase tracking-[0.3em] text-white/50">
                  {current.role}
                </p>
              </div>
              <span className="h-px w-10 bg-accent/50 lg:w-14" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-16 flex items-center justify-center gap-8 lg:mt-20">
          <button
            type="button"
            onClick={prev}
            aria-label="Předchozí reference"
            className="group flex h-11 w-11 items-center justify-center border border-white/15 text-white/70 transition-all hover:border-accent hover:text-accent"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
          </button>

          <div className="flex items-center gap-2.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Reference ${i + 1}`}
                className="group py-3"
              >
                <motion.span
                  animate={{
                    width: i === index ? 40 : 20,
                    backgroundColor:
                      i === index ? 'rgb(199, 169, 123)' : 'rgba(255,255,255,0.2)',
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="block h-[2px] group-hover:bg-white/50"
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Další reference"
            className="group flex h-11 w-11 items-center justify-center border border-white/15 text-white/70 transition-all hover:border-accent hover:text-accent"
          >
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Counter */}
        <div className="mt-8 text-center">
          <span className="font-serif text-sm tracking-[0.2em] text-white/40">
            <span className="text-accent">
              {String(index + 1).padStart(2, '0')}
            </span>
            {'\u00A0\u00A0—\u00A0\u00A0'}
            {String(count).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  )
}
