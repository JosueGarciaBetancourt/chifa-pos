import { TipoComprobante } from '../../../electron/database/models/tipoComprobante.js';

export const tipoComprobanteController = {
  getAll: async (req, res) => {
    try {
      const tipos = await TipoComprobante.selectAll();
      res.json(tipos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const tipo = await TipoComprobante.findById(req.params.id);
      if (!tipo) return res.status(404).json({ error: 'Tipo no encontrado' });
      res.json(tipo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByNombre: async (req, res) => {
    try {
      const tipo = await TipoComprobante.findByNombre(req.params.nombre);
      if (!tipo) return res.status(404).json({ error: 'Tipo no encontrado' });
      res.json(tipo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevoTipo = await TipoComprobante.create(req.body);
      res.status(201).json(nuevoTipo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
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

  delete: async (req, res) => {
    try {
      await TipoComprobante.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};