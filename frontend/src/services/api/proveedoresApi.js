// frontend/api/proveedoresApi.js
import api from '../axiosInstance';

const proveedoresApi = {
  // Obtener todos los proveedores
  getProveedores: async () => {
    try {
      const response = await api.get('/api/proveedores');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo proveedores:', error);
      throw error;
    }
  },

  // Crear un proveedor
  createProveedor: async (proveedor) => {
    try {
      const response = await api.post('/api/proveedores', proveedor);
      return response.data;
    } catch (error) {
      console.error('Error creando proveedor:', error);
      throw error;
    }
  },

  // Obtener proveedores activos
  getProveedoresActive: async () => {
    try {
      const response = await api.get('/api/proveedores/active');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo proveedores activos:', error);
      throw error;
    }
  },

  // Obtener proveedores inactivos
  getProveedoresInactive: async () => {
    try {
      const response = await api.get('/api/proveedores/inactive');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo proveedores inactivos:', error);
      throw error;
    }
  },

  // Obtener un proveedor por ID
  getProveedorById: async (id) => {
    try {
      const response = await api.get(`/api/proveedores/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo proveedor con id ${id}:`, error);
      throw error;
    }
  },

  // Actualizar un proveedor
  updateProveedor: async (id, proveedor) => {
    try {
      const response = await api.put(`/api/proveedores/${id}`, proveedor);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando proveedor con id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar un proveedor
  deleteProveedor: async (id) => {
    try {
      const response = await api.delete(`/api/proveedores/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando proveedor con id ${id}:`, error);
      throw error;
    }
  },

  // Deshabilitar un proveedor
  disableProveedor: async (id) => {
    try {
      const response = await api.delete(`/api/proveedores/${id}/disable`);
      return response.data;
    } catch (error) {
      console.error(`Error deshabilitando proveedor con id ${id}:`, error);
      throw error;
    }
  },

  // Habilitar un proveedor
  enableProveedor: async (id) => {
    try {
      const response = await api.patch(`/api/proveedores/${id}/enable`);
      return response.data;
    } catch (error) {
      console.error(`Error habilitando proveedor con id ${id}:`, error);
      throw error;
    }
  },
};

export default proveedoresApi;
