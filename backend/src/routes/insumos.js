import { Router } from 'express';
import { insumosController } from '../controllers/insumos.controller.js';

const insumosRouter = Router();

insumosRouter.route("/")
  .get(insumosController.getInsumos)
  .post(insumosController.createInsumo);

insumosRouter.route('/active')
  .get(insumosController.getInsumosActive);

insumosRouter.route('/inactive')
  .get(insumosController.getInsumosInactive);

insumosRouter.route("/:id")
  .get(insumosController.getInsumoById)
  .put(insumosController.updateInsumo)
  .delete(insumosController.deleteInsumo);

insumosRouter.route('/:id/disable')
  .delete(insumosController.disableInsumo);

insumosRouter.route('/:id/enable')
  .patch(insumosController.enableInsumo);


export default insumosRouter;
