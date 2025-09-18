import { ipcMain } from 'electron';
import { EmpresaLocal } from '../database/models/EmpresaLocal.js';

export function empresaLocalHandlers(db) {
  ipcMain.handle('getEmpresaLocalAll', () => {
    try {
      return EmpresaLocal.selectAll() || [];
    } catch (error) {
      console.error('[IPC ERROR getEmpresaLocalAll]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('getEmpresaLocalActive', () => {
    try {
      return EmpresaLocal.selectActive() || [];
    } catch (error) {
      console.error('[IPC ERROR getEmpresaLocalActive]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('getEmpresaLocalInactive', () => {
    try {
      return EmpresaLocal.selectInactive() || [];
    } catch (error) {
      console.error('[IPC ERROR getEmpresaLocalInactive]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('getEmpresaLocalPrincipal', () => {
    try {
      return EmpresaLocal.selectPrincipal() || [];
    } catch (error) {
      console.error('[IPC ERROR getEmpresaLocalPrincipal]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('updateEmpresaLocal', (event, id, data) => {
    try {
      return EmpresaLocal.update(id, data) || [];
    } catch (error) {
      console.error('[IPC ERROR updateEmpresaLocal]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('disableEmpresaLocal', (event, id) => {
    try {
      EmpresaLocal.disable(id);
      return { disabled: true };
    } catch (error) {
      console.error('[IPC ERROR disableEmpresaLocal]', error);
      return { error: error.message, disabled: false };
    }
  });

  ipcMain.handle('enableEmpresaLocal', (event, id) => {
    try {
      return EmpresaLocal.enable(id);
    } catch (error) {
      console.error('[IPC ERROR enableEmpresaLocal]', error);
      return { error: error.message };
    }
  });
}
