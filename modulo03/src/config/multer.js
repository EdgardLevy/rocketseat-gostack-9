import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';
// destination eh o destino dos arquivos
// filename serve para formatar o nome do arquivo
// parametros do funcao do filename
// req dados da requisicao do express
// file dados do arquivo
// cb callback
export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);
        // pega a resposta do randombytes, e transforma 16 bytes aleatore
        // em caracteres hexadecimais
        // ex de retorno : 1454fsr2fsdf.png
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
