import { Cotizacion } from '../../../electron/database/models/cotizacion.js';

export const cotizacionController = {
  getAll: async (req, res) => {
    try {
      const cotizaciones = await Cotizacion.selectAll();
      res.json(cotizaciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const cotizacion = await Cotizacion.findById(req.params.id);
      if (!cotizacion) return res.status(404).json({ error: 'Cotización no encontrada' });
      res.json(cotizacion)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByCliente: async (req, res) => {
    try {
      const cotizaciones = await Cotizacion.findByCliente(req.params.clienteId);
      res.json(cotizaciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByUsuario: async (req, res) => {
    try {
      const cotizaciones = await Cotizacion.findByUsuario(req.params.usuarioId);
      res.json(cotizaciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevaCotizacion = await Cotizacion.create(req.body);
      res.status(201).json(nuevaCotizacion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const cotizacionActualizada = await Cotizacion.update(req.params.id, req.body);
      res.json(cotizacionActualizada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await Cotizacion.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};