import { Router } from "express";
import { tipoPedidoController } from "../controllers/tipoPedido.controller.js";

const router = Router();

router.route("/")
  .get(tipoPedidoController.getAll)
  .post(tipoPedidoController.create);

router.route("/nombre/:nombre")
  .get(tipoPedidoController.getByNombre);

router.route("/:id")
  .get(tipoPedidoController.getById)
  .put(tipoPedidoController.update)
  .delete(tipoPedidoController.delete);

export default router;