import { TipoInsumo } from '../../../electron/database/models/TipoInsumo.js';

export const tiposInsumosController = {
  getTiposInsumos(req, res) {
    try {
      const tiposInsumos = TipoInsumo.selectAll() || [];
      res.json(tiposInsumos);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server Error: ' + error.message });
    }
  }
};
