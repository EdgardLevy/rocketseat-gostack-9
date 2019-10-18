import mongoose from 'mongoose';

// content conteudo da notificacao
// user id do usuario da notificacao
// read indica se o usuario ja leu a notififacao
// timestamps cria o campo created_at e updated_at

const NotificationSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    user: { type: Number, required: true },
    read: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Notification', NotificationSchema);
