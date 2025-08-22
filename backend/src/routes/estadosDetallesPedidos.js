import { Router } from "express";
import { estadosDetallesPedidosController } from "../controllers/estadosDetallesPedidos.controller.js";

const estadosDetallesPedidosRouter = Router();

estadosDetallesPedidosRouter.route("/")
  .get(estadosDetallesPedidosController.getEstadosDetallesPedidos)
  .post(estadosDetallesPedidosController.createEstadoDetallePedido);

estadosDetallesPedidosRouter.route('/searchByName')
  .get(estadosDetallesPedidosController.searchByName);

estadosDetallesPedidosRouter.route("/:id")
  .get(estadosDetallesPedidosController.getEstadoDetallePedidoById)
  .put(estadosDetallesPedidosController.updateDetallePedido)
  .delete(estadosDetallesPedidosController.deleteEstadoDetallePedido);

export default estadosDetallesPedidosRouter;