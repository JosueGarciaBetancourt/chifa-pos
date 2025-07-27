import { Router } from "express";
import { insumoController } from "../controllers/Insumo.controller.js";

const router = Router();

router.route("/").get(insumoController.getAll);

export default router;
