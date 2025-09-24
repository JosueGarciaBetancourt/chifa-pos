import tiposInsumosApi from '../api/tiposInsumosApi';
import isElectron from '../../utils/isElectron';

const tiposInsumosUnifiedService = {
  getTiposInsumos: async () => {
    if (isElectron()) {
      try {
        const tiposInsumos = await window.electronAPI.tiposInsumos.getTiposInsumos();
        return tiposInsumos;
      } catch (error) {
        console.error('❌ Error usando Electron API:', error);
        throw error;
      }
    } else {
      try {
        const tiposInsumos = await tiposInsumosApi.getTiposInsumos();
        return tiposInsumos;
      } catch (error) {
        console.error('❌ Error usando API web:', error);
        throw error;
      }
    }
  }
};

export default tiposInsumosUnifiedService;
