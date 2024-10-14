import express from 'express';
import Usuario from '../models/Usuario.js';
import Corrida from '../models/Corrida.js'; 
import { enviarAtualizacaoCorrida } from '../server.js';  // Importa a função de emissão

const router = express.Router();

// Finaliza a corrida e calcula os pontos
router.post('/finalizar-corrida', async (req, res) => {
  try {
    const corrida = await Corrida.findByPk(req.body.corridaId);  // Pega a corrida pelo ID
    if (!corrida) {
      return res.status(404).json({ message: 'Corrida não encontrada' });
    }

    // Atualiza o status para "finalizada"
    corrida.status = 'finalizada';
    await corrida.save();

    // Calcular pontos ganhos
    const pilotos = await Corrida.findAll({ where: { status: 'finalizada' } });
    pilotos.forEach(async (piloto) => {
      let pontosGanhos = 0;

      if (piloto.ultrapassagem) {
        pontosGanhos += 10;
      }

      if (piloto.maiorVelocidade >= piloto.velocidade) {
        pontosGanhos += 20;
      }

      if (piloto.posicao === 1) {
        pontosGanhos += 25;
      } else if (piloto.posicao === 2) {
        pontosGanhos += 5;
      }

      // Busca o usuário associado ao palpite
      const usuario = await Usuario.findByPk(req.body.usuarioId);
      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      // Atualiza o saldo de pontos do usuário
      usuario.saldoPontos += pontosGanhos;
      await usuario.save();  // Salva o saldo no banco de dados

      // Enviar atualizações para os clientes em tempo real
      enviarAtualizacaoCorrida({
        piloto: piloto.piloto,
        velocidade: piloto.velocidade,
        ultrapassagem: piloto.ultrapassagem,
        maiorVelocidade: piloto.maiorVelocidade,
        posicao: piloto.posicao,
        pontosGanhos,  // Envia os pontos ganhos
        usuarioId: usuario.id,  // Envia o ID do usuário
        saldoAtualizado: usuario.saldoPontos,  // Envia o saldo atualizado
        status: corrida.status  // Envia o status da corrida
      });
    });

    return res.json({ message: 'Corrida finalizada e pontos calculados.' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao finalizar a corrida.' });
  }
});

export default router;

