import { Router } from "express";
import { permisosController } from "../controllers/permisos.controller.js";

const router = Router();

router.route("/")
  .get(permisosController.getAll)
  .post(permisosController.create);

router.route("/:id")
  .get(permisosController.getById)
  .put(permisosController.update)
  .delete(permisosController.delete);

export default router;