import { Permiso } from '../../../electron/database/models/Permiso.js';

export const permisosController = {
  getPermisos: async (req, res) => {
    try {
      const permisos = await Permiso.selectAll();
      res.json(permisos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getPermisoById: async (req, res) => {
    try {
      const permiso = await Permiso.findById(req.params.id);
      if (!permiso) return res.status(404).json({ error: 'Permiso no encontrado' });
      res.json(permiso);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getPermisosActive: async (req, res) => {
    try {
      const permisos = await Permiso.selectActive();
      res.json(permisos || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getPermisosInactive: async (req, res) => {
    try {
      const permisos = await Permiso.selectInactive();
      res.json(permisos || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createPermiso: async (req, res) => {
    try {
      const nuevoPermiso = await Permiso.create(req.body);
      res.status(201).json(nuevoPermiso);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updatePermiso: async (req, res) => {
    try {
      const permisoActualizado = await Permiso.update(
        req.params.id, 
        req.body
      );
      res.json(permisoActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  disablePermiso: async (req, res) => {
    try {
      await Permiso.disable(req.params.id);
      res.status(200).json({ disabled: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  enablePermiso: async (req, res) => {
    try {
      const permisoEnabled = await Permiso.enable(req.params.id);
      res.status(200).json(permisoEnabled);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deletePermiso: async (req, res) => {
    try {
      await Permiso.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};