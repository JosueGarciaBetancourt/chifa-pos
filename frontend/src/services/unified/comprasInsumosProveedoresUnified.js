import comprasInsumosProveedoresApi from '../api/comprasInsumosProveedoresApi';
import isElectron from '../../utils/isElectron';

const comprasInsumosProveedoresUnified = {
  getComprasInsumosProveedores: async () => {
    if (isElectron()) {
      try {
        const insumos = await window.electronAPI.comprasInsumosProveedores.getComprasInsumosProveedores();
        return insumos;
      } catch (error) {
        console.error('❌ Error usando Electron API:', error);
        throw error;
      }
    } else {
      try {
        const insumos = await comprasInsumosProveedoresApi.getComprasInsumosProveedores();
        return insumos;
      } catch (error) {
        console.error('❌ Error usando API web:', error);
        throw error;
      }
    }
  }
};

export default comprasInsumosProveedoresUnified;
