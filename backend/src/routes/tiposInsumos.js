import { Router } from 'express';
import { tiposInsumosController } from '../controllers/tiposInsumos.controller.js';

const tiposInsumosRouter = Router();

tiposInsumosRouter.route("/")
  .get(tiposInsumosController.getTiposInsumos)
  .post(tiposInsumosController.createTipoInsumo);

tiposInsumosRouter.route('/active')
  .get(tiposInsumosController.getTiposInsumosActive);

tiposInsumosRouter.route('/inactive')
  .get(tiposInsumosController.getTiposInsumosInactive);

tiposInsumosRouter.route("/:id")
  .get(tiposInsumosController.getTipoInsumoById)
  .put(tiposInsumosController.updateTipoInsumo)
  .delete(tiposInsumosController.deleteTipoInsumo);

tiposInsumosRouter.route('/:id/disable')
  .delete(tiposInsumosController.disableTipoInsumo);

tiposInsumosRouter.route('/:id/enable')
  .patch(tiposInsumosController.enableTipoInsumo);

export default tiposInsumosRouter;
