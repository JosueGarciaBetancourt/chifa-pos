import { Router } from "express";
import { comprobantesController } from "../controllers/comprobantes.controller.js";

const comprobantesRouter = Router();

comprobantesRouter.route("/")
  .get(comprobantesController.getComprobantes)
  .post(comprobantesController.createComprobante);

comprobantesRouter.route("/pedido/:pedidoId")
  .get(comprobantesController.getComprobanteByPedidoId);

comprobantesRouter.route("/:id")
  .get(comprobantesController.getComprobanteById)
  .delete(comprobantesController.deleteComprobante);

comprobantesRouter.route("/:id/estado")
  .patch(comprobantesController.updateEstado);

comprobantesRouter.route("/:id/xml")
  .patch(comprobantesController.updateXML);

export default comprobantesRouter;