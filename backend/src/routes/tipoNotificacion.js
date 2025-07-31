import { Router } from "express";
import { tipoNotificacionController } from "../controllers/tipoNotificacion.controller.js";

const router = Router();

router.route("/")
  .get(tipoNotificacionController.getAll)
  .post(tipoNotificacionController.create);

router.route("/:id")
  .get(tipoNotificacionController.getById)
  .put(tipoNotificacionController.update)
  .delete(tipoNotificacionController.delete);

export default router;