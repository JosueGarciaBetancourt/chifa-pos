import api from '../axiosInstance';

const movimientosCajaApi = {
  // =================== CONSULTAS GENERALES ===================
  getMovimientosCaja: async () => {
    try {
      const response = await api.get('/api/movimientos-caja');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo movimientos de caja:', error);
      throw error;
    }
  },

  getMovimientoCajaById: async (id) => {
    try {
      const response = await api.get(`/api/movimientos-caja/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo movimiento de caja con id ${id}:`, error);
      throw error;
    }
  },

  getMovimientosCajaByJornada: async (jornadaId) => {
    try {
      const response = await api.get(`/api/movimientos-caja/jornada/${jornadaId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo movimientos de caja para jornada ${jornadaId}:`, error);
      throw error;
    }
  },

  getMovimientosCajaByUsuario: async (usuarioId) => {
    try {
      const response = await api.get(`/api/movimientos-caja/usuario/${usuarioId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo movimientos de caja para usuario ${usuarioId}:`, error);
      throw error;
    }
  },

  getMovimientosCajaByCaja: async (cajaId) => {
    try {
      const response = await api.get(`/api/movimientos-caja/caja/${cajaId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo movimientos de caja para caja ${cajaId}:`, error);
      throw error;
    }
  },

  getMovimientosCajaByTipo: async (tipo) => {
    try {
      const response = await api.get(`/api/movimientos-caja/tipo/${tipo}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo movimientos de caja de tipo ${tipo}:`, error);
      throw error;
    }
  },

  // =================== CONSULTAS DE ESTADO ===================
  getEstadoCaja: async (cajaId) => {
    try {
      const response = await api.get(`/api/movimientos-caja/caja/${cajaId}/estado`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo estado de caja ${cajaId}:`, error);
      throw error;
    }
  },

  getResumenCaja: async (cajaId) => {
    try {
      const response = await api.get(`/api/movimientos-caja/caja/${cajaId}/resumen`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo resumen de caja ${cajaId}:`, error);
      throw error;
    }
  },

  // =================== ACCIONES ===================
  abrirCaja: async (data) => {
    try {
      const response = await api.post('/api/movimientos-caja/abrir', data);
      return response.data;
    } catch (error) {
      console.error('Error abriendo caja:', error);
      throw error;
    }
  },

  ingresoCaja: async (data) => {
    try {
      const response = await api.post('/api/movimientos-caja/ingreso', data);
      return response.data;
    } catch (error) {
      console.error('Error registrando ingreso en caja:', error);
      throw error;
    }
  },

  egresoCaja: async (data) => {
    try {
      const response = await api.post('/api/movimientos-caja/egreso', data);
      return response.data;
    } catch (error) {
      console.error('Error registrando egreso en caja:', error);
      throw error;
    }
  },

  cerrarCaja: async (data) => {
    try {
      const response = await api.post('/api/movimientos-caja/cerrar', data);
      return response.data;
    } catch (error) {
      console.error('Error cerrando caja:', error);
      throw error;
    }
  },

  updateMovimientoCaja: async (id, movimiento) => {
    try {
      const response = await api.put(`/api/movimientos-caja/${id}`, movimiento);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando movimiento de caja con id ${id}:`, error);
      throw error;
    }
  },

  deleteMovimientoCaja: async (id) => {
    try {
      const response = await api.delete(`/api/movimientos-caja/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando movimiento de caja con id ${id}:`, error);
      throw error;
    }
  },
};

export default movimientosCajaApi;
