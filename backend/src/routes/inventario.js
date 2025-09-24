import { Router } from "express";
import { inventarioController } from "../controllers/inventario.controller.js";

const inventarioRouter = Router();

inventarioRouter.route("/")
  .get(inventarioController.getInventarioDetallado);


export default inventarioRouter;