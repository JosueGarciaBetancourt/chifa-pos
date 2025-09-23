import api from '../axiosInstance';

const dispositivosApi = {
  // Obtener todos los dispositivos
  getDispositivos: async () => {
    try {
      const response = await api.get('/api/dispositivos');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo dispositivos:', error);
      throw error;
    }
  },

  // Crear un dispositivo
  createDispositivo: async (dispositivo) => {
    try {
      const response = await api.post('/api/dispositivos', dispositivo);
      return response.data;
    } catch (error) {
      console.error('Error creando dispositivo:', error);
      throw error;
    }
  },

  // Obtener dispositivos activos
  getDispositivosActive: async () => {
    try {
      const response = await api.get('/api/dispositivos/active');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo dispositivos activos:', error);
      throw error;
    }
  },

  // Obtener dispositivos inactivos
  getDispositivosInactive: async () => {
    try {
      const response = await api.get('/api/dispositivos/inactive');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo dispositivos inactivos:', error);
      throw error;
    }
  },

  // Obtener dispositivo por ID
  getDispositivoById: async (id) => {
    try {
      const response = await api.get(`/api/dispositivos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo dispositivo con id ${id}:`, error);
      throw error;
    }
  },

  // Obtener, actualizar o eliminar dispositivo por MAC
  getDispositivoByMac: async (mac) => {
    try {
      const response = await api.get(`/api/dispositivos/mac/${mac}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo dispositivo con MAC ${mac}:`, error);
      throw error;
    }
  },

  updateDispositivo: async (mac, dispositivo) => {
    try {
      const response = await api.put(`/api/dispositivos/mac/${mac}`, dispositivo);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando dispositivo con MAC ${mac}:`, error);
      throw error;
    }
  },

  actualizarConexion: async (mac, data) => {
    try {
      const response = await api.patch(`/api/dispositivos/mac/${mac}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando conexión del dispositivo con MAC ${mac}:`, error);
      throw error;
    }
  },

  deleteDispositivo: async (mac) => {
    try {
      const response = await api.delete(`/api/dispositivos/mac/${mac}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando dispositivo con MAC ${mac}:`, error);
      throw error;
    }
  },

  // Deshabilitar dispositivo
  disableDispositivo: async (mac) => {
    try {
      const response = await api.delete(`/api/dispositivos/mac/${mac}/disable`);
      return response.data;
    } catch (error) {
      console.error(`Error deshabilitando dispositivo con MAC ${mac}:`, error);
      throw error;
    }
  },

  // Habilitar dispositivo
  enableDispositivo: async (mac) => {
    try {
      const response = await api.patch(`/api/dispositivos/mac/${mac}/enable`);
      return response.data;
    } catch (error) {
      console.error(`Error habilitando dispositivo con MAC ${mac}:`, error);
      throw error;
    }
  },
};

export default dispositivosApi;
