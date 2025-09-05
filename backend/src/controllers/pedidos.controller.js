import { Pedido } from '../../../electron/database/models/Pedido.js';
import { CalculosFinancieros } from '../../../electron/database/utils/calculosFinancieros.js';

export const pedidosController = {
  getPedidos: async (req, res) => {
    try {
      const pedidos = await Pedido.selectAll();
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getPedidoById: async (req, res) => {
    try {
      const pedido = await Pedido.findById(req.params.id);
      if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });
      res.json(pedido);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getPedidosBySede: async (req, res) => {
    try {
      const pedidos = await Pedido.findBySede(req.params.sedeId);
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener pedidos en un rango de fechas
  getPedidosByFecha: async (req, res) => {
    try {
      const { fechaInicio, fechaFin } = req.query; // se esperan en la query string
      if (!fechaInicio || !fechaFin) {
        return res.status(400).json({ error: 'Debe especificar fechaInicio y fechaFin' });
      }
      const pedidos = await Pedido.findByFecha(fechaInicio, fechaFin);
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener pedidos por cliente
  getPedidosByCliente: async (req, res) => {
    try {
      const pedidos = await Pedido.findByCliente(req.params.clienteId);
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener pedidos por usuario (mozo, cajero, etc.)
  getPedidosByUsuario: async (req, res) => {
    try {
      const pedidos = await Pedido.findByUsuario(req.params.usuarioId);
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener pedidos por mesa
  getPedidosByMesa: async (req, res) => {
    try {
      const pedidos = await Pedido.findByMesa(req.params.mesaId);
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener pedidos por estado (pendiente, servido, entregado, etc.)
  getPedidosByEstado: async (req, res) => {
    try {
      const pedidos = await Pedido.findByEstado(req.params.estadoId);
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener pedidos por tipo (delivery, salón, recojo, cotización)
  getPedidosByTipo: async (req, res) => {
    try {
      const pedidos = await Pedido.findByTipo(req.params.tipoId);
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener un pedido a partir de una cotización
  getPedidoByCotizacionId: async (req, res) => {
    try {
      const pedido = await Pedido.findByCotizacionId(req.params.cotizacionId);
      if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado para esta cotización' });
      res.json(pedido);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createPedido: async (req, res) => {
    try {
      const { total } = req.body;
      const subTotal = CalculosFinancieros.calcularSubtotal(total);
      const igv = CalculosFinancieros.calcularIGV(total);
      const data = { ...req.body, subTotal, igv };

      const nuevoPedido = await Pedido.create(data);
      res.status(201).json(nuevoPedido);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateEstado: async (req, res) => {
    try {
      const pedidoActualizado = await Pedido.updateEstado(
        req.params.id, 
        req.body.estado_id
      );
      res.json(pedidoActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updatePedido: async (req, res) => {
    try {
      const pedidoActualizado = await Pedido.updatePedido(req.params.id, req.body);
      res.json(pedidoActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};