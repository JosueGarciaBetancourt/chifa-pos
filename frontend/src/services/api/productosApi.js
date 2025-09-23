import api from '../axiosInstance';

const productosApi = {
  // Obtener todos los productos
  getProductos: async () => {
    try {
      const response = await api.get('/api/productos');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo productos:', error);
      throw error;
    }
  },

  // Buscar productos por nombre (query ?nombre=)
  buscarProductosPorNombre: async (nombre) => {
    try {
      const response = await api.get('/api/productos/searchProductosByName', {
        params: { nombre }
      });
      return response.data;
    } catch (error) {
      console.error('Error buscando productos por nombre:', error);
      throw error;
    }
  },

  // Obtener productos activos
  getProductosActivos: async () => {
    try {
      const response = await api.get('/api/productos/active');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo productos activos:', error);
      throw error;
    }
  },

  // Obtener productos inactivos
  getProductosInactivos: async () => {
    try {
      const response = await api.get('/api/productos/inactive');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo productos inactivos:', error);
      throw error;
    }
  },

  // Obtener producto por id
  getProductoById: async (id) => {
    try {
      const response = await api.get(`/api/productos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo producto con id ${id}:`, error);
      throw error;
    }
  },

  // Crear un nuevo producto
  createProducto: async (producto) => {
    try {
      const response = await api.post('/api/productos', producto);
      return response.data;
    } catch (error) {
      console.error('Error creando producto:', error);
      throw error;
    }
  },

  // Actualizar producto por id
  updateProducto: async (id, producto) => {
    try {
      const response = await api.put(`/api/productos/${id}`, producto);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando producto con id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar producto por id
  deleteProducto: async (id) => {
    try {
      const response = await api.delete(`/api/productos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando producto con id ${id}:`, error);
      throw error;
    }
  },

  // Deshabilitar producto
  disableProducto: async (id) => {
    try {
      const response = await api.delete(`/api/productos/${id}/disable`);
      return response.data;
    } catch (error) {
      console.error(`Error deshabilitando producto con id ${id}:`, error);
      throw error;
    }
  },

  // Habilitar producto
  enableProducto: async (id) => {
    try {
      const response = await api.patch(`/api/productos/${id}/enable`);
      return response.data;
    } catch (error) {
      console.error(`Error habilitando producto con id ${id}:`, error);
      throw error;
    }
  }
};

export default productosApi;
