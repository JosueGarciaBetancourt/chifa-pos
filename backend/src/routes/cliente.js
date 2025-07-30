import { Router } from "express";
import { clienteController } from "../controllers/cliente.controller.js";

const router = Router();

router.route("/")
  .get(clienteController.getAll)
  .post(clienteController.create);

router.route("/dni/:dni")
  .get(clienteController.getByDni);

router.route("/:id")
  .get(clienteController.getById)
  .put(clienteController.update)
  .delete(clienteController.delete);

export default router;