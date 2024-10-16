// models/Corrida.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

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
  velocidade: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  posicao: {
    type: DataTypes.INTEGER,
    allowNull: true // Pode ser preenchido após a corrida
  },
  ultrapassagem: {
    type: DataTypes.INTEGER,
    allowNull: true // Pode ser atualizado durante ou após a corrida
  },
  maiorVelocidade: {
    type: DataTypes.INTEGER,
    allowNull: true // Pode ser atualizado após a corrida
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false, // Valores podem ser 'em andamento', 'finalizada', etc.
    defaultValue: 'em andamento' // Valor padrão se nada for definido
  },
  ultrapassado: {
    type: DataTypes.INTEGER,
    allowNull: true // Quantidade de vezes que foi ultrapassado
  }
}, {
  tableName: 'Corridas',
  timestamps: false 
});

export default Corrida;




