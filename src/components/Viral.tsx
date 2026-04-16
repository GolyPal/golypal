import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Eye, Heart } from 'lucide-react'

/* ── Animated counter hook ── */
function useLoopCounter(max: number, durationMs: number = 10000) {
  const [value, setValue] = useState(0)
  const [popped, setPopped] = useState(false)

  useEffect(() => {
    const fps = 30
    const interval = 1000 / fps
    const totalFrames = durationMs / interval
    const increment = max / totalFrames
    let frame = 0
    let timer: ReturnType<typeof setInterval>

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
          setTimeout(() => setPopped(false), 600)
          setTimeout(run, 2000)
        }
      }, interval)
    }

    run()
    return () => clearInterval(timer)
  }, [max, durationMs])

  return { value, popped }
}

export default function Viral() {
  const sectionRef = useRef<HTMLDivElement>(null)

  // Responsive slide offset — on mobile cards stack below phone instead of sliding out.
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

  // Both cards use identical timing so they slide out in perfect sync
  // Animation completes before phone reaches center (~0.42 scroll progress)
  const likesX = useTransform(scrollYProgress, [0.28, 0.42], [0, -offset])
  const likesOpacity = useTransform(scrollYProgress, [0.28, 0.34], [0, 1])
  const likesRotate = useTransform(scrollYProgress, [0.28, 0.42], [0, -6])

  const viewsX = useTransform(scrollYProgress, [0.28, 0.42], [0, offset])
  const viewsOpacity = useTransform(scrollYProgress, [0.28, 0.34], [0, 1])
  const viewsRotate = useTransform(scrollYProgress, [0.28, 0.42], [0, 6])

  const { value: likes, popped: likesPopped } = useLoopCounter(1000, 5000)
  const { value: views, popped: viewsPopped } = useLoopCounter(100000, 5000)

  const likesProgress = likes / 1000
  const viewsProgress = views / 100000


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
            Mobile (< sm): flex column — phone on top, cards in row below.
            Desktop (sm+): absolute positioning, cards slide out from behind phone on scroll. */}
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 sm:block sm:min-h-[600px]">

          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-20 w-[240px] sm:absolute sm:left-1/2 sm:top-1/2 sm:w-[280px] sm:-translate-x-1/2 sm:-translate-y-1/2 lg:w-[320px]"
          >
            <div className="relative overflow-hidden rounded-[2.5rem] border-[6px] border-charcoal/90 bg-charcoal shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
              <div className="absolute left-1/2 top-2 z-30 h-6 w-24 -translate-x-1/2 rounded-full bg-charcoal/90" />
              <div className="aspect-[9/19] w-full overflow-hidden bg-charcoal">
                <video
                  src="/videos/uvodni_reel.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Cards wrapper — on mobile it's a flex row; on desktop `contents` makes it
              disappear so the children can be absolutely positioned by the grandparent. */}
          <div className="flex w-full max-w-sm justify-center gap-3 sm:contents">

            {/* Likes card — slides left on desktop, sits statically on mobile */}
            <motion.div
              style={
                isMobile
                  ? undefined
                  : { x: likesX, opacity: likesOpacity, rotate: likesRotate }
              }
              initial={isMobile ? { opacity: 0, y: 20 } : undefined}
              whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 sm:flex-none sm:absolute sm:left-1/2 sm:top-[38%] sm:z-10 sm:-ml-[10px] sm:-translate-y-1/2"
            >
              <div
                className="w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#FEF3E2] via-[#FFFBF5] to-[#FEF0D6] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-transform duration-300 sm:w-[220px] sm:px-7 sm:py-6"
                style={{ transform: likesPopped ? 'scale(1.12)' : 'scale(1)' }}
              >
                <div className="mb-2 flex items-center gap-2 sm:mb-3 sm:gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100/60 sm:h-10 sm:w-10">
                    <Heart
                      size={16}
                      className={`fill-amber-500 text-amber-500 transition-transform duration-300 sm:size-[18px] ${likesPopped ? 'scale-125' : 'scale-100'}`}
                    />
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-warm-gray sm:text-xs">Likes</p>
                </div>
                <p className={`font-serif text-2xl font-bold tracking-tight transition-colors duration-300 sm:text-4xl ${likesPopped ? 'text-accent' : 'text-charcoal'}`}>
                  {likes.toLocaleString('cs-CZ')}
                </p>
                <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-amber-200/50 sm:mt-3">
                  <div
                    className={`h-full rounded-full transition-none ${likesPopped ? 'bg-accent' : 'bg-amber-400'}`}
                    style={{ width: `${likesProgress * 100}%` }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Views card — slides right on desktop, sits statically on mobile */}
            <motion.div
              style={
                isMobile
                  ? undefined
                  : { x: viewsX, opacity: viewsOpacity, rotate: viewsRotate }
              }
              initial={isMobile ? { opacity: 0, y: 20 } : undefined}
              whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex-1 sm:flex-none sm:absolute sm:right-1/2 sm:top-[38%] sm:z-10 sm:-mr-[10px] sm:-translate-y-1/2"
            >
              <div
                className="w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#FEF3E2] via-[#FFFBF5] to-[#FEF0D6] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-transform duration-300 sm:w-[220px] sm:px-7 sm:py-6"
                style={{ transform: viewsPopped ? 'scale(1.12)' : 'scale(1)' }}
              >
                <div className="mb-2 flex items-center gap-2 sm:mb-3 sm:gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100/60 sm:h-10 sm:w-10">
                    <Eye
                      size={16}
                      className={`text-amber-500 transition-transform duration-300 sm:size-[18px] ${viewsPopped ? 'scale-125' : 'scale-100'}`}
                    />
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-warm-gray sm:text-xs">Views</p>
                </div>
                <p className={`font-serif text-2xl font-bold tracking-tight transition-colors duration-300 sm:text-4xl ${viewsPopped ? 'text-accent' : 'text-charcoal'}`}>
                  {views.toLocaleString('cs-CZ')}
                </p>
                <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-amber-200/50 sm:mt-3">
                  <div
                    className={`h-full rounded-full transition-none ${viewsPopped ? 'bg-accent' : 'bg-amber-400'}`}
                    style={{ width: `${viewsProgress * 100}%` }}
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
