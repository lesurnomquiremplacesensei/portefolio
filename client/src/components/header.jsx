import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <nav className="navbar">
        <div className="nav-container">
          <div>
            <Link to="/" className="logo">
              LOGO
            </Link>
          </div>
          <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
            <li>
              <Link to="/" className="nav-link">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/a-propos" className="nav-link">
                À propos
              </Link>
            </li>
            <li>
              <Link to="/liste_project" className="nav-link">
                Projet
              </Link>
            </li>
            <li>
              <Link to="/study" className="nav-link">
                Languages Study 
              </Link>
            </li>
          </ul>
          
          <div className="mobile-menu-button">
            <button onClick={toggleMenu}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 