import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Usuario = sequelize.define('Usuario', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pontos: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // Alterado de 100 para 0
  },
  codigo_unico: {
    type: DataTypes.CHAR(6),
    allowNull: false,
    unique: true,
  },
  codigo_divulgacao: {
    type: DataTypes.CHAR(6),
    allowNull: true,
  },
  palpite: {  // Novo campo para armazenar o palpite temporariamente
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  timestamps: false  // Desativa createdAt e updatedAt
});

export default Usuario;






