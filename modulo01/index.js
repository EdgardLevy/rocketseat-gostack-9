const express = require('express');

const server = express();
server.use(express.json());

//tipos de parametros
/*
Query params = ?teste=1
Route params = /users/1
Request body = {'nome':'texto'}
*/

const users = ['Usuario', 'Outro', 'Fulano'];

//middelware
server.use('/', (req, res, next) => {
  console.time('Request') //<<<<<,Sensacional
  console.log(`Método: ${req.method}; URL: ${req.url}`)
  next()
  console.timeEnd('Request')
})

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    res.status(400).json({ error: 'User name is required' })
  }
  else
    next()
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: 'User does not exists' })
  }
  req.user = user;
  next()
}

server.get('/teste', (req, res) => {
  const nome = req.query.nome; // query params
  res.json({ message: `Hello World ${nome}` });
})

server.get('/users', (req, res) => {
  res.send(users);
})

server.get('/users/:index', checkUserInArray, (req, res) => {
  //const id = req.params.id; // query params
  //ou por desustruturacao
  //const { index } = req.params;
  //res.send(users[index]);
  //obtendo diretamente do req
  res.send(req.user);
})

server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);
  res.json(users);
})

server.put('/users/:index', checkUserInArray, checkUserExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  users[index] = name;
  res.json(users);
})

server.delete('/users/:index', checkUserInArray, (req, res) => {
  //const id = req.params.id; // query params
  //ou por desustruturacao
  const { index } = req.params;
  users.splice(index, 1);
  //res.end();
  res.send();
})

server.listen(3000);
