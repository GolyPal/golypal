import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useConsultForm } from '../context/ConsultFormContext'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqewpkvg'

const interestOptions = [
  'AI vizualizace',
  'Video',
  'Foto',
  'Kompletní balíček',
  'Nejsem si jistý',
]

const volumeOptions = ['0–5', '5–20', '20–50', '50+']

type FormState = {
  name: string
  phone: string
  email: string
  company: string
  interest: string
  volume: string
  message: string
}

const initialState: FormState = {
  name: '',
  phone: '',
  email: '',
  company: '',
  interest: '',
  volume: '',
  message: '',
}

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function ConsultFormModal() {
  const { isOpen, close } = useConsultForm()
  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const firstFieldRef = useRef<HTMLInputElement | null>(null)

  // Lock body scroll when open
  useEffect(() => {
    if (!isOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [isOpen])

  // Close on escape
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  // Focus first field when opening
  useEffect(() => {
    if (isOpen && status === 'idle') {
      const t = window.setTimeout(() => firstFieldRef.current?.focus(), 250)
      return () => window.clearTimeout(t)
    }
  }, [isOpen, status])

  // Reset form when closed (after delay so user doesn't see flash)
  useEffect(() => {
    if (isOpen) return
    const t = window.setTimeout(() => {
      setForm(initialState)
      setStatus('idle')
      setErrorMsg('')
    }, 400)
    return () => window.clearTimeout(t)
  }, [isOpen])

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const validate = (): string | null => {
    if (!form.name.trim()) return 'Zadejte prosím jméno.'
    if (!form.phone.trim()) return 'Zadejte prosím telefon.'
    if (!form.email.trim()) return 'Zadejte prosím e-mail.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      return 'E-mail nemá správný formát.'
    if (!form.interest) return 'Vyberte prosím, o co máte zájem.'
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const err = validate()
    if (err) {
      setErrorMsg(err)
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
          'Jméno': form.name,
          'Telefon': form.phone,
          'E-mail': form.email,
          'Firma': form.company,
          'Zájem': form.interest,
          'Počet nemovitostí ročně': form.volume,
          'Zpráva': form.message,
        }),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        const data = await res.json().catch(() => null)
        setErrorMsg(
          data?.errors?.[0]?.message ||
            'Odeslání se nepodařilo. Zkuste to prosím znovu nebo zavolejte.',
        )
        setStatus('error')
      }
    } catch {
      setErrorMsg('Zkontrolujte připojení k internetu a zkuste to znovu.')
      setStatus('error')
    }
  }

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
            className="fixed inset-0 z-[101] flex items-start justify-center overflow-y-auto px-4 py-6 sm:py-12"
          >
            <div className="relative w-full max-w-[640px] bg-cream shadow-2xl">
              {/* Close button */}
              <button
                type="button"
                onClick={close}
                aria-label="Zavřít"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center text-charcoal/50 transition-colors hover:text-charcoal"
              >
                <X size={20} />
              </button>

              {status === 'success' ? (
                <SuccessState onClose={close} />
              ) : (
                <form onSubmit={handleSubmit} className="px-6 py-12 sm:px-12 sm:py-14">
                  {/* Header */}
                  <div className="mb-10 text-center">
                    <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-accent">
                      Konzultace zdarma
                    </p>
                    <h2
                      id="consult-form-title"
                      className="font-serif text-[clamp(1.6rem,3.5vw,2.2rem)] font-medium leading-[1.1] tracking-[-0.01em] text-charcoal"
                    >
                      Pojďme <em className="text-accent">probrat</em> vaši nemovitost
                    </h2>
                    <p className="mx-auto mt-4 max-w-md text-[14px] leading-[1.7] text-warm-gray">
                      Vyplňte formulář a&nbsp;já se vám ozvu do 24&nbsp;hodin.
                      Konzultace je nezávazná a&nbsp;zdarma.
                    </p>
                  </div>

                  {/* Fields */}
                  <div className="space-y-6">
                    <Field label="Jméno a příjmení" required>
                      <input
                        ref={firstFieldRef}
                        type="text"
                        value={form.name}
                        onChange={e => update('name', e.target.value)}
                        autoComplete="name"
                        className={inputClass}
                      />
                    </Field>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field label="Telefon" required>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={e => update('phone', e.target.value)}
                          autoComplete="tel"
                          placeholder="+420 737 000 000"
                          className={inputClass}
                        />
                      </Field>
                      <Field label="E-mail" required>
                        <input
                          type="email"
                          value={form.email}
                          onChange={e => update('email', e.target.value)}
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
                        onChange={e => update('company', e.target.value)}
                        autoComplete="organization"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="O co máte zájem?" required>
                      <ChipGroup
                        options={interestOptions}
                        value={form.interest}
                        onChange={v => update('interest', v)}
                      />
                    </Field>

                    <Field label="Kolik nemovitostí ročně prodáváte?">
                      <ChipGroup
                        options={volumeOptions}
                        value={form.volume}
                        onChange={v => update('volume', v)}
                      />
                    </Field>

                    <Field label="Krátká zpráva (lokalita, termín, poznámka)">
                      <textarea
                        value={form.message}
                        onChange={e => update('message', e.target.value)}
                        rows={4}
                        className={`${inputClass} resize-none`}
                      />
                    </Field>
                  </div>

                  {/* Error */}
                  {status === 'error' && errorMsg && (
                    <p className="mt-6 border-l-2 border-red-500 bg-red-50 px-4 py-3 text-[13px] leading-[1.5] text-red-700">
                      {errorMsg}
                    </p>
                  )}

                  {/* Submit */}
                  <div className="mt-10">
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="group flex w-full items-center justify-center gap-3 rounded-full bg-charcoal px-10 py-4 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[280px]"
                    >
                      {status === 'sending' ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Odesílám…
                        </>
                      ) : (
                        <>
                          Odeslat poptávku
                          <ArrowRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </>
                      )}
                    </button>
                    <p className="mt-4 text-[12px] text-warm-gray/70">
                      Odpovídám do 24&nbsp;hodin. Bez závazků, bez poplatků.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

const inputClass =
  'w-full border-b border-charcoal/15 bg-transparent py-2.5 text-[15px] text-charcoal outline-none transition-colors placeholder:text-warm-gray/40 focus:border-accent'

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-warm-gray">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </span>
      {children}
    </label>
  )
}

function ChipGroup({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => {
        const active = value === opt
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-200 ${
              active
                ? 'border-accent bg-accent text-white'
                : 'border-charcoal/15 bg-transparent text-warm-gray hover:border-charcoal/30 hover:text-charcoal'
            }`}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <div className="px-6 py-16 text-center sm:px-12 sm:py-20">
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
        <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-accent">
          Odesláno
        </p>
        <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-medium leading-[1.15] tracking-[-0.01em] text-charcoal">
          Díky, ozvu se <em className="text-accent">do 24&nbsp;hodin</em>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[14px] leading-[1.7] text-warm-gray">
          Vaši poptávku jsem dostal. Mezitím si klidně pusťte moje poslední
          videa nebo se podívejte na reference.
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
