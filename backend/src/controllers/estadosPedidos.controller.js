import { EstadoPedido } from '../../../electron/database/models/EstadoPedido.js';

export const estadosPedidosController = {
  getEstadosPedidos: async (req, res) => {
    try {
      const estados = await EstadoPedido.selectAll();
      res.json(estados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getEstadoPedidoById: async (req, res) => {
    try {
      const estado = await EstadoPedido.findById(req.params.id);
      if (!estado) return res.status(404).json({ error: 'Estado de detalle de pedido no encontrado' });
      res.json(estado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  searchEstadosPedidosByName: async (req, res) => {
    try {
      const estado = await EstadoPedido.searchByName(req.query.name);
      if (!estado) return res.status(404).json({ error: 'Estado de detalle de pedido no encontrado' });
      res.json(estado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createEstadoPedido: async (req, res) => {
    try {
      const nuevoEstado = await EstadoPedido.create(req.body);
      res.status(201).json(nuevoEstado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateEstadoPedido: async (req, res) => {
    try {
      const estadoActualizado = await EstadoPedido.update(
        req.params.id, 
        req.body
      );
      res.json(estadoActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteEstadoPedido: async (req, res) => {
    try {
      await EstadoPedido.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};