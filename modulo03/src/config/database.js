require('dotenv').config();

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
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
