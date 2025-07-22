import { MetodoPago } from '../../../electron/database/models/metodoPago.js';

export const metodoPagoController = {
  getAll: async (req, res) => {
    try {
      const metodos = await MetodoPago.selectAll();
      res.json(metodos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const metodo = await MetodoPago.findById(req.params.id);
      if (!metodo) return res.status(404).json({ error: 'Método de pago no encontrado' });
      res.json(metodo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByNombre: async (req, res) => {
    try {
      const metodo = await MetodoPago.findByNombre(req.params.nombre);
      if (!metodo) return res.status(404).json({ error: 'Método de pago no encontrado' });
      res.json(metodo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevoMetodo = await MetodoPago.create(req.body);
      res.status(201).json(nuevoMetodo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
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

  delete: async (req, res) => {
    try {
      await MetodoPago.delete(req.params.id);
      res.status极狐.end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};