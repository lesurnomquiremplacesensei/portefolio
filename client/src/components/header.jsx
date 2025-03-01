import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Gestion du défilement pour changer l'apparence du header
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Fonction pour vérifier si un lien est actif
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark-800 shadow-nav py-2' : 'bg-header py-3'}`}>
      <nav className="px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary transition-all duration-300 hover:text-primary-300">
              MZE Abdoul-Hachim
            </Link>
          </div>
          
          <ul className={`${isOpen ? 'flex flex-col mobile-menu-open' : 'hidden'} absolute top-16 left-0 right-0 bg-dark-800 p-6 space-y-4 md:space-y-0 md:p-0 md:static md:flex md:flex-row md:space-x-8 md:bg-transparent shadow-lg md:shadow-none transition-all duration-300 ease-in-out`}>
            <li className="relative group">
              <Link 
                to="/" 
                className={`nav-link text-secondary group-hover:text-primary transition-all duration-200 py-2 px-3 rounded-md inline-block ${isActive('/') ? 'text-primary' : ''}`}
              >
                Accueil
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 ${isActive('/') ? 'w-full' : 'group-hover:w-full'}`}></span>
              </Link>
            </li>
            
            <li className="relative group">
              <Link 
                to="/liste_project" 
                className={`nav-link text-secondary group-hover:text-primary transition-all duration-200 py-2 px-3 rounded-md inline-block ${isActive('/liste_project') ? 'text-primary' : ''}`}
              >
                Projet
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 ${isActive('/liste_project') ? 'w-full' : 'group-hover:w-full'}`}></span>
              </Link>
            </li>
            
            <li className="relative group">
              <Link 
                to="/study" 
                className={`nav-link text-secondary group-hover:text-primary transition-all duration-200 py-2 px-3 rounded-md inline-block ${isActive('/study') ? 'text-primary' : ''}`}
              >
                Languages Study
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 ${isActive('/study') ? 'w-full' : 'group-hover:w-full'}`}></span>
              </Link>
            </li>
            
            <li className="relative group">
              <Link 
                to="/contact" 
                className={`nav-link text-secondary group-hover:text-primary transition-all duration-200 py-2 px-3 rounded-md inline-block ${isActive('/contact') ? 'text-primary' : ''}`}
              >
                Contact
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 ${isActive('/contact') ? 'w-full' : 'group-hover:w-full'}`}></span>
              </Link>
            </li>
          </ul>
          
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-secondary hover:text-primary focus:outline-none p-2 rounded-md hover:bg-dark-700 transition-all duration-200"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 