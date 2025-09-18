// electron/ipc/usuariosPermisosHandlers.js
import { ipcMain } from 'electron';
import { UsuarioPermiso } from '../database/models/UsuarioPermiso.js';

export function usuariosPermisosHandlers(db) {
  ipcMain.handle('getUsuariosPermisos', async () => {
    try {
      return await UsuarioPermiso.selectAll() || [];
    } catch (error) {
      console.error('[IPC ERROR getUsuariosPermisos]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('getUsuarioPermisoById', async (event, id) => {
    try {
      return await UsuarioPermiso.findById(id) || null;
    } catch (error) {
      console.error('[IPC ERROR getUsuarioPermisoById]', error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle('getUsuariosPermisosByUsuario', async (event, usuarioId) => {
    try {
      return await UsuarioPermiso.findByUsuario(usuarioId) || [];
    } catch (error) {
      console.error('[IPC ERROR getUsuariosPermisosByUsuario]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('createUsuarioPermiso', async (event, data) => {
    try {
      return await UsuarioPermiso.create(data);
    } catch (error) {
      console.error('[IPC ERROR createUsuarioPermiso]', error);
      return { error: error.message };
    }
  });

  ipcMain.handle('updateUsuarioPermiso', async (event, id, data) => {
    try {
      return await UsuarioPermiso.update(id, data);
    } catch (error) {
      console.error('[IPC ERROR updateUsuarioPermiso]', error);
      return { error: error.message };
    }
  });

  ipcMain.handle('deleteUsuarioPermiso', async (event, id) => {
    try {
      await UsuarioPermiso.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error('[IPC ERROR deleteUsuarioPermiso]', error);
      return { error: error.message, deleted: false };
    }
  });
}
