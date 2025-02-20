import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ListeProject from './pages/liste_project.jsx'
import Header from './components/header.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Header />
      <div className="pt-20"> {/* Ajout d'un padding-top de 5rem (20 * 0.25rem) */}
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/liste_project" element={<ListeProject />} />
        </Routes>
      </div>
    </Router>
  </React.StrictMode>,
)
