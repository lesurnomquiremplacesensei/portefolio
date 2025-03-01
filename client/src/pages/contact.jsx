import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import emailjs from 'emailjs-com';

const ContactPage = () => {
  // Initialisation d'EmailJS
  useEffect(() => {
    // Vous pouvez initialiser EmailJS ici si nécessaire
    // emailjs.init("votre_user_id");
    
    /* 
    Exemple de modèle HTML pour EmailJS qui préserve le formatage exact du message :
    
    <!DOCTYPE html>
    <html>
    <head>
      <title>Nouveau message de {{from_name}}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
        .header { background-color: #1d4ed8; color: white; padding: 10px 20px; border-radius: 5px 5px 0 0; margin-top: 0; }
        .content { padding: 20px; }
        .message { white-space: pre-wrap; font-family: monospace; background-color: #f9f9f9; padding: 15px; border-radius: 5px; }
        .footer { font-size: 12px; color: #777; border-top: 1px solid #ddd; padding-top: 10px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2 class="header">Nouveau message de {{from_name}}</h2>
        <div class="content">
          <p><strong>De :</strong> {{from_email}}</p>
          <p><strong>Message :</strong></p>
          <pre class="message">{{message}}</pre>
        </div>
        <div class="footer">
          <p>Ce message a été envoyé depuis le formulaire de contact de votre portfolio.</p>
        </div>
      </div>
    </body>
    </html>
    */
  }, []);

  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef(null);
  const emailInputRef = useRef(null);
  const messageInputRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Fonction pour prétraiter le message avant l'envoi
  const prepareMessageForEmail = (message) => {
    // Convertit les sauts de ligne en balises HTML
    const htmlMessage = message.replace(/\n/g, '<br />');
    
    // Détecte et transforme les URLs en liens cliquables
    const messageWithLinks = htmlMessage.replace(
      /(https?:\/\/[^\s]+)/g, 
      '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: #1d4ed8; text-decoration: underline;">$1</a>'
    );
    
    return messageWithLinks;
  };

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

  // Animation des champs du formulaire au chargement
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleFormIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    };

    const formObserver = new IntersectionObserver(handleFormIntersect, observerOptions);

    if (formRef.current) {
      formObserver.observe(formRef.current);
    }

    return () => {
      formObserver.disconnect();
    };
  }, []);

  const validateForm = () => {
    const errors = {};
    
    // Validation de l'email
    if (!formData.email) {
      errors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "L'email n'est pas valide";
    }
    
    // Validation du message
    if (!formData.message) {
      errors.message = "Le message est requis";
    } else if (formData.message.length < 10) {
      errors.message = "Le message doit contenir au moins 10 caractères";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Réinitialiser l'erreur pour ce champ
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Envoi du formulaire avec EmailJS
        await emailjs.send(
          'service_3pr2c3s',  // Remplacez par votre Service ID (trouvé dans Email Services)
          'template_nriqzwh', // Remplacez par votre Template ID (trouvé dans Email Templates)
          {
            from_name: formData.email, // Nom de l'expéditeur (l'email dans ce cas)
            from_email: formData.email, // Email de l'expéditeur
            message: formData.message, // Le message exactement comme saisi
            // Pas de formatage HTML supplémentaire pour garantir que le message est transmis tel quel
          },
          'fSmYrhfF6wl7uarp7' // Remplacez par votre Public Key (trouvée dans Account > API Keys)
        );
        
        // Réinitialiser le formulaire après succès
        setFormData({ email: '', message: '' });
        setSubmitStatus('success');
        
        // Réinitialiser le statut après 5 secondes
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } catch (error) {
        console.error('Erreur lors de l\'envoi du formulaire:', error);
        setSubmitStatus('error');
        
        // Réinitialiser le statut après 5 secondes
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 overflow-hidden">
      <Helmet>
        <title>Contact | Portfolio de Développeur Web</title>
        <meta name="description" content="Contactez-moi pour discuter de vos projets de développement web ou pour toute autre question." />
      </Helmet>

      <motion.h1 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Contactez-moi
      </motion.h1>

      <div className="max-w-3xl mx-auto">
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-lg mb-4">
            Vous avez un projet en tête ou une question ? N'hésitez pas à me contacter via le formulaire ci-dessous.
          </p>
          <div className="flex items-center justify-center mb-6">
            <FaEnvelope className="text-primary-500 text-xl mr-2" />
            <span className="text-lg">Je vous répondrai dans les plus brefs délais.</span>
          </div>
        </motion.div>

        <motion.div 
          ref={formRef}
          className="bg-card rounded-lg shadow-lg p-8 relative overflow-hidden animate-on-scroll"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${-mousePosition.x * 2}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Effet de particules en arrière-plan */}
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-primary-500"></div>
            <div className="absolute top-3/4 left-1/3 w-6 h-6 rounded-full bg-primary-400"></div>
            <div className="absolute top-1/2 right-1/4 w-5 h-5 rounded-full bg-primary-600"></div>
            <div className="absolute bottom-1/4 right-1/3 w-3 h-3 rounded-full bg-primary-300"></div>
          </div>

          {/* Formulaire de contact */}
          <form onSubmit={handleSubmit} className="relative z-10">
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Votre email
              </label>
              <div className="relative">
                <input
                  ref={emailInputRef}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formErrors.email 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500'
                  } bg-white dark:bg-gray-800 transition-all duration-300 focus:outline-none focus:ring-2`}
                  placeholder="exemple@email.com"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaEnvelope className={`${formErrors.email ? 'text-red-500' : 'text-gray-400'}`} />
                </div>
              </div>
              {formErrors.email && (
                <p className="mt-2 text-sm text-red-500">{formErrors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Votre message
              </label>
              <textarea
                ref={messageInputRef}
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className={`w-full px-4 py-3 rounded-lg border ${
                  formErrors.message 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500'
                } bg-white dark:bg-gray-800 transition-all duration-300 focus:outline-none focus:ring-2`}
                placeholder="Décrivez votre projet ou posez votre question ici..."
              ></textarea>
              {formErrors.message && (
                <p className="mt-2 text-sm text-red-500">{formErrors.message}</p>
              )}
            </div>

            <div className="text-center">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary px-8 py-3 text-lg relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer <FaPaperPlane className="ml-2 group-hover:animate-bounce" />
                    </>
                  )}
                </span>
              </motion.button>
            </div>

            {/* Message de statut */}
            {submitStatus === 'success' && (
              <motion.div 
                className="mt-6 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <p className="text-center">Votre message a été envoyé avec succès ! Je vous répondrai dès que possible.</p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div 
                className="mt-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <p className="text-center">Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer plus tard.</p>
              </motion.div>
            )}
          </form>
        </motion.div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4">Autres moyens de me contacter</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <a 
              href="https://github.com/abdoul-hachim" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-card shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-gray-700 dark:text-gray-300">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/feed/?trk=sem-ga_campid.21228777300_asid.161774284317_crid.698137525090_kw.linkedin_d.c_tid.kwd-148086543_n.g_mt.e_geo.9194148" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-card shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-gray-700 dark:text-gray-300">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a 
              href="mailto:hachimze@gmail.com" 
              className="flex items-center justify-center w-12 h-12 rounded-full bg-card shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage; 