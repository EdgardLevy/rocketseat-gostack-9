import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
        password: Sequelize.VIRTUAL,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    // retorna o campo com o mesmo nome, porem, eh possivel mudar o nome do campo
    // de
    // this.belongsTo(models.File, { foreignKey: 'avatar_id' });
    // para
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  // metodo para checagem do password
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
