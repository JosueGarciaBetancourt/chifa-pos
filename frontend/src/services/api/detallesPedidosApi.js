import api from '../axiosInstance';

const detallesPedidosApi = {
  // Obtener detalles de pedido por pedidoId
  getDetalleByPedido: async (pedidoId) => {
    try {
      const response = await api.get(`/api/detallesPedidos/pedido/${pedidoId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo detalles del pedido con id ${pedidoId}:`, error);
      throw error;
    }
  },

  // Crear detalle de pedido
  createDetallePedido: async (pedidoId, detallePedido) => {
    try {
      const response = await api.post(`/api/detallesPedidos/pedido/${pedidoId}`, detallePedido);
      return response.data;
    } catch (error) {
      console.error(`Error creando detalle de pedido para el pedido ${pedidoId}:`, error);
      throw error;
    }
  },

  // Actualizar estado de un detalle de pedido
  updateEstadoDeDetallePedido: async (id, nuevoEstado) => {
    try {
      const response = await api.patch(`/api/detallesPedidos/${id}/estado`, { estado: nuevoEstado });
      return response.data;
    } catch (error) {
      console.error(`Error actualizando estado del detalle de pedido con id ${id}:`, error);
      throw error;
    }
  },

  // Actualizar detalle de pedido
  updateDetallePedido: async (id, detallePedido) => {
    try {
      const response = await api.put(`/api/detallesPedidos/${id}`, detallePedido);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando detalle de pedido con id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar detalle de pedido
  deleteDetallePedido: async (id) => {
    try {
      const response = await api.delete(`/api/detallesPedidos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando detalle de pedido con id ${id}:`, error);
      throw error;
    }
  },
};

export default detallesPedidosApi;
