import { DetallePedido } from '../../../electron/database/models/DetallePedido.js';

export const detallesPedidosController = {
  getDetalleByPedido: async (req, res) => {
    try {
      const detalles = await DetallePedido.findByPedidoId(req.params.pedidoId);
      res.json(detalles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createDetallePedido: async (req, res) => {
    try {
      const nuevosDetalles = await DetallePedido.create(req.params.pedidoId, req.body);
      res.status(201).json(nuevosDetalles);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateEstadoDeDetallePedido: async (req, res) => {
    try {
      const resultado = await DetallePedido.updateEstado(
        req.params.id, 
        req.body.estado_id
      );
      res.json(resultado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateDetallePedido: async (req, res) => {
    try {
      const detallePedidoActualizado = await DetallePedido.update(
        req.params.id, 
        req.body
      );
      res.json(detallePedidoActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteDetallePedido: async (req, res) => {
    try {
      await DetallePedido.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};