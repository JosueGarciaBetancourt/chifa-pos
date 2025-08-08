import { Router } from "express";
import { categoriasProductosController } from "../controllers/categoriasProductos.controller.js";

const categoriasProductosRouter = Router();

categoriasProductosRouter.route("/")
  .get(categoriasProductosController.getCategoriasProductos)
  .post(categoriasProductosController.createCategoriaProducto);

categoriasProductosRouter.route('/active')
  .get(categoriasProductosController.getCategoriasProductosActive);

categoriasProductosRouter.route('/inactive')
  .get(categoriasProductosController.getCategoriasProductosInactive);


categoriasProductosRouter.route("/:id")
  .get(categoriasProductosController.getCategoriaProductoById)
  .put(categoriasProductosController.updateCategoriaProducto)
  .delete(categoriasProductosController.deleteCategoriaProducto);

categoriasProductosRouter.route('/:id/disable')
  .delete(categoriasProductosController.disableCategoriaProducto);

categoriasProductosRouter.route('/:id/enable')
  .patch(categoriasProductosController.enableCategoriaProducto);

export default categoriasProductosRouter;