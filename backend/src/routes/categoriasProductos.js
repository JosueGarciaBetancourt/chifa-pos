import { Router } from "express";
import { categoriasProductosController } from "../controllers/CategoriasProductos.controller.js";

const router = Router();

router.route("/")
  .get(categoriasProductosController.getAll)
  .post(categoriasProductosController.create);

router.route("/:id")
  .get(categoriasProductosController.getById)
  .put(categoriasProductosController.update)
  .delete(categoriasProductosController.delete);

export default router;