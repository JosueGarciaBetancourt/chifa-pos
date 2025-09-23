import api from '../axiosInstance';

const tiposComprobantesApi = {
  // Obtener todos los tipos de comprobantes
  getTiposComprobantes: async () => {
    try {
      const response = await api.get('/api/tiposComprobantes');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo tipos de comprobantes:', error);
      throw error;
    }
  },

  // Crear un tipo de comprobante
  createTipoComprobante: async (tipoComprobante) => {
    try {
      const response = await api.post('/api/tiposComprobantes', tipoComprobante);
      return response.data;
    } catch (error) {
      console.error('Error creando tipo de comprobante:', error);
      throw error;
    }
  },

  // Buscar tipos de comprobantes por nombre
  searchTiposComprobantesByName: async (name) => {
    try {
      const response = await api.get('/api/tiposComprobantes/searchTiposComprobantesByName', {
        params: { name },
      });
      return response.data;
    } catch (error) {
      console.error(`Error buscando tipos de comprobantes con nombre ${name}:`, error);
      throw error;
    }
  },

  // Obtener un tipo de comprobante por ID
  getTipoComprobanteById: async (id) => {
    try {
      const response = await api.get(`/api/tiposComprobantes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo tipo de comprobante con id ${id}:`, error);
      throw error;
    }
  },

  // Actualizar un tipo de comprobante
  updateTipoComprobante: async (id, tipoComprobante) => {
    try {
      const response = await api.put(`/api/tiposComprobantes/${id}`, tipoComprobante);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando tipo de comprobante con id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar un tipo de comprobante
  deleteTipoComprobante: async (id) => {
    try {
      const response = await api.delete(`/api/tiposComprobantes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando tipo de comprobante con id ${id}:`, error);
      throw error;
    }
  },
};

export default tiposComprobantesApi;
