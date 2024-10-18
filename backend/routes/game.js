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

    // Ordena os pilotos pela velocidade
    const pilotosOrdenados = pilotos.sort((a, b) => b.maiorVelocidade - a.maiorVelocidade);
    pilotosOrdenados.forEach((piloto, index) => {
      piloto.posicao = index + 1;
    });

    const pilotoDoPalpite = pilotosOrdenados.find(piloto => piloto.piloto === palpite);

    if (!pilotoDoPalpite) {
      return res.status(404).json({ error: 'Piloto não encontrado' });
    }

    const pilotoVencedor = pilotosOrdenados[0].piloto;

    let pontos = 0;

    // Verifica se o palpite do usuário foi correto (primeiro lugar)
    if (palpite === pilotoVencedor) {
      pontos += 25;  // Pontos pelo primeiro lugar
    }
    
    // Calcula pontos adicionais com base nas regras
    pilotosOrdenados.forEach((piloto) => {
      if (piloto.ultrapassagem > 0) {
        pontos += piloto.ultrapassagem * 10;
      }
      if (piloto.ultrapassado > 0) {
        pontos -= piloto.ultrapassado * 3;  // Subtrai 3 pontos por cada vez que foi ultrapassado
      }
    });

    // Pontos extras pela maior velocidade
    const maiorVelocidade = Math.max(...pilotos.map(p => p.maiorVelocidade));
    if (pilotoDoPalpite.maiorVelocidade === maiorVelocidade) {
      pontos += 20; // Adiciona 20 pontos pela maior velocidade
    }
    
    if (palpite === pilotosOrdenados[1].piloto) {
      pontos += 5;  // Pontos pelo segundo lugar
    }

    usuario.pontos += pontos;
    await usuario.save();

    res.json({
      status: 'finalizada',
      mensagem: `Palpite ${palpite === pilotoVencedor ? 'correto' : 'incorreto'}`,
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




