import { TipoInsumo } from '../../../electron/database/models/TipoInsumo.js';

export const tiposInsumosController = {
  getTiposInsumos: async (req, res) => {
    try {
      const tipos = await TipoInsumo.selectAll();
      res.json(tipos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getTipoInsumoById: async (req, res) => {
    try {
      const tipo = await TipoInsumo.findById(req.params.id);
      if (!tipo) return res.status(404).json({ error: 'Tipo de insumo no encontrado' });
      res.json(tipo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getTiposInsumosActive: async (req, res) => {
    try {
      const tiposInsumos = await TipoInsumo.selectActive();
      res.json(tiposInsumos || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getTiposInsumosInactive: async (req, res) => {
    try {
      const tiposInsumos = await TipoInsumo.selectInactive();
      res.json(tiposInsumos || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createTipoInsumo: async (req, res) => {
    try {
      const nuevoTipo = await TipoInsumo.create(req.body);
      res.status(201).json(nuevoTipo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateTipoInsumo: async (req, res) => {
    try {
      const tipoActualizado = await TipoInsumo.update(
        req.params.id, 
        req.body
      );
      res.json(tipoActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  disableTipoInsumo: async (req, res) => {
    try {
      await TipoInsumo.disable(req.params.id);
      res.status(200).json({ disabled: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  enableTipoInsumo: async (req, res) => {
    try {
      const tipoInsumoEnabled = await TipoInsumo.enable(req.params.id);
      res.status(200).json(tipoInsumoEnabled);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteTipoInsumo: async (req, res) => {
    try {
      await TipoInsumo.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};