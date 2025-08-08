import { Router } from "express";
import { jornadasLaboralesController } from "../controllers/jornadasLaborales.controller.js";

const jornadasLaboralesRouter = Router();

jornadasLaboralesRouter.route("/")
  .get(jornadasLaboralesController.getJornadasLaborales)
  .post(jornadasLaboralesController.createJornadaLaboral);

jornadasLaboralesRouter.route("/usuario/:usuarioId/iniciada")
  .get(jornadasLaboralesController.getJornadaLaboralIniciadaPorUsuarioId);

jornadasLaboralesRouter.route("/:id/finalizar")
  .put(jornadasLaboralesController.finalizarJornadaLaboral);

jornadasLaboralesRouter.route("/:id")
  .get(jornadasLaboralesController.getJornadaLaboralById)
  .delete(jornadasLaboralesController.deleteJornadaLaboral);

export default jornadasLaboralesRouter;