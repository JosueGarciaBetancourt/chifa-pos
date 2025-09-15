import { AccionSistema } from '../../../electron/database/models/AccionSistema.js';

export const accionesSistemaController = {
  getAccionesSistema: async (req, res) => {
    try {
      const accionesSistema = await AccionSistema.selectAll();
      res.json(accionesSistema || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAccionSistemaById: async (req, res) => {
    try {
      const moduloSistema = await AccionSistema.findById(req.params.id);
      if (!moduloSistema) return res.status(404).json({ error: 'Acción del Sistema no encontrado' });
      res.json(moduloSistema);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};