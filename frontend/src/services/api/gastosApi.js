import api from '../axiosInstance';

const gastosApi = {
  // Obtener todos los gastos
  getGastos: async () => {
    try {
      const response = await api.get('/api/gastos');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo gastos:', error);
      throw error;
    }
  },

  // Crear un gasto
  createGasto: async (gasto) => {
    try {
      const response = await api.post('/api/gastos', gasto);
      return response.data;
    } catch (error) {
      console.error('Error creando gasto:', error);
      throw error;
    }
  },

  // Obtener un gasto por ID
  getGastoById: async (id) => {
    try {
      const response = await api.get(`/api/gastos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo gasto con id ${id}:`, error);
      throw error;
    }
  },

  // Actualizar un gasto
  updateGasto: async (id, gasto) => {
    try {
      const response = await api.put(`/api/gastos/${id}`, gasto);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando gasto con id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar un gasto
  deleteGasto: async (id) => {
    try {
      const response = await api.delete(`/api/gastos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando gasto con id ${id}:`, error);
      throw error;
    }
  },
};

export default gastosApi;
