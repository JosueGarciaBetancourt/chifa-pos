import { TipoComprobante } from '../../../electron/database/models/TipoComprobante.js';

export const tiposComprobantesController = {
  getTiposComprobantes: async (req, res) => {
    try {
      const tipos = await TipoComprobante.selectAll();
      res.json(tipos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getTipoComprobanteById: async (req, res) => {
    try {
      const tipo = await TipoComprobante.findById(req.params.id);
      if (!tipo) return res.status(404).json({ error: 'Tipo  de comprobante no encontrado' });
      res.json(tipo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  searchTiposComprobantesByName: async (req, res) => {
      try {
        const estadosComprobantes = await TipoComprobante.searchByName(req.query.name);
        res.json(estadosComprobantes || []);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  },

  createTipoComprobante: async (req, res) => {
    try {
      const nuevoTipo = await TipoComprobante.create(req.body);
      res.status(201).json(nuevoTipo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateTipoComprobante: async (req, res) => {
    try {
      const tipoActualizado = await TipoComprobante.update(
        req.params.id, 
        req.body
      );
      res.json(tipoActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteTipoComprobante: async (req, res) => {
    try {
      await TipoComprobante.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};