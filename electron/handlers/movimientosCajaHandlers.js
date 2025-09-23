// electron/handlers/movimientosCajaHandlers.js
import { ipcMain } from "electron";
import { MovimientoCaja } from "../database/models/MovimientoCaja.js";
import { aperturasCajaController } from "../../backend/src/controllers/aperturasCaja.controller.js";
import { cierresCajaController } from "../../backend/src/controllers/cierresCaja.controller.js";
import { ingresosEgresosCajaController } from "../../backend/src/controllers/ingresosEgresosCaja.controller.js";
import { ComprobanteVenta } from "../database/models/ComprobanteVenta.js";
import { Gasto } from "../database/models/Gasto.js";

export function movimientosCajaHandlers() {
  // =================== CONSULTAS GENERALES ===================
  ipcMain.handle("getMovimientosCaja", async () => {
    try {
      return MovimientoCaja.selectAll() || [];
    } catch (error) {
      console.error("[IPC ERROR getMovimientosCaja]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getMovimientoCajaById", async (event, id) => {
    try {
      return MovimientoCaja.findById(id) || null;
    } catch (error) {
      console.error("[IPC ERROR getMovimientoCajaById]", error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle("getMovimientosCajaByJornada", async (event, jornadaId) => {
    try {
      return MovimientoCaja.findByJornada(parseInt(jornadaId)) || [];
    } catch (error) {
      console.error("[IPC ERROR getMovimientosCajaByJornada]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getMovimientosCajaByUsuario", async (event, usuarioId) => {
    try {
      return MovimientoCaja.findByUsuario(parseInt(usuarioId)) || [];
    } catch (error) {
      console.error("[IPC ERROR getMovimientosCajaByUsuario]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getMovimientosCajaByCaja", async (event, cajaId) => {
    try {
      return MovimientoCaja.findByCaja(cajaId) || [];
    } catch (error) {
      console.error("[IPC ERROR getMovimientosCajaByCaja]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getMovimientosCajaByTipo", async (event, tipo) => {
    try {
      return MovimientoCaja.findByTipo(tipo) || [];
    } catch (error) {
      console.error("[IPC ERROR getMovimientosCajaByTipo]", error);
      return { error: error.message, data: [] };
    }
  });

  // =================== CONSULTAS DE ESTADO ===================
  ipcMain.handle("getEstadoCaja", async (event, cajaId) => {
    try {
      const cajaAbierta = MovimientoCaja.getCajaAbierta(cajaId);
      if (!cajaAbierta) return { caja_abierta: false };

      const saldo = MovimientoCaja.calcularSaldoCaja(cajaId, cajaAbierta.movimiento_apertura_id);
      return {
        caja_abierta: true,
        movimiento_apertura_id: cajaAbierta.movimiento_apertura_id,
        fecha_hora: cajaAbierta.fecha_hora,
        monto_inicial: cajaAbierta.monto_inicial,
        saldo_actual: saldo,
      };
    } catch (error) {
      console.error("[IPC ERROR getEstadoCaja]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("getResumenCaja", async (event, cajaId, fecha_inicio, fecha_fin) => {
    try {
      const resumen = MovimientoCaja.getResumenCaja(parseInt(cajaId), fecha_inicio, fecha_fin);
      return { data: resumen };
    } catch (error) {
      console.error("[IPC ERROR getResumenCaja]", error);
      return { error: error.message };
    }
  });

  // =================== OPERACIONES DE CAJA ===================
  ipcMain.handle("abrirCaja", async (event, data) => {
    try {
      const { caja_id, usuario_id, jornada_laboral_id, monto_inicial, observaciones } = data;
      const cajaAbierta = MovimientoCaja.getCajaAbierta(caja_id);
      if (cajaAbierta) {
        return { error: "La caja ya está abierta", apertura_activa: cajaAbierta };
      }

      const movimiento = MovimientoCaja.insertMovimientoBase({
        caja_id,
        tipo: "apertura",
        usuario_id,
        jornada_laboral_id,
        observaciones,
      });

      aperturasCajaController.abrirCaja(movimiento.id, monto_inicial);
      return MovimientoCaja.findById(movimiento.id);
    } catch (error) {
      console.error("[IPC ERROR abrirCaja]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("cerrarCaja", async (event, data) => {
    try {
      const { movimiento_apertura_id, usuario_id, jornada_laboral_id, monto_final_manual, observaciones } = data;
      const caja_id = MovimientoCaja.selectCajaIdByAperturaId(movimiento_apertura_id);
      if (!caja_id) return { error: "movimiento_apertura_id no válido" };

      const cajaAbierta = MovimientoCaja.getCajaAbierta(caja_id);
      if (!cajaAbierta) return { error: "No hay una caja abierta para cerrar" };

      const movimiento = MovimientoCaja.insertMovimientoBase({
        caja_id,
        tipo: "cierre",
        usuario_id,
        jornada_laboral_id,
        observaciones,
      });

      cierresCajaController.cerrarCaja(movimiento.id, movimiento_apertura_id, monto_final_manual);
      return MovimientoCaja.findById(movimiento.id);
    } catch (error) {
      console.error("[IPC ERROR cerrarCaja]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("ingresoCaja", async (event, data) => {
    try {
      const { movimiento_apertura_id, comprobante_id, usuario_id, jornada_laboral_id, observaciones } = data;
      const caja_id = MovimientoCaja.selectCajaIdByAperturaId(movimiento_apertura_id);
      if (!caja_id) return { error: "movimiento_apertura_id no válido" };

      const cajaAbierta = MovimientoCaja.getCajaAbierta(caja_id);
      if (!cajaAbierta) return { error: "No hay una caja abierta para registrar el ingreso" };

      const movimiento = MovimientoCaja.insertMovimientoBase({
        caja_id,
        tipo: "ingreso",
        usuario_id,
        jornada_laboral_id,
        observaciones,
      });

      const monto = ComprobanteVenta.selectTotalById(comprobante_id);
      ingresosEgresosCajaController.registrarIngreso(movimiento.id, movimiento_apertura_id, comprobante_id, monto);

      return MovimientoCaja.findById(movimiento.id);
    } catch (error) {
      console.error("[IPC ERROR ingresoCaja]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("egresoCaja", async (event, data) => {
    try {
      const { movimiento_apertura_id, gasto_id, usuario_id, jornada_laboral_id, observaciones } = data;
      const caja_id = MovimientoCaja.selectCajaIdByAperturaId(movimiento_apertura_id);
      if (!caja_id) return { error: "movimiento_apertura_id no válido" };

      const cajaAbierta = MovimientoCaja.getCajaAbierta(caja_id);
      if (!cajaAbierta) return { error: "No hay una caja abierta para registrar el egreso" };

      const movimiento = MovimientoCaja.insertMovimientoBase({
        caja_id,
        tipo: "egreso",
        usuario_id,
        jornada_laboral_id,
        observaciones,
      });

      const monto = Gasto.selectMontoById(gasto_id);
      ingresosEgresosCajaController.registrarEgreso(movimiento.id, movimiento_apertura_id, gasto_id, monto);

      return MovimientoCaja.findById(movimiento.id);
    } catch (error) {
      console.error("[IPC ERROR egresoCaja]", error);
      return { error: error.message };
    }
  });

  // =================== OPERACIONES GENERALES ===================
  ipcMain.handle("updateMovimientoCaja", async (event, id, data) => {
    try {
      return MovimientoCaja.update(parseInt(id), { observaciones: data.observaciones });
    } catch (error) {
      console.error("[IPC ERROR updateMovimientoCaja]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("deleteMovimientoCaja", async (event, id) => {
    try {
      return MovimientoCaja.delete(parseInt(id));
    } catch (error) {
      console.error("[IPC ERROR deleteMovimientoCaja]", error);
      return { error: error.message };
    }
  });
}
