import nodemailer from 'nodemailer';
import { resolve } from 'path';
// libs para template de email usando handlebars
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;
    // no parametro auth, algumas estrategias de envio
    // nao solicitam usuario e senha, entao, se no auth n tiver usuario
    // envia como null
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });

    this.configureTemplates();
  }

  configureTemplates() {
    // define o caminho dos templates
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');
    // configura o compiler do nodemailer
    // com os diretotios dos layouts, partials, layout default e que tipo de extensao
    // os arquivos terao
    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );
  }

  sendMail(message) {
    return this.transporter.sendMail({ ...mailConfig.default, ...message });
  }
}

export default new Mail();
