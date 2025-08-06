import { Usuario } from '../../../electron/database/models/Usuario.js';

export const usuariosController = {
  // Obtener todos los usuarios
  getUsuarios: async (req, res) => {
    try {
      const usuarios = await Usuario.selectAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener un usuario por ID
  getUsuarioById: async (req, res) => {
    try {
      const user = await Usuario.findById(req.params.id);
      if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener un usuario por DNI
  getUsuarioByDni: async (req, res) => {
    try {
      const user = await Usuario.findByDni(req.params.dni);
      if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener un usuario por username
  getByUsername: async (req, res) => {
    try {
      const user = await Usuario.findByUsername(req.params.username);
      if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Crear un nuevo usuario
  createUsuario: async (req, res) => {
    try {
      const { dni, nombre, apellido, rol_id, username, password, activo } = req.body;
      const existing = await Usuario.findByDni(dni);
      if (existing) {
        return res.status(409).json({ error: 'Ya existe un usuario con ese DNI' });
      }
      const newUser = await Usuario.create({ dni, nombre, apellido, rol_id, username, password, activo });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Actualizar un usuario existente
  updateUsuario: async (req, res) => {
    try {
      const updated = await Usuario.update(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Eliminar un usuario por ID
  deleteUsuario: async (req, res) => {
    try {
      await Usuario.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Cambiar estado activo/inactivo de un usuario
  toggleActive: async (req, res) => {
    try {
      const user = await Usuario.findById(req.params.id);
      if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
      const updated = await Usuario.update(req.params.id, { activo: user.activo ? 0 : 1 });
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Actualizar contraseña
  changePassword: async (req, res) => {
    try {
      const { password } = req.body;
      if (!password) return res.status(400).json({ error: 'La contraseña es obligatoria' });
      const updated = await Usuario.update(req.params.id, { password });
      res.json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
