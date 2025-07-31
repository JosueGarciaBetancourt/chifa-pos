import { Router } from "express";
import { estadoPedidoController } from "../controllers/estadoPedido.controller.js";

const router = Router();

router.route("/")
  .get(estadoPedidoController.getAll)
  .post(estadoPedidoController.create);

router.route("/nombre/:nombre")
  .get(estadoPedidoController.getByNombre);

router.route("/:id")
  .get(estadoPedidoController.getById)
  .put(estadoPedidoController.update)
  .delete(estadoPedidoController.delete);

export default router;