import { Router } from "express";
import { permisosController } from "../controllers/permisos.controller.js";

const permisosRouter = Router();

permisosRouter.route("/")
  .get(permisosController.getPermisos)
  .post(permisosController.createPermiso);
  
permisosRouter.route('/active')
  .get(permisosController.getPermisosActive);

permisosRouter.route('/inactive')
  .get(permisosController.getPermisosInactive);

permisosRouter.route("/:id")
  .get(permisosController.getPermisoById)
  .put(permisosController.updatePermiso)
  .delete(permisosController.deletePermiso);

permisosRouter.route('/:id/disable')
  .delete(permisosController.disablePermiso);

permisosRouter.route('/:id/enable')
  .patch(permisosController.enablePermiso);

export default permisosRouter;