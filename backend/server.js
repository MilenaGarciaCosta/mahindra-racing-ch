import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';
import authRoutes from './routes/auth.js';
import gameRoutes from './routes/game.js';
import resgateRoutes from './routes/resgate.js';
import { createServer } from 'http';  // Criar servidor HTTP
import { Server } from 'socket.io';  // Importar Socket.IO

const app = express();
const httpServer = createServer(app);  // Criar servidor HTTP a partir do express
const io = new Server(httpServer, {
  cors: {
    origin: 'http://4.228.225.124:5173',  // Substitua pelo IP ou domínio do seu front-end
    methods: ["GET", "POST"]
  }
});

// Configuração do CORS para permitir o acesso do front-end
app.use(cors({
  origin: 'http://4.228.225.124:5173'  // Substitua pelo IP ou domínio do seu front-end
}));

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/usuario', resgateRoutes);

// Quando a conexão do WebSocket for estabelecida
io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  // Aqui você pode escutar eventos ou enviar dados em tempo real
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// Exemplo de função para enviar atualizações em tempo real
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


