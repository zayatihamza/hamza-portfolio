import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PortfolioOS from './PortfolioOS.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PortfolioOS />
  </StrictMode>,
)
