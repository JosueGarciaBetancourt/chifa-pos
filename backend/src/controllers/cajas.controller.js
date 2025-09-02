import { Caja } from '../../../electron/database/models/Caja.js';

export const cajasController = {
  getCajas: async (req, res) => {
    try {
      const cajas = await Caja.selectAll();
      res.json(cajas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCajaById: async (req, res) => {
    try {
      const caja = await Caja.findById(req.params.id);
      if (!caja) return res.status(404).json({ error: 'Caja no encontrada' });
      res.json(caja);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCajasActive: async (req, res) => {
    try {
      const cajas = await Caja.selectActive();
      res.json(cajas || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCajasInactive: async (req, res) => {
    try {
      const cajas = await Caja.selectInactive();
      res.json(cajas || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createCaja: async (req, res) => {
    try {
      const nuevaCaja = await Caja.create(req.body);
      res.status(201).json(nuevaCaja);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateCaja: async (req, res) => {
    try {
      const cajaActualizada = await Caja.update(req.params.id, req.body);
      res.json(cajaActualizada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  disableCaja: async (req, res) => {
    try {
      await Caja.disable(req.params.id);
      res.status(200).json({ disabled: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  enableCaja: async (req, res) => {
    try {
      const cajaEnabled = await Caja.enable(req.params.id);
      res.status(200).json(cajaEnabled);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteCaja: async (req, res) => {
    try {
      await Caja.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};