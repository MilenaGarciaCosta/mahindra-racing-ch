import express from 'express';
import Usuario from '../models/Usuario.js';
import Corrida from '../models/Corrida.js'; 

const router = express.Router();

router.post('/palpite', async (req, res) => { // calculo
  const { palpite, usuarioId } = req.body;

  try {
    const usuario = await Usuario.findByPk(usuarioId);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verifica o status da corrida
    const corrida = await Corrida.findOne({ where: { status: 'finalizada' } });

    if (!corrida) {
      return res.json({ status: 'em andamento' });
    }

    // Se a corrida foi finalizada, prossegue com o cálculo de pontos
    let pilotos = await Corrida.findAll();

    if (pilotos.length === 0) {
      return res.status(404).json({ error: 'Nenhum piloto encontrado na tabela Corridas' });
    }

    pilotos = pilotos.map((piloto) => piloto.toJSON());

    // Encontrar a maior velocidade entre os pilotos
    const maiorVelocidade = Math.max(...pilotos.map(p => p.maiorVelocidade));

    // Calcular pontos para cada piloto
    pilotos.forEach(piloto => {
      piloto.pontos = 0;

      // Pontos por ultrapassagens
      if (piloto.ultrapassagem > 0) {
        piloto.pontos += piloto.ultrapassagem * 10;
      }

      // Subtrair pontos se foi ultrapassado
      if (piloto.ultrapassado > 0) {
        piloto.pontos -= piloto.ultrapassado * 3;
      }

      // Pontos extras pela maior velocidade
      if (piloto.maiorVelocidade === maiorVelocidade) {
        piloto.pontos += 20; // Adiciona 20 pontos pela maior velocidade
      }
    });

    // Ordenar os pilotos pelos pontos (do maior para o menor)
    const pilotosOrdenados = pilotos.sort((a, b) => b.pontos - a.pontos);

    // Atribuir posições
    pilotosOrdenados.forEach((piloto, index) => {
      piloto.posicao = index + 1;
    });

    // Encontra o piloto correspondente ao palpite do usuário
    const pilotoDoPalpite = pilotosOrdenados.find(piloto => piloto.piloto === palpite);

    if (!pilotoDoPalpite) {
      return res.status(404).json({ error: 'Piloto não encontrado' });
    }

    let pontos = 0;

    // Pontos pela posição
    if (pilotoDoPalpite.posicao === 1) {
      pontos += 25; // Pontos pelo primeiro lugar
    } else if (pilotoDoPalpite.posicao === 2) {
      pontos += 5; // Pontos pelo segundo lugar
    }

    // Pontos do piloto escolhido (já calculados)
    pontos += pilotoDoPalpite.pontos;

    // Atualiza os pontos do usuário e salva
    usuario.pontos += pontos;
    await usuario.save();

    res.json({
      status: 'finalizada',
      mensagem:  `Palpite ${pilotoDoPalpite.posicao === 1 ? 'correto' : 'incorreto'}`,
      pontos_ganhos: pontos,
      total_pontos: usuario.pontos,
      pilotos: pilotosOrdenados,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao processar o palpite' });
  }
});



// Rota para buscar todos os pilotos
router.get('/pilotos', async (req, res) => {
  try {
    const pilotos = await Corrida.findAll({
      attributes: ['posicao', 'piloto', 'maiorVelocidade', 'ultrapassagem', 'ultrapassado']  // Colunas que deseja buscar
    });
    res.json({ pilotos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar pilotos' });
  }
});

export default router;




