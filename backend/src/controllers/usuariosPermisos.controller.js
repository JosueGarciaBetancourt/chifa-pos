import { UsuarioPermiso } from '../../../electron/database/models/UsuarioPermiso.js';

export const usuariosPermisosController = {
  getUsuariosPermisos: async (req, res) => {
    try {
      const roles = await UsuarioPermiso.selectAll();
      res.json(roles || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUsuarioPermisoById: async (req, res) => {
    try {
      const rol = await UsuarioPermiso.findById(req.params.id);
      if (!rol) return res.status(404).json({ error: 'Usuario-Permiso no encontrado' });
      res.json(rol);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUsuariosPermisosByUsuario: async (req, res) => {
    try {
      const usuariosPermisos = await UsuarioPermiso.findByUsuario(req.params.usuarioId);
      res.json(usuariosPermisos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createUsuarioPermiso: async (req, res) => {
    try {
      const nuevoUsuarioPermiso = await UsuarioPermiso.create(req.body);
      res.status(201).json(nuevoUsuarioPermiso);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateUsuarioPermiso: async (req, res) => {
    try {
      const usuarioPermisoActualizado = await UsuarioPermiso.update(
        req.params.id, 
        req.body
      );
      res.json(usuarioPermisoActualizado || []);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteUsuarioPermiso: async (req, res) => {
    try {
      await UsuarioPermiso.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};