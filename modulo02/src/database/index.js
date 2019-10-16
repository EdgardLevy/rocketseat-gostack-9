// arquivo responsavel por carregar todos os models e fazer a conexao com a base dedados
import Sequelize from 'sequelize';

import User from '../app/models/User';
// carrega a configuracoa de conexao
import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.Init();
  }

  Init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
