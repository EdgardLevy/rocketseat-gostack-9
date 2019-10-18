module.exports = {
  up: (queryInterface, Sequelize) => {
    // adiciona a coluna avatar_id na tabela de usuario
    // e cria uma chave estrangeira para a tabela file
    // define as regras para atualizacao do campo users.avatar_id
    //
    return queryInterface.addColumn('users', 'avatar_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    // instrui que o campo deve ser removido qdo for feito um rollback da estrutura
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
