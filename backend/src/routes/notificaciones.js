import { Router } from "express";
import { notificacionesController } from "../controllers/notificaciones.controller.js";

const notificacionesRouter = Router();

notificacionesRouter.route("/")
  .get(notificacionesController.getNotificaciones)
  .post(notificacionesController.createNotificacion);

notificacionesRouter.route("/usuario/:usuarioId")
  .get(notificacionesController.getNotificacionesByUsuario);

notificacionesRouter.route("/:id/leer")
  .put(notificacionesController.marcarLeida);

notificacionesRouter.route("/usuario/:usuarioId/leer-todas")
  .put(notificacionesController.marcarTodasLeidas);

notificacionesRouter.route("/:id")
  .get(notificacionesController.getNotificacionById)
  .delete(notificacionesController.deleteNotificacion);

export default notificacionesRouter;