// electron/ipc/insumosHandlers.js
import { ipcMain } from "electron";
import { InventarioService } from '../services/InventarioService.js';

export function inventarioHandlers() {
  ipcMain.handle("getInventarioDetallado", async () => {
    try {
      return await InventarioService.getInventarioDetallado();
    } catch (error) {
      console.error("[IPC ERROR getInventarioDetallado]", error);
      return { error: error.message, data: [] };
    }
  });
}
