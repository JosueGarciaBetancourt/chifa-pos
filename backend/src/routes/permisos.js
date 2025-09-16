import { Router } from "express";
import { permisosController } from "../controllers/permisos.controller.js";

const permisosRouter = Router();

permisosRouter.route("/")
  .get(permisosController.getPermisos)
  .post(permisosController.createPermiso);
  
permisosRouter.route("/:id")
  .get(permisosController.getPermisoById)
  .put(permisosController.updatePermiso)
  .delete(permisosController.deletePermiso);

export default permisosRouter;