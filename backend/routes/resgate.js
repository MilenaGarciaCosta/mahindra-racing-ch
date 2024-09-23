// backend/routes/resgate.js

import express from 'express';
import Usuario from '../models/Usuario.js';

const router = express.Router();

// Route to redeem an item
router.post('/resgatar', async (req, res) => {
  const { usuarioId, itemCost, itemName } = req.body;

  try {
    // Check if the user exists
    const usuario = await Usuario.findByPk(usuarioId);

    if (!usuario) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
    }

    // Check if the user has enough points
    if (usuario.pontos < itemCost) {
      return res.status(400).json({ success: false, message: 'Saldo insuficiente' });
    }

    // Deduct the item cost from the user's points
    usuario.pontos -= itemCost;
    await usuario.save();

    // Optionally, record the redemption in a history table
    // await HistoricoResgate.create({ usuarioId, itemName, itemCost, data: new Date() });

    // Return a success response
    res.json({
      success: true,
      total_pontos: usuario.pontos,
      message: `Item "${itemName}" resgatado com sucesso!`,
    });
  } catch (error) {
    console.error('Erro ao processar resgate:', error);
    res.status(500).json({ success: false, message: 'Erro no servidor ao processar o resgate' });
  }
});

export default router;
