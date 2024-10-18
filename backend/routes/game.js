import express from 'express';
import Usuario from '../models/Usuario.js';
import Corrida from '../models/Corrida.js'; 

const router = express.Router();

/*router.post('/palpite', async (req, res) => { // aceitar palpites apenas quando o status esta como "nao iniciada"
  const { palpite, usuarioId } = req.body;

  try {
    const usuario = await Usuario.findByPk(usuarioId);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verifica o status da corrida
    const corrida = await Corrida.findOne({ where: { status: 'finalizada' } });

    if (!corrida) {
      return res.json({ status: 'em andamento' }); //quando estiver com esse status deve aparecer um aviso "corrida em andamento não é possivel fazer palpites"
    }

    // Se a corrida foi finalizada, prossegue com o cálculo de pontos
    let pilotos = await Corrida.findAll();

    if (pilotos.length === 0) {
      return res.status(404).json({ error: 'Nenhum piloto encontrado na tabela Corridas' });
    }

    pilotos = pilotos.map((piloto) => piloto.toJSON());

    // Ordena os pilotos pela velocidade
    const pilotosOrdenados = pilotos.sort((a, b) => b.velocidade - a.velocidade);
    pilotosOrdenados.forEach((piloto, index) => {
      piloto.posicao = index + 1;
    });

    const pilotoVencedor = pilotosOrdenados[0].piloto;

    let pontos = 0;

    // Verifica se o palpite do usuário foi correto (primeiro lugar)
    if (palpite === pilotoVencedor) {
      pontos += 25;  // Pontos pelo primeiro lugar
    }

    // Calcula pontos adicionais com base nas regras
    pilotosOrdenados.forEach((piloto) => {
      if (piloto.ultrapassagens > 0) {
        pontos += piloto.ultrapassagens * 10;
      }
      if (piloto.velocidade === Math.max(...pilotos.map(p => p.velocidade))) {
        pontos += 20;  // Pontos por maior velocidade
      }
    });

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
});*/

router.post('/palpite', async (req, res) => {
  const { palpite, usuarioId } = req.body;

  try {
    const usuario = await Usuario.findByPk(usuarioId);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verifica o status da corrida
    const corrida = await Corrida.findOne();

    if (!corrida) {
      return res.status(404).json({ error: 'Nenhuma corrida encontrada' });
    }

    // Apenas aceitar palpites se a corrida estiver "não iniciada"
    if (corrida.status === 'em andamento') {
      return res.status(400).json({ error: 'Corrida em andamento. Não é possível fazer palpites.' });
    }

    if (corrida.status === 'finalizada') {
      return res.status(400).json({ error: 'Corrida já finalizada. Não é possível fazer palpites.' });
    }

    if (corrida.status !== 'não iniciada') {
      return res.status(400).json({ error: 'Apenas é possível fazer palpites quando a corrida ainda não foi iniciada.' });
    }

    // Agora que sabemos que o status é "não iniciada", pode prosseguir com o processamento do palpite
    let pilotos = await Corrida.findAll();

    if (pilotos.length === 0) {
      return res.status(404).json({ error: 'Nenhum piloto encontrado na tabela Corridas' });
    }

    pilotos = pilotos.map((piloto) => piloto.toJSON());

    // Ordena os pilotos pela velocidade
    const pilotosOrdenados = pilotos.sort((a, b) => b.velocidade - a.velocidade);
    pilotosOrdenados.forEach((piloto, index) => {
      piloto.posicao = index + 1;
    });

    const pilotoVencedor = pilotosOrdenados[0].piloto;

    let pontos = 0;

    // Verifica se o palpite do usuário foi correto (primeiro lugar)
    if (palpite === pilotoVencedor) {
      pontos += 25;  // Pontos pelo primeiro lugar
    }

    // Calcula pontos adicionais com base nas regras
    pilotosOrdenados.forEach((piloto) => {
      if (piloto.ultrapassagens > 0) {
        pontos += piloto.ultrapassagens * 10;
      }
      if (piloto.velocidade === Math.max(...pilotos.map(p => p.velocidade))) {
        pontos += 20;  // Pontos por maior velocidade
      }
    });

    if (palpite === pilotosOrdenados[1].piloto) {
      pontos += 5;  // Pontos pelo segundo lugar
    }

    usuario.pontos += pontos;
    await usuario.save();

    res.json({
      status: 'palpite aceito',
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




