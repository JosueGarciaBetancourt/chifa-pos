// electron/handlers/reservasHandlers.js
import { ipcMain } from "electron";
import { Reserva } from "../database/models/Reserva.js";

export function reservasHandlers() {
  // Obtener todas las reservas
  ipcMain.handle("getReservas", async () => {
    try {
      return (await Reserva.selectAll()) || [];
    } catch (error) {
      console.error("[IPC ERROR getReservas]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener reserva por ID
  ipcMain.handle("getReservaById", async (event, id) => {
    try {
      return (await Reserva.findById(id)) || null;
    } catch (error) {
      console.error("[IPC ERROR getReservaById]", error);
      return { error: error.message, data: null };
    }
  });

  // Obtener reservas por cliente
  ipcMain.handle("getReservasByCliente", async (event, clienteId) => {
    try {
      return (await Reserva.findByCliente(clienteId)) || [];
    } catch (error) {
      console.error("[IPC ERROR getReservasByCliente]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener reservas activas
  ipcMain.handle("getReservasActivas", async () => {
    try {
      return (await Reserva.selectActivas()) || [];
    } catch (error) {
      console.error("[IPC ERROR getReservasActivas]", error);
      return { error: error.message, data: [] };
    }
  });

  // Crear nueva reserva
  ipcMain.handle("createReserva", async (event, data) => {
    try {
      return await Reserva.create(data);
    } catch (error) {
      console.error("[IPC ERROR createReserva]", error);
      return { error: error.message };
    }
  });

  // Actualizar estado de una reserva
  ipcMain.handle("updateEstadoReserva", async (event, id, estado) => {
    try {
      return await Reserva.updateEstado(id, estado);
    } catch (error) {
      console.error("[IPC ERROR updateEstadoReserva]", error);
      return { error: error.message };
    }
  });

  // Eliminar una reserva
  ipcMain.handle("deleteReserva", async (event, id) => {
    try {
      await Reserva.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error("[IPC ERROR deleteReserva]", error);
      return { error: error.message, deleted: false };
    }
  });
}
