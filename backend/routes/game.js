import express from 'express';
import Usuario from '../models/Usuario.js';
import Corrida from '../models/Corrida.js'; 

const router = express.Router();

// Rota para enviar palpite e armazená-lo sem calcular os pontos
router.post('/palpite', async (req, res) => {
  const { palpite, usuarioId } = req.body;

  try {
    const usuario = await Usuario.findByPk(usuarioId);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Simplesmente armazenar o palpite
    usuario.palpite = palpite;
    await usuario.save();

    res.json({ mensagem: 'Palpite armazenado com sucesso, aguarde a corrida finalizar.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao armazenar o palpite' });
  }
});

// Rota para verificar se a corrida foi finalizada e calcular a pontuação
router.get('/exibir-resultado/:usuarioId', async (req, res) => {
  const { usuarioId } = req.params;

  try {
    const usuario = await Usuario.findByPk(usuarioId);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Busca os dados dos pilotos da tabela Corridas
    let pilotos = await Corrida.findAll();

    // Verifica se há pilotos cadastrados
    if (pilotos.length === 0) {
      return res.status(404).json({ error: 'Nenhum piloto encontrado na tabela Corridas' });
    }

    // Converte para um array simples de objetos
    pilotos = pilotos.map(piloto => piloto.toJSON());

    // Ordena os pilotos pela maior velocidade em ordem decrescente
    const pilotosOrdenados = pilotos.sort((a, b) => b.maiorVelocidade - a.maiorVelocidade);

    // Adiciona a posição a cada piloto
    pilotosOrdenados.forEach((piloto, index) => {
      piloto.posicao = index + 1;
    });

    // Verifica se a corrida foi finalizada
    const corridaFinalizada = pilotos.some(piloto => piloto.status === 'finalizada');

    if (!corridaFinalizada) {
      return res.status(400).json({ error: 'A corrida ainda está em andamento.' });
    }

    // Encontra o piloto escolhido pelo usuário
    const pilotoEscolhido = pilotos.find(piloto => piloto.piloto === usuario.palpite);

    if (!pilotoEscolhido) {
      return res.status(404).json({ error: 'Piloto não encontrado.' });
    }

    // Inicializa os pontos do usuário com 0
    let pontos = 0;

    // Regra 1: +10 pontos por cada ultrapassagem
    pontos += pilotoEscolhido.ultrapassagem * 10;

    // Regra 2: -3 pontos por cada vez que foi ultrapassado
    pontos -= pilotoEscolhido.ultrapassado * 3;

    // Regra 3: +20 pontos se for o corredor com a maior velocidade
    const maiorVelocidade = Math.max(...pilotos.map(p => p.maiorVelocidade));
    if (pilotoEscolhido.maiorVelocidade === maiorVelocidade) {
      pontos += 20;
    }

    // Regra 4: Pontuação com base na posição
    if (pilotoEscolhido.posicao === 1) {
      pontos += 25; // Primeiro lugar
    } else if (pilotoEscolhido.posicao === 2) {
      pontos += 5; // Segundo lugar
    }

    // Atualiza os pontos do usuário
    usuario.pontos += pontos;
    await usuario.save();

    res.json({
      mensagem: `Palpite ${pilotoEscolhido.posicao === 1 ? 'correto' : 'incorreto'}`,
      pontos_ganhos: pontos,
      total_pontos: usuario.pontos,
      piloto: pilotoEscolhido,
      pilotos: pilotosOrdenados
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no servidor ao processar o palpite' });
  }
});

export default router;

// Rota para buscar todos os pilotos
router.get('/pilotos', async (req, res) => {
  try {
    const pilotos = await Corrida.findAll();
    res.json({ pilotos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar pilotos' });
  }
});





