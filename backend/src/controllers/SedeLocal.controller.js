import { SedeLocal } from '../../../electron/database/models/SedeLocal.js';

export const sedeLocalController = {
  getSedeLocalAll: async (req, res) => {
    try {
      const sedes = await SedeLocal.selectAll();
      res.json(sedes || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getSedeLocalActive: async (req, res) => {
    try {
      const sedes = await SedeLocal.selectActive();
      res.json(sedes || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getSedeLocalInactive: async (req, res) => {
    try {
      const sedes = await SedeLocal.selectInactive();
      res.json(sedes || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateSedeLocal: async (req, res) => {
    try {
      const sedeActualizada = await SedeLocal.update(
        req.params.id, 
        req.body
      );
      res.json(sedeActualizada || []);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  disableSedeLocal: async (req, res) => {
    try {
      await SedeLocal.disable(req.params.id);
      res.status(200).json({ disabled: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  enableSedeLocal: async (req, res) => {
    try {
      const sedeEnabled = await SedeLocal.enable(req.params.id);
      res.status(200).json(sedeEnabled);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};