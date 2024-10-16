import express from 'express';
import Usuario from '../models/Usuario.js';
import Corrida from '../models/Corrida.js'; 

const router = express.Router();

// Rota para enviar palpite (não calcula pontos imediatamente)
router.post('/palpite', async (req, res) => {
  const { palpite, usuarioId } = req.body;

  try {
    // Verifica se o usuário existe
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verifica se há uma corrida em andamento
    const corrida = await Corrida.findOne({ where: { status: 'em andamento' } });
    if (!corrida) {
      return res.status(404).json({ error: 'Nenhuma corrida em andamento' });
    }

    // O palpite será armazenado no front-end (localStorage), apenas retornamos a confirmação aqui
    res.json({ mensagem: 'Palpite registrado com sucesso! Aguarde o término da corrida.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao processar o palpite.' });
  }
});

// Rota para buscar status da corrida e dados dos pilotos
router.get('/status-corrida', async (req, res) => {
  try {
    // Busca a corrida com status 'em andamento' ou 'finalizada'
    const corrida = await Corrida.findOne({ where: { status: ['em andamento', 'finalizada'] } });
    if (!corrida) {
      return res.status(404).json({ error: 'Nenhuma corrida em andamento ou finalizada' });
    }

    // Busca todos os pilotos associados à corrida
    const pilotos = await Corrida.findAll({
      where: { corridaId: corrida.id } // Certifique-se de que 'corridaId' está correto no seu modelo
    });

    if (pilotos.length === 0) {
      return res.status(404).json({ error: 'Nenhum piloto encontrado na tabela Corridas' });
    }

    // Retorna o status da corrida e os dados dos pilotos
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
    // Busca a corrida pelo ID
    const corrida = await Corrida.findByPk(corridaId);
    if (!corrida) {
      return res.status(404).json({ error: 'Corrida não encontrada' });
    }

    // Define o status da corrida como 'finalizada'
    corrida.status = 'finalizada';
    await corrida.save();

    // Busca todos os pilotos da corrida finalizada
    const pilotos = await Corrida.findAll({ where: { corridaId } });

    if (pilotos.length === 0) {
      return res.status(404).json({ error: 'Nenhum piloto encontrado na corrida finalizada' });
    }

    // Retorna os pilotos atualizados e a mensagem de sucesso
    res.json({ mensagem: 'Corrida finalizada e pontos calculados', pilotos });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao finalizar a corrida' });
  }
});

export default router;



