import api from '../axiosInstance';

const insumosProveedoresApi = {
  // Obtener todos los insumosProveedores
  getInsumosProveedores: async () => {
    try {
      const response = await api.get('/api/insumosProveedores');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo insumosProveedores:', error);
      throw error;
    }
  },

  // Crear un nuevo insumo-proveedor
  createInsumoProveedor: async (insumoProveedor) => {
    try {
      const response = await api.post('/api/insumosProveedores', insumoProveedor);
      return response.data;
    } catch (error) {
      console.error('Error creando insumo-proveedor:', error);
      throw error;
    }
  },

  // Obtener insumosProveedores por insumo
  getInsumosProveedoresByInsumo: async (insumoId) => {
    try {
      const response = await api.get(`/api/insumosProveedores/insumo/${insumoId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo insumosProveedores para insumo ${insumoId}:`, error);
      throw error;
    }
  },

  // Obtener insumosProveedores por proveedor
  getInsumosProveedoresByProveedor: async (proveedorId) => {
    try {
      const response = await api.get(`/api/insumosProveedores/proveedor/${proveedorId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo insumosProveedores para proveedor ${proveedorId}:`, error);
      throw error;
    }
  },

  // Obtener un insumo-proveedor por ID
  getInsumoProveedorById: async (id) => {
    try {
      const response = await api.get(`/api/insumosProveedores/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo insumo-proveedor con id ${id}:`, error);
      throw error;
    }
  },

  // Actualizar un insumo-proveedor
  updateInsumoProveedor: async (id, insumoProveedor) => {
    try {
      const response = await api.put(`/api/insumosProveedores/${id}`, insumoProveedor);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando insumo-proveedor con id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar un insumo-proveedor
  deleteInsumoProveedor: async (id) => {
    try {
      const response = await api.delete(`/api/insumosProveedores/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando insumo-proveedor con id ${id}:`, error);
      throw error;
    }
  },
};

export default insumosProveedoresApi;
