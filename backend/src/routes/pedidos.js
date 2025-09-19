import { Router } from "express";
import { pedidosController } from "../controllers/pedidos.controller.js";

const pedidosRouter = Router();

pedidosRouter.route("/")
  .get(pedidosController.getPedidos)
  .post(pedidosController.createPedido);

pedidosRouter.route("/sede/:sedeId")
  .get(pedidosController.getPedidosBySede);

pedidosRouter.route("/rango-fechas")
  .get(pedidosController.getPedidosByFecha);

pedidosRouter.route("/cliente/:clienteId")
  .get(pedidosController.getPedidosByCliente);

pedidosRouter.route("/usuario/:usuarioId")
  .get(pedidosController.getPedidosByUsuario);

pedidosRouter.route("/mesa/:mesaId")
  .get(pedidosController.getPedidosByMesa);
  
pedidosRouter.route("/estado/:estadoId")
  .get(pedidosController.getPedidosByEstado);

pedidosRouter.route("/tipo/:tipoId")
  .get(pedidosController.getPedidosByTipo);

pedidosRouter.route("/cotizacion/:cotizacionId")
  .get(pedidosController.getPedidoByCotizacionId);

pedidosRouter.route("/:id/estado")
  .patch(pedidosController.updateEstadoDePedido);

pedidosRouter.route("/:id")
  .get(pedidosController.getPedidoById)
  .put(pedidosController.updatePedido);

export default pedidosRouter;