import { Router } from "express";
import { tiposReportesController } from "../controllers/tiposReportes.controller.js";

const tiposReportesRouter = Router();

tiposReportesRouter.route("/")
  .get(tiposReportesController.getTiposReportes)

tiposReportesRouter.route("/:id")
  .get(tiposReportesController.getTipoReporteById)

export default tiposReportesRouter;