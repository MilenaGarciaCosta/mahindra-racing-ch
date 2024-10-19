import express from 'express';
import Usuario from '../models/Usuario.js';
import Corrida from '../models/Corrida.js'; 

const router = express.Router();

router.post('/processar-palpites', async (req, res) => {
  const { usuarioId } = req.body;
  try {
    // Verifica se a corrida está finalizada
    const corrida = await Corrida.findOne({ where: { status: 'finalizada' } });

    if (!corrida) {
      return res.status(400).json({ error: 'A corrida ainda não foi finalizada.' });
    }

    // Obtém o palpite do usuário para esta corrida
    const palpite = await Palpite.findOne({ where: { corridaId: corrida.id, usuarioId } });

    if (!palpite) {
      return res.status(404).json({ mensagem: 'Nenhum palpite encontrado para o usuário.' });
    }

    // Obtém os pilotos
    let pilotos = await Corrida.findAll();

    if (pilotos.length === 0) {
      return res.status(404).json({ error: 'Nenhum piloto encontrado na tabela Corridas' });
    }

    // Converter valores para números
    pilotos = pilotos.map((piloto) => {
      const p = piloto.toJSON();
      p.maiorVelocidade = Number(p.maiorVelocidade);
      p.ultrapassagem = Number(p.ultrapassagem);
      p.ultrapassado = Number(p.ultrapassado);
      return p;
    });

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
        piloto.pontos += 20;
      }
    });

    // Ordenar os pilotos pelos pontos (do maior para o menor)
     const pilotosOrdenados = [...pilotos].sort((a, b) => b.pontos - a.pontos);

    // Processar cada palpite
    const usuario = await Usuario.findByPk(usuarioId);
    const pilotoDoPalpite = pilotos.find(piloto => piloto.piloto === palpite.palpite);

    if (!pilotoDoPalpite) {
      return res.status(404).json({ error: `Piloto ${palpite.palpite} não encontrado.` });
    }

      let pontos = 0;

      // Pontos pela posição
      if (pilotoDoPalpite.posicao === 1) {
        pontos += 25;
      } else if (pilotoDoPalpite.posicao === 2) {
        pontos += 5;
      }

      // Pontos do piloto escolhido
      pontos += pilotoDoPalpite.pontos;

      // Atualiza os pontos do usuário
      usuario.pontos += pontos;
      await usuario.save();

      // Atualiza o palpite com os pontos ganhos
      palpite.pontosGanhos = pontos;
      await palpite.save();

    res.json({
      status: 'finalizada',
      mensagem: `Palpite ${pilotoDoPalpite.posicao === 1 ? 'correto' : 'incorreto'}`,
      pontos_ganhos: pontos,
      total_pontos: usuario.pontos,
      pilotos: pilotosOrdenados,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao processar o palpite' });
  }
});


router.post('/palpite', async (req, res) => {
  const { palpite, usuarioId } = req.body;

  try {
    const usuario = await Usuario.findByPk(usuarioId);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verifica o status da corrida
    const corrida = await Corrida.findOne({ where: { status: 'não iniciada' } });

    if (!corrida) {
      return res.status(400).json({ error: 'Não foi possível fazer o palpite, corrida em andamento ou finalizada' });
    }

    // Salva o palpite do usuário
    await Palpite.create({
      palpite,
      usuarioId,
      corridaId: corrida.id,
    });

    res.json({ mensagem: 'Palpite registrado com sucesso!' });
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
    res.status(500).json({ error: 'Erro ao buscar pilotos' }); // esta dando esse erro
  }
});


export default router;




