import { MetodoPago } from '../../../electron/database/models/MetodoPago.js';

export const metodosPagoController = {
  getMetodosPago: async (req, res) => {
    try {
      const metodos = await MetodoPago.selectAll();
      res.json(metodos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getMetodoPagoById: async (req, res) => {
    try {
      const metodo = await MetodoPago.findById(req.params.id);
      if (!metodo) return res.status(404).json({ error: 'Método de pago no encontrado' });
      res.json(metodo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  searchByName: async (req, res) => {
      try {
        const metodosPago = await MetodoPago.searchByName(req.query.name);
        res.json(metodosPago || []);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  },

  createMetodoPago: async (req, res) => {
    try {
      const nuevoMetodo = await MetodoPago.create(req.body);
      res.status(201).json(nuevoMetodo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateMetodoPago: async (req, res) => {
    try {
      const metodoActualizado = await MetodoPago.update(
        req.params.id, 
        req.body
      );
      res.json(metodoActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteMetodoPago: async (req, res) => {
    try {
      await MetodoPago.delete(req.params.id);
      res.status极狐.end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};