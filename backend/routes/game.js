import express from 'express';
import Usuario from '../models/Usuario.js';
import Corrida from '../models/Corrida.js'; 

const router = express.Router();

// Rota para enviar palpite
/*router.post('/palpite', async (req, res) => {
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

    // Ordena os pilotos pela velocidade em ordem decrescente
    const pilotosOrdenados = pilotos.sort((a, b) => b.velocidade - a.velocidade);

    // Adiciona a posição a cada piloto
    pilotosOrdenados.forEach((piloto, index) => {
      piloto.posicao = index + 1;
    });

    // Define o vencedor (o piloto na primeira posição)
    const pilotoVencedor = pilotosOrdenados[0].piloto; // Nome do piloto vencedor

    let pontos = 0;

    // Se o palpite for igual ao nome do piloto vencedor, o usuário ganha 10 pontos
    if (palpite === pilotoVencedor) {
      pontos = 10;
    }

    // Atualiza os pontos do usuário
    usuario.pontos += pontos;
    await usuario.save();

    res.json({
      mensagem: `Palpite ${palpite === pilotoVencedor ? 'correto' : 'incorreto'}`,
      pontos_ganhos: pontos,
      total_pontos: usuario.pontos,
      pilotos: pilotosOrdenados // Inclui os pilotos ordenados na resposta
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no servidor ao processar o palpite' });
  }
});*/

router.post('/palpite', async (req, res) => {
  const { palpite, usuarioId } = req.body;

  try {
    const usuario = await Usuario.findByPk(usuarioId);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Busca os dados dos pilotos da tabela Corridas
    let pilotos = await Corrida.findAll();

    if (pilotos.length === 0) {
      return res.status(404).json({ error: 'Nenhum piloto encontrado na tabela Corridas' });
    }

    pilotos = pilotos.map((piloto) => piloto.toJSON());

    // Ordena os pilotos pela velocidade em ordem decrescente
    const pilotosOrdenados = pilotos.sort((a, b) => b.velocidade - a.velocidade);
    pilotosOrdenados.forEach((piloto, index) => {
      piloto.posicao = index + 1;
    });

    const pilotoVencedor = pilotosOrdenados[0].piloto;

    let pontos = 0;

    if (palpite === pilotoVencedor) {
      pontos += 25;  // Pontos pelo primeiro lugar
    }

    // Calcula pontos adicionais por ultrapassagem e velocidade
    pilotosOrdenados.forEach((piloto) => {
      if (piloto.ultrapassagens > 0) {
        pontos += piloto.ultrapassagens * 10;
      }
      if (piloto.velocidade === Math.max(...pilotos.map(p => p.velocidade))) {
        pontos += 20;  // Maior velocidade total
      }
    });

    if (palpite === pilotosOrdenados[1].piloto) {
      pontos += 5;  // Pontos pelo segundo lugar
    }

    usuario.pontos += pontos;
    await usuario.save();

    res.json({
      mensagem: `Palpite ${palpite === pilotoVencedor ? 'correto' : 'incorreto'}`,
      pontos_ganhos: pontos,
      total_pontos: usuario.pontos,
      pilotos: pilotosOrdenados
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no servidor ao processar o palpite' });
  }
});


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




