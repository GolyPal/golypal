import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

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
 * The backdrop is always in the DOM — CSS opacity + pointer-events control
 * visibility. No AnimatePresence / mount-unmount needed, which avoids the
 * known Framer Motion portal exit-animation bug (element stays in DOM
 * after exit completes).
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
  // Scroll lock + keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft' && onPrev) onPrev()
      else if (e.key === 'ArrowRight' && onNext) onNext()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [isOpen, onClose, onPrev, onNext])

  const portalTarget = document.getElementById('root') ?? document.body

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 px-4 py-16 backdrop-blur-md sm:px-8"
      style={{
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'opacity 0.25s ease',
      }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Zavřít"
        tabIndex={isOpen ? 0 : -1}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/70 transition-colors hover:border-white/40 hover:text-white sm:right-6 sm:top-6 sm:h-12 sm:w-12"
      >
        <X size={20} />
      </button>

      {/* Content — stops backdrop click, gets scale animation on open */}
      <motion.div
        animate={isOpen ? { scale: 1, opacity: 1 } : { scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative flex max-h-full w-full max-w-6xl flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </div>,
    portalTarget,
  )
}
