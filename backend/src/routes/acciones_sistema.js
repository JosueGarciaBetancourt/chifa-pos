import { Router } from "express";
import { accionesSistemaController } from "../controllers/accionesSistema.controller.js";

const accionesSistemaRouter = Router();

accionesSistemaRouter.route("/")
  .get(accionesSistemaController.getAccionesSistema)

accionesSistemaRouter.route("/:id")
  .get(accionesSistemaController.getAccionSistemaById)

export default accionesSistemaRouter;