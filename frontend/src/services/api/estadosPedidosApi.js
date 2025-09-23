import api from '../axiosInstance';

const estadosPedidosApi = {
  // Obtener todos los estados de pedidos
  getEstadosPedidos: async () => {
    try {
      const response = await api.get('/api/estadosPedidos');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo estados de pedidos:', error);
      throw error;
    }
  },

  // Crear estado de pedido
  createEstadoPedido: async (estadoPedido) => {
    try {
      const response = await api.post('/api/estadosPedidos', estadoPedido);
      return response.data;
    } catch (error) {
      console.error('Error creando estado de pedido:', error);
      throw error;
    }
  },

  // Buscar estados de pedidos por nombre
  searchEstadosPedidosByName: async (name) => {
    try {
      const response = await api.get('/api/estadosPedidos/searchEstadosPedidosByName', {
        params: { name },
      });
      return response.data;
    } catch (error) {
      console.error(`Error buscando estados de pedidos con nombre ${name}:`, error);
      throw error;
    }
  },

  // Obtener estado de pedido por id
  getEstadoPedidoById: async (id) => {
    try {
      const response = await api.get(`/api/estadosPedidos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo estado de pedido con id ${id}:`, error);
      throw error;
    }
  },

  // Actualizar estado de pedido
  updateEstadoPedido: async (id, estadoPedido) => {
    try {
      const response = await api.put(`/api/estadosPedidos/${id}`, estadoPedido);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando estado de pedido con id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar estado de pedido
  deleteEstadoPedido: async (id) => {
    try {
      const response = await api.delete(`/api/estadosPedidos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando estado de pedido con id ${id}:`, error);
      throw error;
    }
  },
};

export default estadosPedidosApi;
