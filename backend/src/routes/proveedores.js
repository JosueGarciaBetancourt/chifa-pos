import { Router } from "express";
import { proveedoresController } from "../controllers/proveedores.controller.js";

const proveedoresRouter = Router();

proveedoresRouter.route("/")
  .get(proveedoresController.getProveedores)
  .post(proveedoresController.createProveedor);

proveedoresRouter.route('/active')
  .get(proveedoresController.getProveedoresActive);
  
proveedoresRouter.route('/inactive')
  .get(proveedoresController.getProveedoresInactive);

proveedoresRouter.route("/:id")
  .get(proveedoresController.getProveedorById)
  .put(proveedoresController.updateProveedor)
  .delete(proveedoresController.deleteProveedor);

proveedoresRouter.route('/:id/disable')
  .delete(proveedoresController.disableProveedor);

proveedoresRouter.route('/:id/enable')
  .patch(proveedoresController.enableProveedor);

export default proveedoresRouter;