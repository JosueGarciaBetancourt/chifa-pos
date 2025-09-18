import { Insumo } from "../../../electron/database/models/Insumo.js";

export const insumosController = {
  getInsumos: async (req, res) => {
    try {
      const insumos = await Insumo.selectAll();
      res.json(insumos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getInsumoById: async (req, res) => {
    try {
      const insumo = await Insumo.findById(req.params.id);
      if (!insumo)
        return res.status(404).json({ error: "Insumo no encontrado" });
      res.json(insumo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getInsumosActive: async (req, res) => {
    try {
      const insumos = await Insumo.selectActive();
      res.json(insumos || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getInsumosInactive: async (req, res) => {
    try {
      const insumos = await Insumo.selectInactive();
      res.json(insumos || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createInsumo: async (req, res) => {
    try {
      const nuevoInsumo = await Insumo.create(req.body);
      res.status(201).json(nuevoInsumo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateInsumo: async (req, res) => {
    try {
      const insumoActualizado = await Insumo.update(req.params.id, req.body);
      res.json(insumoActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  disableInsumo: async (req, res) => {
    try {
      await Insumo.disable(req.params.id);
      res.status(200).json({ disabled: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  enableInsumo: async (req, res) => {
    try {
      const insumoEnabled = await Insumo.enable(req.params.id);
      res.status(200).json(insumoEnabled);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteInsumo: async (req, res) => {
    try {
      await Insumo.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
