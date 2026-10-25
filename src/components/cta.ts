/* One look and one motion for every call-to-action button, taken from
   "Mám zájem spolupracovat": a soft glow in the button's own colour, and on
   hover a 2 % lift with a stronger glow; a quick press-down on tap.
   bg-cta / text-on-cta adapt to the surface (dark green with lime text on
   light sections, lime with dark text on dark ones), so the same classes
   work everywhere. */
const motion =
  'transition-[background-color,border-color,box-shadow,scale] duration-300 ease-out hover:scale-[1.02] active:scale-[0.97]'

/* Primary CTA. Size md everywhere, sm only in the navbar. */
export function ctaClass(size: 'md' | 'sm' = 'md') {
  return [
    'group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full bg-cta font-semibold tracking-wide text-on-cta',
    'shadow-[0_8px_32px_color-mix(in_srgb,var(--color-cta)_30%,transparent)] hover:bg-cta/90 hover:shadow-[0_12px_40px_color-mix(in_srgb,var(--color-cta)_45%,transparent)]',
    motion,
    size === 'md' ? 'px-8 py-4 text-sm' : 'px-6 py-2.5 text-[13px] xl:px-7',
  ].join(' ')
}

/* Secondary action (outline in the accent), same size and motion;
   1 px less padding makes up for the border */
export const ctaSecondaryClass = [
  'group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full border border-accent/50 px-8 py-[15px] text-sm font-semibold tracking-wide text-accent',
  'hover:border-accent hover:bg-accent/10',
  motion,
].join(' ')

/* The arrow nudges the way the button goes: right opens, down scrolls */
export const ctaArrowRight = 'transition-transform duration-300 ease-out group-hover:translate-x-0.5'
export const ctaArrowDown = 'transition-transform duration-300 ease-out group-hover:translate-y-0.5'
