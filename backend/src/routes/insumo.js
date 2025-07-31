import { Router } from "express";
import { insumoController } from "../controllers/insumo.controller.js";

const router = Router();

router.route("/")
  .get(insumoController.getAll)
  .post(insumoController.create);

router.route("/:id")
  .get(insumoController.getById)
  .put(insumoController.update)
  .delete(insumoController.delete);

export default router;