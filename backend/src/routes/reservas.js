import { Router } from "express";
import { reservasController } from "../controllers/reservas.controller.js";

const reservasRouter = Router();

reservasRouter.route("/")
  .get(reservasController.getReservas)
  .post(reservasController.createReserva);

reservasRouter.route("/activas")
  .get(reservasController.getReservasActivas);

reservasRouter.route("/cliente/:clienteId")
  .get(reservasController.getReservasByCliente);

reservasRouter.route("/:id/estado")
  .patch(reservasController.updateEstadoDeReserva);

reservasRouter.route("/:id")
  .get(reservasController.getReservaById)
  .delete(reservasController.deleteReserva);

export default reservasRouter;