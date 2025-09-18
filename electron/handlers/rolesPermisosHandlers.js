import { ipcMain } from 'electron';
import { Rol } from '../database/models/Rol.js';
import { Rol_Permiso } from '../database/models/Rol_Permiso.js';

export function rolesPermisosHandlers(db) {
  ipcMain.handle('getPermisosByRolId', async (event, rolId) => {
    try {
      const rol = await Rol.findById(rolId);
      if (!rol) {
        return { error: 'Rol no encontrado', data: [] };
      }

      const permisos = await Rol_Permiso.selectPermisosByRolId(rolId);
      return permisos || [];
    } catch (error) {
      console.error('[IPC ERROR getPermisosByRolId]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('asignarPermisosARol', async (event, rolId, permisos) => {
    try {
      if (!Array.isArray(permisos)) {
        throw new Error('El campo "permisos" debe ser un arreglo de IDs');
      }

      const rol = await Rol.findById(rolId);
      if (!rol) {
        return { error: 'Rol no encontrado' };
      }

      const permisosActualizados = await Rol_Permiso.asignarPermisos(rolId, permisos);
      return { rolId, nombre_rol: rol.nombre, permisos: permisosActualizados };
    } catch (error) {
      console.error('[IPC ERROR asignarPermisosARol]', error);
      return { error: error.message };
    }
  });

  ipcMain.handle('updatePermisosARol', async (event, rolId, permisos) => {
    try {
      if (!Array.isArray(permisos)) {
        throw new Error('El campo "permisos" debe ser un arreglo de IDs');
      }

      const rol = await Rol.findById(rolId);
      if (!rol) {
        return { error: 'Rol no encontrado' };
      }

      const permisosReemplazados = await Rol_Permiso.actualizarPermisos(rolId, permisos);
      return { rolId, nombre_rol: rol.nombre, permisos: permisosReemplazados };
    } catch (error) {
      console.error('[IPC ERROR updatePermisosARol]', error);
      return { error: error.message };
    }
  });

  // 📌 Quitar permisos específicos de un rol
  ipcMain.handle('quitarPermisosARol', async (event, rolId, permisos) => {
    try {
      if (!Array.isArray(permisos)) {
        throw new Error('El campo "permisos" debe ser un arreglo de IDs');
      }

      const rol = await Rol.findById(rolId);
      if (!rol) {
        return { error: 'Rol no encontrado' };
      }

      const permisosRestantes = await Rol_Permiso.quitarPermisos(rolId, permisos);
      return { rolId, nombre_rol: rol.nombre, permisos: permisosRestantes };
    } catch (error) {
      console.error('[IPC ERROR quitarPermisosARol]', error);
      return { error: error.message };
    }
  });
}
