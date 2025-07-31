import { Router } from "express";
import { detallePedidoController } from "../controllers/detallePedido.controller.js";

const router = Router();

router.route("/pedido/:pedidoId")
  .get(detallePedidoController.getByPedido)
  .post(detallePedidoController.create);

router.route("/:id/estado")
  .put(detallePedidoController.updateEstado);

router.route("/:id")
  .delete(detallePedidoController.delete);

export default router;