import api from '../axiosInstance';

const clientesApi = {
  // Obtener todos los clientes
  getClientes: async () => {
    try {
      const response = await api.get('/api/clientes');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo clientes:', error);
      throw error;
    }
  },

  // Crear cliente
  createCliente: async (cliente) => {
    try {
      const response = await api.post('/api/clientes', cliente);
      return response.data;
    } catch (error) {
      console.error('Error creando cliente:', error);
      throw error;
    }
  },

  // Obtener cliente por DNI
  getClienteByDni: async (dni) => {
    try {
      const response = await api.get(`/api/clientes/dni/${dni}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo cliente con DNI ${dni}:`, error);
      throw error;
    }
  },

  // Obtener clientes activos
  getClientesActive: async () => {
    try {
      const response = await api.get('/api/clientes/active');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo clientes activos:', error);
      throw error;
    }
  },

  // Obtener clientes inactivos
  getClientesInactive: async () => {
    try {
      const response = await api.get('/api/clientes/inactive');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo clientes inactivos:', error);
      throw error;
    }
  },

  // Obtener cliente por ID
  getClienteById: async (id) => {
    try {
      const response = await api.get(`/api/clientes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo cliente con id ${id}:`, error);
      throw error;
    }
  },

  // Actualizar cliente
  updateCliente: async (id, cliente) => {
    try {
      const response = await api.put(`/api/clientes/${id}`, cliente);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando cliente con id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar cliente
  deleteCliente: async (id) => {
    try {
      const response = await api.delete(`/api/clientes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando cliente con id ${id}:`, error);
      throw error;
    }
  },

  // Deshabilitar cliente
  disableCliente: async (id) => {
    try {
      const response = await api.delete(`/api/clientes/${id}/disable`);
      return response.data;
    } catch (error) {
      console.error(`Error deshabilitando cliente con id ${id}:`, error);
      throw error;
    }
  },

  // Habilitar cliente
  enableCliente: async (id) => {
    try {
      const response = await api.patch(`/api/clientes/${id}/enable`);
      return response.data;
    } catch (error) {
      console.error(`Error habilitando cliente con id ${id}:`, error);
      throw error;
    }
  }
};

export default clientesApi;
