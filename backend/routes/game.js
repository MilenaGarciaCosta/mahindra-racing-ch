import express from 'express';
import mqtt from 'mqtt';  // Adicionando o MQTT
import Usuario from '../models/Usuario.js';
import Corrida from '../models/Corrida.js'; 

const router = express.Router();

// Conectar ao broker MQTT
const mqttClient = mqtt.connect('mqtt://4.228.225.124');

// Variável para armazenar o status da corrida
let statusCorrida = 'em andamento'; // Valor inicial

// Listener para atualizar o status da corrida com base nas mensagens MQTT
mqttClient.on('connect', () => {
  mqttClient.subscribe('/TEF/device004/attrs/status_corrida', (err) => {
    if (err) {
      console.error('Erro ao se inscrever no tópico MQTT:', err);
    }
  });
});

mqttClient.on('message', (topic, message) => {
  if (topic === '/TEF/device004/attrs/status_corrida') {
    statusCorrida = message.toString(); // Atualiza o status da corrida
    console.log('Status da corrida atualizado para:', statusCorrida);
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

    // Ordena os pilotos pela maior velocidade em ordem decrescente
    const pilotosOrdenados = pilotos.sort((a, b) => b.maiorVelocidade - a.maiorVelocidade);

    // Adiciona a posição a cada piloto
    pilotosOrdenados.forEach((piloto, index) => {
      piloto.posicao = index + 1;
    });

    // Encontra o piloto escolhido (com base no palpite do usuário)
    const pilotoEscolhido = pilotos.find(piloto => piloto.piloto === palpite);

    if (!pilotoEscolhido) {
      return res.status(404).json({ error: 'Piloto não encontrado' });
    }

    // Verifica o status da corrida via MQTT
    if (statusCorrida !== 'finalizada') {
      return res.status(400).json({ error: 'A corrida ainda não foi finalizada.' });
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
      pilotos: pilotosOrdenados // Inclui os pilotos ordenados na resposta
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no servidor ao processar o palpite' });
  }
});

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

export default router;





