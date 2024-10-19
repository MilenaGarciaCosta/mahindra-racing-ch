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

router.post('/palpite', async (req, res) => { // cálculo
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

    // Calcular pontos para cada piloto (sem alterar a posição)
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
    const pilotosOrdenados = [...pilotos].sort((a, b) => b.pontos - a.pontos);

    // Encontra o piloto correspondente ao palpite do usuário
    const pilotoDoPalpite = pilotos.find(piloto => piloto.piloto === palpite);

    if (!pilotoDoPalpite) {
      return res.status(404).json({ error: 'Piloto não encontrado' });
    }

    let pontos = 0;

    // Pontos pela posição (usando a posição original do banco de dados)
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




