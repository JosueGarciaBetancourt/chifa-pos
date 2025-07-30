import { Router } from "express";
import { proveedorController } from "../controllers/proveedor.controller.js";

const router = Router();

router.route("/")
  .get(proveedorController.getAll)
  .post(proveedorController.create);

router.route("/:id")
  .get(proveedorController.getById)
  .put(proveedorController.update)
  .delete(proveedorController.delete);

export default router;