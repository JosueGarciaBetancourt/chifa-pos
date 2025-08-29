import { Comprobante } from '../../../electron/database/models/comprobante.js';

export const comprobantesController = {
  getComprobantes: async (req, res) => {
    try {
      const comprobantes = await Comprobante.selectAll();
      res.json(comprobantes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getComprobanteById: async (req, res) => {
    try {
      const comprobante = await Comprobante.findById(req.params.id);
      if (!comprobante) return res.status(404).json({ error: 'Comprobante no encontrado' });
      res.json(comprobante);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getComprobanteByPedidoId: async (req, res) => {
    try {
      const comprobante = await Comprobante.findByPedidoId(req.params.pedidoId);
      if (!comprobante) return res.status(404).json({ error: 'Comprobante no encontrado' });
      res.json(comprobante);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createComprobante: async (req, res) => {
    try {
      const nuevoComprobante = await Comprobante.create(req.body);
      res.status(201).json(nuevoComprobante);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateEstado: async (req, res) => {
    try {
      const comprobante = await Comprobante.updateEstado(req.params.id, req.body.estado_id);
      res.json(comprobante);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateXML: async (req, res) => {
    try {
      const comprobante = await Comprobante.updateXML(req.params.id, req.body.xml_base64);
      res.json(comprobante);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteComprobante: async (req, res) => {
    try {
      await Comprobante.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};