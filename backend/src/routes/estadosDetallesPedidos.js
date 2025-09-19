import { Router } from "express";
import { estadosDetallesPedidosController } from "../controllers/estadosDetallesPedidos.controller.js";

const estadosDetallesPedidosRouter = Router();

estadosDetallesPedidosRouter.route("/")
  .get(estadosDetallesPedidosController.getEstadosDetallesPedidos)
  .post(estadosDetallesPedidosController.createEstadoDetallePedido);

estadosDetallesPedidosRouter.route('/searchEstadosDetallesPedidosByName')
  .get(estadosDetallesPedidosController.searchEstadosDetallesPedidosByName);

estadosDetallesPedidosRouter.route("/:id")
  .get(estadosDetallesPedidosController.getEstadoDetallePedidoById)
  .put(estadosDetallesPedidosController.updateEstadoDetallePedido)
  .delete(estadosDetallesPedidosController.deleteEstadoDetallePedido);

export default estadosDetallesPedidosRouter;