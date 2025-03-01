import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ListeProject from './pages/liste_project.jsx'
import AboutPage from './pages/a-propos.jsx'
import ContactPage from './pages/contact.jsx'
import Study from './pages/study.jsx'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <Header />
        <div className="pt-20 min-h-screen"> {/* Ajout d'un padding-top de 5rem (20 * 0.25rem) et hauteur minimale */}
          <Routes>
            <Route path="/" element={<AboutPage />} />
            <Route path="/liste_project" element={<ListeProject />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/study" element={<Study />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </HelmetProvider>
  </React.StrictMode>,
)
