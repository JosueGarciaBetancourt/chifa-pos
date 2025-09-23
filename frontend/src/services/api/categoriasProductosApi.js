// frontend/api/categoriasProductosApi.js
import api from '../axiosInstance';

const categoriasProductosApi = {
  getCategoriasProductos: async () => {
    try {
      const { data } = await api.get('/api/categoriasProductos');
      return data;
    } catch (error) {
      console.error('Error obteniendo todas las categorías de productos:', error);
      throw error;
    }
  },

  createCategoriaProducto: async (payload) => {
    try {
      const { data } = await api.post('/api/categoriasProductos', payload);
      return data;
    } catch (error) {
      console.error('Error creando categoría de producto:', error);
      throw error;
    }
  },

  getCategoriasProductosActive: async () => {
    try {
      const { data } = await api.get('/api/categoriasProductos/active');
      return data;
    } catch (error) {
      console.error('Error obteniendo categorías de productos activas:', error);
      throw error;
    }
  },

  getCategoriasProductosInactive: async () => {
    try {
      const { data } = await api.get('/api/categoriasProductos/inactive');
      return data;
    } catch (error) {
      console.error('Error obteniendo categorías de productos inactivas:', error);
      throw error;
    }
  },

  getCategoriaProductoById: async (id) => {
    try {
      const { data } = await api.get(`/api/categoriasProductos/${id}`);
      return data;
    } catch (error) {
      console.error(`Error obteniendo categoría de producto con id ${id}:`, error);
      throw error;
    }
  },

  updateCategoriaProducto: async (id, payload) => {
    try {
      const { data } = await api.put(`/api/categoriasProductos/${id}`, payload);
      return data;
    } catch (error) {
      console.error(`Error actualizando categoría de producto con id ${id}:`, error);
      throw error;
    }
  },

  deleteCategoriaProducto: async (id) => {
    try {
      const { data } = await api.delete(`/api/categoriasProductos/${id}`);
      return data;
    } catch (error) {
      console.error(`Error eliminando categoría de producto con id ${id}:`, error);
      throw error;
    }
  },

  disableCategoriaProducto: async (id) => {
    try {
      const { data } = await api.delete(`/api/categoriasProductos/${id}/disable`);
      return data;
    } catch (error) {
      console.error(`Error deshabilitando categoría de producto con id ${id}:`, error);
      throw error;
    }
  },

  enableCategoriaProducto: async (id) => {
    try {
      const { data } = await api.patch(`/api/categoriasProductos/${id}/enable`);
      return data;
    } catch (error) {
      console.error(`Error habilitando categoría de producto con id ${id}:`, error);
      throw error;
    }
  }
};

export default categoriasProductosApi;
