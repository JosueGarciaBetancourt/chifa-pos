import api from '../axiosInstance';

const metodosPagoApi = {
  // Obtener todos los métodos de pago
  getMetodosPago: async () => {
    try {
      const response = await api.get('/api/metodosPago');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo métodos de pago:', error);
      throw error;
    }
  },

  // Crear un método de pago
  createMetodoPago: async (metodoPago) => {
    try {
      const response = await api.post('/api/metodosPago', metodoPago);
      return response.data;
    } catch (error) {
      console.error('Error creando método de pago:', error);
      throw error;
    }
  },

  // Buscar métodos de pago por nombre
  searchMetodosPagoByName: async (name) => {
    try {
      const response = await api.get('/api/metodosPago/searchMetodosPagoByName', {
        params: { name },
      });
      return response.data;
    } catch (error) {
      console.error(`Error buscando métodos de pago con nombre ${name}:`, error);
      throw error;
    }
  },

  // Obtener un método de pago por ID
  getMetodoPagoById: async (id) => {
    try {
      const response = await api.get(`/api/metodosPago/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo método de pago con id ${id}:`, error);
      throw error;
    }
  },

  // Actualizar un método de pago
  updateMetodoPago: async (id, metodoPago) => {
    try {
      const response = await api.put(`/api/metodosPago/${id}`, metodoPago);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando método de pago con id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar un método de pago
  deleteMetodoPago: async (id) => {
    try {
      const response = await api.delete(`/api/metodosPago/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando método de pago con id ${id}:`, error);
      throw error;
    }
  },
};

export default metodosPagoApi;
