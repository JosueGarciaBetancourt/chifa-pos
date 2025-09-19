import { Router } from "express";
import { recetasController } from "../controllers/recetas.controller.js";

const recetasRouter = Router();

recetasRouter.route("/")
  .post(recetasController.createReceta);

recetasRouter.route("/producto/:productoId")
  .get(recetasController.getRecetasByProductoId)

recetasRouter.route("/insumo/:insumoId")
  .get(recetasController.getRecetasByInsumoId);

recetasRouter.route('/productos/active')
  .get(recetasController.getRecetasByProductosActive);

recetasRouter.route('/productos/inactive')
  .get(recetasController.getRecetasByProductosInactive);

recetasRouter.route('/insumos/active')
  .get(recetasController.getRecetasByInsumosActive);

recetasRouter.route('/insumos/inactive')
  .get(recetasController.getRecetasByInsumosInactive);

recetasRouter.route("/producto/:productoId/insumo/:insumoId")
  .put(recetasController.updateReceta)
  .delete(recetasController.deleteReceta);

export default recetasRouter;