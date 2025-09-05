import { IngresoEgresoCaja } from '../../../electron/database/models/IngresoEgresoCaja.js';

export const ingresosEgresosCajaController = {
  registrarIngreso: (movimiento_id, movimiento_apertura_id, comprobante_id, monto) => {
    try {
      if (!movimiento_id || !movimiento_apertura_id || !comprobante_id || !monto) {
        return { 
          success: false, 
          error: 'movimiento_id, movimiento_apertura_id, comprobante_id  y monto son requeridos' 
        };
      }

      const ingresoCaja = IngresoEgresoCaja.registrarIngreso(movimiento_id, movimiento_apertura_id, 
                                                              comprobante_id, monto);

      return ingresoCaja;
    } catch (error) {
      return { 
        success: false, 
        error: 'Error al registrar ingreso en caja', 
        details: error.message 
      };
    }
  },

  registrarEgreso: (movimiento_id, movimiento_apertura_id, gasto_id, monto) => {
    try {
      if (!movimiento_id || !movimiento_apertura_id || !comprobante_id || !monto) {
        return { 
          success: false, 
          error: 'movimiento_id, movimiento_apertura_id, gasto_id  y monto son requeridos' 
        };
      }

      const egresoCaja = IngresoEgresoCaja.registrarEgreso(movimiento_id, movimiento_apertura_id, 
                                                              gasto_id, monto);

      return egresoCaja;
    } catch (error) {
      return { 
        success: false, 
        error: 'Error al registrar egreso en caja', 
        details: error.message 
      };
    }
  }
};