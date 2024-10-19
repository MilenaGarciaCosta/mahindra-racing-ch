// models/Corrida.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Palpite from './Palpite.js';

const Corrida = sequelize.define('Corrida', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  piloto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  maiorVelocidade: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  posicao: {
    type: DataTypes.INTEGER,
    allowNull: true // Pode ser preenchido após a corrida
  },
  ultrapassagem: {
    type: DataTypes.INTEGER,
    allowNull: true // Pode ser preenchido após a corrida
  },
  ultrapassado: {
    type: DataTypes.INTEGER,
    allowNull: true // Pode ser preenchido após a corrida
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'não iniciada' // Valor padrão
  }
}, {
  tableName: 'Corridas',
  timestamps: false // Se não tiver as colunas createdAt e updatedAt
});

// Associações
Corrida.hasMany(Palpite, { foreignKey: 'corridaId' });

export default Corrida;





