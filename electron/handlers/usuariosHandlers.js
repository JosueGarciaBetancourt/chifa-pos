import { ipcMain } from 'electron';
import { Usuario } from '../database/models/Usuario.js';

export function usuariosHandlers() {
  ipcMain.handle('getUsuarios', async () => {
    try {
      return await Usuario.selectAll();
    } catch (error) {
      console.error('[IPC ERROR getUsuarios]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('getUsuarioById', async (event, id) => {
    try {
      return await Usuario.findById(id) || null;
    } catch (error) {
      console.error('[IPC ERROR getUsuarioById]', error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle('getUsuariosActive', async () => {
    try {
      return await Usuario.selectActive() || [];
    } catch (error) {
      console.error('[IPC ERROR getUsuariosActive]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('getUsuariosInactive', async () => {
    try {
      return await Usuario.selectInactive() || [];
    } catch (error) {
      console.error('[IPC ERROR getUsuariosInactive]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('getUsuarioByDni', async (event, dni) => {
    try {
      return await Usuario.findByDni(dni) || null;
    } catch (error) {
      console.error('[IPC ERROR getUsuarioByDni]', error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle('searchUsuariosByUsername', async (event, username) => {
    try {
      return await Usuario.searchByUsername(username) || [];
    } catch (error) {
      console.error('[IPC ERROR searchUsuariosByUsername]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('createUsuario', async (event, data) => {
    try {
      const existing = await Usuario.findByDni(data.dni);
      if (existing) {
        return { error: 'Ya existe un usuario con ese DNI' };
      }
      return await Usuario.create(data);
    } catch (error) {
      console.error('[IPC ERROR createUsuario]', error);
      return { error: error.message };
    }
  });

  ipcMain.handle('updateUsuario', async (event, id, data) => {
    try {
      return await Usuario.update(id, data);
    } catch (error) {
      console.error('[IPC ERROR updateUsuario]', error);
      return { error: error.message };
    }
  });

  ipcMain.handle('disableUsuario', async (event, id) => {
    try {
      await Usuario.disable(id);
      return { disabled: true };
    } catch (error) {
      console.error('[IPC ERROR disableUsuario]', error);
      return { error: error.message, disabled: false };
    }
  });

  ipcMain.handle('enableUsuario', async (event, id) => {
    try {
      return await Usuario.enable(id);
    } catch (error) {
      console.error('[IPC ERROR enableUsuario]', error);
      return { error: error.message };
    }
  });

  ipcMain.handle('deleteUsuario', async (event, id) => {
    try {
      await Usuario.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error('[IPC ERROR deleteUsuario]', error);
      return { error: error.message, deleted: false };
    }
  });
}
