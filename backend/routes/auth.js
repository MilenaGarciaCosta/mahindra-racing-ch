import express from 'express';
import Usuario from '../models/Usuario.js';  // Ajuste o caminho se necessário

const router = express.Router();

// Rota para cadastro sem criptografia de senha
router.post('/register', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Cria o novo usuário com a senha inserida
    const novoUsuario = await Usuario.create({ email, senha });
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar usuário' });
  }
});

// Rota para login sem verificação de hash de senha
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Busca o usuário no banco de dados
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verifica se a senha fornecida corresponde à do banco de dados
    if (senha !== usuario.senha) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    res.json({ mensagem: 'Login bem-sucedido', usuarioId: usuario.id });
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

export default router;



