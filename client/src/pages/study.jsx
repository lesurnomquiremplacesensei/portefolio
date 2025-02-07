import React, { useState } from 'react';
import './study.css';

const Study = () => {
  // Déclaration d'un état pour gérer les langages
  const [languages, setLanguages] = useState([
    {
      id: 1,
      name: "JavaScript",
      description: "Un langage de programmation polyvalent...",
      expandedDescription: "JavaScript est un langage de programmation..."
    }
  ]);

  return (
    <div className="study-container">
      <h1>Langages de Programmation</h1>
      
      <div className="language-grid">
        {languages.map(language => (
          <div className="language-card" key={language.id}>
            <div className="language-header">
              <div className="language-image">
                {/* L'image du langage sera ajoutée ici */}
                <img src="/placeholder.png" alt="Language icon" />
              </div>
              <h2>{language.name}</h2>
            </div>
            
            <div className="language-description">
              <p>
                {language.description}
              </p>
              <div className="show-more">
                <input type="checkbox" id={`expand${language.id}`} />
                <p className="expanded-content">
                  {language.expandedDescription}
                </p>
                <label htmlFor={`expand${language.id}`}>Voir plus</label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Study;
