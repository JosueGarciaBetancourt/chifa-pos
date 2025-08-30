import { CompraInsumoProveedor } from '../../../electron/database/models/CompraInsumoProveedor.js';

export const comprasInsumosProveedoresController = {
  getComprasInsumosProveedores: async (req, res) => {
    try {
      const compras = await CompraInsumoProveedor.selectAll();
      res.json(compras);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCompraInsumoProveedorById: async (req, res) => {
    try {
      const compra = await CompraInsumoProveedor.findById(req.params.id);
      if (!compra) {
        return res.status(404).json({ error: "Compra no encontrada" });
      }
      res.json(compra);
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

  createCompraInsumoProveedor: async (req, res) => {
    try {
      const nuevaCompra = await CompraInsumoProveedor.create(req.body);
      res.status(201).json(nuevaCompra);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateCompraInsumoProveedor: async (req, res) => {
    try {
      const compraActualizada = await CompraInsumoProveedor.update(req.params.id, req.body);
      if (!compraActualizada) {
        return res.status(404).json({ error: "Compra no encontrada" });
      }
      res.json(compraActualizada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteCompraInsumoProveedor: async (req, res) => {
    try {
      await CompraInsumoProveedor.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};