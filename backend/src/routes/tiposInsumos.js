import { Router } from "express";
import { tipoInsumoController } from "../controllers/TipoInsumo.controller.js";
const router = Router();

router.route("/").get(tipoInsumoController.getAll);

export default router;
