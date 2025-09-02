import { Router } from "express";
import { cajasController } from "../controllers/cajas.controller.js";

const cajasRouter = Router();

cajasRouter.route("/")
  .get(cajasController.getCajas)
  .post(cajasController.createCaja);

cajasRouter.route('/active')
  .get(cajasController.getCajasActive);

cajasRouter.route('/inactive')
  .get(cajasController.getCajasInactive);
  
cajasRouter.route("/:id")
  .get(cajasController.getCajaById)
  .put(cajasController.updateCaja)
  .delete(cajasController.deleteCaja);

cajasRouter.route('/:id/disable')
  .delete(cajasController.disableCaja);

cajasRouter.route('/:id/enable')
  .patch(cajasController.enableCaja);


export default cajasRouter;