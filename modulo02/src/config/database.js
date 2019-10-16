module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAllL: true,
  },
};

/* configuracoes adicionais
  define: {
    timestamps = cria os campos createdAt e updatedAt
    underscored = retira o padrao do camelcase para o nome das tabelas
    underscoredAllL = retira o padrao do camelcase para todas as outras coisa
  },
*/
