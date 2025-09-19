import { Router } from "express";
import { estadosMesasController } from "../controllers/estadosMesas.controller.js";

const estadosMesasRouter = Router();

estadosMesasRouter.route("/")
  .get(estadosMesasController.getEstadosMesas)
  .post(estadosMesasController.createEstadoMesa);

estadosMesasRouter.route("/searchEstadoMesaByName")
  .get(estadosMesasController.searchEstadoMesaByName);

estadosMesasRouter.route("/:id")
  .get(estadosMesasController.getEstadoMesaById)
  .put(estadosMesasController.updateEstadoMesa)
  .delete(estadosMesasController.deleteEstadoMesa);

export default estadosMesasRouter;