import { InventarioMovimiento } from '../../../electron/database/models/InventarioMovimiento.js';

export const inventarioMovimientosController = {
  getInventarioMovimientos: async (req, res) => {
    try {
      const movimientos = await InventarioMovimiento.selectAll();
      res.json(movimientos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getInventarioMovimientoById: async (req, res) => {
    try {
      const movimiento = await InventarioMovimiento.findById(req.params.id);
      if (!movimiento) return res.status(404).json({ error: 'Movimiento de inventario no encontrado' });
      res.json(movimiento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getInventarioMovimientoByInsumo: async (req, res) => {
    try {
      const movimientos = await InventarioMovimiento.findByInsumo(req.params.insumoId);
      res.json(movimientos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getInventarioMovimientoByUsuario: async (req, res) => {
    try {
      const movimientos = await InventarioMovimiento.findByUsuario(req.params.usuarioId);
      res.json(movimientos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createInventarioMovimiento: async (req, res) => {
    try {
      const nuevoMovimiento = await InventarioMovimiento.create(req.body);
      res.status(201).json(nuevoMovimiento);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteInventarioMovimiento: async (req, res) => {
    try {
      await InventarioMovimiento.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};