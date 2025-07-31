import { Router } from "express";
import { comprobanteController } from "../controllers/comprobante.controller.js";

const router = Router();

router.route("/")
  .get(comprobanteController.getAll)
  .post(comprobanteController.create);

router.route("/pedido/:pedidoId")
  .get(comprobanteController.getByPedido);

router.route("/:id")
  .get(comprobanteController.getById)
  .delete(comprobanteController.delete);

router.route("/:id/estado")
  .put(comprobanteController.updateEstado);

router.route("/:id/xml")
  .put(comprobanteController.updateXML);

export default router;