import { Router } from "express";
import { reportesController } from "../controllers/reportes.controller.js";

const reportesRouter = Router();

reportesRouter.route("/")
  .get(reportesController.getReportes)
  .post(reportesController.createReporte);

reportesRouter.route("/:id")
  .get(reportesController.getReporteById)
  .put(reportesController.updateReporte)
  .delete(reportesController.deleteReporte);

export default reportesRouter;