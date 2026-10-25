import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useConsultForm } from '../context/ConsultFormContext'
import { ctaArrowRight, ctaClass } from './cta'

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
            className="mx-auto mt-6 max-w-xl text-base leading-[1.85] text-white [text-wrap:balance] lg:text-[17px]"
          >
            Řekněte mi o sobě víc. Stačí vyplnit krátký minutový formulář.
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
              className={ctaClass()}
            >
              Konzultace zdarma
              <ArrowRight
                size={16}
                className={ctaArrowRight}
              />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
