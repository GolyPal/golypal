import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useConsultForm } from '../context/ConsultFormContext'

export default function FinalCTA() {
  const { open: openConsult } = useConsultForm()
  return (
    <section id="konzultace" className="relative overflow-hidden bg-charcoal py-24 lg:py-32">
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

        {/* Centred content */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1 }}
            className="font-serif text-[clamp(1.6rem,3.5vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.02em] text-white"
          >
            Jste připraveni prodávat nemovitosti{' '}
            <em className="text-accent">rychleji?</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="mx-auto mt-6 max-w-md text-base leading-[1.85] text-white lg:text-[17px]"
          >
            Řekněte mi o sobě víc a já se vám ozvu zpět do 24h. Stačí vyplnit krátký minutový formulář.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-10 flex justify-center"
          >
            <button
              type="button"
              onClick={openConsult}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-10 py-4.5 text-sm font-semibold tracking-wide text-charcoal transition-all duration-300 hover:bg-white/90"
            >
              Konzultace zdarma
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 text-[13px] text-subtle"
          >
            Odpovídám do 24 hodin. Bez závazků, bez poplatků.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
