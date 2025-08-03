import { Rol } from '../../../electron/database/models/Rol.js';

export const rolesController = {
  getRoles: async (req, res) => {
    try {
      const roles = await Rol.selectAll();
      res.json(roles || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getRolById: async (req, res) => {
    try {
      const rol = await Rol.findById(req.params.id);
      if (!rol) return res.status(404).json({ error: 'Rol no encontrado' });
      res.json(rol);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getRolesActive: async (req, res) => {
    try {
      const roles = await Rol.selectActive();
      res.json(roles || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getRolesInactive: async (req, res) => {
    try {
      const roles = await Rol.selectInactive();
      res.json(roles || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createRol: async (req, res) => {
    try {
      const nuevoRol = await Rol.create(req.body);
      res.status(201).json(nuevoRol);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateRol: async (req, res) => {
    try {
      const rolActualizado = await Rol.update(
        req.params.id, 
        req.body
      );
      res.json(rolActualizado || []);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  disableRol: async (req, res) => {
    try {
      await Rol.disable(req.params.id);
      res.status(200).json({ disabled: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  enableRol: async (req, res) => {
    try {
      const rolEnabled = await Rol.enable(req.params.id);
      res.status(200).json(rolEnabled);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  deleteRol: async (req, res) => {
    try {
      await Rol.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};