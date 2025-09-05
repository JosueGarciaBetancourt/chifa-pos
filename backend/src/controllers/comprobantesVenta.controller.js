import { ComprobanteVenta } from '../../../electron/database/models/ComprobanteVenta.js';
import { CalculosFinancieros } from '../../../electron/database/utils/calculosFinancieros.js';

export const comprobantesVentaController = {
  getComprobantesVenta: async (req, res) => {
    try {
      const comprobantesVentas = await ComprobanteVenta.selectAll();
      res.json(comprobantesVentas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getComprobanteVentaById: async (req, res) => {
    try {
      const comprobanteVenta = await ComprobanteVenta.findById(req.params.id);
      if (!comprobanteVenta) return res.status(404).json({ error: 'Comprobante de venta no encontrado' });
      res.json(comprobanteVenta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getComprobantesVentaByPedidoId: async (req, res) => {
    try {
      const comprobantesVenta = await ComprobanteVenta.findByPedidoId(req.params.pedidoId);
      if (!comprobantesVenta) return res.status(404).json({ error: 'Comprobantes de venta no encontrado para este pedido' });
      res.json(comprobantesVenta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createComprobanteVenta: async (req, res) => {
    try {
      const { total } = req.body;
      const subTotal = CalculosFinancieros.calcularSubtotal(total);
      const igv = CalculosFinancieros.calcularIGV(total);
      const data = { ...req.body, subTotal, igv };

      const nuevoComprobanteVenta = await ComprobanteVenta.create(data);
      res.status(201).json(nuevoComprobanteVenta);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateEstado: async (req, res) => {
    try {
      const comprobanteVenta = await ComprobanteVenta.updateEstado(req.params.id, req.body.estado_id);
      res.json(comprobanteVenta);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateXML: async (req, res) => {
    try {
      const comprobanteVenta = await ComprobanteVenta.updateXML(req.params.id, req.body.xml_base64);
      res.json(comprobanteVenta);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteComprobanteVenta: async (req, res) => {
    try {
      await ComprobanteVenta.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};