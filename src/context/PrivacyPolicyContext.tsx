import { createContext, useContext, useState, type ReactNode } from 'react'

type Ctx = {
  isOpen: boolean
  open: () => void
  close: () => void
}

const PrivacyPolicyContext = createContext<Ctx | null>(null)

export function PrivacyPolicyProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <PrivacyPolicyContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </PrivacyPolicyContext.Provider>
  )
}

export function usePrivacyPolicy() {
  const ctx = useContext(PrivacyPolicyContext)
  if (!ctx) throw new Error('usePrivacyPolicy must be used within PrivacyPolicyProvider')
  return ctx
}
