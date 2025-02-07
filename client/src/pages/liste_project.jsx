import React from 'react';
import { Link } from 'react-router-dom';

const ListeProject = () => {
  // Exemple de données de projets
  const projets = [
    {
      id: 1,
      titre: "Projet 1",
      image: "/images/image1.png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      lien: "/projet/1"
    },
    {
      id: 2,
      titre: "Projet 2",
      image: "/images/image1.png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis felis vitae risus pulvinar tincidunt. Nam ac venenatis enim.",
      lien: "/projet/2"
    },
    {
      id: 3,
      titre: "Projet 3",
      image: "/images/image1.png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempus placerat fringilla. Duis a elit et dolor laoreet volutpat.",
      lien: "/projet/3"
    },
    {
      id: 4,
      titre: "Projet 4",
      image: "/images/image1.png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et diam eget libero egestas mattis sit amet vitae augue.",
      lien: "/projet/4"
    },
    {
      id: 5,
      titre: "Projet 5",
      image: "/images/image1.png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sodales congue tristique. Cras non pretium sem.",
      lien: "/projet/5"
    },
    {
      id: 6,
      titre: "Projet 6",
      image: "/images/image1.png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut hendrerit mauris ac porttitor accumsan. Nunc vitae pulvinar odio, quis dignissim sem.",
      lien: "/projet/6"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 relative">
          Nos Projets
          <span className="block w-24 h-1 bg-blue-500 mx-auto mt-2"></span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projets.map((projet) => (
            <div key={projet.id} className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img 
                src={projet.image} 
                alt={projet.titre}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {projet.titre}
                </h2>
                <p className="text-white text-center mb-4">
                  {projet.description}
                </p>
                <Link 
                  to={projet.lien}
                  className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
                >
                  Découvrir le projet
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListeProject;
