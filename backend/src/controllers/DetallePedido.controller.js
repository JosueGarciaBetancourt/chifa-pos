import { DetallePedido } from '../../../electron/database/models/detallePedido.js';

export const detallePedidoController = {
  getByPedido: async (req, res) => {
    try {
      const detalles = await DetallePedido.findByPedidoId(req.params.pedidoId);
      res.json(detalles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevosDetalles = await DetallePedido.create(req.body);
      res.status(201).json(nuevosDetalles);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateEstado: async (req, res) => {
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

  delete: async (req, res) => {
    try {
      await DetallePedido.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};