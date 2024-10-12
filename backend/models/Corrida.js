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
    allowNull: false
  },
  posicao: {
    type: DataTypes.INTEGER,
    allowNull: true 
  },
  ultrapassagem: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  maiorVelocidade: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'Corridas',
  timestamps: false 
});

export default Corrida;

