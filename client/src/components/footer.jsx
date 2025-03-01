import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const socialIconsRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          
          if (entry.target === socialIconsRef.current) {
            const icons = entry.target.querySelectorAll('a');
            icons.forEach((icon, index) => {
              setTimeout(() => {
                icon.classList.add('animate-bounce-in');
              }, index * 150);
            });
          }
          
          if (entry.target === skillsRef.current) {
            const badges = entry.target.querySelectorAll('span');
            badges.forEach((badge, index) => {
              setTimeout(() => {
                badge.classList.add('animate-scale-up');
              }, index * 100);
            });
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    
    if (socialIconsRef.current) {
      observer.observe(socialIconsRef.current);
    }
    
    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-dark-800 text-secondary pt-12 pb-6 mt-16 relative overflow-hidden opacity-0 transition-opacity duration-700">
      {/* Particules décoratives */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-primary-500 animate-pulse-slow"></div>
        <div className="absolute top-3/4 left-1/3 w-6 h-6 rounded-full bg-primary-400 animate-float"></div>
        <div className="absolute top-1/2 right-1/4 w-5 h-5 rounded-full bg-primary-600 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-3 h-3 rounded-full bg-primary-300 animate-float"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo et description */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="text-2xl font-bold text-primary mb-4 transition-all duration-300 hover:text-primary-300 hover:scale-105 transform">
              MZE Abdoul-Hachim
            </Link>
            <p className="text-center md:text-left mb-4 text-gray-400">
              Développeur Web & Mobile passionné par la création d'expériences web modernes et interactives.
            </p>
            <div ref={socialIconsRef} className="flex space-x-4 mt-2">
              <a 
                href="https://github.com/abdoul-hachim" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-500 transition-all duration-300 hover:-translate-y-1 transform opacity-0"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/feed/?trk=sem-ga_campid.21228777300_asid.161774284317_crid.698137525090_kw.linkedin_d.c_tid.kwd-148086543_n.g_mt.e_geo.9194148" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-500 transition-all duration-300 hover:-translate-y-1 transform opacity-0"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a 
                href="mailto:hachimze@gmail.com" 
                className="text-gray-400 hover:text-primary-500 transition-all duration-300 hover:-translate-y-1 transform opacity-0"
                aria-label="Email"
              >
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>
          
          {/* Liens rapides */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4 text-primary-400">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-500 transition-colors duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 group-hover:w-2 transition-all duration-300"></span>
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/liste_project" className="text-gray-400 hover:text-primary-500 transition-colors duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 group-hover:w-2 transition-all duration-300"></span>
                  Projets
                </Link>
              </li>
              <li>
                <Link to="/study" className="text-gray-400 hover:text-primary-500 transition-colors duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 group-hover:w-2 transition-all duration-300"></span>
                  Languages Study
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-500 transition-colors duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 group-hover:w-2 transition-all duration-300"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Compétences */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4 text-primary-400">Compétences</h3>
            <div ref={skillsRef} className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-dark-700 text-primary-400 rounded-full text-sm hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:scale-110 opacity-0">React</span>
              <span className="px-3 py-1 bg-dark-700 text-primary-400 rounded-full text-sm hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:scale-110 opacity-0">JavaScript</span>
              <span className="px-3 py-1 bg-dark-700 text-primary-400 rounded-full text-sm hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:scale-110 opacity-0">PHP</span>
              <span className="px-3 py-1 bg-dark-700 text-primary-400 rounded-full text-sm hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:scale-110 opacity-0">Symfony</span>
              <span className="px-3 py-1 bg-dark-700 text-primary-400 rounded-full text-sm hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:scale-110 opacity-0">Node.js</span>
              <span className="px-3 py-1 bg-dark-700 text-primary-400 rounded-full text-sm hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:scale-110 opacity-0">Tailwind</span>
              <span className="px-3 py-1 bg-dark-700 text-primary-400 rounded-full text-sm hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:scale-110 opacity-0">MongoDB</span>
            </div>
          </div>
        </div>
        
        {/* Séparateur */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-6"></div>
        
        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          <p className="flex items-center justify-center gap-1">
            <span>© {currentYear} Portfolio.</span>
            <span className="flex items-center">
              Créé avec <FaHeart className="text-red-500 mx-1 animate-pulse" /> et <FaCode className="text-primary-500 mx-1" />
            </span>
          </p>
          <p className="mt-2">
            Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
