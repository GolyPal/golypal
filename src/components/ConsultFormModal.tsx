import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useConsultForm } from '../context/ConsultFormContext'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqewpkvg'

/* ── Steps definition ── */
const TOTAL_STEPS = 4

type FormState = {
  interest: string[]
  volume: string
  message: string
  name: string
  phone: string
  email: string
  company: string
}

const initialState: FormState = {
  interest: [],
  volume: '',
  message: '',
  name: '',
  phone: '',
  email: '',
  company: '',
}

type Status = 'idle' | 'sending' | 'success' | 'error'

/* ── Slide animation variants ── */
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

  /* Lock body scroll */
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [isOpen])

  /* Escape key */
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  /* Focus first input on step 4 */
  useEffect(() => {
    if (step === 4) {
      const t = window.setTimeout(() => firstInputRef.current?.focus(), 300)
      return () => window.clearTimeout(t)
    }
  }, [step])

  /* Reset when closed */
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

  const toggleInterest = (v: string) => {
    setForm(prev => ({
      ...prev,
      interest: prev.interest.includes(v)
        ? prev.interest.filter(x => x !== v)
        : [...prev.interest, v],
    }))
  }

  const canProceed = () => {
    if (step === 1) return form.interest.length > 0
    if (step === 2) return form.volume !== ''
    if (step === 3) return true // optional
    if (step === 4) return form.name.trim() && form.phone.trim() && form.email.trim()
    return false
  }

  const handleNext = () => {
    if (step < TOTAL_STEPS) goTo(step + 1)
    else handleSubmit()
  }

  const handleSubmit = async () => {
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
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
          'Zájem': form.interest.join(', '),
          'Počet nemovitostí ročně': form.volume,
          'Zpráva': form.message,
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-[100] bg-charcoal/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal */}
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

              {/* Close */}
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
                  {/* Progress bar */}
                  <div className="h-0.5 w-full bg-charcoal/8">
                    <motion.div
                      className="h-full bg-accent"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>

                  <div className="px-8 pb-10 pt-10 sm:px-12 sm:pb-12">
                    {/* Step counter */}
                    <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-warm-gray/50">
                      Krok {step} z {TOTAL_STEPS}
                    </p>

                    {/* Step content */}
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
                            <StepInterest
                              value={form.interest}
                              onChange={toggleInterest}
                            />
                          )}
                          {step === 2 && (
                            <StepVolume
                              value={form.volume}
                              onChange={v => setForm(p => ({ ...p, volume: v }))}
                            />
                          )}
                          {step === 3 && (
                            <StepMessage
                              value={form.message}
                              onChange={v => setForm(p => ({ ...p, message: v }))}
                            />
                          )}
                          {step === 4 && (
                            <StepContact
                              form={form}
                              onChange={(k, v) => setForm(p => ({ ...p, [k]: v }))}
                              firstInputRef={firstInputRef}
                            />
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Error */}
                    {status === 'error' && errorMsg && (
                      <p className="mt-5 border-l-2 border-red-400 bg-red-50 px-4 py-3 text-[13px] leading-[1.5] text-red-700">
                        {errorMsg}
                      </p>
                    )}

                    {/* Navigation */}
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
                      ) : (
                        <span />
                      )}

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
                            Odeslat poptávku
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

/* ── Step 1: Interest (multi-select) ── */
const interestOptions = ['AI vizualizace', 'Video', 'Foto', 'Kompletní balíček', 'Nejsem si jistý']

function StepInterest({ value, onChange }: { value: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <h2 id="consult-form-title" className="mb-2 font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-medium leading-[1.1] tracking-[-0.01em] text-charcoal">
        O co máte zájem?
      </h2>
      <p className="mb-8 text-[14px] leading-[1.7] text-warm-gray">
        Vyberte vše, co vás zajímá. Lze vybrat více možností.
      </p>
      <div className="flex flex-wrap gap-2.5">
        {interestOptions.map(opt => {
          const active = value.includes(opt)
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-[14px] font-medium transition-all duration-200 ${
                active
                  ? 'border-accent bg-accent text-white'
                  : 'border-charcoal/15 bg-transparent text-warm-gray hover:border-charcoal/30 hover:text-charcoal'
              }`}
            >
              {active && <Check size={13} strokeWidth={2.5} />}
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Step 2: Volume (single select) ── */
const volumeOptions = [
  { value: '0–5', label: '0 – 5', sub: 'nemovitostí ročně' },
  { value: '5–20', label: '5 – 20', sub: 'nemovitostí ročně' },
  { value: '20–50', label: '20 – 50', sub: 'nemovitostí ročně' },
  { value: '50+', label: '50+', sub: 'nemovitostí ročně' },
]

function StepVolume({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <h2 className="mb-2 font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-medium leading-[1.1] tracking-[-0.01em] text-charcoal">
        Kolik nemovitostí ročně prodáváte?
      </h2>
      <p className="mb-8 text-[14px] leading-[1.7] text-warm-gray">
        Pomůže nám lépe přizpůsobit nabídku vašim potřebám.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {volumeOptions.map(opt => {
          const active = value === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`group flex flex-col items-start rounded-xl border p-4 text-left transition-all duration-200 ${
                active
                  ? 'border-accent bg-accent/5'
                  : 'border-charcoal/10 bg-white/60 hover:border-charcoal/20'
              }`}
            >
              <span className={`font-serif text-2xl font-medium transition-colors ${active ? 'text-accent' : 'text-charcoal'}`}>
                {opt.label}
              </span>
              <span className="mt-0.5 text-[12px] text-warm-gray">{opt.sub}</span>
              {active && (
                <span className="mt-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                  <Check size={11} className="text-white" strokeWidth={2.5} />
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Step 3: Open message ── */
function StepMessage({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <h2 className="mb-2 font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-medium leading-[1.1] tracking-[-0.01em] text-charcoal">
        Řekněte mi víc
      </h2>
      <p className="mb-8 text-[14px] leading-[1.7] text-warm-gray">
        Lokalita, termín, konkrétní nemovitost nebo jakákoliv otázka. Klidně přeskočte — není povinné.
      </p>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={5}
        placeholder="Např. Mám byt v Ostravě, chtěl bych video + foto, termín nejdřív za 2 týdny…"
        className="w-full resize-none border-b border-charcoal/15 bg-transparent py-2.5 text-[15px] text-charcoal outline-none transition-colors placeholder:text-warm-gray/30 focus:border-accent"
      />
    </div>
  )
}

/* ── Step 4: Contact details ── */
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
      <h2 className="mb-2 font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-medium leading-[1.1] tracking-[-0.01em] text-charcoal">
        Vaše kontaktní údaje
      </h2>
      <p className="mb-8 text-[14px] leading-[1.7] text-warm-gray">
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

/* ── Success state ── */
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
