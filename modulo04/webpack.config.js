const path = require('path');
/**
 * entry = configura o arquivo de entrada da aplicacao
 * output = configuracao da localizacao e qual o nome gerado para o arquibo bundle
 * contendo todo o codigo transpilado
 *
 * devServer = configuracao para o webpack-dev-server, modulo que gera automaticamente
 * o bundle
 *
 *
 * module
 *   rules = configuracoes de como o babel vai transpilar os arquivos
 *     {
 *       test: expressao regular que se aplica a todos os arquivos que terminam com .js
 *       exclude: exclui-se o node_modules pq as libs de la ja sao transpiladas
 *       use:{
 *          loader: configuracao do loader para essa regra, no primeiro item abaix, eh o babel-loader
 *       }
 *     }
 *
 * /.*\.(gif|png|jpe?g)$/i = todos os arquivos que terminem com .gif "|" = ou png, etc e /"i" = expressao com case insensitive
 */
module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' }, { loader: 'css-loader' },
        ]
      },
      {
        test: /.*\.(gif|png|jpe?g)$/i,
        use: {
          loader: 'file-loader'
        }
      },
    ]
  }
}
