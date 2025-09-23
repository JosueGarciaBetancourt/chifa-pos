import api from '../axiosInstance';

const estadosComprobantesApi = {
  // Obtener todos los estados de comprobantes
  getEstadosComprobantes: async () => {
    try {
      const response = await api.get('/api/estadosComprobantes');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo estados de comprobantes:', error);
      throw error;
    }
  },

  // Crear un estado de comprobante
  createEstadoComprobante: async (estadoComprobante) => {
    try {
      const response = await api.post('/api/estadosComprobantes', estadoComprobante);
      return response.data;
    } catch (error) {
      console.error('Error creando estado de comprobante:', error);
      throw error;
    }
  },

  // Buscar estados de comprobantes por nombre
  searchEstadosComprobantesByName: async (name) => {
    try {
      const response = await api.get('/api/estadosComprobantes/searchEstadosComprobantesByName', {
        params: { name },
      });
      return response.data;
    } catch (error) {
      console.error(`Error buscando estados de comprobantes con nombre ${name}:`, error);
      throw error;
    }
  },

  // Obtener un estado de comprobante por ID
  getEstadoComprobanteById: async (id) => {
    try {
      const response = await api.get(`/api/estadosComprobantes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo estado de comprobante con id ${id}:`, error);
      throw error;
    }
  },

  // Actualizar un estado de comprobante
  updateEstadoComprobante: async (id, estadoComprobante) => {
    try {
      const response = await api.put(`/api/estadosComprobantes/${id}`, estadoComprobante);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando estado de comprobante con id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar un estado de comprobante
  deleteEstadoComprobante: async (id) => {
    try {
      const response = await api.delete(`/api/estadosComprobantes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando estado de comprobante con id ${id}:`, error);
      throw error;
    }
  },
};

export default estadosComprobantesApi;
