import { Router } from "express";
import { tipoInsumoController } from "../controllers/tipoInsumo.controller.js";

const router = Router();

router.route("/")
  .get(tipoInsumoController.getAll)
  .post(tipoInsumoController.create);

router.route("/:id")
  .get(tipoInsumoController.getById)
  .put(tipoInsumoController.update)
  .delete(tipoInsumoController.delete);

export default router;