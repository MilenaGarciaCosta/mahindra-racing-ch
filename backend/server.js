import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';
import authRoutes from './routes/auth.js';
import gameRoutes from './routes/game.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/game', gameRoutes);

sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

