import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Usuario from './Usuario.js';

const Transacao = sequelize.define('Transacao', {
  pontos_ganhos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false  // Desativa createdAt e updatedAt
});

// Relacionamento de transações com o usuário
Transacao.belongsTo(Usuario);

export default Transacao;

