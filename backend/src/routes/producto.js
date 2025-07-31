import { Router } from "express";
import { productoController } from "../controllers/producto.controller.js";

const router = Router();

router.route("/")
  .get(productoController.getAll)
  .post(productoController.create);

router.route("/buscar")
  .get(productoController.searchByName);

router.route("/activos")
  .get(productoController.getActive);

router.route("/inactivos")
  .get(productoController.getNoActive);

router.route("/:id")
  .get(productoController.getById)
  .put(productoController.update)
  .delete(productoController.delete);

export default router;