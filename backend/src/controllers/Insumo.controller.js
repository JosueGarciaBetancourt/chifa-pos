import { Insumo } from "../../../electron/database/models/insumo.js";

export const insumoController = {
  getAll: async (req, res) => {
    try {
      const insumos = await Insumo.selectAll();
      res.json(insumos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const insumo = await Insumo.findById(req.params.id);
      if (!insumo)
        return res.status(404).json({ error: "Insumo no encontrado" });
      res.json(insumo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevoInsumo = await Insumo.create(req.body);
      res.status(201).json(nuevoInsumo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const insumoActualizado = await Insumo.update(req.params.id, req.body);
      res.json(insumoActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await Insumo.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
