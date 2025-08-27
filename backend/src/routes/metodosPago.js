import { Router } from "express";
import { metodosPagoController } from "../controllers/metodosPago.controller.js";

const metodosPagoRouter = Router();

metodosPagoRouter.route("/")
  .get(metodosPagoController.getMetodosPago)
  .post(metodosPagoController.createMetodoPago);

metodosPagoRouter.route('/searchByName')
  .get(metodosPagoController.searchByName);

metodosPagoRouter.route("/:id")
  .get(metodosPagoController.getMetodoPagoById)
  .put(metodosPagoController.updateMetodoPago)
  .delete(metodosPagoController.deleteMetodoPago);

export default metodosPagoRouter;