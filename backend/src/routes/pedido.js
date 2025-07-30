import { Router } from "express";
import { pedidoController } from "../controllers/pedido.controller.js";

const router = Router();

router.route("/")
  .get(pedidoController.getAll)
  .post(pedidoController.create);

router.route("/sede/:sedeId")
  .get(pedidoController.getBySede);

router.route("/:id/estado")
  .put(pedidoController.updateEstado);

router.route("/:id")
  .get(pedidoController.getById)
  .delete(pedidoController.delete);

export default router;