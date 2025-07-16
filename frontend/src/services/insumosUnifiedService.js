import insumosApi from './api/insumosApi';
import isElectron from '../utils/isElectron';

const insumosUnifiedService = {
  getInsumos: async () => {
    if (isElectron()) {
      try {
        const insumos = await window.electronAPI.getInsumos();
        return insumos;
      } catch (error) {
        console.error('❌ Error usando Electron API:', error);
        throw error;
      }
    } else {
      try {
        const insumos = await insumosApi.getInsumos();
        return insumos;
      } catch (error) {
        console.error('❌ Error usando API web:', error);
        throw error;
      }
    }
  }
};

export default insumosUnifiedService;
