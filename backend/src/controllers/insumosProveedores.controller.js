import { InsumoProveedor } from '../../../electron/database/models/InsumoProveedor.js';

export const insumosProveedoresController = {
  getInsumosProveedores: async (req, res) => {
    try {
      const relaciones = await InsumoProveedor.selectAll();
      res.json(relaciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getInsumoProveedorById: async (req, res) => {
    try {
      const relacion = await InsumoProveedor.findById(req.params.id);
      if (!relacion) return res.status(404).json({ error: 'Relación de insumo con proveedor no encontrada' });
      res.json(relacion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getInsumosProveedoresByInsumo: async (req, res) => {
    try {
      const relaciones = await InsumoProveedor.findByInsumo(req.params.insumoId);
      res.json(relaciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getInsumosProveedoresByProveedor: async (req, res) => {
    try {
      const relaciones = await InsumoProveedor.findByProveedor(req.params.proveedorId);
      res.json(relaciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createInsumoProveedor: async (req, res) => {
    try {
      const nuevaRelacion = await InsumoProveedor.create(req.body);
      res.status(201).json(nuevaRelacion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateInsumoProveedor: async (req, res) => {
    try {
      const relacionActualizada = await InsumoProveedor.update(
        req.params.id, 
        req.body
      );
      res.json(relacionActualizada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteInsumoProveedor: async (req, res) => {
    try {
      await InsumoProveedor.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};