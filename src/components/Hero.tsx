import { useEffect, useRef, type ReactNode } from 'react'
import { ArrowRight, Camera, Video, Wand2, FileText } from 'lucide-react'
import { useConsultForm } from '../context/ConsultFormContext'
import { useMediaQuery } from '../hooks/useMediaQuery'

const bullets = [
  { Icon: Video, title: 'Videa', text: 'stavěná na zastavení scrollu s tisíci zhlédnutími' },
  { Icon: Camera, title: 'Fotky', text: 'ne z mobilu, ne průměrné, ne jako ostatní' },
  { Icon: Wand2, title: 'AI vizualizace', text: 'plný potenciál nemovitosti bez stagingu za desetitisíce' },
  { Icon: FileText, title: 'Scripty', text: 'první 3 sekundy rozhodují. Řeknu vám přesně, jak zaujmout.' },
]

/* One bento cell. Cells fade/scale in one after another on load. */
function Tile({ className = '', delay, children }: { className?: string; delay: number; children: ReactNode }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl opacity-0 [animation:tile-in_600ms_cubic-bezier(0.23,1,0.32,1)_forwards] ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function Chip({ children, lime = false }: { children: ReactNode; lime?: boolean }) {
  return (
    <span
      className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-medium ${
        lime ? 'bg-brand font-semibold text-on-brand' : 'bg-black/50 text-white backdrop-blur-sm'
      }`}
    >
      {children}
    </span>
  )
}

/* The reel keeps playing only while the hero is on screen */
function HeroReel({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) v.play().catch(() => {})
      else v.pause()
    })
    observer.observe(v)
    return () => observer.disconnect()
  }, [])
  return (
    <video
      ref={ref}
      src={src}
      poster={src.replace('.mp4', '-poster.jpg')}
      autoPlay
      muted
      loop
      playsInline
      aria-label={label}
      className="h-full w-full object-cover"
    />
  )
}

export default function Hero() {
  const { open: openConsult } = useConsultForm()
  // Phones get just the copy on the green card; not rendering the bento
  // there also keeps the reel and photos from downloading
  const showBento = useMediaQuery('(min-width: 768px)')

  return (
    <section className="bg-cream px-4 pt-20 pb-4 lg:px-6 lg:pt-24 lg:pb-6">
      <div className="relative overflow-hidden rounded-2xl bg-charcoal">
        {/* Same padding on all four sides; the content sets the height */}
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
          {/* Copy */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <span className="inline-flex w-fit items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-[13px] font-medium tracking-wide text-white/90 sm:rounded-full">
              <span className="inline-block h-1.5 w-1.5 flex-none rounded-full bg-accent" />
              <span>
                Pro makléře, kterým přestalo stačit <span className="font-semibold text-accent">&ldquo;nějak to dopadne&rdquo;</span>
              </span>
            </span>

            <h1
              className="font-serif text-[clamp(2rem,3.6vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white"
              style={{ textWrap: 'balance' }}
            >
              Připravím vám <em className="text-accent">kompletní vizuální prezentaci</em> nemovitosti do&nbsp;
              <em className="text-accent">7&nbsp;dnů</em>
            </h1>

            <ul className="grid gap-2.5 text-[14px] leading-snug text-white lg:text-[15px]">
              {bullets.map(({ Icon, title, text }) => (
                <li key={title} className="flex gap-2.5">
                  <Icon size={15} strokeWidth={1.5} className="mt-[3px] flex-none text-white" />
                  <span>
                    <span className="font-semibold text-accent">{title}</span>: {text}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
              <button
                type="button"
                onClick={openConsult}
                className="group inline-flex items-center gap-3 rounded-full bg-cta px-7 py-3.5 text-sm font-semibold tracking-wide text-on-cta transition-[background-color,scale] duration-200 hover:bg-cta/90 active:scale-[0.97]"
              >
                Konzultace zdarma
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* Bento of real work, tablet and up (on phones the hero is just
              the copy on the green card):
              reel | foto foto | views
              reel | AI   AI   | reel
              leads| foto foto | reel */}
          {showBento && (
          <div className="grid h-[520px] grid-cols-4 grid-rows-3 gap-3 lg:col-span-7 lg:h-[580px]">
            <Tile className="row-span-2 bg-black" delay={0}>
              <HeroReel src="/videos/Reel-4.mp4" label="Ukázka reelu" />
              <Chip>Reel</Chip>
            </Tile>
            <Tile className="col-span-2" delay={60}>
              <img src="/images/foto-sluzba-3.jpg" alt="Profesionální fotografie kuchyně" fetchPriority="high" className="h-full w-full object-cover" />
              <Chip>Foto</Chip>
            </Tile>
            <Tile className="bg-brand" delay={120}>
              <div className="flex h-full flex-col justify-between p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-on-brand/80">Zhlédnutí</p>
                <div>
                  <p className="font-serif text-[clamp(1.6rem,2.4vw,2rem)] font-bold leading-none text-on-brand">443&nbsp;000</p>
                  <p className="mt-1.5 text-[12px] font-medium leading-snug text-on-brand/80">top reel</p>
                </div>
              </div>
            </Tile>
            <Tile className="col-span-2" delay={180}>
              <img src="/images/ai-po.jpg" alt="AI vizualizace zařízeného obývacího pokoje" className="h-full w-full object-cover" />
              <Chip lime>AI vizualizace</Chip>
            </Tile>
            <Tile className="row-span-2 bg-black" delay={240}>
              <HeroReel src="/videos/Reel-2.mp4" label="Ukázka reelu z Dynamických videí" />
              <Chip>Reel</Chip>
            </Tile>
            <Tile className="bg-deep border border-white/[0.08]" delay={300}>
              <div className="flex h-full flex-col justify-between p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/80">Poptávky</p>
                <div>
                  <p className="font-serif text-[clamp(1.6rem,2.4vw,2rem)] font-bold leading-none text-accent">30+</p>
                  <p className="mt-1.5 text-[12px] font-medium leading-snug text-white/80">z jednoho videa</p>
                </div>
              </div>
            </Tile>
            <Tile className="col-span-2" delay={360}>
              <img src="/images/foto-sluzba-5.jpg" alt="Fotografie obývacího pokoje" className="h-full w-full object-cover" />
              <Chip>Foto</Chip>
            </Tile>
          </div>
          )}
        </div>
      </div>
    </section>
  )
}
