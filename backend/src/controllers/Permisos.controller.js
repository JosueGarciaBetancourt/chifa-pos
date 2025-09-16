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

  createPermiso: async (req, res) => {
    try {
      const { modulo_id, accion_id } = req.body;
      if (!modulo_id || !accion_id) {
        return res.status(400).json({ error: 'modulo_id y accion_id son requeridos' });
      }
      const nuevoPermiso = await Permiso.create({ modulo_id, accion_id });
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

  deletePermiso: async (req, res) => {
    try {
      await Permiso.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};