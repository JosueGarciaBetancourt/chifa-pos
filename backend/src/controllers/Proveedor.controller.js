import { Proveedor } from '../../../electron/database/models/proveedor.js';

export const proveedorController = {
  getAll: async (req, res) => {
    try {
      const proveedores = await Proveedor.selectAll();
      res.json(proveedores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const proveedor = await Proveedor.findById(req.params.id);
      if (!proveedor) return res.status(404).json({ error: 'Proveedor no encontrado' });
      res.json(proveedor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevoProveedor = await Proveedor.create(req.body);
      res.status(201).json(nuevoProveedor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const proveedorActualizado = await Proveedor.update(
        req.params.id, 
        req.body
      );
      res.json(proveedorActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await Proveedor.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};