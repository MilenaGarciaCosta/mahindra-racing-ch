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

    // Obtém os dados de voltas dos pilotos (usando 'voltas' como nome da tabela)
    let voltas = await voltas.findAll(); // Nome da tabela é 'voltas' em minúsculas

    if (voltas.length === 0) {
      return res.status(404).json({ error: 'Nenhum dado de voltas encontrado' });
    }

    // Calcula os pontos e organiza os pilotos de acordo com o número de voltas
    const pilotos = voltas.map(volta => ({
      piloto: volta.piloto,
      voltas: volta.voltas, // 'voltas' aqui é a quantidade de voltas do piloto
      pontos: volta.voltas * 10 // Cada volta vale 10 pontos
    }));

    // Ordena os pilotos pelos pontos, do maior para o menor
    const pilotosOrdenados = [...pilotos].sort((a, b) => b.pontos - a.pontos);

    // Encontra o piloto correspondente ao palpite do usuário
    const pilotoDoPalpite = pilotos.find(piloto => piloto.piloto === palpite);

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
      where: { status: 'finalizada' }
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

// Rota para buscar todos os pilotos e suas voltas
router.get('/pilotos', async (req, res) => {
  try {
    const voltas = await voltas.findAll({
      attributes: ['piloto', 'voltas']  // Ajuste as colunas conforme o banco
    });
    res.json({ pilotos: voltas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar pilotos' });
  }
});



export default router;




