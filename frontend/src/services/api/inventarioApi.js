import api from '../axiosInstance';

const inventarioApi = {
  getInventarioDetallado: async () => {
    try {
      const response = await api.get('/api/inventario');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo inventario:', error);
      throw error;
    }
  },
};

export default inventarioApi;
