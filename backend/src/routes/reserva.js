import { Router } from "express";
import { reservaController } from "../controllers/reserva.controller.js";

const router = Router();

router.route("/")
  .get(reservaController.getAll)
  .post(reservaController.create);

router.route("/activas")
  .get(reservaController.getActivas);

router.route("/cliente/:clienteId")
  .get(reservaController.getByCliente);

router.route("/:id/estado")
  .put(reservaController.updateEstado);

router.route("/:id")
  .get(reservaController.getById)
  .delete(reservaController.delete);

export default router;