import { Router } from "express";
import { notificacionesController } from "../controllers/notificaciones.controller.js";

const notificacionesRouter = Router();

notificacionesRouter.route("/")
  .get(notificacionesController.getNotificaciones)
  .post(notificacionesController.createNotificacion);

notificacionesRouter.route("/usuario/:usuarioId")
  .get(notificacionesController.getNotificacionesByUsuario);

notificacionesRouter.route("/:id/leer")
  .patch(notificacionesController.marcarLeida);

notificacionesRouter.route("/usuario/:usuarioId/leer-todas")
  .patch(notificacionesController.marcarTodasLeidas);

notificacionesRouter.route("/:id")
  .get(notificacionesController.getNotificacionById)
  .delete(notificacionesController.disableNotificacion);

export default notificacionesRouter;