import api from '../axiosInstance';

const tiposInsumosApi = {
  getTiposInsumos: async () => {
    try {
      const data = await api.get('/api/tiposInsumos');
      return data.data
    } catch (error) {
      console.error('Error obteniendo tipos de insumos:', error);
      throw error;
    }
  }
};

export default tiposInsumosApi;