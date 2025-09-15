import { Router } from "express";
import { modulosSistemaController } from "../controllers/modulosSistema.controller.js";

const modulosSistemaRouter = Router();

modulosSistemaRouter.route("/")
  .get(modulosSistemaController.getModulosSistema)

modulosSistemaRouter.route('/active')
  .get(modulosSistemaController.getModulosSistemaActive);
  
modulosSistemaRouter.route('/inactive')
  .get(modulosSistemaController.getModulosSistemaInactive);

modulosSistemaRouter.route("/:id")
  .get(modulosSistemaController.getModuloSistemaById)

modulosSistemaRouter.route('/:id/disable')
  .delete(modulosSistemaController.disableModuloSistema);

modulosSistemaRouter.route('/:id/enable')
  .patch(modulosSistemaController.enableModuloSistema);

export default modulosSistemaRouter;