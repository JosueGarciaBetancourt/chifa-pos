import { Router } from "express";
import { movimientosCajaController } from "../controllers/movimientosCaja.controller.js";

const movimientosCajaRouter = Router();

// =================== CONSULTAS GENERALES ===================
movimientosCajaRouter.route("/")
  .get(movimientosCajaController.getMovimientosCaja);

movimientosCajaRouter.route("/:id")
  .get(movimientosCajaController.getMovimientoCajaById)
  .put(movimientosCajaController.updateMovimientoCaja)
  .delete(movimientosCajaController.delete);

movimientosCajaRouter.route("/jornada/:jornadaId")
  .get(movimientosCajaController.getMovimientosCajaByJornada);

movimientosCajaRouter.route("/usuario/:usuarioId")
  .get(movimientosCajaController.getMovimientosCajaByUsuario);

movimientosCajaRouter.route("/caja/:cajaId")
  .get(movimientosCajaController.getMovimientosCajaByCaja);

movimientosCajaRouter.route("/tipo/:tipo")
  .get(movimientosCajaController.getMovimientosCajaByTipo);

// =================== CONSULTAS DE ESTADO ===================
movimientosCajaRouter.route("/caja/:cajaId/estado")
  .get(movimientosCajaController.getEstadoCaja);

movimientosCajaRouter.route("/caja/:cajaId/resumen")
  .get(movimientosCajaController.getResumenCaja);

movimientosCajaRouter.route("/abrir")
  .post(movimientosCajaController.abrirCaja);

movimientosCajaRouter.route("/cerrar")
  .post(movimientosCajaController.cerrarCaja);

movimientosCajaRouter.route("/ingreso")
  .post(movimientosCajaController.ingresoCaja);

movimientosCajaRouter.route("/egreso")
  .post(movimientosCajaController.egresoCaja);

export default movimientosCajaRouter;