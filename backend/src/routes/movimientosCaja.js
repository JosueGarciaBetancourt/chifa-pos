import { Router } from "express";
import { movimientosCajaController } from "../controllers/movimientosCaja.controller.js";

const movimientosCajaRouter = Router();

movimientosCajaRouter.route("/")
  .get(movimientosCajaController.getMovimientosCaja)

movimientosCajaRouter.route("/jornada/:jornadaId")
  .get(movimientosCajaController.getMovimientosCajaByJornada);

movimientosCajaRouter.route("/usuario/:usuarioId")
  .get(movimientosCajaController.getMovimientosCajaByUsuario);

movimientosCajaRouter.route("/abrir")
  .post(movimientosCajaController.abrirCaja);

movimientosCajaRouter.route("/cerrar")
  .post(movimientosCajaController.cerrarCaja);

movimientosCajaRouter.route("/venta")
  .post(movimientosCajaController.ventaCaja);

movimientosCajaRouter.route("/gasto")
  .post(movimientosCajaController.gastoCaja);

movimientosCajaRouter.route("/:id")
  .get(movimientosCajaController.getMovimientoCajaById)
  .put(movimientosCajaController.updateMovimientoCaja)
  .delete(movimientosCajaController.delete);

export default movimientosCajaRouter;