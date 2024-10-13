import express from 'express';
import Usuario from '../models/Usuario.js';
import Corrida from '../models/Corrida.js'; 

const router = express.Router();

// Adicionando a rota para buscar todos os pilotos
router.get('/pilotos', async (req, res) => {
  try {
    const pilotos = await Corrida.findAll();  // Busca todos os pilotos da tabela Corrida
    res.json({ pilotos });  // Retorna os pilotos como resposta em formato JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar pilotos' });
  }
});

// Finalizar a corrida, mover os dados e limpar a corrida atual
router.post('/finalizarCorrida', async (req, res) => {
  try {
    const corridaAtual = await Corrida.findAll();

    if (corridaAtual && corridaAtual.length > 0) {
      // Finaliza a corrida (opcionalmente, você pode mover os dados para outro lugar)
      // Aqui apenas vamos limpar os dados da corrida atual
      await Corrida.destroy({ where: {}, truncate: true });  // Limpa a tabela Corrida
    }

    res.json({ mensagem: 'Corrida finalizada e dados limpos!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao finalizar a corrida' });
  }
});

// Rota para enviar palpite
router.post('/palpite', async (req, res) => {
  const { palpite, usuarioId } = req.body;

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

    // Ordena os pilotos pela posição
    const pilotosOrdenados = pilotos.sort((a, b) => a.posicao - b.posicao);

    let pontos = 0;

    // Verifica o piloto que está em 1º e 2º lugar
    const primeiroLugar = pilotosOrdenados[0];
    const segundoLugar = pilotosOrdenados[1];

    // Cálculo dos pontos baseado no primeiro e segundo lugar
    if (palpite === primeiroLugar.piloto) {
      pontos += 25;
    } else if (palpite === segundoLugar.piloto) {
      pontos += 10;
    }

    // Soma os pontos de ultrapassagem
    pilotos.forEach((piloto) => {
      if (palpite === piloto.piloto) {
        pontos += piloto.ultrapassagem * 10;
      }
    });

    // Identifica o piloto com a maior velocidade e soma 20 pontos
    const maiorVelocidadePiloto = pilotos.reduce((max, piloto) => piloto.maiorVelocidade > max.maiorVelocidade ? piloto : max, pilotos[0]);
    if (palpite === maiorVelocidadePiloto.piloto) {
      pontos += 20;
    }

    // Atualiza os pontos do usuário
    usuario.pontos += pontos;
    await usuario.save();

    res.json({
      mensagem: `Palpite ${palpite === primeiroLugar.piloto || palpite === segundoLugar.piloto ? 'correto' : 'incorreto'}`,
      pontos_ganhos: pontos,
      total_pontos: usuario.pontos,
      pilotos: pilotosOrdenados
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no servidor ao processar o palpite' });
  }
});

export default router;
