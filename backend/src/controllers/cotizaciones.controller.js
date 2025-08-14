import { Cotizacion } from '../../../electron/database/models/Cotizacion.js';

export const cotizacionesController = {
  getCotizaciones: async (req, res) => {
    try {
      const cotizaciones = await Cotizacion.selectAll();
      res.json(cotizaciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCotizacionById: async (req, res) => {
    try {
      const cotizacion = await Cotizacion.findById(req.params.id);
      if (!cotizacion) return res.status(404).json({ error: 'Cotización no encontrada' });
      res.json(cotizacion)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCotizacionesByCliente: async (req, res) => {
    try {
      const cotizaciones = await Cotizacion.findByCliente(req.params.clienteId);
      res.json(cotizaciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCotizacionesByUsuario: async (req, res) => {
    try {
      const cotizaciones = await Cotizacion.findByUsuario(req.params.usuarioId);
      res.json(cotizaciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getDetallesCotizacionById: async (req, res) => {
    try {
      const cotizacion = await Cotizacion.findById(req.params.id);
      if (!cotizacion) return res.status(404).json({ error: 'Cotización no encontrada' });

      const detalles_cotizacion = await Cotizacion.findDetailsById(req.params.id);
      res.json(detalles_cotizacion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createCotizacion: async (req, res) => {
    try {
      const nuevaCotizacion = await Cotizacion.create(req.body);
      res.status(201).json(nuevaCotizacion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateCotizacion: async (req, res) => {
    try {
      const cotizacionActualizada = await Cotizacion.update(req.params.id, req.body);
      res.json(cotizacionActualizada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteCotizacion: async (req, res) => {
    try {
      await Cotizacion.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};