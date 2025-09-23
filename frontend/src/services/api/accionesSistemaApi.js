import api from '../axiosInstance';

const accionesSistemaApi = {
  getAccionesSistema: async () => {
    try {
      const { data } = await api.get('/api/acciones-sistema');
      return data;
    } catch (error) {
      console.error('Error obteniendo todas las acciones del sistema:', error);
      throw error;
    }
  },

  getAccionSistemaById: async (id) => {
    try {
      const { data } = await api.get(`/api/acciones-sistema/${id}`);
      return data;
    } catch (error) {
      console.error(`Error obteniendo acción del sistema con id ${id}:`, error);
      throw error;
    }
  }
};

export default accionesSistemaApi;
