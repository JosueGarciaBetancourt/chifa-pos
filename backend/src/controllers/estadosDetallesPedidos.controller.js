import { EstadoDetallePedido } from '../../../electron/database/models/EstadoDetallePedido.js';

export const estadosDetallesPedidosController = {
  getEstadosDetallesPedidos: async (req, res) => {
    try {
      const estados = await EstadoDetallePedido.selectAll();
      res.json(estados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getEstadoDetallePedidoById: async (req, res) => {
    try {
      const estado = await EstadoDetallePedido.findById(req.params.id);
      if (!estado) return res.status(404).json({ error: 'Estado no encontrado' });
      res.json(estado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  searchEstadosDetallesPedidosByName: async (req, res) => {
      try {
        const estadosDetallesPedidos = await EstadoDetallePedido.searchByName(req.query.name);
        res.json(estadosDetallesPedidos || []);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  },

  createEstadoDetallePedido: async (req, res) => {
    try {
      const nuevoEstado = await EstadoDetallePedido.create(req.body);
      res.status(201).json(nuevoEstado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateEstadoDetallePedido: async (req, res) => {
    try {
      const estadoActualizado = await EstadoDetallePedido.update(
        req.params.id, 
        req.body
      );
      res.json(estadoActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteEstadoDetallePedido: async (req, res) => {
    try {
      await EstadoDetallePedido.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};