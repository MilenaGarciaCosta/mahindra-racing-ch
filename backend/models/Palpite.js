// models/Palpite.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Usuario from './Usuario.js';
import Corrida from './Corrida.js';

const Palpite = sequelize.define('Palpite', {
  palpite: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pontosGanhos: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  timestamps: false, // Desativa createdAt e updatedAt
});

// Associações
Palpite.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Palpite.belongsTo(Corrida, { foreignKey: 'corridaId' });

export default Palpite;
