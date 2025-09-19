import { Router } from "express";
import { metodosPagoController } from "../controllers/metodosPago.controller.js";

const metodosPagoRouter = Router();

metodosPagoRouter.route("/")
  .get(metodosPagoController.getMetodosPago)
  .post(metodosPagoController.createMetodoPago);

metodosPagoRouter.route('/searchMetodosPagoByName')
  .get(metodosPagoController.searchMetodosPagoByName);

metodosPagoRouter.route("/:id")
  .get(metodosPagoController.getMetodoPagoById)
  .put(metodosPagoController.updateMetodoPago)
  .delete(metodosPagoController.deleteMetodoPago);

export default metodosPagoRouter;