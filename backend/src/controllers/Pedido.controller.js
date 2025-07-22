import { Pedido } from '../../../electron/database/models/pedido.js';

export const pedidoController = {
  getAll: async (req, res) => {
    try {
      const pedidos = await Pedido.selectAll();
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const pedido = await Pedido.findById(req.params.id);
      if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });
      res.json(pedido);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getBySede: async (req, res) => {
    try {
      const pedidos = await Pedido.findBySede(req.params.sedeId);
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevoPedido = await Pedido.create(req.body);
      res.status(201).json(nuevoPedido);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateEstado: async (req, res) => {
    try {
      const pedidoActualizado = await Pedido.updateEstado(
        req.params.id, 
        req.body.estado_id
      );
      res.json(pedidoActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await Pedido.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};