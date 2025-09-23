import api from '../axiosInstance';

const estadosDetallesPedidosApi = {
  // Obtener todos los estados de detalles de pedidos
  getEstadosDetallesPedidos: async () => {
    try {
      const response = await api.get('/api/estadosDetallesPedidos');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo estados de detalles de pedidos:', error);
      throw error;
    }
  },

  // Crear estado de detalle de pedido
  createEstadoDetallePedido: async (estadoDetallePedido) => {
    try {
      const response = await api.post('/api/estadosDetallesPedidos', estadoDetallePedido);
      return response.data;
    } catch (error) {
      console.error('Error creando estado de detalle de pedido:', error);
      throw error;
    }
  },

  // Buscar estados de detalles de pedidos por nombre
  searchEstadosDetallesPedidosByName: async (name) => {
    try {
      const response = await api.get('/api/estadosDetallesPedidos/searchEstadosDetallesPedidosByName', {
        params: { name },
      });
      return response.data;
    } catch (error) {
      console.error(`Error buscando estados de detalles de pedidos con nombre ${name}:`, error);
      throw error;
    }
  },

  // Obtener estado de detalle de pedido por id
  getEstadoDetallePedidoById: async (id) => {
    try {
      const response = await api.get(`/api/estadosDetallesPedidos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo estado de detalle de pedido con id ${id}:`, error);
      throw error;
    }
  },

  // Actualizar estado de detalle de pedido
  updateEstadoDetallePedido: async (id, estadoDetallePedido) => {
    try {
      const response = await api.put(`/api/estadosDetallesPedidos/${id}`, estadoDetallePedido);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando estado de detalle de pedido con id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar estado de detalle de pedido
  deleteEstadoDetallePedido: async (id) => {
    try {
      const response = await api.delete(`/api/estadosDetallesPedidos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando estado de detalle de pedido con id ${id}:`, error);
      throw error;
    }
  },
};

export default estadosDetallesPedidosApi;
