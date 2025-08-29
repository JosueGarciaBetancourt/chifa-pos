import { Router } from "express";
import { insumosProveedoresController } from "../controllers/insumosProveedores.controller.js";

const insumosProveedoresRouter = Router();

insumosProveedoresRouter.route("/")
  .get(insumosProveedoresController.getInsumosProveedores)
  .post(insumosProveedoresController.createInsumoProveedor);

insumosProveedoresRouter.route("/insumo/:insumoId")
  .get(insumosProveedoresController.getByInsumo);

insumosProveedoresRouter.route("/proveedor/:proveedorId")
  .get(insumosProveedoresController.getByProveedor);

insumosProveedoresRouter.route("/:id")
  .get(insumosProveedoresController.getInsumoProveedorById)
  .put(insumosProveedoresController.updateInsumoProveedor)
  .delete(insumosProveedoresController.deleteInsumoProveedor);

export default insumosProveedoresRouter;