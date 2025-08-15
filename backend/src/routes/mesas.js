import { Router } from "express";
import { mesasController } from "../controllers/mesas.controller.js";

const mesasRouter = Router();

mesasRouter.route("/")
  .get(mesasController.getMesas)
  .post(mesasController.createMesa);

mesasRouter.route("/sede/:sedeId")
  .get(mesasController.getMesasBySede);

mesasRouter.route("/numero/:numero")
  .get(mesasController.getMesaByNumero);

mesasRouter.route("/:id")
  .get(mesasController.getMesaById)
  .put(mesasController.updateMesa)
  .delete(mesasController.deleteMesa);

export default mesasRouter;