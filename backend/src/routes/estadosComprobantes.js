import { Router } from "express";
import { estadosComprobantesController } from "../controllers/estadosComprobantes.controller.js";

const estadosComprobantesRouter = Router();

estadosComprobantesRouter.route("/")
  .get(estadosComprobantesController.getEstadosComprobantes)
  .post(estadosComprobantesController.createEstadoComprobante);

estadosComprobantesRouter.route('/searchEstadosComprobantesByName')
  .get(estadosComprobantesController.searchEstadosComprobantesByName);

estadosComprobantesRouter.route("/:id")
  .get(estadosComprobantesController.getEstadoComprobanteById)
  .put(estadosComprobantesController.updateEstadoComprobante)
  .delete(estadosComprobantesController.deleteEstadoComprobante);

export default estadosComprobantesRouter;