import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';
// este modulo padrao do node, permite usar uma funcalo que usa callback
// como uma promise

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  /*
  authHeader:['Bearer','xxxxxx']
  */

  // pegando o segundo item
  // const token = authHeader.split(' ')[1];

  // utilizando desestruturacao,ao usar um array e colocar uma virgula, pode-se definir o recebimento dos valores
  // nas suas respectivas posicoes
  const [, token] = authHeader.split(' ');

  try {
    // primeiro passa a funcao, e depois os parametros que se usaria nela
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // decoded = { id: 5, iat: 1571181923, exp: 1571786723 }

    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
