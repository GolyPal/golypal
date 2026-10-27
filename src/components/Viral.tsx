import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useConsultForm } from '../context/ConsultFormContext'
import { useNearViewport } from '../hooks/useNearViewport'
import { Eye, Heart, MessageCircle, Repeat, Send, TrendingUp, ChevronLeft, ChevronRight, Volume2, VolumeX, type LucideIcon } from 'lucide-react'

/* ── Pavel's top 3 reels shown in the phone ── */
const phoneReels = [1, 2, 3].map((n) => ({
  src: `/videos/top-${n}.mp4`,
  poster: `/videos/top-${n}-poster.jpg`,
}))

/* Stories-style player: progress bars on top, auto-advance on end,
   tap left/right half or use the arrows below to switch. Starts muted
   (autoplay policy) with an unmute button; pauses when scrolled away. */
function PhoneReels() {
  const [idx, setIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const [muted, setMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const near = useNearViewport(wrapRef)
  const total = phoneReels.length

  const go = (next: number) => {
    setProgress(0)
    setIdx((next + total) % total)
  }

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
    <>
      <div ref={wrapRef} className="relative overflow-hidden rounded-[2.5rem] border-[6px] border-neutral-900 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
        <div className="absolute left-1/2 top-2 z-30 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

        {/* Progress bars */}
        <div className="absolute inset-x-4 top-10 z-30 flex gap-1.5">
          {phoneReels.map((_, i) => (
            <div key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30">
              <div
                className="h-full rounded-full bg-white"
                style={{ width: i < idx ? '100%' : i === idx ? `${progress * 100}%` : '0%' }}
              />
            </div>
          ))}
        </div>

        <div className="aspect-[9/19] w-full overflow-hidden bg-black">
          <video
            key={idx}
            ref={videoRef}
            src={near ? phoneReels[idx].src : undefined}
            poster={phoneReels[idx].poster}
            autoPlay
            muted={muted}
            playsInline
            onLoadedMetadata={(e) => { e.currentTarget.muted = muted }}
            onTimeUpdate={(e) => {
              const v = e.currentTarget
              if (v.duration) setProgress(v.currentTime / v.duration)
            }}
            onEnded={() => go(idx + 1)}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Tap zones: left half = previous, right half = next */}
        <button type="button" aria-label="Předchozí video" onClick={() => go(idx - 1)} className="absolute inset-y-0 left-0 z-20 w-1/2 cursor-w-resize" />
        <button type="button" aria-label="Další video" onClick={() => go(idx + 1)} className="absolute inset-y-0 right-0 z-20 w-1/2 cursor-e-resize" />

        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? 'Zapnout zvuk' : 'Vypnout zvuk'}
          className="absolute bottom-4 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white/90 backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-black/60"
        >
          {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>
      </div>

      {/* Arrows + counter */}
      <div className="mt-5 flex items-center justify-center gap-3 sm:absolute sm:inset-x-0 sm:top-full">
        <button
          type="button"
          onClick={() => go(idx - 1)}
          aria-label="Předchozí video"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/15 text-charcoal/60 transition-colors hover:border-charcoal/40 hover:text-charcoal"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="min-w-[44px] text-center text-[13px] font-medium text-charcoal">
          {idx + 1} / {total}
        </span>
        <button
          type="button"
          onClick={() => go(idx + 1)}
          aria-label="Další video"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/15 text-charcoal/60 transition-colors hover:border-charcoal/40 hover:text-charcoal"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </>
  )
}

/* ── Animated counter hook ── */
function useLoopCounter(max: number, durationMs: number = 10000, running = true) {
  const [value, setValue] = useState(0)
  const [popped, setPopped] = useState(false)

  useEffect(() => {
    // Ticks 30× a second, so it only runs while someone can see it
    if (!running) return
    const fps = 30
    const interval = 1000 / fps
    const totalFrames = durationMs / interval
    const increment = max / totalFrames
    let frame = 0
    let timer: ReturnType<typeof setInterval>
    let popTimer: ReturnType<typeof setTimeout>
    let restartTimer: ReturnType<typeof setTimeout>

    const run = () => {
      frame = 0
      setValue(0)
      setPopped(false)
      timer = setInterval(() => {
        frame++
        const current = Math.min(Math.round(increment * frame), max)
        setValue(current)
        if (frame >= totalFrames) {
          clearInterval(timer)
          setPopped(true)
          popTimer = setTimeout(() => setPopped(false), 600)
          restartTimer = setTimeout(run, 2000)
        }
      }, interval)
    }

    run()
    return () => {
      clearInterval(timer)
      clearTimeout(popTimer)
      clearTimeout(restartTimer)
    }
  }, [max, durationMs, running])

  return { value, popped }
}

/* ── Likes / Views card, styled like Instagram Insights ──
   A week of bars (Po–Ne) grows upwards one after another as the number
   counts up; once it lands, a trend chip pops in the corner. Both cards
   share this component, so they are always the same size. */
const WEEK = [0.22, 0.3, 0.26, 0.42, 0.55, 0.72, 1]

function InsightsCard({
  icon: Icon,
  label,
  max,
  growth,
  filled = false,
}: {
  icon: LucideIcon
  label: string
  max: number
  growth: string
  filled?: boolean
}) {
  // The counter lives here, so each tick redraws only this card, and it
  // stops while the card is off screen or the enquiry form is open (on
  // phones it otherwise kept the whole page busy and made taps lag)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const { isOpen: formOpen } = useConsultForm()
  const { value, popped } = useLoopCounter(max, 5000, inView && !formOpen)
  const p = value / max
  const done = value >= max
  return (
    <div
      ref={ref}
      className="flex w-full flex-col rounded-2xl bg-brand p-4 shadow-[0_8px_32px_color-mix(in_srgb,var(--color-on-brand)_18%,transparent)] transition-transform duration-300 sm:h-[224px] sm:w-[240px] sm:px-6 sm:pb-5 sm:pt-6"
      style={{ transform: popped ? 'scale(1.12)' : 'scale(1)' }}
    >
      <div className="mb-2 flex items-start justify-between gap-2 sm:mb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-on-brand/10 sm:h-10 sm:w-10">
            <Icon
              size={16}
              className={`text-on-brand transition-transform duration-300 sm:size-[18px] ${filled ? 'fill-on-brand' : ''} ${popped ? 'scale-125' : 'scale-100'}`}
            />
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-on-brand/80 sm:text-xs">{label}</p>
        </div>
        <span
          className={`hidden items-center gap-1 rounded-full bg-on-brand px-2 py-0.5 text-[11px] font-semibold text-brand transition-[opacity,scale] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] sm:inline-flex ${
            done ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}
        >
          <TrendingUp size={11} strokeWidth={2.5} />
          {growth}
        </span>
      </div>
      <p className="font-serif text-2xl font-bold tracking-tight text-on-brand sm:text-4xl">
        {value.toLocaleString('cs-CZ')}
      </p>
      {/* each bar starts once the one before it is done, so the week fills left to right */}
      <div className="mt-3 flex h-8 items-end gap-1 sm:mt-auto sm:h-12 sm:gap-1.5">
        {WEEK.map((h, i) => {
          const grow = Math.max(0, Math.min(1, (p - i / WEEK.length) * WEEK.length))
          return (
            <div key={i} className="flex h-full flex-1 items-end rounded-[3px] bg-on-brand/10">
              <div
                className={`w-full rounded-[3px] ${i === WEEK.length - 1 ? 'bg-on-brand' : 'bg-on-brand/45'}`}
                style={{ height: `${h * grow * 100}%` }}
              />
            </div>
          )
        })}
      </div>
      <div className="mt-1.5 flex justify-between text-[10px] font-medium text-on-brand/75">
        <span>Po</span>
        <span>Ne</span>
      </div>
    </div>
  )
}

/* ── Background scatter of faint Instagram action icons ──
   Purely decorative, behind the Likes/Views cards: small, 25 % opacity,
   flying out from behind the phone together with the cards. x / y are the
   landing spot from the phone's centre on large screens (scaled with the
   cards' offset below that); they avoid the phone and both cards.
   The numbers are illustrative; edit freely. */
type ScatterIcon = { icon: LucideIcon; value: string; x: number; y: number; rotate: number; size: number; flip?: boolean }

const scatter: ScatterIcon[] = [
  { icon: Heart, value: '2 431', x: -250, y: -265, rotate: -12, size: 30 },
  { icon: Send, value: '864', x: -405, y: -300, rotate: 8, size: 24 },
  { icon: MessageCircle, value: '317', x: -480, y: -175, rotate: -6, size: 26, flip: true },
  { icon: Repeat, value: '1 205', x: -215, y: 95, rotate: 10, size: 26 },
  { icon: Heart, value: '18 400', x: -345, y: 150, rotate: 6, size: 34 },
  { icon: MessageCircle, value: '96', x: -470, y: 60, rotate: -10, size: 24, flip: true },
  { icon: Send, value: '3 250', x: -255, y: 285, rotate: -8, size: 28 },
  { icon: Repeat, value: '742', x: -430, y: 275, rotate: 5, size: 24 },
  { icon: MessageCircle, value: '1 178', x: 240, y: -275, rotate: 9, size: 28, flip: true },
  { icon: Heart, value: '7 950', x: 385, y: -235, rotate: 12, size: 32 },
  { icon: Repeat, value: '412', x: 480, y: -110, rotate: -7, size: 24 },
  { icon: Send, value: '1 640', x: 230, y: 105, rotate: 7, size: 26 },
  { icon: Heart, value: '12 600', x: 370, y: 165, rotate: -9, size: 30 },
  { icon: MessageCircle, value: '258', x: 480, y: 55, rotate: 6, size: 24, flip: true },
  { icon: Repeat, value: '2 090', x: 285, y: 300, rotate: -5, size: 26 },
  { icon: Send, value: '519', x: 445, y: 320, rotate: 11, size: 24 },
]

/* Phones: a smaller set in the gutters beside the phone. They spread out
   from behind it once, when the phone comes into view. x / y are from the
   phone's centre (the 240 px phone is ~518 px tall). */
const scatterMobile: ScatterIcon[] = [
  { icon: Heart, value: '2 431', x: -150, y: -200, rotate: -10, size: 22 },
  { icon: Send, value: '864', x: -148, y: -70, rotate: 7, size: 18 },
  { icon: MessageCircle, value: '317', x: -152, y: 65, rotate: -6, size: 19, flip: true },
  { icon: Repeat, value: '1 205', x: -148, y: 195, rotate: 8, size: 19 },
  { icon: Heart, value: '18 400', x: 150, y: -150, rotate: 9, size: 22 },
  { icon: Repeat, value: '742', x: 148, y: -20, rotate: -7, size: 18 },
  { icon: Send, value: '3 250', x: 152, y: 110, rotate: 6, size: 19 },
  { icon: MessageCircle, value: '96', x: 148, y: 225, rotate: -9, size: 18, flip: true },
]

/* One icon, flying out from behind the phone as the phone scrolls up
   into view. Each starts a beat after the previous one. */
function MobileScatterIcon({ item, index, progress }: { item: ScatterIcon; index: number; progress: MotionValue<number> }) {
  const from = 0.2 + index * 0.06
  const to = from + 0.38
  const x = useTransform(progress, [from, to], [0, item.x])
  const y = useTransform(progress, [from, to], [0, item.y])
  const rotate = useTransform(progress, [from, to], [0, item.rotate])
  const scale = useTransform(progress, [from, to], [0.8, 1])
  const opacity = useTransform(progress, [from, from + 0.12], [0, 0.25])
  const Icon = item.icon
  return (
    <motion.div
      style={{ x, y, rotate, scale, opacity }}
      className="absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5 text-charcoal"
    >
      <Icon size={item.size} strokeWidth={1.75} className={item.flip ? '-scale-x-100' : undefined} />
      <span className="whitespace-nowrap text-[10px] font-semibold tabular-nums">{item.value}</span>
    </motion.div>
  )
}

/* progress: 0 when the phone's top enters the screen, 1 when it's centred */
function MobileScatter({ progress }: { progress: MotionValue<number> }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[259px] -z-10 sm:hidden">
      {scatterMobile.map((item, i) => (
        <MobileScatterIcon key={i} item={item} index={i} progress={progress} />
      ))}
    </div>
  )
}

function ScatteredIcon({
  item,
  index,
  progress,
  scale,
}: {
  item: ScatterIcon
  index: number
  progress: MotionValue<number>
  scale: number
}) {
  // Same window as the cards, each icon a hair later than the one before
  const from = 0.27 + (index % 8) * 0.006
  const to = from + 0.15
  const x = useTransform(progress, [from, to], [0, item.x * scale])
  const y = useTransform(progress, [from, to], [0, item.y * scale])
  const rotate = useTransform(progress, [from, to], [0, item.rotate])
  const opacity = useTransform(progress, [from, from + 0.06], [0, 0.25])
  const Icon = item.icon

  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y, rotate, opacity }}
      className="pointer-events-none absolute left-1/2 top-1/2 z-0 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-charcoal"
    >
      <Icon
        size={Math.round(item.size * (scale < 1 ? 0.8 : 1))}
        strokeWidth={1.75}
        className={item.flip ? '-scale-x-100' : undefined}
      />
      <span className="whitespace-nowrap text-[11px] font-semibold tabular-nums lg:text-xs">{item.value}</span>
    </motion.div>
  )
}

export default function Viral() {
  const sectionRef = useRef<HTMLDivElement>(null)

  // Responsive slide offset, on mobile cards stack below phone instead of sliding out.
  const [offset, setOffset] = useState(410)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth
      setIsMobile(w < 640)
      if (w < 1024) setOffset(290)
      else setOffset(410)
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // The slide-out and the counters stay on even with "reduce motion"
  // (Pavel wants them); the slide is tied to scroll, so the visitor drives it.
  // Both cards use identical timing so they slide out in perfect sync
  // Animation completes before phone reaches center (~0.42 scroll progress)
  const likesX = useTransform(scrollYProgress, [0.28, 0.42], [0, -offset])
  const likesOpacity = useTransform(scrollYProgress, [0.28, 0.34], [0, 1])
  const likesRotate = useTransform(scrollYProgress, [0.28, 0.42], [0, -6])

  const viewsX = useTransform(scrollYProgress, [0.28, 0.42], [0, offset])
  const viewsOpacity = useTransform(scrollYProgress, [0.28, 0.34], [0, 1])
  const viewsRotate = useTransform(scrollYProgress, [0.28, 0.42], [0, 6])

  // Phones: the icons fly out as the phone scrolls up to the middle, then
  // the two cards slide in from the sides as their row does the same.
  const phoneRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: phoneProgress } = useScroll({ target: phoneRef, offset: ['start end', 'center center'] })
  // Cards: start the moment their row peeks in at the bottom of the screen
  // and land before the row is fully in view (0 → 1 = row enters → row's
  // bottom reaches the bottom of the screen)
  const { scrollYProgress: cardsProgress } = useScroll({ target: cardsRef, offset: ['start end', 'end end'] })
  const mLikesX = useTransform(cardsProgress, [0, 0.85], ['-115%', '0%'])
  const mViewsX = useTransform(cardsProgress, [0, 0.85], ['115%', '0%'])
  const mLikesRotate = useTransform(cardsProgress, [0, 0.85], [-8, 0])
  const mViewsRotate = useTransform(cardsProgress, [0, 0.85], [8, 0])
  // Function form on purpose: a plain opacity range gets handed to the
  // browser's native ViewTimeline, which maps this offset wrongly and left
  // the cards transparent until far too late
  const mOpacity = useTransform(cardsProgress, (p) => Math.min(1, Math.max(0, p / 0.35)))




  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cream py-24 lg:py-32"
    >
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

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center lg:mb-16"
        >
          <h2 className="font-serif text-[clamp(1.6rem,3.5vw,2.6rem)] font-bold leading-[1.05] tracking-tight text-charcoal">
            Prodávaná nemovitost si zaslouží <em className="text-accent">víc než fotky</em> z&nbsp;mobilu
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.85] text-warm-gray">
            Videa, která zastaví scrollování a&nbsp;přivedou zájemce.
          </p>
        </motion.div>

        {/* Phone + floating cards
            Mobile (< sm): flex column, phone on top, cards in row below.
            Desktop (sm+): absolute positioning, cards slide out from behind phone on scroll. */}
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 sm:block sm:min-h-[600px]">

          {/* Phone mockup */}
          <motion.div
            ref={phoneRef}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-20 w-[240px] sm:absolute sm:left-1/2 sm:top-1/2 sm:w-[280px] sm:-translate-x-1/2 sm:-translate-y-1/2 lg:w-[320px]"
          >
            <PhoneReels />
            <MobileScatter progress={phoneProgress} />
          </motion.div>

          {/* Faint icon scatter behind the cards (desktop only) */}
          {!isMobile &&
            scatter.map((item, i) => (
              <ScatteredIcon key={i} item={item} index={i} progress={scrollYProgress} scale={offset / 410} />
            ))}

          {/* Cards wrapper, on mobile it's a flex row; on desktop `contents` makes it
              disappear so the children can be absolutely positioned by the grandparent. */}
          <div ref={cardsRef} className="flex w-full max-w-sm justify-center gap-3 sm:contents">

            {/* Likes card: slides out left from behind the phone on desktop,
                slides in from the left edge on phones */}
            <motion.div
              style={
                isMobile
                  ? { x: mLikesX, rotate: mLikesRotate, opacity: mOpacity }
                  : { x: likesX, opacity: likesOpacity, rotate: likesRotate }
              }
              className="flex-1 sm:flex-none sm:absolute sm:left-1/2 sm:top-[38%] sm:z-10 sm:-ml-[10px] sm:-translate-y-1/2"
            >
              <InsightsCard
                icon={Heart}
                label="Likes"
                max={1000}
                growth="+312 %"
                filled
              />
            </motion.div>

            {/* Views card: right on desktop, in from the right edge on phones */}
            <motion.div
              style={
                isMobile
                  ? { x: mViewsX, rotate: mViewsRotate, opacity: mOpacity }
                  : { x: viewsX, opacity: viewsOpacity, rotate: viewsRotate }
              }
              className="flex-1 sm:flex-none sm:absolute sm:right-1/2 sm:top-[38%] sm:z-10 sm:-mr-[10px] sm:-translate-y-1/2"
            >
              <InsightsCard
                icon={Eye}
                label="Views"
                max={100000}
                growth="+548 %"
              />
            </motion.div>

          </div>
        </div>

        {/* Room for the phone's arrows, which hang below the stage on sm+ */}
        <div aria-hidden="true" className="hidden sm:block sm:h-24" />

      </div>
    </section>
  )
}
