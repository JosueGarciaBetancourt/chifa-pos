import { Router } from "express";
import { usuariosController } from "../controllers/usuarios.controller.js";

const usuariosRouter = Router();

usuariosRouter.route("/")
  .get(usuariosController.getUsuarios)
  .post(usuariosController.createUsuario);

usuariosRouter.route("/dni/:dni")
  .get(usuariosController.getUsuarioByDni);

usuariosRouter.route("/:id")
  .get(usuariosController.getUsuarioById)
  .put(usuariosController.updateUsuario)
  .delete(usuariosController.deleteUsuario);

export default usuariosRouter;