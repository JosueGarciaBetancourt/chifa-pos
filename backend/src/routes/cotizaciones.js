import { Router } from "express";
import { cotizacionesController } from "../controllers/cotizaciones.controller.js";

const cotizacionesRouter = Router();

cotizacionesRouter.route("/")
  .get(cotizacionesController.getCotizaciones)
  .post(cotizacionesController.createCotizacion);

cotizacionesRouter.route("/cliente/:clienteId")
  .get(cotizacionesController.getCotizacionesByCliente);

cotizacionesRouter.route("/usuario/:usuarioId")
  .get(cotizacionesController.getCotizacionesByUsuario);

cotizacionesRouter.route("/detalle/:id")
  .get(cotizacionesController.getDetallesCotizacionById);

  cotizacionesRouter.route("/:id")
  .get(cotizacionesController.getCotizacionById)
  .put(cotizacionesController.updateCotizacion)
  .delete(cotizacionesController.deleteCotizacion);

export default cotizacionesRouter;