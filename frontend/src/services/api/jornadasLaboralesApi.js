import api from '../axiosInstance';

const jornadasLaboralesApi = {
  getJornadasLaborales: async () => {
    try {
      const { data } = await api.get('/api/jornadasLaborales');
      return data;
    } catch (error) {
      console.error('Error obteniendo todas las jornadas laborales:', error);
      throw error;
    }
  },

  createJornadaLaboral: async (payload) => {
    try {
      const { data } = await api.post('/api/jornadasLaborales', payload);
      return data;
    } catch (error) {
      console.error('Error creando jornada laboral:', error);
      throw error;
    }
  },

  getJornadaLaboralIniciadaPorUsuarioId: async (usuarioId) => {
    try {
      const { data } = await api.get(`/api/jornadasLaborales/usuario/${usuarioId}/iniciada`);
      return data;
    } catch (error) {
      console.error(`Error obteniendo jornada laboral iniciada para usuario ${usuarioId}:`, error);
      throw error;
    }
  },

  finalizarJornadaLaboral: async (id, payload) => {
    try {
      const { data } = await api.put(`/api/jornadasLaborales/${id}/finalizar`, payload);
      return data;
    } catch (error) {
      console.error(`Error finalizando jornada laboral con id ${id}:`, error);
      throw error;
    }
  },

  getJornadaLaboralById: async (id) => {
    try {
      const { data } = await api.get(`/api/jornadasLaborales/${id}`);
      return data;
    } catch (error) {
      console.error(`Error obteniendo jornada laboral con id ${id}:`, error);
      throw error;
    }
  },

  deleteJornadaLaboral: async (id) => {
    try {
      const { data } = await api.delete(`/api/jornadasLaborales/${id}`);
      return data;
    } catch (error) {
      console.error(`Error eliminando jornada laboral con id ${id}:`, error);
      throw error;
    }
  }
};

export default jornadasLaboralesApi;
