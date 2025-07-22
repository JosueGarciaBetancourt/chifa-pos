import { InventarioMovimiento } from '../../../electron/database/models/inventarioMovimiento.js';

export const inventarioMovimientoController = {
  getAll: async (req, res) => {
    try {
      const movimientos = await InventarioMovimiento.selectAll();
      res.json(movimientos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByInsumo: async (req, res) => {
    try {
      const movimientos = await InventarioMovimiento.findByInsumo(req.params.insumoId);
      res.json(movimientos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByUsuario: async (req, res) => {
    try {
      const movimientos = await InventarioMovimiento.findByUsuario(req.params.usuarioId);
      res.json(movimientos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevoMovimiento = await InventarioMovimiento.create(req.body);
      res.status(201).json(nuevoMovimiento);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await InventarioMovimiento.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};