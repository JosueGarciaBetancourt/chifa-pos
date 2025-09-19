import { EstadoComprobante } from '../../../electron/database/models/EstadoComprobante.js';

export const estadosComprobantesController = {
  getEstadosComprobantes: async (req, res) => {
    try {
      const estados = await EstadoComprobante.selectAll();
      res.json(estados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getEstadoComprobanteById: async (req, res) => {
    try {
      const estado = await EstadoComprobante.findById(req.params.id);
      if (!estado) return res.status(404).json({ error: 'Estado de comprobante no encontrado' });
      res.json(estado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  searchEstadosComprobantesByName: async (req, res) => {
      try {
        const estadosComprobantes = await EstadoComprobante.searchByName(req.query.name);
        res.json(estadosComprobantes || []);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  },

  createEstadoComprobante: async (req, res) => {
    try {
      const nuevoEstado = await EstadoComprobante.create(req.body);
      res.status(201).json(nuevoEstado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateEstadoComprobante: async (req, res) => {
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

  deleteEstadoComprobante: async (req, res) => {
    try {
      await EstadoComprobante.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};