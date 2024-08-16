import express from 'express';
import {
  enviarFeedback,
  eventoMaisPopular,
  palestranteMaisAtivo,
  editarEvento,
  cancelarEvento,
  registerEventos,
  getEventos
} from '../controllers/eventoController.js';

const router = express.Router();

router.post('/feedback', enviarFeedback);

router.get('/mais-popular', eventoMaisPopular);

router.get('/palestrante-mais-ativo', palestranteMaisAtivo);

router.put('/editar', editarEvento);

router.delete('/cancelar', cancelarEvento);

router.post('/registerEvento', registerEventos);

router.get('/getEventos', getEventos);


export default router;