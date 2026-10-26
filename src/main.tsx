import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Analytics } from '@vercel/analytics/react'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* Vercel Web Analytics: no cookies, so no consent banner needed */}
    <Analytics />
  </StrictMode>,
)
