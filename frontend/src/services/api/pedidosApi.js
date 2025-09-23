import api from '../axiosInstance';

const pedidosApi = {
  // Obtener todos los pedidos
  getPedidos: async () => {
    try {
      const response = await api.get('/api/pedidos');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo pedidos:', error);
      throw error;
    }
  },

  // Crear pedido
  createPedido: async (pedido) => {
    try {
      const response = await api.post('/api/pedidos', pedido);
      return response.data;
    } catch (error) {
      console.error('Error creando pedido:', error);
      throw error;
    }
  },

  // Obtener pedidos por sede
  getPedidosBySede: async (sedeId) => {
    try {
      const response = await api.get(`/api/pedidos/sede/${sedeId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo pedidos de la sede con id ${sedeId}:`, error);
      throw error;
    }
  },

  // Obtener pedidos por rango de fechas
  getPedidosByFecha: async (fechaInicio, fechaFin) => {
    try {
      const response = await api.get('/api/pedidos/rango-fechas', {
        params: { fechaInicio, fechaFin },
      });
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo pedidos en el rango de fechas:`, error);
      throw error;
    }
  },

  // Obtener pedidos por cliente
  getPedidosByCliente: async (clienteId) => {
    try {
      const response = await api.get(`/api/pedidos/cliente/${clienteId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo pedidos del cliente con id ${clienteId}:`, error);
      throw error;
    }
  },

  // Obtener pedidos por usuario
  getPedidosByUsuario: async (usuarioId) => {
    try {
      const response = await api.get(`/api/pedidos/usuario/${usuarioId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo pedidos del usuario con id ${usuarioId}:`, error);
      throw error;
    }
  },

  // Obtener pedidos por mesa
  getPedidosByMesa: async (mesaId) => {
    try {
      const response = await api.get(`/api/pedidos/mesa/${mesaId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo pedidos de la mesa con id ${mesaId}:`, error);
      throw error;
    }
  },

  // Obtener pedidos por estado
  getPedidosByEstado: async (estadoId) => {
    try {
      const response = await api.get(`/api/pedidos/estado/${estadoId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo pedidos con estado ${estadoId}:`, error);
      throw error;
    }
  },

  // Obtener pedidos por tipo
  getPedidosByTipo: async (tipoId) => {
    try {
      const response = await api.get(`/api/pedidos/tipo/${tipoId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo pedidos con tipo ${tipoId}:`, error);
      throw error;
    }
  },

  // Obtener pedido por id de cotización
  getPedidoByCotizacionId: async (cotizacionId) => {
    try {
      const response = await api.get(`/api/pedidos/cotizacion/${cotizacionId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo pedido con cotización ${cotizacionId}:`, error);
      throw error;
    }
  },

  // Actualizar estado de un pedido
  updateEstadoDePedido: async (id, nuevoEstado) => {
    try {
      const response = await api.patch(`/api/pedidos/${id}/estado`, { estado: nuevoEstado });
      return response.data;
    } catch (error) {
      console.error(`Error actualizando estado del pedido con id ${id}:`, error);
      throw error;
    }
  },

  // Obtener pedido por id
  getPedidoById: async (id) => {
    try {
      const response = await api.get(`/api/pedidos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo pedido con id ${id}:`, error);
      throw error;
    }
  },

  // Actualizar pedido
  updatePedido: async (id, pedido) => {
    try {
      const response = await api.put(`/api/pedidos/${id}`, pedido);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando pedido con id ${id}:`, error);
      throw error;
    }
  },
};

export default pedidosApi;
