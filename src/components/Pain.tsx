import { motion } from 'framer-motion'

const painPoints = [
  {
    number: '01',
    label: 'Nemovitost leží na trhu',
    description:
      'Inzerát zapadne mezi stovky podobných. Prázdný byt, průměrné fotky z\u00A0mobilu — kupující scrollují dál. S\u00A0každým týdnem roste tlak na slevu.',
  },
  {
    number: '02',
    label: 'Konkurence vás předbíhá',
    description:
      'Ostatní makléři mají na sítích profesionální videa a\u00A0tisíce zhlédnutí. Vy nevíte jak na to — nebo nemáte čas to řešit.',
  },
  {
    number: '03',
    label: 'Prázdný byt neprodáte',
    description:
      'Kupující si nedokáže představit život v\u00A0prázdném prostoru. Staging stojí 30–50\u00A0tisíc a\u00A0týden čekání. Bez něj to nejde.',
  },
  {
    number: '04',
    label: 'Před kamerou to nejde',
    description:
      'Ztuhnete, výsledek vypadá amatérsky a\u00A0poškozuje váš brand. Nevíte, co říct — a\u00A0přitom video je dnes to, co prodává.',
  },
]

export default function Pain() {
  return (
    <section id="problem" className="relative overflow-hidden bg-deep py-24 lg:py-32">
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.04] blur-[120px]" />
      </div>

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

        {/* Headline area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9 }}
          className="mb-14 text-center lg:mb-16"
        >
          <h2 className="font-serif text-[clamp(1.6rem,3.5vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.01em] text-white">
            Poznáváte se?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-[1.85] text-white/50">
            Fotíte na mobil, staging neřešíte a&nbsp;videa neděláte vůbec.
            Výsledek? Nemovitost leží na trhu, prodávající tlačí na slevu
            a&nbsp;provize klesá.
          </p>
        </motion.div>

        {/* Single column list */}
        <div className="grid gap-4 lg:gap-5">
          {painPoints.map((point, i) => (
            <motion.div
              key={point.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-sm transition-colors duration-500 hover:border-accent/20 hover:bg-white/[0.05] lg:p-10"
            >
              <span className="mb-4 block font-mono text-sm tracking-wider text-accent/60">
                {point.number}
              </span>
              <h3 className="mb-3 font-serif text-xl font-semibold leading-tight text-white lg:text-2xl">
                {point.label}
              </h3>
              <p className="leading-[1.75] text-white/45">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
