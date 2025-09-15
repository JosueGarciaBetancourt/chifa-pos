import { LogSistema } from '../../../electron/database/models/LogSistema.js';

export const logsSistemaController = {
  getLogsSistema: async (req, res) => {
    try {
      const logs = await LogSistema.selectAll();
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getLogsByUsuario: async (req, res) => {
    try {
      const logs = await LogSistema.findByUsuario(req.params.usuarioId);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createLog: async (req, res) => {
    try {
      await LogSistema.create(req.body);
      res.status(201).json({ message: 'Log creado correctamente' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteLog: async (req, res) => {
    try {
      await LogSistema.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};