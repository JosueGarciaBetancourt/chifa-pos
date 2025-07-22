import { Reserva } from '../../../electron/database/models/reserva.js';

export const reservaController = {
  getAll: async (req, res) => {
    try {
      const reservas = await Reserva.selectAll();
      res.json(reservas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const reserva = await Reserva.findById(req.params.id);
      if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });
      res.json(reserva);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByCliente: async (req, res) => {
    try {
      const reservas = await Reserva.findByCliente(req.params.clienteId);
      res.json(reservas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getActivas: async (req, res) => {
    try {
      const reservas = await Reserva.selectActivas();
      res.json(reservas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
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

  delete: async (req, res) => {
    try {
      await Reserva.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};