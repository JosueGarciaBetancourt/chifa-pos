import { EstadoComprobante } from '../../../electron/database/models/estadoComprobante.js';

export const estadoComprobanteController = {
  getAll: async (req, res) => {
    try {
      const estados = await EstadoComprobante.selectAll();
      res.json(estados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const estado = await EstadoComprobante.findById(req.params.id);
      if (!estado) return res.status(404).json({ error: 'Estado no encontrado' });
      res.json(estado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByNombre: async (req, res) => {
    try {
      const estado = await EstadoComprobante.findByNombre(req.params.nombre);
      if (!estado) return res.status(404).json({ error: 'Estado no encontrado' });
      res.json(estado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevoEstado = await EstadoComprobante.create(req.body);
      res.status(201).json(nuevoEstado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const estadoActualizado = await EstadoComprobante.update(
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
      await EstadoComprobante.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};