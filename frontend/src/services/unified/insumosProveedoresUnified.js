import insumosProveedoresApi from '../api/insumosProveedoresApi';
import isElectron from '../../utils/isElectron';

const insumosProveedoresUnified = {
  getInsumosProveedores: async () => {
    if (isElectron()) {
      try {
        const insumos = await window.electronAPI.insumosProveedores.getInsumosProveedores();
        return insumos;
      } catch (error) {
        console.error('❌ Error usando Electron API:', error);
        throw error;
      }
    } else {
      try {
        const insumos = await insumosProveedoresApi.getInsumosProveedores();
        return insumos;
      } catch (error) {
        console.error('❌ Error usando API web:', error);
        throw error;
      }
    }
  }
};

export default insumosProveedoresUnified;
