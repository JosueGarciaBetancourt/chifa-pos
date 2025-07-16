import api from '../axiosInstance';

const insumosApi = {
  getInsumos: async () => {
    try {
      const data = await api.get('/api/insumos');
      return data.data
    } catch (error) {
      console.error('Error obteniendo insumos:', error);
      throw error;
    }
  }
};

export default insumosApi;