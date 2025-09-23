import api from '../axiosInstance';

const tiposReportesApi = {
  // Obtener todos los tipos de reporte
  getTiposReportes: async () => {
    try {
      const response = await api.get('/api/tipos-reportes');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo tipos de reporte:', error);
      throw error;
    }
  },

  // Obtener un tipo de reporte por ID
  getTipoReporteById: async (id) => {
    try {
      const response = await api.get(`/api/tipos-reportes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo tipo de reporte con id ${id}:`, error);
      throw error;
    }
  },
};

export default tiposReportesApi;
