// electron/handlers/tiposReportesHandlers.js
import { ipcMain } from "electron";
import { TipoReporte } from "../database/models/TipoReporte.js";

export function tiposReportesHandlers() {
  // =================== CONSULTAS GENERALES ===================
  ipcMain.handle("getTiposReportes", async () => {
    try {
      return TipoReporte.selectAll() || [];
    } catch (error) {
      console.error("[IPC ERROR getTiposReportes]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getTipoReporteById", async (event, id) => {
    try {
      return TipoReporte.findById(id) || null;
    } catch (error) {
      console.error("[IPC ERROR getTipoReporteById]", error);
      return { error: error.message, data: null };
    }
  });
}
