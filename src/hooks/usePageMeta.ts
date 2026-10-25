import { useEffect } from 'react'

const SITE = 'https://www.golasvisuals.com'

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  document.head.querySelector(selector)?.setAttribute(attr, value)
}

/* Per-route title, description and canonical URL. index.html carries the
   home page values; other routes swap them in while they're mounted, so
   Google and link previews don't treat every page as the home page. */
export function usePageMeta({ title, description, path }: { title: string; description: string; path: string }) {
  useEffect(() => {
    const prev = {
      title: document.title,
      description: document.head.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
      canonical: document.head.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
      ogDescription: document.head.querySelector('meta[property="og:description"]')?.getAttribute('content') ?? '',
    }
    const url = SITE + path
    document.title = title
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('link[rel="canonical"]', 'href', url)
    return () => {
      document.title = prev.title
      setMeta('meta[name="description"]', 'content', prev.description)
      setMeta('meta[property="og:title"]', 'content', prev.title)
      setMeta('meta[property="og:description"]', 'content', prev.ogDescription)
      setMeta('meta[property="og:url"]', 'content', prev.canonical)
      setMeta('link[rel="canonical"]', 'href', prev.canonical)
    }
  }, [title, description, path])
}
