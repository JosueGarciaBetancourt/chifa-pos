import { Router } from "express";
import { metodoPagoController } from "../controllers/metodoPago.controller.js";

const router = Router();

router.route("/")
  .get(metodoPagoController.getAll)
  .post(metodoPagoController.create);

router.route("/nombre/:nombre")
  .get(metodoPagoController.getByNombre);

router.route("/:id")
  .get(metodoPagoController.getById)
  .put(metodoPagoController.update)
  .delete(metodoPagoController.delete);

export default router;