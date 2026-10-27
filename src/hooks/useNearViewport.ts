import { useEffect, useState, type RefObject } from 'react'

/* True once the element comes within `margin` of the screen, and stays true.
   Videos lower on the page wait for it before getting their src, so on load
   they don't eat the bandwidth the hero reels need. */
export function useNearViewport(ref: RefObject<Element | null>, margin = '200px') {
  const [near, setNear] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || near) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true)
      },
      { rootMargin: margin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, margin, near])
  return near
}
