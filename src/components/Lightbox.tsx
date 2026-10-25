import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useDialogFocus } from '../hooks/useDialogFocus'

interface LightboxProps {
  isOpen: boolean
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
  children: ReactNode
}

/**
 * Full-screen lightbox rendered via React Portal into div#root so it always
 * sits above Framer Motion animated sections (stacking contexts).
 *
 * Mounted only while open (plus the fade-out), so closed lightboxes don't
 * load images, play videos or leave invisible buttons in the Tab order.
 * The backdrop fades in via @starting-style and out via opacity; no
 * AnimatePresence, which avoids the known Framer Motion portal exit bug
 * (element stays in DOM after exit completes).
 *
 * Framer Motion is used only for the content scale-in.
 */
export default function Lightbox({
  isOpen,
  onClose,
  onPrev,
  onNext,
  children,
}: LightboxProps) {
  const [mounted, setMounted] = useState(isOpen)
  const dialogRef = useRef<HTMLDivElement>(null)
  if (isOpen && !mounted) setMounted(true)

  // Keep it in the DOM until the fade-out has finished
  useEffect(() => {
    if (isOpen || !mounted) return
    const t = window.setTimeout(() => setMounted(false), 250)
    return () => window.clearTimeout(t)
  }, [isOpen, mounted])

  useDialogFocus(dialogRef, isOpen, onClose)

  // Scroll lock + arrow key navigation
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && onPrev) onPrev()
      else if (e.key === 'ArrowRight' && onNext) onNext()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [isOpen, onPrev, onNext])

  if (!mounted) return null

  const portalTarget = document.getElementById('root') ?? document.body

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 px-4 py-16 backdrop-blur-md transition-opacity duration-250 ease-out starting:opacity-0 sm:px-8 ${
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Zavřít"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/70 transition-colors hover:border-white/40 hover:text-white sm:right-6 sm:top-6 sm:h-12 sm:w-12"
      >
        <X size={20} />
      </button>

      {/* Content, stops backdrop click, gets scale animation on open */}
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={isOpen ? { scale: 1, opacity: 1 } : { scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="relative flex max-h-full w-full max-w-6xl flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </div>,
    portalTarget,
  )
}
