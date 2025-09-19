import { Router } from "express";
import { estadosPedidosController } from "../controllers/estadosPedidos.controller.js";

const estadosPedidosRouter = Router();

estadosPedidosRouter.route("/")
  .get(estadosPedidosController.getEstadosPedidos)
  .post(estadosPedidosController.createEstadoPedido);

estadosPedidosRouter.route("/searchEstadosPedidosByName")
  .get(estadosPedidosController.searchEstadosPedidosByName);

estadosPedidosRouter.route("/:id")
  .get(estadosPedidosController.getEstadoPedidoById)
  .put(estadosPedidosController.updateEstadoPedido)
  .delete(estadosPedidosController.deleteEstadoPedido);

export default estadosPedidosRouter;