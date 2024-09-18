import { Sequelize } from 'sequelize';

// Definir a conexão com o banco de dados usando suas credenciais
const sequelize = new Sequelize('bd_formulae', 'NextGen', '123456789', {
  host: '4.228.225.124',
  dialect: 'mysql', // ou 'postgres', 'sqlite', etc.
  port: 3306,  // A porta padrão para MySQL é 3306, ajuste caso seja diferente
});

export default sequelize;



