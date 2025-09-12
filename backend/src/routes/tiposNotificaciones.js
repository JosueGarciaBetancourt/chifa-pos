import { Router } from "express";
import { tiposNotificacionesController } from "../controllers/tiposNotificaciones.controller.js";

const tiposNotificacionesRouter = Router();

tiposNotificacionesRouter.route("/")
  .get(tiposNotificacionesController.getTiposNotificaciones)

tiposNotificacionesRouter.route("/:id")
  .get(tiposNotificacionesController.getTipoNotificacionById)

export default tiposNotificacionesRouter;