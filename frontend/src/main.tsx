import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import PartnerLogos from "./components/footer.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <PartnerLogos/>
  </StrictMode>,
)
