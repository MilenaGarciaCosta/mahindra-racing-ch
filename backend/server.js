import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';
import authRoutes from './routes/auth.js';
import gameRoutes from './routes/game.js';
import resgateRoutes from './routes/resgate.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://4.228.225.124:5173',  // Substitua pelo IP ou domínio do seu front-end
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: 'http://4.228.225.124:5173'
}));

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/usuario', resgateRoutes);

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

const enviarAtualizacaoCorrida = (dadosDaCorrida) => {
  io.emit('atualizacaoCorrida', dadosDaCorrida);  // Envia os dados para todos os clientes conectados
};

sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export { enviarAtualizacaoCorrida };


