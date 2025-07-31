import { Router } from "express";
import { logSistemaController } from "../controllers/logSistema.controller.js";

const router = Router();

router.route("/")
  .get(logSistemaController.getAll)
  .post(logSistemaController.create);

router.route("/usuario/:usuarioId")
  .get(logSistemaController.getByUsuario);

router.route("/:id")
  .delete(logSistemaController.delete);

export default router;