import { Permisos } from '../../../electron/database/models/permiso.js';

export const permisosController = {
  getAll: async (req, res) => {
    try {
      const permisos = await Permisos.selectAll();
      res.json(permisos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const permiso = await Permisos.findById(req.params.id);
      if (!permiso) return res.status(404).json({ error: 'Permiso no encontrado' });
      res.json(permiso);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevoPermiso = await Permisos.create(req.body);
      res.status(201).json(nuevoPermiso);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const permisoActualizado = await Permisos.update(
        req.params.id, 
        req.body
      );
      res.json(permisoActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await Permisos.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};