import { Router } from "express";
import { cotizacionController } from "../controllers/cotizacion.controller.js";

const router = Router();

router.route("/")
  .get(cotizacionController.getAll)
  .post(cotizacionController.create);

router.route("/cliente/:clienteId")
  .get(cotizacionController.getByCliente);

router.route("/usuario/:usuarioId")
  .get(cotizacionController.getByUsuario);

router.route("/:id")
  .get(cotizacionController.getById)
  .put(cotizacionController.update)
  .delete(cotizacionController.delete);

export default router;