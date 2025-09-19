import { Router } from "express";
import { tiposPedidosController } from "../controllers/tiposPedidos.controller.js";

const tiposPedidosRouter = Router();

tiposPedidosRouter.route("/")
  .get(tiposPedidosController.getTiposPedidos)
  .post(tiposPedidosController.createTipoPedido);

tiposPedidosRouter.route("/searchTiposPedidosByName")
  .get(tiposPedidosController.searchTiposPedidosByName);

tiposPedidosRouter.route("/:id")
  .get(tiposPedidosController.getTipoPedidoById)
  .put(tiposPedidosController.updateTipoPedido)
  .delete(tiposPedidosController.deleteTipoPedido);

export default tiposPedidosRouter;