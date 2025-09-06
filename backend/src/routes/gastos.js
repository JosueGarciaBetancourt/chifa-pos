import { Router } from "express";
import { gastosController } from "../controllers/gastos.controller.js";

const gastosRouter = Router();

gastosRouter.route("/")
  .get(gastosController.getGastos)
  .post(gastosController.createGasto);

gastosRouter.route("/:id")
  .get(gastosController.getGastoById)
  .put(gastosController.updateGasto)
  .delete(gastosController.deleteGasto);

export default gastosRouter;