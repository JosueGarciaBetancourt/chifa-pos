import { Router } from "express";
import { recetaController } from "../controllers/receta.controller.js";

const recetasRouter = Router();

recetasRouter.route("/")
  .post(recetaController.createReceta);

recetasRouter.route('/active')
  .get(recetaController.getRecetasActive);

recetasRouter.route('/inactive')
  .get(recetaController.getRecetasInactive);

recetasRouter.route("/producto/:productoId")
  .get(recetaController.getRecetasByProductoId)

recetasRouter.route("/insumo/:insumoId")
  .get(recetaController.getRecetasByInsumoId);

recetasRouter.route('/productos/active')
  .get(recetaController.getRecetasByProductosActive);

recetasRouter.route('/productos/inactive')
  .get(recetaController.getRecetasByProductosInactive);

recetasRouter.route('/insumos/active')
  .get(recetaController.getRecetasByInsumosActive);

recetasRouter.route('/insumos/inactive')
  .get(recetaController.getRecetasByInsumosInactive);

recetasRouter.route("/producto/:productoId/insumo/:insumoId")
  .put(recetaController.updateReceta)
  .delete(recetaController.deleteReceta);

export default recetasRouter;