import { Router } from "express";
import { sedeLocalController } from "../controllers/sedeLocal.controller.js";

const router = Router();

router.route("/")
  .get(sedeLocalController.getAll)
  .post(sedeLocalController.create);

router.route("/:id")
  .get(sedeLocalController.getById)
  .put(sedeLocalController.update)
  .delete(sedeLocalController.delete);

export default router;