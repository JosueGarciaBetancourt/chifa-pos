import { Router } from "express";
import { comprobantesVentaController } from "../controllers/comprobantesVenta.controller.js";

const comprobantesVentaRouter = Router();

comprobantesVentaRouter.route("/")
  .get(comprobantesVentaController.getComprobantesVenta)
  .post(comprobantesVentaController.createComprobanteVenta);

comprobantesVentaRouter.route("/pedido/:pedidoId")
  .get(comprobantesVentaController.getComprobantesVentaByPedidoId);

comprobantesVentaRouter.route("/:id")
  .get(comprobantesVentaController.getComprobanteVentaById)
  .delete(comprobantesVentaController.deleteComprobanteVenta);

comprobantesVentaRouter.route("/:id/estado")
  .patch(comprobantesVentaController.updateEstado);

comprobantesVentaRouter.route("/:id/xml")
  .patch(comprobantesVentaController.updateXML);

export default comprobantesVentaRouter;