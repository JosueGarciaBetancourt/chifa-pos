import api from '../axiosInstance';

const reportesApi = {
  // Obtener todos los reportes
  getReportes: async () => {
    try {
      const response = await api.get('/api/reportes');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo reportes:', error);
      throw error;
    }
  },

  // Crear un reporte
  createReporte: async (reporte) => {
    try {
      const response = await api.post('/api/reportes', reporte);
      return response.data;
    } catch (error) {
      console.error('Error creando reporte:', error);
      throw error;
    }
  },

  // Obtener un reporte por ID
  getReporteById: async (id) => {
    try {
      const response = await api.get(`/api/reportes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo reporte con id ${id}:`, error);
      throw error;
    }
  },

  // Actualizar un reporte
  updateReporte: async (id, reporte) => {
    try {
      const response = await api.put(`/api/reportes/${id}`, reporte);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando reporte con id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar un reporte
  deleteReporte: async (id) => {
    try {
      const response = await api.delete(`/api/reportes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando reporte con id ${id}:`, error);
      throw error;
    }
  },
};

export default reportesApi;
