import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Video, Wand2, ChevronLeft, ChevronRight } from 'lucide-react'

/* ── Before / After Slider ── */
function BeforeAfterSlider({
  before,
  after,
}: {
  before: string
  after: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const dragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPosition((x / rect.width) * 100)
  }, [])

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = containerRef.current
      if (!el) return
      dragging.current = true
      // Capture on the container so drag keeps tracking even if pointer leaves a child element
      try {
        el.setPointerCapture(e.pointerId)
      } catch {
        /* capture can fail on some touch edge cases — fine, move handler still works */
      }
      updatePosition(e.clientX)
    },
    [updatePosition],
  )

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging.current) return
      updatePosition(e.clientX)
    },
    [updatePosition],
  )

  const onPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      dragging.current = false
      const el = containerRef.current
      if (el && el.hasPointerCapture?.(e.pointerId)) {
        try {
          el.releasePointerCapture(e.pointerId)
        } catch {
          /* noop */
        }
      }
    },
    [],
  )

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-lg"
      // touch-action: none prevents the browser from claiming horizontal swipes as
      // scroll/back-navigation — without it Safari steals pointermove events and the
      // slider handle "sticks" partway across.
      style={{ touchAction: 'none' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}>
      <img
        src={after}
        alt="Po AI vizualizaci"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={before}
          alt="Před AI vizualizací"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      </div>
      <div
        className="absolute top-0 bottom-0 z-10 w-0.5 bg-white"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-white/20 backdrop-blur-sm">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white">
            <path
              d="M6 10L2 10M2 10L4.5 7.5M2 10L4.5 12.5M14 10L18 10M18 10L15.5 7.5M18 10L15.5 12.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <span className="absolute top-4 left-4 z-10 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
        Před
      </span>
      <span className="absolute top-4 right-4 z-10 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
        Po
      </span>
    </div>
  )
}

/* ── AI Showcase Carousel ── */
const aiShowcases = [
  { type: 'slider' as const, before: '/images/ai-pred.jpg', after: '/images/ai-po.jpg', label: 'AI staging interiéru' },
  { type: 'video' as const, src: '/videos/hero.mp4', label: 'AI vizualizace prostoru' },
  { type: 'slider' as const, before: '/images/ai-pred-2.jpg', after: '/images/ai-po-2.jpg', label: 'AI redesign interiéru' },
  { type: 'video' as const, src: '/videos/ai-vizualizace.mp4', label: 'AI vizualizace prostoru' },
  { type: 'slider' as const, before: '/images/ai-pred-3.jpg', after: '/images/ai-po-3.jpg', label: 'AI staging interiéru' },
]

function AICarousel() {
  const [current, setCurrent] = useState(0)
  const total = aiShowcases.length

  const prev = () => setCurrent((c) => (c - 1 + total) % total)
  const next = () => setCurrent((c) => (c + 1) % total)

  const item = aiShowcases[current]

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {item.type === 'slider' ? (
            <BeforeAfterSlider before={item.before!} after={item.after!} />
          ) : (
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg">
              <video
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-white/40">{item.label}</p>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/30">
            {current + 1} / {total}
          </span>
          <button
            onClick={prev}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 text-white/50 transition-colors hover:border-accent/40 hover:text-accent"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 text-white/50 transition-colors hover:border-accent/40 hover:text-accent"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Services data ── */
const services = [
  {
    number: '01',
    icon: Wand2,
    title: 'AI vizualizace & staging',
    description:
      'Ukažte potenciál prázdných prostor i vizuální renovace. AI staging a redesign, které promění představy v realitu.',
    visual: 'ai-carousel' as const,
  },
  {
    number: '02',
    icon: Video,
    title: 'Cinematic Video',
    description:
      'Vytvořené pro sociální sítě. Správná délka, střih, hudba. Připravené k\u00A0nahrání bez jediné úpravy z\u00A0vaší strany.',
    visual: 'video' as const,
  },
  {
    number: '03',
    icon: Camera,
    title: 'Profesionální fotografie',
    description:
      'Interiér, exteriér a\u00A0detaily. Upravené fotografie připravené rovnou k\u00A0nahrání na Sreality i\u00A0sítě.',
    visual: 'photo' as const,
  },
]

/* ── Photo Carousel ── */
const photos = [
  { src: '/images/foto-sluzba-3.jpg', label: 'Profesionální fotografie' },
  { src: '/images/foto-sluzba-4.jpg', label: 'Profesionální fotografie' },
  { src: '/images/foto-sluzba-5.jpg', label: 'Profesionální fotografie' },
  { src: '/images/foto-sluzba-6.jpg', label: 'Profesionální fotografie' },
  { src: '/images/foto-sluzba-2.jpg', label: 'Exteriérová fotografie' },
]

function PhotoCarousel() {
  const [current, setCurrent] = useState(0)
  const total = photos.length

  const prev = () => setCurrent((c) => (c - 1 + total) % total)
  const next = () => setCurrent((c) => (c + 1) % total)

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg">
            <img
              src={photos[current].src}
              alt={photos[current].label}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <div className="mt-3 flex items-center justify-end gap-2">
        <span className="mr-2 text-xs text-white/30">{current + 1} / {total}</span>
        <button onClick={prev} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/50 transition hover:border-white/30 hover:text-white" aria-label="Předchozí">
          <ChevronLeft size={16} />
        </button>
        <button onClick={next} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/50 transition hover:border-white/30 hover:text-white" aria-label="Další">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

/* ── Visual panels ── */
function VisualPanel({ type }: { type: (typeof services)[number]['visual'] }) {
  switch (type) {
    case 'ai-carousel':
      return <AICarousel />
    case 'photo':
      return <PhotoCarousel />
    case 'video':
      return (
        <div className="flex h-full items-center justify-center">
          <div className="relative w-[220px] sm:w-[260px] lg:w-[240px] lg:max-h-[500px]">
            <div className="relative overflow-hidden rounded-[2rem] border-[5px] border-white/15 bg-charcoal shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              <div className="absolute left-1/2 top-2 z-30 h-5 w-16 -translate-x-1/2 rounded-full bg-charcoal" />
              <div className="aspect-[9/19] w-full overflow-hidden">
                <video
                  src="/videos/Reel.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )
  }
}

/* ── Main component ── */
export default function Solution() {
  const [active, setActive] = useState(0)

  return (
    <section
      id="sluzby"
      className="bg-deep py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-16">
          {/* Section header — compact for sticky */}
          <div className="mb-3 flex items-center gap-6">
            <div className="editorial-line-light flex-1" />
          </div>

          <div className="mb-6 text-center">
            <h2 className="font-serif text-[clamp(1.6rem,3.5vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.01em] text-white">
              AI vizualizace. Video. Foto.
              {' '}<em className="text-accent">Vše, co potřebujete.</em>
            </h2>
            <p className="mx-auto mt-4 text-[15px] leading-[1.85] text-white/60">
              Žádné koordinování, žádný stres. Předáte mi klíče a{'\u00A0'}za{'\u00A0'}72h dostanete kompletní podklady.
            </p>
          </div>

          {/* Accordion + Visual layout — fills remaining space */}
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
            {/* Left — Accordion */}
            <div className="lg:col-span-5">
              <div className="space-y-0">
                {services.map((service, index) => {
                  const isActive = active === index
                  const Icon = service.icon

                  return (
                    <div key={service.number}>
                      <button
                        onClick={() => setActive(index)}
                        className="group flex w-full cursor-pointer items-start gap-5 py-5 text-left transition-colors"
                      >
                        {/* Number */}
                        <span
                          className={`mt-1 font-serif text-sm transition-colors duration-300 ${
                            isActive ? 'text-accent' : 'text-white/30'
                          }`}
                        >
                          {service.number}
                        </span>

                        {/* Icon */}
                        <div
                          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                            isActive
                              ? 'bg-accent/15'
                              : 'bg-white/5 group-hover:bg-white/10'
                          }`}
                        >
                          <Icon
                            size={16}
                            strokeWidth={1.5}
                            className={`transition-colors duration-300 ${
                              isActive ? 'text-accent' : 'text-white/40 group-hover:text-white/60'
                            }`}
                          />
                        </div>

                        {/* Title */}
                        <div className="flex-1 min-w-0">
                          <h3
                            className={`font-serif text-xl font-medium tracking-tight transition-colors duration-300 lg:text-2xl ${
                              isActive ? 'text-white' : 'text-white/50 group-hover:text-white/70'
                            }`}
                          >
                            {service.title}
                          </h3>
                        </div>
                      </button>

                      {/* Expandable description */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="pb-5 pl-[3.75rem] pr-4 text-[15px] leading-[1.85] text-white/60">
                              {service.description}
                            </p>

                            {/* Mobile visual — shown only on small screens */}
                            <div className="mb-4 pl-[3.75rem] pr-4 lg:hidden">
                              <VisualPanel type={service.visual} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Divider */}
                      {index < services.length - 1 && (
                        <div className="h-px bg-white/8" />
                      )}
                    </div>
                  )
                })}
              </div>

            </div>

            {/* Right — Visual panel (desktop only) */}
            <div className="relative hidden lg:col-span-7 min-h-[500px] lg:flex lg:items-center lg:justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                  className="w-full"
                >
                  <VisualPanel type={services[active].visual} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
    </section>
  )
}
