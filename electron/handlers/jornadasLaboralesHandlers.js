import { ipcMain } from 'electron';
import { JornadaLaboral } from '../database/models/JornadaLaboral.js';

export function jornadasLaboralesHandlers() {
  ipcMain.handle('getJornadasLaborales', async () => {
    try {
      return await JornadaLaboral.selectAll() || [];
    } catch (error) {
      console.error('[IPC ERROR getJornadasLaborales]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('getJornadaLaboralById', async (event, id) => {
    try {
      return await JornadaLaboral.findById(id) || null;
    } catch (error) {
      console.error('[IPC ERROR getJornadaLaboralById]', error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle('createJornadaLaboral', async (event, data) => {
    try {
      return await JornadaLaboral.create(data);
    } catch (error) {
      console.error('[IPC ERROR createJornadaLaboral]', error);
      return { error: error.message };
    }
  });

  ipcMain.handle('finalizarJornadaLaboral', async (event, id) => {
    try {
      const jornada = await JornadaLaboral.findById(id);
      if (jornada?.estado === 'finalizada') {
        return { error: 'La jornada laboral ya fue finalizada' };
      }
      return await JornadaLaboral.finalizar(id);
    } catch (error) {
      console.error('[IPC ERROR finalizarJornadaLaboral]', error);
      return { error: error.message };
    }
  });

  ipcMain.handle('getJornadaLaboralIniciadaPorUsuarioId', async (event, usuarioId) => {
    try {
      return await JornadaLaboral.findIniciadaPorUsuario(usuarioId) || null;
    } catch (error) {
      console.error('[IPC ERROR getJornadaLaboralIniciadaPorUsuarioId]', error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle('deleteJornadaLaboral', async (event, id) => {
    try {
      await JornadaLaboral.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error('[IPC ERROR deleteJornadaLaboral]', error);
      return { error: error.message, deleted: false };
    }
  });
}
