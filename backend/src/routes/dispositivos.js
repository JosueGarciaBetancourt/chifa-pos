import { Router } from "express";
import { dispositivosController } from "../controllers/dispositivos.controller.js";

const dispositivosRouter = Router();

dispositivosRouter.route("/")
  .get(dispositivosController.getDispositivos)
  .post(dispositivosController.createDispositivo);

dispositivosRouter.route('/active')
  .get(dispositivosController.getDispositivosActive);

dispositivosRouter.route('/inactive')
  .get(dispositivosController.getDispositivosInactive);

dispositivosRouter.route("/mac/:mac")
  .get(dispositivosController.getDispositivoByMac)
  .put(dispositivosController.updateDispositivo)
  .patch(dispositivosController.actualizarConexion)
  .delete(dispositivosController.deleteDispositivo);

dispositivosRouter.delete("/mac/:mac/disable", dispositivosController.disableDispositivo);
dispositivosRouter.patch("/mac/:mac/enable", dispositivosController.enableDispositivo);

dispositivosRouter.route("/:id")
  .get(dispositivosController.getDispositivoById);

export default dispositivosRouter;
