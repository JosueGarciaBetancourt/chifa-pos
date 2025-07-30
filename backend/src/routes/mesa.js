import { Router } from "express";
import { mesaController } from "../controllers/mesa.controller.js";

const router = Router();

router.route("/")
  .get(mesaController.getAll)
  .post(mesaController.create);

router.route("/sede/:sedeId")
  .get(mesaController.getBySede);

router.route("/numero/:numero")
  .get(mesaController.getByNumero);

router.route("/:id")
  .get(mesaController.getById)
  .put(mesaController.update)
  .delete(mesaController.delete);

export default router;