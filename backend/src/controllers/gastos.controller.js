import { Gasto } from '../../../electron/database/models/Gasto.js';

export const gastosController = {
  getGastos: async (req, res) => {
    try {
      const gastos = await Gasto.selectAll();
      res.json(gastos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getGastoById: async (req, res) => {
    try {
      const gasto = await Gasto.findById(req.params.id);
      if (!gasto) return res.status(404).json({ error: 'Gasto no encontrado' });
      res.json(gasto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createGasto: async (req, res) => {
    try {
      const { tipo_gasto_id, usuario_id, proveedor_id, monto, 
            metodo_pago_id, observaciones } = req.body;
    
      const newGasto = await Gasto.create({ tipo_gasto_id, usuario_id, proveedor_id, monto, 
                                        metodo_pago_id, observaciones });
      res.status(201).json(newGasto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateGasto: async (req, res) => {
    try {
      const updated = await Gasto.update(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteGasto: async (req, res) => {
    try {
      await Gasto.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
