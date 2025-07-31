import { Router } from "express";
import { tipoComprobanteController } from "../controllers/tipoComprobante.controller.js";

const router = Router();

router.route("/")
  .get(tipoComprobanteController.getAll)
  .post(tipoComprobanteController.create);

router.route("/nombre/:nombre")
  .get(tipoComprobanteController.getByNombre);

router.route("/:id")
  .get(tipoComprobanteController.getById)
  .put(tipoComprobanteController.update)
  .delete(tipoComprobanteController.delete);

export default router;