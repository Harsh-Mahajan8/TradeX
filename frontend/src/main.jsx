import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import HomePage from './landing-page/Home/HomePage'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>
      <HomePage />
    </div>
  </StrictMode>,
)
