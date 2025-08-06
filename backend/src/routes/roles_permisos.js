import { Router } from "express";
import { rolesPermisosController } from "../controllers/roles_permisos.controller.js";

const rolesPermisosRouter = Router();

rolesPermisosRouter.route('/:rolId/permisos')
  .get(rolesPermisosController.getPermisosByRolId)

rolesPermisosRouter.route('/:rolId/asign-permisos')
  .post(rolesPermisosController.asignarPermisosARol)
  
rolesPermisosRouter.route('/:rolId/update-permisos')
  .put(rolesPermisosController.updatePermisosARol);

rolesPermisosRouter.route("/:rolId/delete-permisos")
  .post(rolesPermisosController.quitarPermisosARol);

export default rolesPermisosRouter;