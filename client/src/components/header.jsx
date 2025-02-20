import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <Link to="/" className="text-2xl font-bold text-gray-800">
              LOGO
            </Link>
          </div>
          <ul className={`${isOpen ? 'block' : 'hidden'} absolute top-16 left-0 right-0 bg-white p-4 md:p-0 md:static md:flex md:space-x-8 md:block shadow-md md:shadow-none`}>
            <li className="py-2 md:py-0">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Accueil
              </Link>
            </li>
            <li className="py-2 md:py-0">
              <Link to="/a-propos" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                À propos
              </Link>
            </li>
            <li className="py-2 md:py-0">
              <Link to="/liste_project" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Projet
              </Link>
            </li>
            <li className="py-2 md:py-0">
              <Link to="/study" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Languages Study
              </Link>
            </li>
          </ul>
          
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-900 focus:outline-none">
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