import { Rol } from '../../../electron/database/models/rol.js';

export const rolController = {
  getAll: async (req, res) => {
    try {
      const roles = await Rol.selectAll();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const rol = await Rol.findById(req.params.id);
      if (!rol) return res.status(404).json({ error: 'Rol no encontrado' });
      res.json(rol);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevoRol = await Rol.create(req.body);
      res.status(201).json(nuevoRol);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const rolActualizado = await Rol.update(
        req.params.id, 
        req.body
      );
      res.json(rolActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await Rol.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};