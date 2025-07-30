import { Router } from "express";
import { estadoDetallePedidoController } from "../controllers/estadoDetallePedido.controller.js";

const router = Router();

router.route("/")
  .get(estadoDetallePedidoController.getAll)
  .post(estadoDetallePedidoController.create);

router.route("/nombre/:nombre")
  .get(estadoDetallePedidoController.getByNombre);

router.route("/:id")
  .get(estadoDetallePedidoController.getById)
  .put(estadoDetallePedidoController.update)
  .delete(estadoDetallePedidoController.delete);

export default router;