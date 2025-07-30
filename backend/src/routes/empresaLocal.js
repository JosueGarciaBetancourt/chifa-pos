import { Router } from "express";
import { empresaLocalController } from "../controllers/empresaLocal.controller.js";

const router = Router();

router.route("/")
  .get(empresaLocalController.getAll)
  .post(empresaLocalController.create);

router.route("/:id")
  .get(empresaLocalController.getById)
  .put(empresaLocalController.update)
  .delete(empresaLocalController.delete);

export default router;