import { motion } from 'framer-motion'
import { ImageIcon } from 'lucide-react'

export default function About() {
  return (
    <section id="o-mne" className="bg-cream-dark py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
        {/* Editorial section header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex items-center gap-6"
        >
          <div className="editorial-line flex-1" />
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1 }}
            className="relative lg:col-span-5"
          >
            <div className="relative">
              <div className="flex aspect-[3/4] items-center justify-center border border-charcoal/10 bg-charcoal/5">
                <div className="flex flex-col items-center gap-3 text-charcoal/30">
                  <ImageIcon size={40} strokeWidth={1.2} />
                  <span className="text-[10px] uppercase tracking-[0.3em]">
                    Foto brzy
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio text — right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="lg:col-span-7 lg:pt-8"
          >
            <h2 className="font-serif text-[clamp(1.6rem,3.5vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.01em] text-charcoal lg:text-center">
              Pavel Golasowski
            </h2>

            <div className="mt-10 space-y-6 text-base leading-[1.85] text-warm-gray lg:text-[17px]">
              <p>
                Specializuji se na vizuální produkci pro realitní segment.
                Propojuji profesionální fotografii, video a&nbsp;nejnovější AI
                technologie, abych makléřům pomohl prodávat rychleji a&nbsp;za
                vyšší ceny.
              </p>
              <p>
                Rozumím tomu, co makléř potřebuje — rychlost, spolehlivost
                a&nbsp;materiály, které rovnou fungují. Proto dodávám do
                72&nbsp;hodin, komunikuji jasně a&nbsp;držím se dohodnutých
                termínů.
              </p>
              <p>
                Každou nemovitost beru jako příběh, který stojí za to vyprávět.
                A&nbsp;můj úkol je vyprávět ho tak, aby se prodal.
              </p>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
