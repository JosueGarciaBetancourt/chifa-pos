import { Router } from "express";
import { estadoComprobanteController } from "../controllers/estadoComprobante.controller.js";

const router = Router();

router.route("/")
  .get(estadoComprobanteController.getAll)
  .post(estadoComprobanteController.create);

router.route("/nombre/:nombre")
  .get(estadoComprobanteController.getByNombre);

router.route("/:id")
  .get(estadoComprobanteController.getById)
  .put(estadoComprobanteController.update)
  .delete(estadoComprobanteController.delete);

export default router;