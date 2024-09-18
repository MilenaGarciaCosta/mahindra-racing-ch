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
    defaultValue: 0,
  },
}, {
  timestamps: false  // Desativa createdAt e updatedAt
});

export default Usuario;


