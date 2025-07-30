import { Router } from "express";
import { dispositivoController } from "../controllers/dispositivo.controller.js";

const router = Router();

router.route("/")
  .get(dispositivoController.getAll)
  .post(dispositivoController.create);

router.route("/mac/:mac")
  .get(dispositivoController.getByMac)
  .put(dispositivoController.update)
  .patch(dispositivoController.actualizarConexion);

router.route("/:id")
  .get(dispositivoController.getById)
  .delete(dispositivoController.delete);

export default router;