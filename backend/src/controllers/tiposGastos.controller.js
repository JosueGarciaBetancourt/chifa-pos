import { TipoGasto } from '../../../electron/database/models/TipoGasto.js';

export const tiposGastosController = {
  getTiposGastos: async (req, res) => {
    try {
      const tiposGastos = await TipoGasto.selectAll();
      res.json(tiposGastos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getTipoGastoById: async (req, res) => {
    try {
      const tipoGasto = await TipoGasto.findById(req.params.id);
      if (!tipoGasto) return res.status(404).json({ error: 'Tipo de Gasto no encontrado' });
      res.json(tipoGasto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getTiposGastosActive: async (req, res) => {
    try {
      const tiposGastos = await TipoGasto.selectActive();
      res.json(tiposGastos || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getTiposGastosInactive: async (req, res) => {
    try {
      const tiposGastos = await TipoGasto.selectInactive();
      res.json(tiposGastos || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createTipoGasto: async (req, res) => {
    try {
      const { nombre, descripcion } = req.body;
    
      const newTipoGasto = await TipoGasto.create({ nombre, descripcion });
      res.status(201).json(newTipoGasto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateTipoGasto: async (req, res) => {
    try {
      const updated = await TipoGasto.update(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  disableTipoGasto: async (req, res) => {
    try {
      await TipoGasto.disable(req.params.id);
      res.status(200).json({ disabled: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  enableTipoGasto: async (req, res) => {
    try {
      const TipoGastoEnabled = await TipoGasto.enable(req.params.id);
      res.status(200).json(TipoGastoEnabled);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteTipoGasto: async (req, res) => {
    try {
      await TipoGasto.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
