import { Comprobante } from '../../../electron/database/models/comprobante.js';

export const comprobanteController = {
  getAll: async (req, res) => {
    try {
      const comprobantes = await Comprobante.selectAll();
      res.json(comprobantes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const comprobante = await Comprobante.findById(req.params.id);
      if (!comprobante) return res.status(404).json({ error: 'Comprobante no encontrado' });
      res.json(comprobante);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByPedido: async (req, res) => {
    try {
      const comprobante = await Comprobante.findByPedidoId(req.params.pedidoId);
      if (!comprobante) return res.status(404).json({ error: 'Comprobante no encontrado' });
      res.json(comprobante);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
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

  delete: async (req, res) => {
    try {
      await Comprobante.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};