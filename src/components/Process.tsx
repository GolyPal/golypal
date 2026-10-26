import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { ctaArrowDown, ctaClass } from './cta'

const steps = [
  {
    number: '1',
    title: 'Vyplňte formulář',
    description: 'Řekněte mi o sobě pár věcí. Zabere to necelou minutu.',
  },
  {
    number: '2',
    title: 'Ozvu se vám',
    description: 'Brzy se vám ozvu. Pak si zavoláme nebo se potkáme, klidně i online.',
  },
  {
    number: '3',
    title: 'Pobavíme se',
    description:
      'Probereme, jaké nemovitosti nabízíte a co potřebujete. Uvidíme, jestli si sedneme a jak vám můžu pomoct.',
  },
  {
    number: '4',
    title: 'Focení a natáčení',
    description:
      'Když se domluvíme, nemovitost nafotím a natočím. Všechny materiály dodám do 7 dnů, optimalizované na sítě i Sreality.',
  },
]

export default function Process() {
  const [hovered, setHovered] = useState<number | null>(null)
  // Desktop lights the steps on hover. Touch has no hover, so on phones the
  // steps light up one by one as they scroll past the lower third of the
  // screen (and switch back off when scrolled back up).
  const canHover = useMediaQuery('(min-width: 768px)')
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (canHover) return
    const lit = new Set<number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const i = stepRefs.current.indexOf(entry.target as HTMLDivElement)
          if (entry.isIntersecting) lit.add(i)
          else lit.delete(i)
        }
        setHovered(lit.size ? Math.max(...lit) : null)
      },
      // the zone runs from far above the screen down to 35 % from its bottom
      { rootMargin: '100% 0px -35% 0px' },
    )
    stepRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [canHover])

  return (
    <section id="proces" className="bg-cream py-24 lg:py-32">
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
          onMouseLeave={() => canHover && setHovered(null)}
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
                className="absolute inset-y-0 left-0 bg-cta/60 transition-all duration-500 ease-out"
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
                ref={(el) => {
                  stepRefs.current[i] = el
                }}
                className="cursor-default text-center"
                onMouseEnter={() => canHover && setHovered(i)}
              >
                {/* Number box */}
                <div
                  className="relative mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-sm border transition-all duration-500 ease-out"
                  style={{
                    borderColor: isActive
                      ? 'var(--color-cta)'
                      : 'color-mix(in srgb, var(--color-charcoal) 20%, transparent)',
                    backgroundColor: isActive
                      ? 'var(--color-cta)'
                      : 'var(--color-cream-dark)',
                    transitionDelay: isActive && canHover ? `${i * 150}ms` : '0ms',
                  }}
                >
                  <span
                    className="font-serif text-xl font-medium transition-colors duration-500 ease-out"
                    style={{
                      color: isActive ? 'var(--color-on-cta)' : 'var(--color-charcoal)',
                      transitionDelay: isActive && canHover ? `${i * 150}ms` : '0ms',
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
                    transitionDelay: isActive && canHover ? `${i * 150}ms` : '0ms',
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <button
            type="button"
            onClick={() => document.getElementById('konzultace')?.scrollIntoView({ behavior: 'smooth' })}
            className={ctaClass()}
          >
            Mám zájem spolupracovat
            <ArrowDown size={15} className={ctaArrowDown} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
