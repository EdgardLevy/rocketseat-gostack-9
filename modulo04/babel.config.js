/**
 * @babel/preset-env = responsavel por alterar as funcoes do javascript que o browser nao entende. ex: import, export, class functions
 * @babel/preset-react = faz o mesmo do preset-env mas focado no react, tipo jsx
 * @babel/plugin-proposal-class-properties
 */
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties'
  ]
}
