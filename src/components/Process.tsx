import { useState } from 'react'
import { motion } from 'framer-motion'

const steps = [
  {
    number: '1',
    title: 'Ozvěte se',
    description:
      'Napíšete mi o\u00A0nemovitosti. Do\u00A024\u00A0hodin dostanete pevnou cenu a\u00A0termín.',
  },
  {
    number: '2',
    title: 'Konzultace',
    description:
      'Probereme cílovou skupinu, rozsah služeb a\u00A0domluvíme termín. 15\u00A0minut, které vám ušetří týdny.',
  },
  {
    number: '3',
    title: 'Focení & natáčení',
    description:
      'Přijedu s\u00A0kompletním vybavením. Profesionální přístup, bez zdržování — obvykle 2–3\u00A0hodiny.',
  },
  {
    number: '4',
    title: 'Dodání materiálů',
    description:
      'Do\u00A048–72\u00A0hodin obdržíte kompletní balíček připravený k\u00A0publikaci na portály i\u00A0sítě.',
  },
]

export default function Process() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="proces" className="bg-cream-dark py-24 lg:py-32">
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

        {/* Centered headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center lg:mb-16"
        >
          <h2 className="font-serif text-[clamp(1.6rem,3.5vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.01em] text-charcoal">
            Jak to funguje? <em className="text-accent">Čtyři jednoduché kroky.</em>
          </h2>
        </motion.div>

        {/* Timeline steps */}
        <div
          className="relative grid gap-12 md:grid-cols-4 md:gap-6 lg:gap-10"
          onMouseLeave={() => setHovered(null)}
        >
          {/* Connecting lines (desktop) */}
          {[0, 1, 2].map((lineIndex) => (
            <div
              key={lineIndex}
              className="pointer-events-none absolute top-[28px] hidden h-px md:block"
              style={{
                left: `calc(${(lineIndex * 100) / 4 + 100 / 8}% + 36px)`,
                right: `calc(${100 - (lineIndex + 1) * 100 / 4 - 100 / 8}% + 36px)`,
              }}
            >
              {/* Background line */}
              <div className="absolute inset-0 bg-charcoal/10" />
              {/* Active fill line */}
              <div
                className="absolute inset-y-0 left-0 bg-accent/50 transition-all duration-500 ease-out"
                style={{
                  width:
                    hovered !== null && hovered > lineIndex ? '100%' : '0%',
                  transitionDelay:
                    hovered !== null && hovered > lineIndex
                      ? `${lineIndex * 150 + 100}ms`
                      : '0ms',
                }}
              />
            </div>
          ))}

          {steps.map((step, i) => {
            const isActive = hovered !== null && i <= hovered

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="cursor-default text-center"
                onMouseEnter={() => setHovered(i)}
              >
                {/* Number box */}
                <div
                  className="relative mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-sm border transition-all duration-500 ease-out"
                  style={{
                    borderColor: isActive
                      ? 'var(--color-accent)'
                      : 'rgba(199,169,123,0.4)',
                    backgroundColor: isActive
                      ? 'var(--color-accent)'
                      : 'var(--color-cream-dark)',
                    transitionDelay: isActive ? `${i * 150}ms` : '0ms',
                  }}
                >
                  <span
                    className="font-serif text-xl font-medium transition-colors duration-500 ease-out"
                    style={{
                      color: isActive ? '#fff' : 'var(--color-charcoal)',
                      transitionDelay: isActive ? `${i * 150}ms` : '0ms',
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="mb-3 font-serif text-xl font-semibold tracking-tight transition-colors duration-500 ease-out lg:text-2xl"
                  style={{
                    color: isActive
                      ? 'var(--color-charcoal)'
                      : 'var(--color-charcoal)',
                    transitionDelay: isActive ? `${i * 150}ms` : '0ms',
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mx-auto max-w-xs text-[15px] leading-[1.8] text-warm-gray">
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
