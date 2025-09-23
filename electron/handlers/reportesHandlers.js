// electron/handlers/reportesHandlers.js
import { ipcMain } from "electron";
import { Reporte } from "../database/models/Reporte.js";

export function reportesHandlers() {
  // =================== CONSULTAS ===================
  ipcMain.handle("getReportes", async () => {
    try {
      return await Reporte.selectAll();
    } catch (error) {
      console.error("[IPC ERROR getReportes]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("getReporteById", async (event, id) => {
    try {
      const reporte = await Reporte.findById(id);
      return reporte || { error: "Reporte no encontrado" };
    } catch (error) {
      console.error("[IPC ERROR getReporteById]", error);
      return { error: error.message };
    }
  });

  // =================== CREAR ===================
  ipcMain.handle("createReporte", async (event, data) => {
    try {
      const {
        tipo_id,
        usuario_id,
        sede_id,
        titulo,
        descripcion,
        parametros_json,
        ruta_archivo,
        formato_archivo,
      } = data;

      // Validaciones mínimas
      if (!tipo_id || !usuario_id || !sede_id || !titulo) {
        return { error: "tipo_id, usuario_id, sede_id y titulo son requeridos" };
      }

      const nuevo = await Reporte.create({
        tipo_id,
        usuario_id,
        sede_id,
        titulo,
        descripcion,
        parametros_json,
        ruta_archivo,
        formato_archivo,
      });

      return nuevo;
    } catch (error) {
      console.error("[IPC ERROR createReporte]", error);
      return { error: error.message };
    }
  });

  // =================== ACTUALIZAR ===================
  ipcMain.handle("updateReporte", async (event, id, data) => {
    try {
      const actualizado = await Reporte.update(id, data);
      return actualizado || { error: "Reporte no encontrado" };
    } catch (error) {
      console.error("[IPC ERROR updateReporte]", error);
      return { error: error.message };
    }
  });

  // =================== ELIMINAR ===================
  ipcMain.handle("deleteReporte", async (event, id) => {
    try {
      const eliminado = await Reporte.delete(id);
      return eliminado || { error: "Reporte no encontrado" };
    } catch (error) {
      console.error("[IPC ERROR deleteReporte]", error);
      return { error: error.message };
    }
  });
}
