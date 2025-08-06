import { Rol_Permiso } from '../../../electron/database/models/Rol_Permiso.js';
import { Rol } from '../../../electron/database/models/Rol.js';

export const rolesPermisosController = {
  // Obtener permisos asignados a un rol
  getPermisosByRolId: async (req, res) => {
    try {
      const { rolId } = req.params;
      // (Opcional) validar que el rol exista
      const rol = Rol.findById(rolId);
      if (!rol) {
        return res.status(404).json({ error: 'Rol no encontrado' });
      }

      const permisos = Rol_Permiso.selectPermisosByRolId(rolId);
      res.json(permisos || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Asignar nuevos permisos a un rol sin borrar los anteriores (merge)
  asignarPermisosARol: async (req, res) => {
    try {
      const { rolId } = req.params;
      const { permisos } = req.body; // se espera { permisos: [1,2,3] }

      if (!Array.isArray(permisos)) {
        return res.status(400).json({ error: 'El campo "permisos" debe ser un arreglo de IDs' });
      }

      // (Opcional) validar rol existe
      const rol = Rol.findById(rolId);
      if (!rol) {
        return res.status(404).json({ error: 'Rol no encontrado' });
      }

      const permisosActualizados = Rol_Permiso.asignarPermisos(rolId, permisos);
      res.status(200).json({ rolId: rolId, nombre_rol: rol.nombre, permisos: permisosActualizados });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Reemplazar completamente los permisos de un rol
  updatePermisosARol: async (req, res) => {
    try {
      const { rolId } = req.params;
      const { permisos } = req.body;

      if (!Array.isArray(permisos)) {
        return res.status(400).json({ error: 'El campo "permisos" debe ser un arreglo de IDs' });
      }

      const rol = Rol.findById(rolId);
      if (!rol) {
        return res.status(404).json({ error: 'Rol no encontrado' });
      }

      const permisosReemplazados = Rol_Permiso.actualizarPermisos(rolId, permisos);
      res.json({ rolId: rolId, nombre_rol: rol.nombre, permisos: permisosReemplazados });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Quitar una lista de permisos (sin afectar otros)
  quitarPermisosARol: async (req, res) => {
    try {
      const { rolId } = req.params;
      const { permisos } = req.body;

      if (!Array.isArray(permisos)) {
        return res.status(400).json({ error: 'El campo "permisos" debe ser un arreglo de IDs' });
      }

      const rol = Rol.findById(rolId);
      if (!rol) {
        return res.status(404).json({ error: 'Rol no encontrado' });
      }

      const permisosRestantes = Rol_Permiso.quitarPermisos(rolId, permisos);
      res.status(200).json({ rolId: rolId, nombre_rol: rol.nombre, permisos: permisosRestantes });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
