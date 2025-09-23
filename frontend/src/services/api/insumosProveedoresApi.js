import api from '../axiosInstance';

const insumosProveedoresApi = {
  // Obtener todos los insumos-proveedores
  getInsumosProveedores: async () => {
    try {
      const response = await api.get('/api/insumos-proveedores');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo insumos-proveedores:', error);
      throw error;
    }
  },

  // Crear un nuevo insumo-proveedor
  createInsumoProveedor: async (insumoProveedor) => {
    try {
      const response = await api.post('/api/insumos-proveedores', insumoProveedor);
      return response.data;
    } catch (error) {
      console.error('Error creando insumo-proveedor:', error);
      throw error;
    }
  },

  // Obtener insumos-proveedores por insumo
  getInsumosProveedoresByInsumo: async (insumoId) => {
    try {
      const response = await api.get(`/api/insumos-proveedores/insumo/${insumoId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo insumos-proveedores para insumo ${insumoId}:`, error);
      throw error;
    }
  },

  // Obtener insumos-proveedores por proveedor
  getInsumosProveedoresByProveedor: async (proveedorId) => {
    try {
      const response = await api.get(`/api/insumos-proveedores/proveedor/${proveedorId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo insumos-proveedores para proveedor ${proveedorId}:`, error);
      throw error;
    }
  },

  // Obtener un insumo-proveedor por ID
  getInsumoProveedorById: async (id) => {
    try {
      const response = await api.get(`/api/insumos-proveedores/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo insumo-proveedor con id ${id}:`, error);
      throw error;
    }
  },

  // Actualizar un insumo-proveedor
  updateInsumoProveedor: async (id, insumoProveedor) => {
    try {
      const response = await api.put(`/api/insumos-proveedores/${id}`, insumoProveedor);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando insumo-proveedor con id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar un insumo-proveedor
  deleteInsumoProveedor: async (id) => {
    try {
      const response = await api.delete(`/api/insumos-proveedores/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando insumo-proveedor con id ${id}:`, error);
      throw error;
    }
  },
};

export default insumosProveedoresApi;
