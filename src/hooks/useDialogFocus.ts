import { useEffect, useRef, type RefObject } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])'

/* Open dialogs, newest last. Only the top one reacts to Tab and Escape, so
   the privacy policy opened from inside the consult form doesn't close or
   steal focus from both at once. */
const stack: symbol[] = []

/* While a dialog is open: move focus into it, keep Tab cycling inside it,
   close it on Escape, and hand focus back to whatever opened it. */
export function useDialogFocus(
  ref: RefObject<HTMLElement | null>,
  isOpen: boolean,
  onClose: () => void,
) {
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    if (!isOpen) return
    const id = Symbol('dialog')
    stack.push(id)
    const opener = document.activeElement as HTMLElement | null
    const focusable = () =>
      Array.from(ref.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter(
        (el) => el.getClientRects().length > 0,
      )

    const el = ref.current
    if (el && !el.contains(document.activeElement)) (focusable()[0] ?? el).focus({ preventScroll: true })

    const onKey = (e: KeyboardEvent) => {
      if (stack[stack.length - 1] !== id) return
      if (e.key === 'Escape') {
        onCloseRef.current()
        return
      }
      const el = ref.current
      if (e.key !== 'Tab' || !el) return
      const items = focusable()
      if (items.length === 0) {
        e.preventDefault()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      const inside = el.contains(document.activeElement)
      if (e.shiftKey && (!inside || document.activeElement === first)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (!inside || document.activeElement === last)) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      stack.splice(stack.indexOf(id), 1)
      if (opener?.isConnected) opener.focus({ preventScroll: true })
    }
  }, [isOpen, ref])
}
