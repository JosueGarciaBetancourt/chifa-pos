import api from '../axiosInstance';

const comprasInsumosProveedoresApi = {
  // Obtener todas las compras de insumos-proveedores
  getComprasInsumosProveedores: async () => {
    try {
      const response = await api.get('/api/compras-insumos-proveedores');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo compras de insumos-proveedores:', error);
      throw error;
    }
  },

  // Crear una nueva compra de insumo-proveedor
  createCompraInsumoProveedor: async (compra) => {
    try {
      const response = await api.post('/api/compras-insumos-proveedores', compra);
      return response.data;
    } catch (error) {
      console.error('Error creando compra de insumo-proveedor:', error);
      throw error;
    }
  },

  // Obtener compras por insumo
  getComprasInsumosProveedoresByInsumo: async (insumoId) => {
    try {
      const response = await api.get(`/api/compras-insumos-proveedores/insumo/${insumoId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo compras de insumo ${insumoId}:`, error);
      throw error;
    }
  },

  // Obtener compras por proveedor
  getComprasInsumosProveedoresByProveedor: async (proveedorId) => {
    try {
      const response = await api.get(`/api/compras-insumos-proveedores/proveedor/${proveedorId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo compras del proveedor ${proveedorId}:`, error);
      throw error;
    }
  },

  // Obtener una compra por ID
  getCompraInsumoProveedorById: async (id) => {
    try {
      const response = await api.get(`/api/compras-insumos-proveedores/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo compra con id ${id}:`, error);
      throw error;
    }
  },

  // Actualizar una compra
  updateCompraInsumoProveedor: async (id, compra) => {
    try {
      const response = await api.put(`/api/compras-insumos-proveedores/${id}`, compra);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando compra con id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar una compra
  deleteCompraInsumoProveedor: async (id) => {
    try {
      const response = await api.delete(`/api/compras-insumos-proveedores/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando compra con id ${id}:`, error);
      throw error;
    }
  },
};

export default comprasInsumosProveedoresApi;
