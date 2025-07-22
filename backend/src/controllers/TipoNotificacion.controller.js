import { TipoNotificacion } from '../../../electron/database/models/tipoNotificacion.js';

export const tipoNotificacionController = {
  getAll: async (req, res) => {
    try {
      const tipos = await TipoNotificacion.selectAll();
      res.json(tipos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const tipo = await TipoNotificacion.findById(req.params.id);
      if (!tipo) return res.status(404).json({ error: 'Tipo no encontrado' });
      res.json(tipo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevoTipo = await TipoNotificacion.create(req.body);
      res.status(201).json(nuevoTipo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const tipoActualizado = await TipoNotificacion.update(
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
      await TipoNotificacion.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};