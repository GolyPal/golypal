import { createContext, useContext, useState, type ReactNode } from 'react'

type Ctx = {
  isOpen: boolean
  open: () => void
  close: () => void
}

const ConsultFormContext = createContext<Ctx | null>(null)

export function ConsultFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <ConsultFormContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </ConsultFormContext.Provider>
  )
}

export function useConsultForm() {
  const ctx = useContext(ConsultFormContext)
  if (!ctx) throw new Error('useConsultForm must be used within ConsultFormProvider')
  return ctx
}
