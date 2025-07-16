import api from '../axiosInstance';

const productosApi = {
  getProductos: async () => {
    try {
      const data = await api.get('/api/productos');
      return data.data
    } catch (error) {
      console.error('Error obteniendo productos:', error);
      throw error;
    }
  }
};

export default productosApi;