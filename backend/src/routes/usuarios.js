import { Router } from "express";
import { usuariosController } from "../controllers/usuarios.controller.js";

const usuariosRouter = Router();

usuariosRouter.route("/")
  .get(usuariosController.getUsuarios)
  .post(usuariosController.createUsuario);

usuariosRouter.route('/active')
  .get(usuariosController.getUsuariosActive);

usuariosRouter.route('/inactive')
  .get(usuariosController.getUsuariosInactive);

usuariosRouter.route("/dni/:dni")
  .get(usuariosController.getUsuarioByDni);

usuariosRouter.route('/searchByUsername')
  .get(usuariosController.searchByUsername);

usuariosRouter.route("/:id")
  .get(usuariosController.getUsuarioById)
  .put(usuariosController.updateUsuario)
  .delete(usuariosController.deleteUsuario);

usuariosRouter.route('/:id/disable')
  .delete(usuariosController.disableUsuario);

usuariosRouter.route('/:id/enable')
  .patch(usuariosController.enableUsuario);

export default usuariosRouter;