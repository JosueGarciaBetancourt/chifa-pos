import api from '../axiosInstance';

const recetasApi = {
  // Crear una nueva receta
  createReceta: async (receta) => {
    try {
      const response = await api.post('/api/recetas', receta);
      return response.data;
    } catch (error) {
      console.error('Error creando receta:', error);
      throw error;
    }
  },

  // Obtener recetas por productoId
  getRecetasByProductoId: async (productoId) => {
    try {
      const response = await api.get(`/api/recetas/producto/${productoId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo recetas del producto con id ${productoId}:`, error);
      throw error;
    }
  },

  // Obtener recetas por insumoId
  getRecetasByInsumoId: async (insumoId) => {
    try {
      const response = await api.get(`/api/recetas/insumo/${insumoId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo recetas del insumo con id ${insumoId}:`, error);
      throw error;
    }
  },

  // Obtener recetas de productos activos
  getRecetasByProductosActive: async () => {
    try {
      const response = await api.get('/api/recetas/productos/active');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo recetas de productos activos:', error);
      throw error;
    }
  },

  // Obtener recetas de productos inactivos
  getRecetasByProductosInactive: async () => {
    try {
      const response = await api.get('/api/recetas/productos/inactive');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo recetas de productos inactivos:', error);
      throw error;
    }
  },

  // Obtener recetas de insumos activos
  getRecetasByInsumosActive: async () => {
    try {
      const response = await api.get('/api/recetas/insumos/active');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo recetas de insumos activos:', error);
      throw error;
    }
  },

  // Obtener recetas de insumos inactivos
  getRecetasByInsumosInactive: async () => {
    try {
      const response = await api.get('/api/recetas/insumos/inactive');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo recetas de insumos inactivos:', error);
      throw error;
    }
  },

  // Actualizar receta por productoId e insumoId
  updateReceta: async (productoId, insumoId, receta) => {
    try {
      const response = await api.put(`/api/recetas/producto/${productoId}/insumo/${insumoId}`, receta);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando receta del producto ${productoId} con insumo ${insumoId}:`, error);
      throw error;
    }
  },

  // Eliminar receta por productoId e insumoId
  deleteReceta: async (productoId, insumoId) => {
    try {
      const response = await api.delete(`/api/recetas/producto/${productoId}/insumo/${insumoId}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando receta del producto ${productoId} con insumo ${insumoId}:`, error);
      throw error;
    }
  }
};

export default recetasApi;
