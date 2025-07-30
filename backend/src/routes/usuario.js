import { Router } from "express";
import { usuarioController } from "../controllers/usuario.controller.js";

const router = Router();

router.route("/")
  .get(usuarioController.getAll)
  .post(usuarioController.create);

router.route("/dni/:dni")
  .get(usuarioController.getByDni);

router.route("/:id")
  .get(usuarioController.getById)
  .put(usuarioController.update)
  .delete(usuarioController.delete);

export default router;