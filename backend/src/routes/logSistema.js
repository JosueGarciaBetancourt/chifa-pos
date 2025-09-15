import { Router } from "express";
import { logsSistemaController } from "../controllers/logsSistema.controller.js";

const logsSistemaRouter = Router();

logsSistemaRouter.route("/")
  .get(logsSistemaController.getLogsSistema)
  .post(logsSistemaController.createLog);

logsSistemaRouter.route("/usuario/:usuarioId")
  .get(logsSistemaController.getLogsByUsuario);

logsSistemaRouter.route("/:id")
  .delete(logsSistemaController.deleteLog);

export default logsSistemaRouter;