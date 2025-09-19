import { Reserva } from '../../../electron/database/models/Reserva.js';

export const reservasController = {
  getReservas: async (req, res) => {
    try {
      const reservas = await Reserva.selectAll();
      res.json(reservas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getReservaById: async (req, res) => {
    try {
      const reserva = await Reserva.findById(req.params.id);
      if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });
      res.json(reserva);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getReservasByCliente: async (req, res) => {
    try {
      const reservas = await Reserva.findByCliente(req.params.clienteId);
      res.json(reservas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getReservasActivas: async (req, res) => {
    try {
      const reservas = await Reserva.selectActivas();
      res.json(reservas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createReserva: async (req, res) => {
    try {
      const nuevaReserva = await Reserva.create(req.body);
      res.status(201).json(nuevaReserva);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateEstado: async (req, res) => {
    try {
      const reservaActualizada = await Reserva.updateEstado(
        req.params.id, 
        req.body.estado
      );
      res.json(reservaActualizada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteReserva: async (req, res) => {
    try {
      await Reserva.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};