import { Router } from 'express';
import { insumosController } from '../controllers/insumos.controller.js';

const insumosRouter = Router();

insumosRouter.route('/')
  .get(insumosController.getInsumos);

export default insumosRouter;
