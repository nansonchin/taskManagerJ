import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import IssuesPage from './pages/IssuesPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IssuesPage/>
  </StrictMode>,
)
