import { Router } from "express";
import { recetaController } from "../controllers/receta.controller.js";

const router = Router();

router.route("/producto/:productoId")
  .get(recetaController.getByProducto)
  .post(recetaController.create);

router.route("/insumo/:insumoId")
  .get(recetaController.getByInsumo);

router.route("/producto/:productoId/insumo/:insumoId")
  .put(recetaController.update)
  .delete(recetaController.delete);

export default router;