import inventarioApi from '../api/inventarioApi';
import isElectron from '../../utils/isElectron';

const inventarioUnified = {
  getInventarioDetallado: async () => {
    if (isElectron()) {
      try {
        const inventario = await window.electronAPI.inventario.getInventarioDetallado();
        return inventario;
      } catch (error) {
        console.error('❌ Error usando Electron API:', error);
        throw error;
      }
    } else {
      try {
        const inventario = await inventarioApi.getInventarioDetallado();
        return inventario;
      } catch (error) {
        console.error('❌ Error usando API web:', error);
        throw error;
      }
    }
  }
};

export default inventarioUnified;
