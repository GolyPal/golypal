import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X, Camera, Video, Wand2, FileText, ArrowDown } from 'lucide-react'

export default function Hero() {
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <>
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

          <div className="relative mx-auto flex min-h-[calc(100vh-8.5rem)] max-w-[1400px] flex-col gap-16 px-8 py-16 lg:px-16">
            {/* Top content — badge, headline, icon list */}
            <div className="flex flex-col items-center justify-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="mb-5"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[13px] font-medium tracking-wide text-white/90 backdrop-blur-sm">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(199,169,123,0.6)]" />
                  Pro makléře, kterým přestalo stačit <span className="font-semibold text-accent">&ldquo;nějak to dopadne&rdquo;</span>
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(199,169,123,0.6)]" />
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
                  nemovitosti do&nbsp;<em className="text-accent">72&nbsp;hodin</em>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="mt-6 flex flex-col items-center gap-2.5 text-[13px] text-white/80 lg:text-sm"
              >
                <p className="flex items-center gap-3">
                  <Wand2 size={15} className="shrink-0 text-accent" strokeWidth={1.5} />
                  <span><span className="font-semibold text-white">AI vizualizace</span> — plný potenciál nemovitosti bez stagingu za desetitisíce</span>
                </p>
                <p className="flex items-center gap-3">
                  <Video size={15} className="shrink-0 text-accent" strokeWidth={1.5} />
                  <span><span className="font-semibold text-white">Videa</span> — stavěná na zastavení scrollu s tisíci zhlédnutími</span>
                </p>
                <p className="flex items-center gap-3">
                  <Camera size={15} className="shrink-0 text-accent" strokeWidth={1.5} />
                  <span><span className="font-semibold text-white">Fotky</span> — ne z mobilu, ne průměrné, ne jako ostatní</span>
                </p>
                <p className="flex items-center gap-3">
                  <FileText size={15} className="shrink-0 text-accent" strokeWidth={1.5} />
                  <span><span className="font-semibold text-white">Scripty</span> — první 3 sekundy rozhodují. Řeknu vám přesně co říct.</span>
                </p>
              </motion.div>
              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="mt-10 flex flex-col items-center gap-3"
              >
                <button
                  type="button"
                  onClick={() => document.getElementById('konzultace')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-semibold tracking-wide text-white shadow-[0_8px_32px_rgba(199,169,123,0.3)] transition-all duration-300 hover:bg-accent/90 hover:shadow-[0_12px_40px_rgba(199,169,123,0.45)] hover:scale-[1.02]"
                >
                  Mám zájem spolupracovat
                  <ArrowDown size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
                </button>
                <p className="text-[12px] text-white/35 tracking-wide">
                  Nezávazná konzultace · Zdarma
                </p>
              </motion.div>
            </div>

            {/* Bottom — frosted glass video box */}
            <motion.button
              onClick={() => setVideoOpen(true)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="group flex w-full flex-1 cursor-pointer items-center justify-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-10 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:bg-white/15"
            >
              <Play size={24} className="text-accent transition-transform duration-300 group-hover:scale-110" fill="currentColor" fillOpacity={0.85} />
              <span className="text-base font-semibold tracking-wide text-white lg:text-lg">
                Jako první si pusťte toto video
              </span>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Video lightbox */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setVideoOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors duration-300 hover:border-white/40 hover:text-white"
            >
              <X size={20} />
            </button>

            {/* Video player */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full max-w-5xl px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-charcoal">
                <video
                  autoPlay
                  controls
                  playsInline
                  className="h-full w-full object-cover"
                >
                  <source src="/videos/hero.mp4" type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
