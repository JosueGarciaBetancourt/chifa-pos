import { TipoNotificacion } from '../../../electron/database/models/TipoNotificacion.js';

export const tiposNotificacionesController = {
  getTiposNotificaciones: async (req, res) => {
    try {
      const tipos = await TipoNotificacion.selectAll();
      res.json(tipos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getTipoNotificacionById: async (req, res) => {
    try {
      const tipo = await TipoNotificacion.findById(req.params.id);
      if (!tipo) return res.status(404).json({ error: 'Tipo de notificación no encontrado' });
      res.json(tipo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};