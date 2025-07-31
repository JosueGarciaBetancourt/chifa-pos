import { Router } from "express";
import { insumoProveedorController } from "../controllers/InsumoProveedor.controller.js";

const router = Router();

router.route("/")
  .get(insumoProveedorController.getAll)
  .post(insumoProveedorController.create);

router.route("/insumo/:insumoId")
  .get(insumoProveedorController.getByInsumo);

router.route("/proveedor/:proveedorId")
  .get(insumoProveedorController.getByProveedor);

router.route("/:id")
  .get(insumoProveedorController.getById)
  .put(insumoProveedorController.update)
  .delete(insumoProveedorController.delete);

export default router;