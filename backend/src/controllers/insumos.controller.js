// backend/src/controllers/insumos.controller.js
import { Insumo } from '../../../electron/database/models/Insumo.js';

export const insumosController = {
  getInsumos(req, res) {
    try {
      const insumos = Insumo.selectAll() || [];
      res.json(insumos);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server Error: ' + error.message });
    }
  }
};
