// electron/handlers/comprobantesVentaHandlers.js
import { ipcMain } from "electron";
import { ComprobanteVenta } from "../database/models/ComprobanteVenta.js";
import { CalculosFinancieros } from "../database/utils/calculosFinancieros.js";

export function comprobantesVentaHandlers() {
  // Obtener todos los comprobantes de venta
  ipcMain.handle("getComprobantesVenta", async () => {
    try {
      return (await ComprobanteVenta.selectAll()) || [];
    } catch (error) {
      console.error("[IPC ERROR getComprobantesVenta]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener comprobante de venta por ID
  ipcMain.handle("getComprobanteVentaById", async (event, id) => {
    try {
      return (await ComprobanteVenta.findById(id)) || null;
    } catch (error) {
      console.error("[IPC ERROR getComprobanteVentaById]", error);
      return { error: error.message, data: null };
    }
  });

  // Obtener comprobantes de venta por pedido ID
  ipcMain.handle("getComprobantesVentaByPedidoId", async (event, pedidoId) => {
    try {
      return (await ComprobanteVenta.findByPedidoId(pedidoId)) || [];
    } catch (error) {
      console.error("[IPC ERROR getComprobantesVentaByPedidoId]", error);
      return { error: error.message, data: [] };
    }
  });

  // Crear nuevo comprobante de venta
  ipcMain.handle("createComprobanteVenta", async (event, data) => {
    try {
      const { total } = data;
      const subTotal = CalculosFinancieros.calcularSubtotal(total);
      const igv = CalculosFinancieros.calcularIGV(total);
      const payload = { ...data, subTotal, igv };

      return await ComprobanteVenta.create(payload);
    } catch (error) {
      console.error("[IPC ERROR createComprobanteVenta]", error);
      return { error: error.message };
    }
  });

  // Actualizar estado del comprobante
  ipcMain.handle("updateEstadoComprobanteVenta", async (event, id, estado_id) => {
    try {
      return await ComprobanteVenta.updateEstado(id, estado_id);
    } catch (error) {
      console.error("[IPC ERROR updateEstadoComprobanteVenta]", error);
      return { error: error.message };
    }
  });

  // Actualizar XML del comprobante
  ipcMain.handle("updateXMLComprobanteVenta", async (event, id, xml_base64) => {
    try {
      return await ComprobanteVenta.updateXML(id, xml_base64);
    } catch (error) {
      console.error("[IPC ERROR updateXMLComprobanteVenta]", error);
      return { error: error.message };
    }
  });

  // Eliminar comprobante de venta
  ipcMain.handle("deleteComprobanteVenta", async (event, id) => {
    try {
      await ComprobanteVenta.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error("[IPC ERROR deleteComprobanteVenta]", error);
      return { error: error.message, deleted: false };
    }
  });
}
