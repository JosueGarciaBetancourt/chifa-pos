import { Router } from "express";
import { tiposGastosController } from "../controllers/tiposGastos.controller.js";

const tiposGastosRouter = Router();

tiposGastosRouter.route("/")
  .get(tiposGastosController.getTiposGastos)
  .post(tiposGastosController.createTipoGasto);

tiposGastosRouter.route('/active')
  .get(tiposGastosController.getTiposGastosActive);

tiposGastosRouter.route('/inactive')
  .get(tiposGastosController.getTiposGastosInactive);

tiposGastosRouter.route("/:id")
  .get(tiposGastosController.getTipoGastoById)
  .put(tiposGastosController.updateTipoGasto)
  .delete(tiposGastosController.deleteTipoGasto);

tiposGastosRouter.route('/:id/disable')
  .delete(tiposGastosController.disableTipoGasto);

tiposGastosRouter.route('/:id/enable')
  .patch(tiposGastosController.enableTipoGasto);


export default tiposGastosRouter;