import { Router } from "express";
import { insumosProveedoresController } from "../controllers/insumosProveedores.controller.js";

const insumosProveedoresRouter = Router();

insumosProveedoresRouter.route("/")
  .get(insumosProveedoresController.getInsumosProveedores)
  .post(insumosProveedoresController.createInsumoProveedor);

insumosProveedoresRouter.route("/insumo/:insumoId")
  .get(insumosProveedoresController.getInsumosProveedoresByInsumo);

insumosProveedoresRouter.route("/proveedor/:proveedorId")
  .get(insumosProveedoresController.getInsumosProveedoresByProveedor);

insumosProveedoresRouter.route("/:id")
  .get(insumosProveedoresController.getInsumoProveedorById)
  .put(insumosProveedoresController.updateInsumoProveedor)
  .delete(insumosProveedoresController.deleteInsumoProveedor);

export default insumosProveedoresRouter;