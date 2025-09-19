import { Router } from "express";
import { detallesPedidosController } from "../controllers/detallesPedidos.controller.js";

const detallesPedidosRouter = Router();

detallesPedidosRouter.route("/pedido/:pedidoId")
  .get(detallesPedidosController.getDetalleByPedido)
  .post(detallesPedidosController.createDetallePedido);

detallesPedidosRouter.route("/:id/estado")
  .patch(detallesPedidosController.updateEstadoDeDetallePedido);

detallesPedidosRouter.route("/:id")
  .put(detallesPedidosController.updateDetallePedido)
  .delete(detallesPedidosController.deleteDetallePedido);

export default detallesPedidosRouter;