import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCode, FaServer, FaDatabase, FaTools } from 'react-icons/fa';
import { SiJavascript, SiReact, SiHtml5, SiCss3, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiPhp, SiSymfony } from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const AboutPage = () => {
  const timelineRef = useRef(null);
  const experienceRefs = useRef([]);
  const progressBarsRef = useRef([]);
  const introRef = useRef(null);
  const skillsRef = useRef(null);
  const profileImageRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Effet de parallaxe pour suivre la souris
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    experienceRefs.current = experienceRefs.current.slice(0, 4);
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };

    // Observer pour les éléments de la timeline
    const handleExperienceIntersect = (entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Ajouter différentes animations selon la position
          const element = entry.target;
          element.classList.add('animate-fade-in');
          
          // Ajouter des animations différentes selon l'index
          if (index % 2 === 0) {
            element.classList.add('animate-flip-in');
          } else {
            element.classList.add('animate-rotate-in');
          }
          
          observer.unobserve(entry.target);
        }
      });
    };

    // Observer pour les barres de progression
    const handleProgressBarIntersect = (entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const progressFill = progressBar.querySelector('.progress-bar-fill');
          if (progressFill) {
            // Ajouter un délai progressif pour chaque barre
            setTimeout(() => {
              progressFill.classList.add('animate');
              progressFill.style.transition = `transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`;
            }, index * 100);
          }
          observer.unobserve(progressBar);
        }
      });
    };

    // Observer pour les sections
    const handleSectionIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-blur-in');
          
          // Animation spéciale pour les cartes de compétences
          if (entry.target.classList.contains('skills-section')) {
            const skillCards = entry.target.querySelectorAll('.skill-card');
            skillCards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-scale-up');
                card.style.animationDelay = `${index * 0.15}s`;
              }, 300);
            });
          }
          
          observer.unobserve(entry.target);
        }
      });
    };

    // Observer pour l'image de profil
    const handleProfileImageIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-float');
          observer.unobserve(entry.target);
        }
      });
    };

    const experienceObserver = new IntersectionObserver(handleExperienceIntersect, observerOptions);
    const progressBarObserver = new IntersectionObserver(handleProgressBarIntersect, observerOptions);
    const sectionObserver = new IntersectionObserver(handleSectionIntersect, observerOptions);
    const profileImageObserver = new IntersectionObserver(handleProfileImageIntersect, observerOptions);

    // Observer la timeline
    if (timelineRef.current) {
      timelineRef.current.classList.add('timeline-line');
      sectionObserver.observe(timelineRef.current);
    }

    // Observer chaque expérience
    experienceRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.classList.add('timeline-item');
        experienceObserver.observe(ref);
      }
    });

    // Observer les barres de progression
    progressBarsRef.current.forEach((ref) => {
      if (ref) {
        progressBarObserver.observe(ref);
      }
    });

    // Observer l'intro et les compétences
    if (introRef.current) {
      introRef.current.classList.add('animate-on-scroll');
      sectionObserver.observe(introRef.current);
    }

    if (skillsRef.current) {
      skillsRef.current.classList.add('animate-on-scroll', 'skills-section');
      sectionObserver.observe(skillsRef.current);
    }

    // Observer l'image de profil
    if (profileImageRef.current) {
      profileImageObserver.observe(profileImageRef.current);
    }

    return () => {
      experienceObserver.disconnect();
      progressBarObserver.disconnect();
      sectionObserver.disconnect();
      profileImageObserver.disconnect();
    };
  }, []);

  const frontendSkills = [
    { name: 'HTML', icon: <SiHtml5 className="text-orange-500" />, percentage: 90 },
    { name: 'CSS', icon: <SiCss3 className="text-blue-500" />, percentage: 85 },
    { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" />, percentage: 80 },
    { name: 'React', icon: <SiReact className="text-blue-400" />, percentage: 75 },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-teal-400" />, percentage: 85 },
  ];

  const backendSkills = [
    { name: 'PHP', icon: <SiPhp className="text-purple-500" />, percentage: 80 },
    { name: 'Symfony', icon: <SiSymfony className="text-black dark:text-white" />, percentage: 75 },
    { name: 'Node.js', icon: <SiNodedotjs className="text-green-500" />, percentage: 70 },
    { name: 'Express', icon: <SiExpress className="text-gray-600" />, percentage: 65 },
    { name: 'MongoDB', icon: <SiMongodb className="text-green-600" />, percentage: 65 },
    { name: 'API REST', icon: <TbApi className="text-blue-500" />, percentage: 70 },
  ];

  return (
    <div className="container mx-auto px-4 py-8 overflow-hidden">
      <Helmet>
        <title>Accueil | Portfolio de Développeur Web</title>
        <meta name="description" content="Bienvenue sur mon portfolio de développeur web. Découvrez mon parcours, mes compétences et mes projets en développement web et mobile." />
      </Helmet>

      <motion.h1 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Bienvenue sur mon Portfolio
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="md:col-span-1 flex justify-center">
          <motion.div 
            ref={profileImageRef} 
            className="profile-image-container rounded-full overflow-hidden border-4 border-primary-500 shadow-lg"
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <img
              src="/images/pp.JPG"
              alt="Photo de profil"
              className="w-64 h-64 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/256x256?text=Profile';
              }}
            />
          </motion.div>
        </div>
        <motion.div 
          ref={introRef} 
          className="md:col-span-2"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-2xl font-bold mb-4 text-primary-500">Développeur Web & Mobile</h2>
          <p className="mb-4 text-lg">
            Actuellement en formation de Développeur Fullstack, je me spécialise dans la création d'applications web complètes, de la conception de l'interface utilisateur avec React à la gestion des bases de données et des API avec PHP/Symfony et Node.js.
          </p>
          <p className="mb-4">
            Passionné par les nouvelles technologies et l'innovation, je m'efforce de créer des expériences utilisateur intuitives et esthétiques tout en garantissant des performances optimales et une sécurité robuste.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            <Link to="/projets" className="btn btn-primary hover:animate-pulse-slow">Voir mes projets</Link>
            <Link to="/contact" className="btn btn-accent hover:animate-pulse-slow">Me contacter</Link>
            <a 
              href="/cv.pdf" 
              download="MZE_Abdoul-Hachim_CV.pdf" 
              className="btn btn-secondary flex items-center gap-2 hover:animate-pulse-slow"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Télécharger mon CV
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Expériences Professionnelles</h2>
        
        <div className="relative">
          <div ref={timelineRef} className="absolute left-1/2 transform -translate-x-1/2 h-full"></div>
          
          <div className="grid grid-cols-1 gap-8">
            <div 
              ref={(el) => (experienceRefs.current[0] = el)} 
              className="relative"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="timeline-item-number bg-primary-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold z-10 hover:scale-125 hover:shadow-glow transition-all duration-300 cursor-pointer">
                  1
                </div>
              </div>
              <div className="timeline-item-card bg-card rounded-lg shadow-lg p-6 max-w-2xl mx-auto relative overflow-hidden">
                <div className="flex items-center mb-4 relative z-10">
                  <FaGraduationCap className="text-primary-500 text-2xl mr-3" />
                  <h3 className="text-xl font-bold">Formation Développeur Fullstack</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-2 relative z-10">2024 - Présent</p>
                <p className="relative z-10">
                  Formation intensive aux technologies de développement web fullstack, incluant PHP, Symfony, JavaScript, React, Node.js et les bases de données relationnelles et non-relationnelles.
                </p>
              </div>
            </div>
            
            <div 
              ref={(el) => (experienceRefs.current[1] = el)} 
              className="relative"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="timeline-item-number bg-primary-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold z-10 hover:scale-125 hover:shadow-glow transition-all duration-300 cursor-pointer">
                  2
                </div>
              </div>
              <div className="timeline-item-card bg-card rounded-lg shadow-lg p-6 max-w-2xl mx-auto relative overflow-hidden">
                <div className="flex items-center mb-4 relative z-10">
                  <FaBriefcase className="text-primary-500 text-2xl mr-3" />
                  <h3 className="text-xl font-bold">Développeur Front-end Freelance</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-2 relative z-10">2023 - Présent</p>
                <p className="relative z-10">
                  Création de sites web et d'interfaces utilisateur pour divers clients, en utilisant principalement React, Tailwind CSS et d'autres technologies modernes du front-end.
                </p>
              </div>
            </div>
            
            <div 
              ref={(el) => (experienceRefs.current[2] = el)} 
              className="relative"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="timeline-item-number bg-primary-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold z-10 hover:scale-125 hover:shadow-glow transition-all duration-300 cursor-pointer">
                  3
                </div>
              </div>
              <div className="timeline-item-card bg-card rounded-lg shadow-lg p-6 max-w-2xl mx-auto relative overflow-hidden">
                <div className="flex items-center mb-4 relative z-10">
                  <FaGraduationCap className="text-primary-500 text-2xl mr-3" />
                  <h3 className="text-xl font-bold">Formation Développeur Web</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-2 relative z-10">2022 - 2023</p>
                <p className="relative z-10">
                  Formation aux fondamentaux du développement web, incluant HTML, CSS, JavaScript, et une introduction aux frameworks modernes.
                </p>
              </div>
            </div>
            
            <div 
              ref={(el) => (experienceRefs.current[3] = el)} 
              className="relative"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="timeline-item-number bg-primary-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold z-10 hover:scale-125 hover:shadow-glow transition-all duration-300 cursor-pointer">
                  4
                </div>
              </div>
              <div className="timeline-item-card bg-card rounded-lg shadow-lg p-6 max-w-2xl mx-auto relative overflow-hidden">
                <div className="flex items-center mb-4 relative z-10">
                  <FaBriefcase className="text-primary-500 text-2xl mr-3" />
                  <h3 className="text-xl font-bold">Stage en Développement Web</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-2 relative z-10">2022</p>
                <p className="relative z-10">
                  Stage de trois mois dans une agence web, travaillant sur des projets clients et apprenant les bonnes pratiques du développement web professionnel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        ref={skillsRef} 
        className="mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Compétences</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <FaCode className="text-primary-500 text-2xl mr-3" />
              <h3 className="text-2xl font-bold">Front-end</h3>
            </div>
            
            <div className="space-y-6">
              {frontendSkills.map((skill, index) => (
                <div 
                  key={index} 
                  className="skill-card bg-card rounded-lg p-4 shadow-md hover:shadow-glow transition-all duration-300"
                  style={{
                    transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg)`,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div className="flex items-center mb-2">
                    <div className="text-2xl mr-2">{skill.icon}</div>
                    <span className="font-medium">{skill.name}</span>
                    <span className="ml-auto">{skill.percentage}%</span>
                  </div>
                  <div 
                    ref={(el) => (progressBarsRef.current.push(el))} 
                    className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 progress-bar"
                  >
                    <div 
                      className="bg-primary-500 h-2.5 rounded-full progress-bar-fill" 
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-6">
              <FaServer className="text-primary-500 text-2xl mr-3" />
              <h3 className="text-2xl font-bold">Back-end</h3>
            </div>
            
            <div className="space-y-6">
              {backendSkills.map((skill, index) => (
                <div 
                  key={index} 
                  className="skill-card bg-card rounded-lg p-4 shadow-md hover:shadow-glow transition-all duration-300"
                  style={{
                    transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg)`,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div className="flex items-center mb-2">
                    <div className="text-2xl mr-2">{skill.icon}</div>
                    <span className="font-medium">{skill.name}</span>
                    <span className="ml-auto">{skill.percentage}%</span>
                  </div>
                  <div 
                    ref={(el) => (progressBarsRef.current.push(el))} 
                    className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 progress-bar"
                  >
                    <div 
                      className="bg-primary-500 h-2.5 rounded-full progress-bar-fill" 
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-6">Intéressé par mon profil ?</h2>
        <p className="mb-8 max-w-2xl mx-auto">
          N'hésitez pas à consulter mes projets ou à me contacter pour discuter de vos besoins en développement web.
        </p>
        <div className="flex justify-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/projets" className="btn btn-primary">
              Voir mes projets
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/contact" className="btn btn-accent">
              Me contacter
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage; 