import express from 'express';
import Transacao from '../models/Transacao.js';
import Usuario from '../models/Usuario.js';

const router = express.Router();

const vencedor = 1;  

// Rota para enviar palpite
router.post('/palpite', async (req, res) => {
  const { palpite, usuarioId } = req.body;

  try {
    const usuario = await Usuario.findByPk(usuarioId);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    let pontos = 0;

    // Se o palpite for igual ao vencedor, o usuário ganha 10 pontos
    if (parseInt(palpite) === vencedor) {
      pontos = 10;
    }

    // Atualiza os pontos do usuário
    usuario.pontos += pontos;
    await usuario.save();

    // Registrar a transação na tabela de transações
    await Transacao.create({
      usuario_id: usuarioId,
      pontos_ganhos: pontos
    });

    res.json({
      mensagem: `Palpite ${palpite === vencedor ? 'correto' : 'incorreto'}`,
      pontos_ganhos: pontos,
      total_pontos: usuario.pontos
    });

  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor ao processar o palpite' });
  }
});

export default router;
