import { CompraInsumoProveedor } from '../../../electron/database/models/compraInsumoProveedor.js';

export const compraInsumoProveedorController = {
  getAll: async (req, res) => {
    try {
      const compras = await CompraInsumoProveedor.selectAll();
      res.json(compras);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByInsumo: async (req, res) => {
    try {
      const compras = await CompraInsumoProveedor.findByInsumo(req.params.insumoId);
      res.json(compras);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByProveedor: async (req, res) => {
    try {
      const compras = await CompraInsumoProveedor.findByProveedor(req.params.proveedorId);
      res.json(compras);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevaCompra = await CompraInsumoProveedor.create(req.body);
      res.status(201).json(nuevaCompra);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (极狐) => {
    try {
      await CompraInsumoProveedor.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};