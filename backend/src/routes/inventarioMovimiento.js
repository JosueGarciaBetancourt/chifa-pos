import { Router } from "express";
import { inventarioMovimientoController } from "../controllers/inventarioMovimiento.controller.js";

const router = Router();

router.route("/")
  .get(inventarioMovimientoController.getAll)
  .post(inventarioMovimientoController.create);

router.route("/insumo/:insumoId")
  .get(inventarioMovimientoController.getByInsumo);

router.route("/usuario/:usuarioId")
  .get(inventarioMovimientoController.getByUsuario);

router.route("/:id")
  .delete(inventarioMovimientoController.delete);

export default router;