import { Router } from "express";
import { clientesController } from "../controllers/clientes.controller.js";

const clientesRouter = Router();

clientesRouter.route("/")
  .get(clientesController.getClientes)
  .post(clientesController.createCliente);

clientesRouter.route("/dni/:dni")
  .get(clientesController.getClienteByDni);

clientesRouter.route('/active')
  .get(clientesController.getClientesActive);

clientesRouter.route('/inactive')
  .get(clientesController.getClientesInactive);
  
clientesRouter.route("/:id")
  .get(clientesController.getClienteById)
  .put(clientesController.updateCliente)
  .delete(clientesController.deleteCliente);

clientesRouter.route('/:id/disable')
  .delete(clientesController.disableCliente);

clientesRouter.route('/:id/enable')
  .patch(clientesController.enableCliente);


export default clientesRouter;