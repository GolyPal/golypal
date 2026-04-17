import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useConsultForm } from '../context/ConsultFormContext'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqewpkvg'

const TOTAL_STEPS = 7

type FormState = {
  role: string
  mediaStatus: string[]
  propertyType: string[]
  location: string
  volume: string
  source: string
  name: string
  phone: string
  email: string
  company: string
}

const initialState: FormState = {
  role: '',
  mediaStatus: [],
  propertyType: [],
  location: '',
  volume: '',
  source: '',
  name: '',
  phone: '',
  email: '',
  company: '',
}

type Status = 'idle' | 'sending' | 'success' | 'error'

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
}

export default function ConsultFormModal() {
  const { isOpen, close } = useConsultForm()
  const [step, setStep] = useState(1)
  const [dir, setDir] = useState(1)
  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const firstInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  useEffect(() => {
    if (step === TOTAL_STEPS) {
      const t = window.setTimeout(() => firstInputRef.current?.focus(), 300)
      return () => window.clearTimeout(t)
    }
  }, [step])

  useEffect(() => {
    if (isOpen) return
    const t = window.setTimeout(() => {
      setForm(initialState)
      setStatus('idle')
      setErrorMsg('')
      setStep(1)
      setDir(1)
    }, 400)
    return () => window.clearTimeout(t)
  }, [isOpen])

  const goTo = (next: number) => {
    setDir(next > step ? 1 : -1)
    setStep(next)
  }

  const toggleMulti = (key: 'mediaStatus' | 'propertyType', v: string) => {
    setForm(prev => ({
      ...prev,
      [key]: prev[key].includes(v)
        ? prev[key].filter(x => x !== v)
        : [...prev[key], v],
    }))
  }

  const canProceed = () => {
    if (step === 1) return form.role !== ''
    if (step === 2) return form.mediaStatus.length > 0
    if (step === 3) return form.propertyType.length > 0
    if (step === 4) return true // optional
    if (step === 5) return true // optional
    if (step === 6) return form.source !== ''
    if (step === 7) return form.name.trim() !== '' && form.phone.trim() !== '' && form.email.trim() !== ''
    return false
  }

  const handleNext = () => {
    if (step < TOTAL_STEPS) goTo(step + 1)
    else handleSubmit()
  }

  const handleSubmit = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setErrorMsg('E-mail nemá správný formát.')
      setStatus('error')
      return
    }
    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'Kdo jsem': form.role,
          'Aktuální řešení foto/video': form.mediaStatus.join(', '),
          'Typ nemovitostí': form.propertyType.join(', '),
          'Oblast působení': form.location,
          'Počet nemovitostí měsíčně': form.volume,
          'Jak se dozvěděl': form.source,
          'Jméno': form.name,
          'Telefon': form.phone,
          'E-mail': form.email,
          'Firma': form.company,
        }),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        const data = await res.json().catch(() => null)
        setErrorMsg(data?.errors?.[0]?.message || 'Odeslání se nepodařilo. Zkuste to znovu.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Zkontrolujte připojení k internetu a zkuste to znovu.')
      setStatus('error')
    }
  }

  const progress = (step / TOTAL_STEPS) * 100

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-[100] bg-charcoal/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="consult-form-title"
            className="fixed inset-0 z-[101] flex items-center justify-center px-4 py-6 sm:py-12"
          >
            <div className="relative w-full max-w-[560px] bg-cream shadow-2xl overflow-hidden">

              <button
                type="button"
                onClick={close}
                aria-label="Zavřít"
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center text-charcoal/40 transition-colors hover:text-charcoal"
              >
                <X size={18} />
              </button>

              {status === 'success' ? (
                <SuccessState onClose={close} />
              ) : (
                <>
                  {/* Header */}
                  <div className="border-b border-charcoal/8 px-8 pb-5 pt-10 sm:px-12">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-accent">Konzultace zdarma</p>
                    <h2 className="mt-1.5 font-serif text-xl font-medium text-charcoal">
                      Vyplňte prosím krátký dotazník
                    </h2>
                    <p className="mt-1 text-[13px] text-warm-gray/70">
                      Řekněte mi o sobě víc a já se vám ozvu zpět do 24h.
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="relative h-2 w-full bg-charcoal/8">
                    <motion.div
                      className="h-full bg-accent"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                    {/* Step counter inside bar area */}
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium tabular-nums text-warm-gray/50">
                      {step} / {TOTAL_STEPS}
                    </span>
                  </div>

                  <div className="px-8 pb-10 pt-8 sm:px-12 sm:pb-12">


                    <div className="overflow-hidden">
                      <AnimatePresence mode="wait" custom={dir}>
                        <motion.div
                          key={step}
                          custom={dir}
                          variants={variants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {step === 1 && (
                            <StepRole value={form.role} onChange={v => setForm(p => ({ ...p, role: v }))} />
                          )}
                          {step === 2 && (
                            <StepMedia value={form.mediaStatus} onChange={v => toggleMulti('mediaStatus', v)} />
                          )}
                          {step === 3 && (
                            <StepPropertyType value={form.propertyType} onChange={v => toggleMulti('propertyType', v)} />
                          )}
                          {step === 4 && (
                            <StepLocation value={form.location} onChange={v => setForm(p => ({ ...p, location: v }))} />
                          )}
                          {step === 5 && (
                            <StepVolume value={form.volume} onChange={v => setForm(p => ({ ...p, volume: v }))} />
                          )}
                          {step === 6 && (
                            <StepSource value={form.source} onChange={v => setForm(p => ({ ...p, source: v }))} />
                          )}
                          {step === 7 && (
                            <StepContact form={form} onChange={(k, v) => setForm(p => ({ ...p, [k]: v }))} firstInputRef={firstInputRef} />
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {status === 'error' && errorMsg && (
                      <p className="mt-5 border-l-2 border-red-400 bg-red-50 px-4 py-3 text-[13px] leading-[1.5] text-red-700">
                        {errorMsg}
                      </p>
                    )}

                    <div className="mt-10 flex items-center justify-between">
                      {step > 1 ? (
                        <button
                          type="button"
                          onClick={() => goTo(step - 1)}
                          className="group flex items-center gap-2 text-[13px] font-medium text-warm-gray transition-colors hover:text-charcoal"
                        >
                          <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
                          Zpět
                        </button>
                      ) : <span />}

                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={!canProceed() || status === 'sending'}
                        className="group inline-flex items-center gap-3 rounded-full bg-charcoal px-8 py-3.5 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {status === 'sending' ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Odesílám…
                          </>
                        ) : step < TOTAL_STEPS ? (
                          <>
                            Pokračovat
                            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                          </>
                        ) : (
                          <>
                            Odeslat
                            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ── Step 1: Role ── */
const roleOptions = [
  { value: 'Majitel realitní kanceláře', sub: 'Vedu vlastní RK' },
  { value: 'Vedoucí / manažer RK', sub: 'Řídím tým makléřů' },
  { value: 'Makléř na vlastní triko', sub: 'Pracuji samostatně' },
  { value: 'Začínám v realitách', sub: 'Teprve rozjíždím podnikání' },
  { value: 'Developer / investor', sub: 'Prodávám vlastní projekty' },
  { value: 'Něco jiného', sub: 'Upřesním v poznámce' },
]

function StepRole({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <h2 id="consult-form-title" className="mb-2 font-serif text-[clamp(1.35rem,3vw,1.85rem)] font-medium leading-[1.1] tracking-[-0.01em] text-charcoal">
        S kým mám tu čest?
      </h2>
      <p className="mb-7 text-[14px] leading-[1.7] text-warm-gray">
        Vyberte možnost, která vás nejlépe vystihuje.
      </p>
      <div className="grid grid-cols-2 gap-2.5">
        {roleOptions.map(opt => {
          const active = value === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`flex flex-col items-start rounded-xl border px-4 py-3.5 text-left transition-all duration-200 ${
                active ? 'border-accent bg-accent/5' : 'border-charcoal/10 bg-white/60 hover:border-charcoal/20'
              }`}
            >
              <span className={`text-[13.5px] font-medium leading-snug transition-colors ${active ? 'text-accent' : 'text-charcoal'}`}>
                {opt.value}
              </span>
              <span className="mt-0.5 text-[11.5px] text-warm-gray">{opt.sub}</span>
              {active && (
                <span className="mt-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent">
                  <Check size={10} className="text-white" strokeWidth={2.5} />
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Step 2: Current media situation ── */
const mediaOptions = [
  'Fotím / točím si sám',
  'Mám fotografa, ale nejsem spokojený',
  'Vůbec nevydávám video obsah',
  'Používám pouze fotky z mobilu',
  'Řeším to nárazově podle potřeby',
  'Zatím nic neřeším',
]

function StepMedia({ value, onChange }: { value: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <h2 className="mb-2 font-serif text-[clamp(1.35rem,3vw,1.85rem)] font-medium leading-[1.1] tracking-[-0.01em] text-charcoal">
        Jak aktuálně řešíte foto a video?
      </h2>
      <p className="mb-7 text-[14px] leading-[1.7] text-warm-gray">
        Lze vybrat víc možností.
      </p>
      <div className="flex flex-col gap-2">
        {mediaOptions.map(opt => {
          const active = value.includes(opt)
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                active ? 'border-accent bg-accent/5' : 'border-charcoal/10 bg-white/60 hover:border-charcoal/20'
              }`}
            >
              <span className={`flex h-5 w-5 flex-none items-center justify-center rounded-full border transition-all ${
                active ? 'border-accent bg-accent' : 'border-charcoal/20 bg-transparent'
              }`}>
                {active && <Check size={11} className="text-white" strokeWidth={2.5} />}
              </span>
              <span className={`text-[13.5px] font-medium transition-colors ${active ? 'text-accent' : 'text-charcoal'}`}>
                {opt}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Step 3: Property type ── */
const propertyTypeOptions = [
  'Byty',
  'Rodinné domy',
  'Pozemky',
  'Komerční nemovitosti',
  'Developerské projekty',
  'Různé typy',
]

function StepPropertyType({ value, onChange }: { value: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <h2 className="mb-2 font-serif text-[clamp(1.35rem,3vw,1.85rem)] font-medium leading-[1.1] tracking-[-0.01em] text-charcoal">
        S jakými nemovitostmi nejčastěji pracujete?
      </h2>
      <p className="mb-7 text-[14px] leading-[1.7] text-warm-gray">
        Lze vybrat víc možností.
      </p>
      <div className="flex flex-wrap gap-2.5">
        {propertyTypeOptions.map(opt => {
          const active = value.includes(opt)
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-[13.5px] font-medium transition-all duration-200 ${
                active ? 'border-accent bg-accent text-white' : 'border-charcoal/15 bg-white/60 text-warm-gray hover:border-charcoal/30 hover:text-charcoal'
              }`}
            >
              {active && <Check size={12} strokeWidth={2.5} />}
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Step 4: Location ── */
function StepLocation({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <h2 className="mb-2 font-serif text-[clamp(1.35rem,3vw,1.85rem)] font-medium leading-[1.1] tracking-[-0.01em] text-charcoal">
        Kde působíte?
      </h2>
      <p className="mb-7 text-[14px] leading-[1.7] text-warm-gray">
        Město, kraj nebo region — ať víme, jestli se to logisticky potkáme. Klidně přeskočte.
      </p>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Např. Ostrava, Olomoucký kraj, celá Morava…"
        className={inputClass}
        autoFocus
      />
    </div>
  )
}

/* ── Step 5: Volume ── */
function StepVolume({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <h2 className="mb-2 font-serif text-[clamp(1.35rem,3vw,1.85rem)] font-medium leading-[1.1] tracking-[-0.01em] text-charcoal">
        Kolik nemovitostí měsíčně budete potřebovat nafotit / natočit?
      </h2>
      <p className="mb-7 text-[14px] leading-[1.7] text-warm-gray">
        Klidně odhadněte. Pomůže mi lépe se připravit na naši konzultaci. Není povinné.
      </p>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Např. 2–3 měsíčně, 1 týdně, zatím nevím…"
        className={inputClass}
        autoFocus
      />
    </div>
  )
}

/* ── Step 6: Source ── */
const sourceOptions = [
  'Instagram',
  'Doporučení od kolegy / známého',
  'Google vyhledávání',
  'Facebook',
  'LinkedIn',
  'Jinak',
]

function StepSource({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <h2 className="mb-2 font-serif text-[clamp(1.35rem,3vw,1.85rem)] font-medium leading-[1.1] tracking-[-0.01em] text-charcoal">
        Jak jste se o mně dozvěděli?
      </h2>
      <p className="mb-7 text-[14px] leading-[1.7] text-warm-gray">
        Čistě pro moji informaci — pomáhá mi vědět, co funguje.
      </p>
      <div className="flex flex-wrap gap-2.5">
        {sourceOptions.map(opt => {
          const active = value === opt
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-[13.5px] font-medium transition-all duration-200 ${
                active ? 'border-accent bg-accent text-white' : 'border-charcoal/15 bg-white/60 text-warm-gray hover:border-charcoal/30 hover:text-charcoal'
              }`}
            >
              {active && <Check size={12} strokeWidth={2.5} />}
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Step 7: Contact ── */
function StepContact({
  form,
  onChange,
  firstInputRef,
}: {
  form: FormState
  onChange: (k: keyof FormState, v: string) => void
  firstInputRef: React.RefObject<HTMLInputElement | null>
}) {
  return (
    <div>
      <h2 className="mb-2 font-serif text-[clamp(1.35rem,3vw,1.85rem)] font-medium leading-[1.1] tracking-[-0.01em] text-charcoal">
        Vaše kontaktní údaje
      </h2>
      <p className="mb-7 text-[14px] leading-[1.7] text-warm-gray">
        Ozvu se vám do 24 hodin.
      </p>
      <div className="space-y-5">
        <Field label="Jméno a příjmení" required>
          <input
            ref={firstInputRef}
            type="text"
            value={form.name}
            onChange={e => onChange('name', e.target.value)}
            autoComplete="name"
            className={inputClass}
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Telefon" required>
            <input
              type="tel"
              value={form.phone}
              onChange={e => onChange('phone', e.target.value)}
              autoComplete="tel"
              placeholder="+420 737 000 000"
              className={inputClass}
            />
          </Field>
          <Field label="E-mail" required>
            <input
              type="email"
              value={form.email}
              onChange={e => onChange('email', e.target.value)}
              autoComplete="email"
              placeholder="jmeno@email.cz"
              className={inputClass}
            />
          </Field>
        </div>
        <Field label="Realitní kancelář / firma">
          <input
            type="text"
            value={form.company}
            onChange={e => onChange('company', e.target.value)}
            autoComplete="organization"
            className={inputClass}
          />
        </Field>
      </div>
    </div>
  )
}

/* ── Helpers ── */
const inputClass =
  'w-full border-b border-charcoal/15 bg-transparent py-2.5 text-[15px] text-charcoal outline-none transition-colors placeholder:text-warm-gray/30 focus:border-accent'

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-warm-gray">
        {label}{required && <span className="ml-1 text-accent">*</span>}
      </span>
      {children}
    </label>
  )
}

/* ── Success ── */
function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <div className="px-8 py-16 text-center sm:px-12 sm:py-20">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-accent/15"
      >
        <Check size={28} className="text-accent" strokeWidth={2.2} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-accent">Odesláno</p>
        <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-medium leading-[1.15] tracking-[-0.01em] text-charcoal">
          Díky, ozvu se <em className="text-accent">do 24&nbsp;hodin</em>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[14px] leading-[1.7] text-warm-gray">
          Vaši poptávku jsem dostal. Mezitím si klidně pusťte moje poslední videa nebo se podívejte na reference.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-10 text-[13px] font-medium uppercase tracking-[0.2em] text-warm-gray transition-colors hover:text-charcoal"
        >
          Zavřít
        </button>
      </motion.div>
    </div>
  )
}
