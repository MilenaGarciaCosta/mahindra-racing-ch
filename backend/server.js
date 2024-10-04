// backend/server.js

import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';
import authRoutes from './routes/auth.js';
import gameRoutes from './routes/game.js';
import resgateRoutes from './routes/resgate.js'; // Import the resgate route

const app = express();

// Configuração do CORS para permitir o acesso do front-end
app.use(cors({
  origin: 'http://http://4.228.225.124:5173' // Substitua pelo IP ou domínio do seu front-end
}));

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/usuario', resgateRoutes); // Use the resgate route

sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
