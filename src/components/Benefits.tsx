import { motion } from 'framer-motion'

const benefits = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: 'Vše na klíč',
    description:
      'Konec s\u00A0hledáním, domlouváním a\u00A0čekáním. Jeden člověk, 72\u00A0hodin a\u00A0materiály máte hotové k\u00A0publikaci.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
      </svg>
    ),
    title: 'AI vizualizace místo stagingu',
    description:
      'Neplaťte desítky tisíc za drahý staging. Každý prázdný prostor ukážeme jako zařízený interiér — za zlomek ceny a\u00A0pár desítek minut.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'O level výš',
    description:
      'Vaši konkurenti se budou ptát, kdo vám to dělá. Vy budete ten, kdo bude ukazovat, jak se to dělá.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: 'Víc zájemců, žádná sleva',
    description:
      'Bez zájemců přijde tlak na slevu — a\u00A0prodávající začne nervovat. Rychlejší prodej chrání vztah s\u00A0prodávajícím i\u00A0vaši reputaci.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    title: 'Dveře k lepším zakázkám',
    description:
      'Majitelé prémiových nemovitostí svěří prodej tomu, kdo má prémiovou prezentaci. S\u00A0průměrným obsahem zůstanete u\u00A0průměrných zakázek.',
  },
]

export default function Benefits() {
  return (
    <section id="benefits" className="relative bg-cream-dark py-24 lg:py-32">
      {/* Top decorative divider — gradient fade from dark section */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-deep/10 to-transparent" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-16">
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

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9 }}
          className="mb-14 text-center lg:mb-16"
        >
          <h2 className="font-serif text-[clamp(1.6rem,3.5vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.01em] text-charcoal">
            Co se změní, když to
            <br />
            <em className="text-accent">přestanete řešit sami</em>
          </h2>
        </motion.div>

        {/* Benefits as editorial rows */}
        <div>
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group border-t border-charcoal/10 transition-colors duration-500 hover:border-accent/40"
            >
              <div className="grid grid-cols-[auto_1fr] gap-x-6 py-8 lg:grid-cols-[48px_280px_1fr] lg:items-baseline lg:gap-x-10 lg:py-10">
                {/* Icon */}
                <span className="text-accent/50 transition-colors duration-500 group-hover:text-accent">
                  {benefit.icon}
                </span>

                {/* Title */}
                <h3 className="col-start-2 font-serif text-xl font-semibold leading-tight text-charcoal lg:text-2xl">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="col-start-2 mt-2 leading-[1.8] text-warm-gray lg:col-start-3 lg:mt-0">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
          {/* Bottom border */}
          <div className="border-t border-charcoal/10" />
        </div>
      </div>
    </section>
  )
}
