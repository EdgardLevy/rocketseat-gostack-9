/*
extends
  airbnb-base = estilizacao do airbnb
  prettier = modulo para arrumar o codigo
rules
  class-methods-use-this = desabilita a checagem de uso do this nos metodos de classe
  no-param-reassign = permite receber o parametro e alterar ele, o padrao do eslint eh nao permitir isso
  camelcase = o eslint pede por padrao que todas as variaveis sejam camelcase
  no-unused-vars = permitir declaracao de variaveis sem uso
  prettier/prettier =
*/
module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base', 'prettier'
  ],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "camelcase": "off",
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }]
  },
};
