import { Router } from "express";
import { rolController } from "../controllers/rol.controller.js";

const router = Router();

router.route("/")
  .get(rolController.getAll)
  .post(rolController.create);

router.route("/:id")
  .get(rolController.getById)
  .put(rolController.update)
  .delete(rolController.delete);

export default router;