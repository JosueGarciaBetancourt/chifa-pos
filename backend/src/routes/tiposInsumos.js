import { Router } from 'express';
import { tiposInsumosController } from '../controllers/tiposInsumos.controller.js';

const router = Router();

router.route('/')
  .get(tiposInsumosController.getTiposInsumos);

export default router;
