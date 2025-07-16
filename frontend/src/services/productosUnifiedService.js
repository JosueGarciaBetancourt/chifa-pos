import productosApi from './api/productosApi';
import isElectron from '../utils/isElectron';

const productosUnifiedService = {
  getProductos: async () => {
    if (isElectron()) {
      try {
        const productos = await window.electronAPI.getProductos();
        return productos;
      } catch (error) {
        console.error('❌ Error usando Electron API:', error);
        throw error;
      }
    } else {
      try {
        const productos = await productosApi.getProductos();
        return productos;
      } catch (error) {
        console.error('❌ Error usando API web:', error);
        throw error;
      }
    }
  }
};

export default productosUnifiedService;
