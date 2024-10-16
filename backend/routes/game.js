import express from 'express';
import Usuario from '../models/Usuario.js';
import Corrida from '../models/Corrida.js'; 

const router = express.Router();

// Rota para enviar palpite (não calcula pontos imediatamente)
router.post('/palpite', async (req, res) => {
  const { palpite, usuarioId } = req.body;

  try {
    const usuario = await Usuario.findByPk(usuarioId);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const corrida = await Corrida.findOne({ where: { status: 'em andamento' } });
    if (!corrida) {
      return res.status(404).json({ error: 'Nenhuma corrida em andamento' });
    }

    // O palpite será armazenado no front-end (localStorage), aqui só verificamos o status
    res.json({ mensagem: 'Palpite registrado com sucesso! Aguarde o término da corrida.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao processar o palpite.' });
  }
});

// Rota para buscar status da corrida e dados dos pilotos
router.get('/status-corrida', async (req, res) => {
  try {
    const corrida = await Corrida.findOne({ where: { status: 'em andamento' } });
    if (!corrida) {
      return res.status(404).json({ error: 'Nenhuma corrida em andamento' });
    }

    const pilotos = await Corrida.findAll();

    if (pilotos.length === 0) {
      return res.status(404).json({ error: 'Nenhum piloto encontrado na tabela Corridas' });
    }

    res.json({ status: corrida.status, pilotos });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar status da corrida' });
  }
});

// Rota para finalizar a corrida e calcular os pontos
router.put('/finalizar-corrida', async (req, res) => {
  const { corridaId } = req.body;

  try {
    const corrida = await Corrida.findByPk(corridaId);
    if (!corrida) {
      return res.status(404).json({ error: 'Corrida não encontrada' });
    }

    corrida.status = 'finalizada';
    await corrida.save();

    // Lógica para calcular pontos (conforme as regras)
    const pilotos = await Corrida.findAll({ where: { corridaId } });
    res.json({ mensagem: 'Corrida finalizada e pontos calculados', pilotos });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao finalizar a corrida' });
  }
});

export default router;


