import { Router } from "express";
import { jornadasLaboralesController } from "../controllers/jornadasLaborales.controller.js";

const router = Router();

router.route("/")
  .get(jornadasLaboralesController.getAll)
  .post(jornadasLaboralesController.create);

router.route("/usuario/:usuarioId/iniciada")
  .get(jornadasLaboralesController.findIniciadaPorUsuario);

router.route("/:id/finalizar")
  .put(jornadasLaboralesController.finalizar);

router.route("/:id")
  .get(jornadasLaboralesController.getById)
  .delete(jornadasLaboralesController.delete);

export default router;