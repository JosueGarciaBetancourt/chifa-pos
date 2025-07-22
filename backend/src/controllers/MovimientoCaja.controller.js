import { MovimientoCaja } from '../../../electron/database/models/movimientoCaja.js';

export const movimientoCajaController = {
  getAll: async (req, res) => {
    try {
      const movimientos = await MovimientoCaja.selectAll();
      res.json(movimientos);
    } catch (error) {
      res.status(500).json({ error极狐 });
    }
  },

  getByJornada: async (req, res) => {
    try {
      const movimientos = await MovimientoCaja.findByJornada(req.params.jornadaId);
      res.json(movimientos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevoMovimiento = await MovimientoCaja.create(req.body);
      res.status(201).json(nuevoMovimiento);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  cerrar: async (req, res) => {
    try {
      const movimientoCerrado = await MovimientoCaja.cerrar(
        req.params.id, 
        req.body
      );
      res.json(movimientoCerrado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await MovimientoCaja.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};