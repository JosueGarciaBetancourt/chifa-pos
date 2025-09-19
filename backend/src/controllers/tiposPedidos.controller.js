import { TipoPedido } from '../../../electron/database/models/TipoPedido.js';

export const tiposPedidosController = {
  getTiposPedidos: async (req, res) => {
    try {
      const tipos = await TipoPedido.selectAll();
      res.json(tipos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getTipoPedidoById: async (req, res) => {
    try {
      const tipo = await TipoPedido.findById(req.params.id);
      if (!tipo) return res.status(404).json({ error: 'Tipo no encontrado' });
      res.json(tipo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  searchTiposPedidosByName: async (req, res) => {
    try {
      const tipo = await TipoPedido.searchByName(req.query.name);
      if (!tipo) return res.status(404).json({ error: 'Tipo de pedido no encontrado' });
      res.json(tipo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createTipoPedido: async (req, res) => {
    try {
      const nuevoTipo = await TipoPedido.create(req.body);
      res.status(201).json(nuevoTipo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateTipoPedido: async (req, res) => {
    try {
      const tipoActualizado = await TipoPedido.update(
        req.params.id, 
        req.body
      );
      res.json(tipoActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteTipoPedido: async (req, res) => {
    try {
      await TipoPedido.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};