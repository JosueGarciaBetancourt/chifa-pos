import { Router } from "express";
import { estadoMesaController } from "../controllers/estadoMesa.controller.js";

const router = Router();

router.route("/")
  .get(estadoMesaController.getAll)
  .post(estadoMesaController.create);

router.route("/nombre/:nombre")
  .get(estadoMesaController.getByNombre);

router.route("/:id")
  .get(estadoMesaController.getById)
  .put(estadoMesaController.update)
  .delete(estadoMesaController.delete);

export default router;