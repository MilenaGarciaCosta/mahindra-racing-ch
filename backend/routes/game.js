import express from 'express';
import Usuario from '../models/Usuario.js';
import Corrida from '../models/Corrida.js'; 

const router = express.Router();
// Rota para realizar o palpite e calcular a pontuação com base nas voltas
router.post('/palpite', async (req, res) => {
  const { palpite, usuarioId } = req.body;

  try {
    // Verifica se o usuário existe no banco de dados
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verifica o status da corrida para saber se está finalizada
    const corrida = await Corrida.findOne({ where: { status: 'finalizada' } });
    if (!corrida) {
      return res.json({ status: 'em andamento' });
    }

    // Obtém os dados dos pilotos e suas voltas diretamente da tabela Corrida
    const pilotos = await Corrida.findAll({
      attributes: ['piloto', 'voltas'],
    });

    if (pilotos.length === 0) {
      return res.status(404).json({ error: 'Nenhum dado de voltas encontrado' });
    }

    // Calcula os pontos e organiza os pilotos de acordo com o número de voltas
    const pilotosComPontos = pilotos.map(piloto => ({
      piloto: piloto.piloto,
      voltas: piloto.voltas,
      pontos: piloto.voltas * 10, // Cada volta vale 10 pontos
    }));

    // Ordena os pilotos pelos pontos, do maior para o menor
    const pilotosOrdenados = [...pilotosComPontos].sort((a, b) => b.pontos - a.pontos);

    // Encontra o piloto correspondente ao palpite do usuário
    const pilotoDoPalpite = pilotosComPontos.find(piloto => piloto.piloto === palpite);

    if (!pilotoDoPalpite) {
      return res.status(404).json({ error: 'Piloto não encontrado' });
    }

    // Calcula a pontuação final para o usuário com base no palpite
    let pontos = pilotoDoPalpite.pontos;

    // Pontos extras por posição (caso o usuário tenha acertado o primeiro ou segundo lugar)
    const posicaoPalpite = pilotosOrdenados.findIndex(p => p.piloto === palpite) + 1;
    if (posicaoPalpite === 1) {
      pontos += 25; // 25 pontos extras para o primeiro lugar
    } else if (posicaoPalpite === 2) {
      pontos += 5; // 5 pontos extras para o segundo lugar
    }

    // Atualiza a pontuação do usuário no banco de dados
    usuario.pontos += pontos;
    await usuario.save();

    res.json({
      status: 'finalizada',
      mensagem: `Palpite ${posicaoPalpite === 1 ? 'correto' : 'incorreto'}`,
      pontos_ganhos: pontos,
      total_pontos: usuario.pontos,
      pilotos: pilotosOrdenados,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao processar o palpite' });
  }
});

// Rota para verificar o status da corrida
router.get('/status', async (req, res) => {
  try {
    const corrida = await Corrida.findOne({
      where: { status: 'finalizada' },
    });

    if (!corrida) {
      return res.json({ status: 'em andamento' });
    }

    res.json({ status: 'finalizada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no servidor ao verificar o status da corrida' });
  }
});

// Rota para buscar todos os pilotos e suas voltas diretamente da tabela Corrida
router.get('/pilotos', async (req, res) => {
  try {
    const pilotos = await Corrida.findAll({
      attributes: ['piloto', 'voltas'],
    });
    res.json({ pilotos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar pilotos' });
  }
});

export default router;




