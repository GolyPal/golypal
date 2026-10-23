import { motion } from 'framer-motion'
import { Camera, Video, Wand2, FileText } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-cream px-4 pt-20 pb-4 lg:px-6 lg:pt-24 lg:pb-6">
      <div className="relative min-h-[calc(100vh-8.5rem)] overflow-hidden rounded-2xl bg-charcoal">
        {/* Background photo — covers entire card */}
        <div className="absolute inset-0">
          <img
            src="/images/hero.png"
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-charcoal/60" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100vh-8.5rem)] max-w-[1400px] flex-col items-center justify-center px-8 py-16 lg:px-16">
          {/* Badge, headline, icon list */}
          <div className="flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-5"
            >
              <span className="inline-flex items-center gap-2 rounded-2xl border border-white/20 sm:rounded-full bg-white/10 px-4 py-2 text-[13px] font-medium tracking-wide text-white/90 backdrop-blur-sm">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_color-mix(in_srgb,var(--color-accent)_60%,transparent)]" />
                <span>Pro makléře, kterým přestalo stačit <span className="font-semibold text-accent">&ldquo;nějak to dopadne&rdquo;</span></span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_color-mix(in_srgb,var(--color-accent)_60%,transparent)]" />
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h1 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white">
                Připravím vám <em className="text-accent">kompletní vizuální prezentaci</em>
                <br />
                nemovitosti do&nbsp;<em className="text-accent">5&nbsp;dnů</em>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-6 flex flex-col items-center gap-2.5 text-[13px] text-white/80 lg:text-sm"
            >
              <p>
                <Wand2 size={15} className="mr-2.5 inline-block -translate-y-px text-accent" strokeWidth={1.5} />
                <span><span className="font-semibold text-white">AI vizualizace</span> — plný potenciál nemovitosti bez stagingu za desetitisíce</span>
              </p>
              <p>
                <Video size={15} className="mr-2.5 inline-block -translate-y-px text-accent" strokeWidth={1.5} />
                <span><span className="font-semibold text-white">Videa</span> — stavěná na zastavení scrollu s tisíci zhlédnutími</span>
              </p>
              <p>
                <Camera size={15} className="mr-2.5 inline-block -translate-y-px text-accent" strokeWidth={1.5} />
                <span><span className="font-semibold text-white">Fotky</span> — ne z mobilu, ne průměrné, ne jako ostatní</span>
              </p>
              <p>
                <FileText size={15} className="mr-2.5 inline-block -translate-y-px text-accent" strokeWidth={1.5} />
                <span><span className="font-semibold text-white">Scripty</span> — první 3 sekundy rozhodují. Řeknu vám přesně co říct.</span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
