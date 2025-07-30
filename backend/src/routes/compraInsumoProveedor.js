import { Router } from "express";
import { compraInsumoProveedorController } from "../controllers/compraInsumoProveedor.controller.js";

const router = Router();

router.route("/")
  .get(compraInsumoProveedorController.getAll)
  .post(compraInsumoProveedorController.create);

router.route("/insumo/:insumoId")
  .get(compraInsumoProveedorController.getByInsumo);

router.route("/proveedor/:proveedorId")
  .get(compraInsumoProveedorController.getByProveedor);

router.route("/:id")
  .delete(compraInsumoProveedorController.delete);

export default router;