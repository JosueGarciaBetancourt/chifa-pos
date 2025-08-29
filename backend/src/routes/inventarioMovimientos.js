import { Router } from "express";
import { inventarioMovimientosController } from "../controllers/inventarioMovimientos.controller.js";

const inventarioMovimientosRouter = Router();

inventarioMovimientosRouter.route("/")
  .get(inventarioMovimientosController.getInventarioMovimientos)
  .post(inventarioMovimientosController.createInventarioMovimiento);

inventarioMovimientosRouter.route("/insumo/:insumoId")
  .get(inventarioMovimientosController.getInventarioMovimientoByInsumo);

inventarioMovimientosRouter.route("/usuario/:usuarioId")
  .get(inventarioMovimientosController.getInventarioMovimientoByUsuario);

inventarioMovimientosRouter.route("/:id")
  .get(inventarioMovimientosController.getInventarioMovimientoById)
  .delete(inventarioMovimientosController.deleteInventarioMovimiento);

export default inventarioMovimientosRouter;