import { AperturaCaja } from '../../../electron/database/models/AperturaCaja.js';

export const aperturasCajaController = {
  abrirCaja: (movimiento_id, monto_inicial) => {
    try {
      // Validar campos requeridos
      if (!movimiento_id || !monto_inicial) {
        return { 
          success: false, 
          error: 'movimiento_id y monto_inicial es requerido' 
        };
      }

      if (monto_inicial < 0) {
        return { 
          success: false, 
          error: 'monto_inicial debe ser un número mayor o igual a 0' 
        };
      }

      // Insertar en BD
      const aperturaCaja = AperturaCaja.abrir(movimiento_id, monto_inicial);

      return aperturaCaja;
    } catch (error) {
      return { 
        success: false, 
        error: 'Error al abrir caja', 
        details: error.message 
      };
    }
  }
};
