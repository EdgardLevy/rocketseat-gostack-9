// o modulo Yup serve para validacao de schema
// importa todas as funcoes dentro do objeto Yup
import * as Yup from 'Yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    // monta-se a estrutura que o yup vai validar
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // utilizando desestruturacao
    // const { name, email, password_hash } = req.body;
    // const user = await User.create({ name, email, password_hash });
    // confiando que no corpo da requisicao
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    const user = await User.create(req.body);

    const { id, name, email, provider } = user;

    return res.json({ id, name, email, provider });

    // cria o usuario se nao localizar o email, que eh unico
    // const user = await User.findOrCreate({
    //  where: { email: req.body.email },
    //  defaults: req.body,
    // });

    // res.json(user[0]);
  }

  async update(req, res) {
    // monta-se a estrutura que o yup vai validar
    // porem no update tem uma funcao que torna a verificacao do campo
    // condicionada, eh a funcao 'when' que recebe como parametros (nomedocampo,funcao de verificacao(fieldenviado,fieldavalidar))
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = req.body;

    // localiza o usuario por id
    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });
      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }
    // soh checa a senha se foi enviado
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }
    // atualiza o usuario

    const { id, name, provider } = await user.update(req.body);

    return res.json({ id, name, email, provider });
  }
}

export default new UserController();
