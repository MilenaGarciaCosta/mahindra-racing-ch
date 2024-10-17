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
    allowNull: true
  },
  ultrapassagem: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  maiorVelocidade: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ultrapassado: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  status: {  // Novo campo status
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'em andamento'  // Definido como 'em andamento' por padrão
  }
}, {
  tableName: 'Corridas',
  timestamps: false 
});





