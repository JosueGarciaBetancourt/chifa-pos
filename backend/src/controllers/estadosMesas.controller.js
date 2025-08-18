import { EstadoMesa } from '../../../electron/database/models/EstadoMesa.js';

export const estadosMesasController = {
  getEstadosMesas: async (req, res) => {
    try {
      const estadosMesas = await EstadoMesa.selectAll();
      res.json(estadosMesas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getEstadoMesaById: async (req, res) => {
    try {
      const estado = await EstadoMesa.findById(req.params.id);
      if (!estado) return res.status(404).json({ error: 'Estado no encontrado' });
      res.json(estado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  searchByName: async (req, res) => {
    try {
      const estado = await EstadoMesa.searchByName(req.query.name);
      if (!estado) return res.status(404).json({ error: 'Estado de mesa no encontrado' });
      res.json(estado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createEstadoMesa: async (req, res) => {
    try {
      const nuevoEstado = await EstadoMesa.create(req.body);
      res.status(201).json(nuevoEstado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateEstadoMesa: async (req, res) => {
    try {
      const estadoActualizado = await EstadoMesa.update(
        req.params.id, 
        req.body
      );
      res.json(estadoActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteEstadoMesa: async (req, res) => {
    try {
      await EstadoMesa.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};