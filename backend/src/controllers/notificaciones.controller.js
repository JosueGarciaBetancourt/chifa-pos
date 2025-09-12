import { Notificacion } from '../../../electron/database/models/Notificacion.js';

export const notificacionesController = {
  getNotificaciones: async (req, res) => {
    try {
      const notificaciones = await Notificacion.selectAll();
      res.json(notificaciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getNotificacionesByUsuario: async (req, res) => {
    try {
      const notificaciones = await Notificacion.findByUsuario(req.params.usuarioId);
      res.json(notificaciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getNotificacionById: async (req, res) => {
    try {
      const notificacion = await Notificacion.findById(req.params.id);
      if (!notificacion) return res.status(404).json({ error: 'Notificación no encontrada' });
      res.json(notificacion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createNotificacion: async (req, res) => {
    try {
      const nuevaNotificacion = await Notificacion.create(req.body);
      res.status(201).json(nuevaNotificacion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  marcarLeida: async (req, res) => {
    try {
      await Notificacion.marcarLeida(req.params.id);
      res.json({ message: 'Notificación marcada como leída' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  marcarTodasLeidas: async (req, res) => {
    try {
      await Notificacion.marcarTodasLeidas(req.params.usuarioId);
      res.json({ message: 'Todas las notificaciones marcadas como leídas' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteNotificacion: async (req, res) => {
    try {
      await Notificacion.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};