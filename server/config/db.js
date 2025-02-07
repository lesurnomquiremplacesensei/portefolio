import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_PATH,
  logging: false // Désactive les logs SQL
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    // Synchronise les modèles avec la base de données
    await sequelize.sync();
    console.log('Connexion à SQLite réussie.');
  } catch (error) {
    console.error('Erreur de connexion:', error);
    process.exit(1);
  }
};

export { sequelize, connectDB };
