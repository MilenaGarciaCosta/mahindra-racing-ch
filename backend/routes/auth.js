// backend/routes/auth.js

import express from 'express';
import Usuario from '../models/Usuario.js';
import { Sequelize } from 'sequelize';

const router = express.Router();

// Função auxiliar para gerar um código único de 6 caracteres
const generateUniqueCode = async () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code;
  let exists = true;
  while (exists) {
    code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    // Verifica se o código já existe
    const user = await Usuario.findOne({ where: { codigo_unico: code } });
    if (!user) {
      exists = false;
    }
  }
  return code;
};

// Rota para cadastro sem criptografia de senha
router.post('/register', async (req, res) => {
  const { email, senha, codigo_divulgacao } = req.body;

  // Inicia uma transação para garantir atomicidade
  const transaction = await Usuario.sequelize.transaction();
  try {
    let referrer = null;
    let pontosUsuario = 0; // Padrão para novos usuários

    // Se um código de divulgação foi fornecido, verifica sua validade
    if (codigo_divulgacao) {
      referrer = await Usuario.findOne({ where: { codigo_unico: codigo_divulgacao }, transaction });
      if (!referrer) {
        await transaction.rollback();
        return res.status(400).json({ error: 'Código de divulgação inválido' });
      }
      pontosUsuario = 100; // Usuário recebe 100 pontos ao usar um código válido
    }

    // Gera um código único para o novo usuário
    const codigo_unico = await generateUniqueCode();

    // Cria o novo usuário
    const novoUsuario = await Usuario.create({
      email,
      senha,
      codigo_unico,
      codigo_divulgacao: codigo_divulgacao || null,
      pontos: pontosUsuario, // Define pontos com base na utilização do código
    }, { transaction });

    // Se houver um referrer válido, atualiza os pontos
    if (referrer) {
      referrer.pontos += 100;
      await referrer.save({ transaction });
    }

    // Confirma a transação
    await transaction.commit();

    // Retorna o novo usuário com o código único
    res.status(201).json({
      id: novoUsuario.id,
      email: novoUsuario.email,
      pontos: novoUsuario.pontos,
      codigo_unico: novoUsuario.codigo_unico,
      codigo_divulgacao: novoUsuario.codigo_divulgacao,
    });
  } catch (error) {
    // Em caso de erro, desfaz a transação
    await transaction.rollback();
    res.status(400).json({ error: 'Erro ao criar usuário', details: error.message });
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





