import { Router } from "express";
import { tiposComprobantesController } from "../controllers/tiposComprobantes.controller.js";

const tiposComprobantesRouter = Router();

tiposComprobantesRouter.route("/")
  .get(tiposComprobantesController.getTiposComprobantes)
  .post(tiposComprobantesController.createTipoComprobante);

tiposComprobantesRouter.route('/searchTiposComprobantesByName')
  .get(tiposComprobantesController.searchTiposComprobantesByName);
  
tiposComprobantesRouter.route("/:id")
  .get(tiposComprobantesController.getTipoComprobanteById)
  .put(tiposComprobantesController.updateTipoComprobante)
  .delete(tiposComprobantesController.deleteTipoComprobante);

export default tiposComprobantesRouter;