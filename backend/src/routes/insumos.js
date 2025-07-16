import { Router } from 'express';
import { insumosController } from '../controllers/insumos.controller.js';

const router = Router();

router.route('/')
  .get(insumosController.getInsumos);

export default router;
