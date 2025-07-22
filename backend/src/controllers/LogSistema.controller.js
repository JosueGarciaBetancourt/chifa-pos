import { LogSistema } from '../../../electron/database/models/logSistema.js';

export const logSistemaController = {
  getAll: async (req, res) => {
    try {
      const logs = await LogSistema.selectAll();
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByUsuario: async (req, res) => {
    try {
      const logs = await LogSistema.findByUsuario(req.params.usuarioId);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      await LogSistema.create(req.body);
      res.status(201).json({ message: 'Log creado correctamente' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await LogSistema.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};