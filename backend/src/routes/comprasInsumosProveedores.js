import { Router } from "express";
import { comprasInsumosProveedoresController } from "../controllers/comprasInsumosProveedores.controller.js";

const comprasInsumosProveedoresRouter = Router();

comprasInsumosProveedoresRouter.route("/")
  .get(comprasInsumosProveedoresController.getComprasInsumosProveedores)
  .post(comprasInsumosProveedoresController.createCompraInsumoProveedor);

comprasInsumosProveedoresRouter.route("/insumo/:insumoId")
  .get(comprasInsumosProveedoresController.getByInsumo);

comprasInsumosProveedoresRouter.route("/proveedor/:proveedorId")
  .get(comprasInsumosProveedoresController.getByProveedor);

comprasInsumosProveedoresRouter.route("/:id")
  .get(comprasInsumosProveedoresController.getCompraInsumoProveedorById)
  .put(comprasInsumosProveedoresController.updateCompraInsumoProveedor)
  .delete(comprasInsumosProveedoresController.deleteCompraInsumoProveedor);

export default comprasInsumosProveedoresRouter;