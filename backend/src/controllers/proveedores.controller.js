import { Proveedor } from '../../../electron/database/models/Proveedor.js';

export const proveedoresController = {
  getProveedores: async (req, res) => {
    try {
      const proveedores = await Proveedor.selectAll();
      res.json(proveedores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProveedorById: async (req, res) => {
    try {
      const proveedor = await Proveedor.findById(req.params.id);
      if (!proveedor) return res.status(404).json({ error: 'Proveedor no encontrado' });
      res.json(proveedor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProveedoresActive: async (req, res) => {
    try {
      const proveedores = await Proveedor.selectActive();
      res.json(proveedores || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProveedoresInactive: async (req, res) => {
    try {
      const proveedores = await Proveedor.selectInactive();
      res.json(proveedores || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createProveedor: async (req, res) => {
    try {
      const nuevoProveedor = await Proveedor.create(req.body);
      res.status(201).json(nuevoProveedor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateProveedor: async (req, res) => {
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

  disableProveedor: async (req, res) => {
    try {
      await Proveedor.disable(req.params.id);
      res.status(200).json({ disabled: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  enableProveedor: async (req, res) => {
    try {
      const proveedorEnabled = await Proveedor.enable(req.params.id);
      res.status(200).json(proveedorEnabled);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  deleteProveedor: async (req, res) => {
    try {
      await Proveedor.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};