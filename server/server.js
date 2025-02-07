import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Route test
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend connecté avec succès!' });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
}); 