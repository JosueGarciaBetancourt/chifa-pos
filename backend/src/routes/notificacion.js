import { Router } from "express";
import { notificacionController } from "../controllers/notificacion.controller.js";

const router = Router();

router.route("/")
  .get(notificacionController.getAll)
  .post(notificacionController.create);

router.route("/usuario/:usuarioId")
  .get(notificacionController.getByUsuario);

router.route("/:id/leer")
  .put(notificacionController.marcarLeida);

router.route("/usuario/:usuarioId/leer-todas")
  .put(notificacionController.marcarTodasLeidas);

router.route("/:id")
  .get(notificacionController.getById)
  .delete(notificacionController.delete);

export default router;