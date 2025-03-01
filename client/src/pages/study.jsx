import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { SiJavascript, SiReact, SiHtml5, SiCss3, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiPhp, SiSymfony } from 'react-icons/si';
import { TbApi } from 'react-icons/tb';

const Study = () => {
  const [activeLanguage, setActiveLanguage] = useState(null);
  const cardsRef = useRef([]);
  const containerRef = useRef(null);

  // Effet pour l'animation des cartes lors du défilement
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  // Liste des langages et technologies
  const languages = [
    {
      id: 1,
      name: "HTML",
      icon: <SiHtml5 className="text-orange-500" />,
      description: "Langage de balisage standard pour la création de pages web.",
      expandedDescription: "HTML (HyperText Markup Language) est le langage de balisage standard utilisé pour créer des pages web. Il définit la structure et le contenu d'une page web, en utilisant divers éléments pour représenter des paragraphes, des liens, des images, etc. HTML5 est la dernière version, introduisant de nouvelles fonctionnalités comme les éléments sémantiques, l'audio et la vidéo natifs, et le canvas pour les graphiques.",
      category: "Frontend",
      level: "Avancé"
    },
    {
      id: 2,
      name: "CSS",
      icon: <SiCss3 className="text-blue-500" />,
      description: "Langage de style utilisé pour définir la présentation des documents HTML.",
      expandedDescription: "CSS (Cascading Style Sheets) est un langage de feuille de style utilisé pour décrire la présentation d'un document écrit en HTML. CSS permet de séparer le contenu de la présentation, facilitant ainsi la maintenance et l'adaptation des sites web à différents appareils. CSS3, la dernière version majeure, a introduit de nombreuses fonctionnalités comme les animations, les transitions, les dégradés et les media queries pour le responsive design.",
      category: "Frontend",
      level: "Avancé"
    },
    {
      id: 3,
      name: "JavaScript",
      icon: <SiJavascript className="text-yellow-400" />,
      description: "Langage de programmation qui permet d'implémenter des fonctionnalités complexes sur les pages web.",
      expandedDescription: "JavaScript est un langage de programmation qui permet d'implémenter des fonctionnalités complexes sur les pages web. C'est un langage essentiel pour le développement web moderne, permettant de créer des sites interactifs et dynamiques. JavaScript peut être utilisé côté client (dans le navigateur) et côté serveur (avec Node.js). Il est la base de nombreux frameworks et bibliothèques populaires comme React, Angular et Vue.js.",
      category: "Frontend/Backend",
      level: "Intermédiaire"
    },
    {
      id: 4,
      name: "React",
      icon: <SiReact className="text-blue-400" />,
      description: "Bibliothèque JavaScript pour construire des interfaces utilisateur.",
      expandedDescription: "React est une bibliothèque JavaScript open-source développée par Facebook pour construire des interfaces utilisateur. Elle permet de créer des composants réutilisables et de gérer efficacement l'état de l'application. React utilise un DOM virtuel pour optimiser les performances en minimisant les manipulations directes du DOM. Il est souvent utilisé avec d'autres bibliothèques comme Redux pour la gestion d'état et React Router pour la navigation.",
      category: "Frontend",
      level: "Intermédiaire"
    },
    {
      id: 5,
      name: "Tailwind CSS",
      icon: <SiTailwindcss className="text-teal-400" />,
      description: "Framework CSS utilitaire pour créer rapidement des designs personnalisés.",
      expandedDescription: "Tailwind CSS est un framework CSS utilitaire qui permet de construire rapidement des interfaces utilisateur personnalisées. Contrairement aux frameworks comme Bootstrap, Tailwind ne fournit pas de composants prédéfinis, mais plutôt des classes utilitaires de bas niveau qui peuvent être combinées pour créer n'importe quel design. Cette approche offre une grande flexibilité et permet de créer des designs uniques sans avoir à écrire de CSS personnalisé.",
      category: "Frontend",
      level: "Avancé"
    },
    {
      id: 6,
      name: "PHP",
      icon: <SiPhp className="text-purple-500" />,
      description: "Langage de script côté serveur conçu pour le développement web.",
      expandedDescription: "PHP est un langage de programmation côté serveur particulièrement adapté au développement web. Il peut être intégré directement dans le code HTML et est utilisé pour générer du contenu web dynamique. PHP est le langage qui alimente de nombreux CMS populaires comme WordPress, Drupal et Joomla. Il offre une grande compatibilité avec différentes bases de données et est souvent utilisé dans la pile LAMP (Linux, Apache, MySQL, PHP).",
      category: "Backend",
      level: "Intermédiaire"
    },
    {
      id: 7,
      name: "Symfony",
      icon: <SiSymfony className="text-black dark:text-white" />,
      description: "Framework PHP pour le développement web et les applications console.",
      expandedDescription: "Symfony est un framework PHP open-source pour le développement web. Il fournit un ensemble de composants réutilisables et un framework MVC (Modèle-Vue-Contrôleur) pour construire des applications web robustes et évolutives. Symfony est connu pour sa flexibilité, sa modularité et son respect des bonnes pratiques de développement. Il est utilisé par de nombreuses entreprises et projets, y compris Drupal, phpBB et eZ Publish.",
      category: "Backend",
      level: "Intermédiaire"
    },
    {
      id: 8,
      name: "Node.js",
      icon: <SiNodedotjs className="text-green-500" />,
      description: "Environnement d'exécution JavaScript côté serveur.",
      expandedDescription: "Node.js est un environnement d'exécution JavaScript côté serveur, construit sur le moteur JavaScript V8 de Chrome. Il permet d'exécuter du code JavaScript en dehors du navigateur, rendant possible le développement backend avec JavaScript. Node.js utilise un modèle d'E/S non bloquant et orienté événements, ce qui le rend léger et efficace pour les applications en temps réel et à forte intensité de données.",
      category: "Backend",
      level: "Intermédiaire"
    },
    {
      id: 9,
      name: "Express",
      icon: <SiExpress className="text-gray-600" />,
      description: "Framework web minimaliste pour Node.js.",
      expandedDescription: "Express.js est un framework web minimaliste pour Node.js qui simplifie le développement d'applications web et d'API. Il fournit un ensemble robuste de fonctionnalités pour les applications web et mobiles, comme le routage, les middlewares et la gestion des requêtes HTTP. Express est connu pour sa simplicité et sa flexibilité, permettant aux développeurs de créer rapidement des applications backend sans imposer une structure rigide.",
      category: "Backend",
      level: "Intermédiaire"
    },
    {
      id: 10,
      name: "MongoDB",
      icon: <SiMongodb className="text-green-600" />,
      description: "Base de données NoSQL orientée documents.",
      expandedDescription: "MongoDB est une base de données NoSQL orientée documents qui stocke les données dans des documents similaires à JSON appelés BSON. Contrairement aux bases de données relationnelles traditionnelles, MongoDB n'utilise pas de tables et de lignes, mais des collections et des documents. Cette structure flexible permet de stocker des données de forme variable et de s'adapter facilement aux changements. MongoDB est particulièrement adapté aux applications qui nécessitent une évolutivité horizontale et une flexibilité dans la structure des données.",
      category: "Backend",
      level: "Intermédiaire"
    },
    {
      id: 11,
      name: "API REST",
      icon: <TbApi className="text-blue-500" />,
      description: "Architecture pour la conception d'API web suivant les principes REST.",
      expandedDescription: "REST (Representational State Transfer) est un style d'architecture pour la conception d'API web. Les API RESTful utilisent les méthodes HTTP standard (GET, POST, PUT, DELETE) pour effectuer des opérations CRUD sur les ressources, qui sont identifiées par des URL. Les API REST sont sans état, ce qui signifie que chaque requête contient toutes les informations nécessaires pour être comprise par le serveur. Elles sont largement utilisées pour permettre la communication entre différents systèmes sur le web.",
      category: "Backend",
      level: "Intermédiaire"
    }
  ];

  // Fonction pour gérer le clic sur une carte
  const handleCardClick = (id) => {
    setActiveLanguage(activeLanguage === id ? null : id);
  };

  return (
    <div className="container mx-auto px-4 py-8" ref={containerRef}>
      <Helmet>
        <title>Étude des Langages | Portfolio de Développeur Web</title>
        <meta name="description" content="Découvrez les différents langages et technologies de programmation que j'utilise dans mes projets de développement web." />
      </Helmet>

      <motion.h1 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Étude des Langages de Programmation
      </motion.h1>

      <motion.p 
        className="text-lg text-center mb-12 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Explorez les différents langages et technologies que j'utilise dans mes projets de développement web. Cliquez sur une carte pour en savoir plus.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {languages.map((language, index) => (
          <motion.div
            key={language.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className={`language-card bg-card rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
              activeLanguage === language.id ? 'scale-105 shadow-glow z-10' : 'hover:shadow-md hover:translate-y-[-5px]'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => handleCardClick(language.id)}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-4">{language.icon}</div>
                <h2 className="text-2xl font-bold">{language.name}</h2>
              </div>
              
              <div className="mb-4">
                <span className="inline-block bg-primary-500 text-white text-xs px-2 py-1 rounded-full mr-2">
                  {language.category}
                </span>
                <span className="inline-block bg-secondary-500 text-white text-xs px-2 py-1 rounded-full">
                  {language.level}
                </span>
              </div>
              
              <p className="mb-4">{language.description}</p>
              
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: activeLanguage === language.id ? 'auto' : 0,
                  opacity: activeLanguage === language.id ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm">{language.expandedDescription}</p>
                </div>
              </motion.div>
              
              <button 
                className="mt-4 text-primary-500 hover:text-primary-700 text-sm font-medium flex items-center"
              >
                {activeLanguage === language.id ? 'Voir moins' : 'Voir plus'}
                <svg 
                  className={`ml-1 w-4 h-4 transition-transform duration-300 ${activeLanguage === language.id ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Study;
