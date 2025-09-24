import { MovimientoCaja } from '../../../electron/database/models/MovimientoCaja.js';
import { aperturasCajaController } from "../controllers/aperturasCaja.controller.js";
import { cierresCajaController } from "../controllers/cierresCaja.controller.js";
import { ingresosEgresosCajaController } from "../controllers/ingresosEgresosCaja.controller.js";
import { ComprobanteVenta } from '../../../electron/database/models/ComprobanteVenta.js';
import { Gasto } from '../../../electron/database/models/Gasto.js';

export const movimientosCajaController = {
  
  // =================== CONSULTAS GENERALES ===================
  
  getMovimientosCaja: async (req, res) => {
    try {
      const movimientosCaja = MovimientoCaja.selectAll();
      res.status(200).json(movimientosCaja);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getMovimientoCajaById: async (req, res) => {
    try {
      const movimiento = MovimientoCaja.findById(req.params.id);
      
      if (!movimiento) return res.status(404).json({ error: 'Movimiento de caja no encontrado' });
      
      res.json(movimiento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getMovimientosCajaByJornada: async (req, res) => {
    try {
      const movimientos = MovimientoCaja.findByJornada(parseInt(req.params.jornadaId));
      
      res.status(200).json(movimientos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getMovimientosCajaByUsuario: async (req, res) => {
    try {
      const movimientos = MovimientoCaja.findByUsuario(parseInt(req.params.usuarioId));
      
      res.status(200).json(movimientos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getMovimientosCajaByCaja: async (req, res) => {
    try {
      const movimientos = MovimientoCaja.findByCaja(req.params.cajaId);
      
      res.status(200).json(movimientos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getMovimientosCajaByTipo: async (req, res) => {
    try {
      const movimientos = MovimientoCaja.findByTipo(req.params.tipo);
      
      res.status(200).json(movimientos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // =================== CONSULTAS DE ESTADO ===================
  
  getEstadoCaja: async (req, res) => {
    try {
      const cajaAbierta = MovimientoCaja.getCajaAbierta(req.params.cajaId);
      
      if (!cajaAbierta) {
        return res.status(200).json({ caja_abierta: false });
      }

      const saldo = MovimientoCaja.calcularSaldoCaja(req.params.cajaId, cajaAbierta.movimiento_apertura_id);
      
      res.status(200).json({
        caja_abierta: true,
        movimiento_apertura_id: cajaAbierta.movimiento_apertura_id,
        fecha_hora: cajaAbierta.fecha_hora,
        monto_inicial: cajaAbierta.monto_inicial,
        saldo_actual: saldo
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getResumenCaja: async (req, res) => {
    try {
      const { cajaId } = req.params;
      const { fecha_inicio, fecha_fin } = req.query;
      
      const resumen = MovimientoCaja.getResumenCaja(
        parseInt(cajaId), 
        fecha_inicio, 
        fecha_fin
      );
      
      res.status(200).json({
        data: resumen
      });
    } catch (error) {
      res.status(500).json({ 
        error: 'Error al obtener resumen de caja', 
        details: error.message 
      });
    }
  },

  // =================== OPERACIONES DE CAJA ===================
  // NOTA: Estos métodos serán movidos a controladores específicos
  
  abrirCaja: async (req, res) => {
    try {
      // Validar campos requeridos
      const { caja_id, usuario_id, jornada_laboral_id, monto_inicial, observaciones } = req.body;
      
      if (!caja_id || !usuario_id || !jornada_laboral_id || !monto_inicial) {
        return res.status(400).json({ 
          error: 'caja_id, usuario_id, jornada_laboral_id y monto_inicial son requeridos' 
        });
      }

      if (monto_inicial < 0) {
        return res.status(400).json({ 
          error: 'monto_inicial debe ser un número mayor o igual a 0' 
        });
      }

      // Verificar si la caja ya está abierta
      const cajaAbierta = MovimientoCaja.getCajaAbierta(caja_id);

      if (cajaAbierta) {
        return res.status(400).json({ 
          error: 'La caja ya está abierta',
          apertura_activa: cajaAbierta
        });
      }

      const movimiento = MovimientoCaja.insertMovimientoBase({
        caja_id: caja_id,
        tipo: "apertura",
        usuario_id: usuario_id,
        jornada_laboral_id: jornada_laboral_id,
        observaciones: observaciones
      });
      
      aperturasCajaController.abrirCaja(movimiento.id, monto_inicial);
      const movimientoApertura = MovimientoCaja.findById(movimiento.id);

      res.status(201).json(movimientoApertura);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  cerrarCaja: async (req, res) => {
    try {
      // Validar campos requeridos
      const { movimiento_apertura_id, usuario_id, jornada_laboral_id, monto_final_manual, observaciones } = req.body;
      
      if (!movimiento_apertura_id || !usuario_id || !jornada_laboral_id || !monto_final_manual) {
        return res.status(400).json({ 
          error: 'movimiento_apertura_id, usuario_id, jornada_laboral_id y monto_final_manual son requeridos' 
        });
      }


      if (monto_final_manual < 0) {
        return res.status(400).json({ 
          error: 'monto_final_manual debe ser un número mayor o igual a 0' 
        });
      }

      const caja_id = MovimientoCaja.selectCajaIdByAperturaId(movimiento_apertura_id);
      if(!caja_id) {
        return res.status(400).json({ 
          error: 'movimiento_apertura_id no válido' 
        });
      }

      // Verificar si la caja está abierta
      const cajaAbierta = MovimientoCaja.getCajaAbierta(caja_id);
      if (!cajaAbierta) {
        return res.status(400).json({ 
          error: 'No hay una caja abierta para cerrar' 
        });
      }

      const movimiento = MovimientoCaja.insertMovimientoBase({
        caja_id: caja_id,
        tipo: "cierre",
        usuario_id: usuario_id,
        jornada_laboral_id: jornada_laboral_id,
        observaciones: observaciones
      });

      cierresCajaController.cerrarCaja(movimiento.id, movimiento_apertura_id, monto_final_manual);
      const movimientoCierre = MovimientoCaja.findById(movimiento.id);

      res.status(201).json(movimientoCierre);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  ingresoCaja: async (req, res) => {
    try {
      // Validar campos requeridos
      const { movimiento_apertura_id, comprobante_id, usuario_id, jornada_laboral_id, observaciones } = req.body;
      
      if (!movimiento_apertura_id || !comprobante_id || !usuario_id || !jornada_laboral_id) {
        return res.status(400).json({ 
          error: 'movimiento_apertura_id, comprobante_id, usuario_id y jornada_laboral_id son requeridos' 
        });
      }

      const caja_id = MovimientoCaja.selectCajaIdByAperturaId(movimiento_apertura_id);
      if(!caja_id) {
        return res.status(400).json({ 
          error: 'movimiento_apertura_id no válido' 
        });
      }
      
      // Verificar si la caja está abierta
      const cajaAbierta = MovimientoCaja.getCajaAbierta(caja_id);
      if (!cajaAbierta) {
        return res.status(400).json({ 
          error: 'No hay una caja abierta para registrar el ingreso' 
        });
      }

      const movimiento = MovimientoCaja.insertMovimientoBase({
        caja_id: caja_id,
        tipo: "ingreso",
        usuario_id: usuario_id,
        jornada_laboral_id: jornada_laboral_id,
        observaciones: observaciones
      });
      
      const monto = ComprobanteVenta.selectTotalById(comprobante_id);

      ingresosEgresosCajaController.registrarIngreso(movimiento.id, movimiento_apertura_id,
                                                    comprobante_id, monto);

      const movimientoIngreso = MovimientoCaja.findById(movimiento.id);

      res.status(201).json(movimientoIngreso);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  egresoCaja: async (req, res) => {
    try {
      const { movimiento_apertura_id, gasto_id, usuario_id, jornada_laboral_id, observaciones } = req.body;
      
      if (!movimiento_apertura_id || !gasto_id || !usuario_id || !jornada_laboral_id) {
        return res.status(400).json({ 
          error: 'movimiento_apertura_id, gasto_id, usuario_i y jornada_laboral_id son requeridos' 
        });
      }

      const caja_id = MovimientoCaja.selectCajaIdByAperturaId(movimiento_apertura_id);
      if(!caja_id) {
        return res.status(400).json({ 
          error: 'movimiento_apertura_id no válido' 
        });
      }

      const cajaAbierta = MovimientoCaja.getCajaAbierta(caja_id);
      if (!cajaAbierta) {
        return res.status(400).json({ 
          error: 'No hay una caja abierta para registrar el ingreso' 
        });
      }

      const movimiento = MovimientoCaja.insertMovimientoBase({
        caja_id: caja_id,
        tipo: "egreso",
        usuario_id: usuario_id,
        jornada_laboral_id: jornada_laboral_id,
        observaciones: observaciones
      });

      const monto = Gasto.selectMontoById(gasto_id);

      ingresosEgresosCajaController.registrarEgreso(movimiento.id, movimiento_apertura_id, gasto_id, monto);

      const movimientoEgreso = MovimientoCaja.findById(movimiento.id);

      res.status(201).json(movimientoEgreso);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // =================== OPERACIONES GENERALES ===================
  
  updateMovimientoCaja: async (req, res) => {
    try {
      const { id } = req.params;
      const { observaciones } = req.body;
      
      if (!observaciones) {
        return res.status(400).json({ 
          error: 'observaciones es requerido para la actualización' 
        });
      }

      const updated = MovimientoCaja.update(parseInt(id), { observaciones });
      
      if (!updated) {
        return res.status(404).json({ 
          error: 'Movimiento de caja no encontrado' 
        });
      }
      
      res.status(200).json({
        message: 'Movimiento actualizado exitosamente',
        data: updated
      });
    } catch (error) {
      res.status(400).json({ 
        error: 'Error al actualizar movimiento', 
        details: error.message 
      });
    }
  },

  deleteMovimientoCaja: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = MovimientoCaja.delete(parseInt(id));
      
      if (!deleted) {
        return res.status(404).json({ 
          error: 'Movimiento de caja no encontrado' 
        });
      }
      
      res.status(200).json({
        message: 'Movimiento eliminado exitosamente',
        data: deleted
      });
    } catch (error) {
      res.status(500).json({ 
        error: 'Error al eliminar movimiento de caja', 
        details: error.message 
      });
    }
  }
};