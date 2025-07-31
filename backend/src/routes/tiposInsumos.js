import { Router } from 'express';
import { tiposInsumosController } from '../controllers/tiposInsumos.controller.js';

const tiposInsumosRouter = Router();

tiposInsumosRouter.route('/')
  .get(tiposInsumosController.getTiposInsumos);

export default tiposInsumosRouter;
