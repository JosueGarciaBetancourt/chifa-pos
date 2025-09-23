import api from '../axiosInstance';

const comprobantesVentaApi = {
  // Obtener todos los comprobantes de venta
  getComprobantesVenta: async () => {
    try {
      const response = await api.get('/api/comprobantesVenta');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo comprobantes de venta:', error);
      throw error;
    }
  },

  // Crear un comprobante de venta
  createComprobanteVenta: async (comprobanteVenta) => {
    try {
      const response = await api.post('/api/comprobantesVenta', comprobanteVenta);
      return response.data;
    } catch (error) {
      console.error('Error creando comprobante de venta:', error);
      throw error;
    }
  },

  // Obtener comprobantes de venta por pedidoId
  getComprobantesVentaByPedidoId: async (pedidoId) => {
    try {
      const response = await api.get(`/api/comprobantesVenta/pedido/${pedidoId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo comprobantes de venta del pedido con id ${pedidoId}:`, error);
      throw error;
    }
  },

  // Obtener comprobante de venta por ID
  getComprobanteVentaById: async (id) => {
    try {
      const response = await api.get(`/api/comprobantesVenta/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo comprobante de venta con id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar comprobante de venta
  deleteComprobanteVenta: async (id) => {
    try {
      const response = await api.delete(`/api/comprobantesVenta/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando comprobante de venta con id ${id}:`, error);
      throw error;
    }
  },

  // Actualizar estado de un comprobante de venta
  updateEstadoDeComprobanteVenta: async (id, nuevoEstado) => {
    try {
      const response = await api.patch(`/api/comprobantesVenta/${id}/estado`, { estado: nuevoEstado });
      return response.data;
    } catch (error) {
      console.error(`Error actualizando estado del comprobante de venta con id ${id}:`, error);
      throw error;
    }
  },

  // Actualizar XML de un comprobante de venta
  updateXMLComprobanteVenta: async (id, xmlData) => {
    try {
      const response = await api.patch(`/api/comprobantesVenta/${id}/xml`, { xml: xmlData });
      return response.data;
    } catch (error) {
      console.error(`Error actualizando XML del comprobante de venta con id ${id}:`, error);
      throw error;
    }
  },
};

export default comprobantesVentaApi;
