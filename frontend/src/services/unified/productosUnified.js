import productosApi from '../api/productosApi';
import isElectron from '../../utils/isElectron';

const productosUnified = {
  // Obtener todos los productos
  getProductos: async () => {
    try {
      if (isElectron()) {
        return await window.electronAPI.productos.getProductos();
      } else {
        return await productosApi.getProductos();
      }
    } catch (error) {
      console.error('❌ Error obteniendo productos:', error);
      throw error;
    }
  },

  // Buscar productos por nombre
  buscarProductosPorNombre: async (nombre) => {
    try {
      if (isElectron()) {
        return await window.electronAPI.productos.buscarProductosPorNombre(nombre);
      } else {
        return await productosApi.buscarProductosPorNombre(nombre);
      }
    } catch (error) {
      console.error('❌ Error buscando productos por nombre:', error);
      throw error;
    }
  },

  // Obtener productos activos
  getProductosActivos: async () => {
    try {
      if (isElectron()) {
        return await window.electronAPI.productos.getProductosActivos();
      } else {
        return await productosApi.getProductosActivos();
      }
    } catch (error) {
      console.error('❌ Error obteniendo productos activos:', error);
      throw error;
    }
  },

  // Obtener productos inactivos
  getProductosInactivos: async () => {
    try {
      if (isElectron()) {
        return await window.electronAPI.productos.getProductosInactivos();
      } else {
        return await productosApi.getProductosInactivos();
      }
    } catch (error) {
      console.error('❌ Error obteniendo productos inactivos:', error);
      throw error;
    }
  },

  // Obtener producto por id
  getProductoById: async (id) => {
    try {
      if (isElectron()) {
        return await window.electronAPI.productos.getProductoById(id);
      } else {
        return await productosApi.getProductoById(id);
      }
    } catch (error) {
      console.error(`❌ Error obteniendo producto con id ${id}:`, error);
      throw error;
    }
  },

  // Crear producto
  createProducto: async (producto) => {
    try {
      if (isElectron()) {
        return await window.electronAPI.productos.createProducto(producto);
      } else {
        return await productosApi.createProducto(producto);
      }
    } catch (error) {
      console.error('❌ Error creando producto:', error);
      throw error;
    }
  },

  // Actualizar producto
  updateProducto: async (id, producto) => {
    try {
      if (isElectron()) {
        return await window.electronAPI.productos.updateProducto(id, producto);
      } else {
        return await productosApi.updateProducto(id, producto);
      }
    } catch (error) {
      console.error(`❌ Error actualizando producto con id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar producto
  deleteProducto: async (id) => {
    try {
      if (isElectron()) {
        return await window.electronAPI.productos.deleteProducto(id);
      } else {
        return await productosApi.deleteProducto(id);
      }
    } catch (error) {
      console.error(`❌ Error eliminando producto con id ${id}:`, error);
      throw error;
    }
  },

  // Deshabilitar producto
  disableProducto: async (id) => {
    try {
      if (isElectron()) {
        return await window.electronAPI.productos.disableProducto(id);
      } else {
        return await productosApi.disableProducto(id);
      }
    } catch (error) {
      console.error(`❌ Error deshabilitando producto con id ${id}:`, error);
      throw error;
    }
  },

  // Habilitar producto
  enableProducto: async (id) => {
    try {
      if (isElectron()) {
        return await window.electronAPI.productos.enableProducto(id);
      } else {
        return await productosApi.enableProducto(id);
      }
    } catch (error) {
      console.error(`❌ Error habilitando producto con id ${id}:`, error);
      throw error;
    }
  }
};

export default productosUnified;
