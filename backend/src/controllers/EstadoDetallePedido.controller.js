import { EstadoDetallePedido } from '../../../electron/database/models/estadoDetallePedido.js';

export const estadoDetallePedidoController = {
  getAll: async (req, res) => {
    try {
      const estados = await EstadoDetallePedido.selectAll();
      res.json(estados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const estado = await EstadoDetallePedido.findById(req.params.id);
      if (!estado) return res.status(404).json({ error: 'Estado no encontrado' });
      res.json(estado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByNombre: async (req, res) => {
    try {
      const estado = await EstadoDetallePedido.findByNombre(req.params.nombre);
      if (!estado) return res.status(404).json({ error: 'Estado no encontrado' });
      res.json(estado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevoEstado = await EstadoDetallePedido.create(req.body);
      res.status(201).json(nuevoEstado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
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

  delete: async (req, res) => {
    try {
      await EstadoDetallePedido.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};