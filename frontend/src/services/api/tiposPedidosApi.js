// frontend/api/tiposPedidosApi.js
import api from '../axiosInstance';

const tiposPedidosApi = {
  // Obtener todos los tipos de pedidos
  getTiposPedidos: async () => {
    try {
      const response = await api.get('/api/tiposPedidos');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo tipos de pedidos:', error);
      throw error;
    }
  },

  // Crear tipo de pedido
  createTipoPedido: async (tipoPedido) => {
    try {
      const response = await api.post('/api/tiposPedidos', tipoPedido);
      return response.data;
    } catch (error) {
      console.error('Error creando tipo de pedido:', error);
      throw error;
    }
  },

  // Buscar tipos de pedidos por nombre
  searchTiposPedidosByName: async (name) => {
    try {
      const response = await api.get('/api/tiposPedidos/searchTiposPedidosByName', {
        params: { name },
      });
      return response.data;
    } catch (error) {
      console.error(`Error buscando tipos de pedidos con nombre ${name}:`, error);
      throw error;
    }
  },

  // Obtener tipo de pedido por id
  getTipoPedidoById: async (id) => {
    try {
      const response = await api.get(`/api/tiposPedidos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo tipo de pedido con id ${id}:`, error);
      throw error;
    }
  },

  // Actualizar tipo de pedido
  updateTipoPedido: async (id, tipoPedido) => {
    try {
      const response = await api.put(`/api/tiposPedidos/${id}`, tipoPedido);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando tipo de pedido con id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar tipo de pedido
  deleteTipoPedido: async (id) => {
    try {
      const response = await api.delete(`/api/tiposPedidos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando tipo de pedido con id ${id}:`, error);
      throw error;
    }
  },
};

export default tiposPedidosApi;
