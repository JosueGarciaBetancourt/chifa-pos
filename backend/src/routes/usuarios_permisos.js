import { Router } from "express";
import { usuariosPermisosController } from "../controllers/usuariosPermisos.controller.js";

const usuariosPermisosRouter = Router();

usuariosPermisosRouter.route("/")
  .get(usuariosPermisosController.getUsuariosPermisos)
  .post(usuariosPermisosController.createUsuarioPermiso);

usuariosPermisosRouter.route("/usuario/:usuarioId")
  .get(usuariosPermisosController.getUsuariosPermisosByUsuario);

usuariosPermisosRouter.route("/:id")
  .get(usuariosPermisosController.getUsuarioPermisoById)
  .put(usuariosPermisosController.updateUsuarioPermiso)
  .delete(usuariosPermisosController.deleteUsuarioPermiso);

export default usuariosPermisosRouter;