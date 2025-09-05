import { CierreCaja } from '../../../electron/database/models/CierreCaja.js';

export const cierresCajaController = {

  cerrarCaja: (movimiento_id, movimiento_apertura_id, monto_final_manual) => {
    try {
      // Validar campos requeridos
      if (!movimiento_id || !movimiento_apertura_id || !monto_final_manual) {
        return { 
          success: false, 
          error: 'movimiento_id, movimiento_apertura_id y monto_final_manual son requeridos' 
        };
      }

      const aperturaCaja = CierreCaja.cerrar(movimiento_id, movimiento_apertura_id, monto_final_manual);

      return aperturaCaja;
    } catch (error) {
      return { 
        error: 'Error al cerrar caja', 
        details: error.message 
      };
    }
  }
};