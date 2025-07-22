import { SedeLocal } from '../../../electron/database/models/sedeLocal.js';

export const sedeLocalController = {
  getAll: async (req, res) => {
    try {
      const sedes = await SedeLocal.selectAll();
      res.json(sedes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const sede = await SedeLocal.findById(req.params.id);
      if (!sede) return res.status(404).json({ error: 'Sede no encontrada' });
      res.json(sede);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevaSede = await SedeLocal.create(req.body);
      res.status(201).json(nuevaSede);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const sedeActualizada = await SedeLocal.update(
        req.params.id, 
        req.body
      );
      res.json(sedeActualizada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await SedeLocal.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};