import { Producto } from "../../../electron/database/models/Producto.js";

export const productosController = {
  getProductos: async (req, res) => {
    try {
      const productos = await Producto.selectAll();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  searchProductosByName: async (req, res) => {
    try {
      const productos = await Producto.searchByName(req.query.nombre);
      res.json(productos || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProductosActive: async (req, res) => {
    try {
      const productos = await Producto.selectActive();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProductosNoActive: async (req, res) => {
    try {
      const productos = await Producto.selectNoActive();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProductoById: async (req, res) => {
    try {
      const producto = await Producto.findById(req.params.id);
      if (!producto)
        return res.status(404).json({ error: "Producto no encontrado" });
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createProducto: async (req, res) => {
    try {
      const nuevoProducto = await Producto.create(req.body);
      res.status(201).json(nuevoProducto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateProducto: async (req, res) => {
    try {
      const productoActualizado = await Producto.update(
        req.params.id,
        req.body
      );
      res.json(productoActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  disableProducto: async (req, res) => {
    try {
      await Producto.disable(req.params.id);
      res.status(200).json({ disabled: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  enableProducto: async (req, res) => {
    try {
      const productoEnabled = await Producto.enable(req.params.id);
      res.status(200).json(productoEnabled);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteProducto: async (req, res) => {
    try {
      await Producto.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
