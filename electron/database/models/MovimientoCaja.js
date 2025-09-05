import { connection } from '../connection.js';
import { DateFormatter } from '../utils/dateFormatter.js';

const db = connection();

const baseSelect = `
  SELECT 
    mc.id,
    mc.caja_id,
    c.nombre AS caja_nombre,
    c.descripcion AS caja_descripcion,
    c.activo AS caja_activo,

    mc.usuario_id,
    u.dni AS usuario_dni,
    u.nombre AS usuario_nombre,
    u.apellido AS usuario_apellido,
    
    mc.jornada_laboral_id,
    j.fecha_inicio,
    j.fecha_fin,
    j.estado AS jornada_estado,

    mc.tipo,
    mc.fecha_hora,
    mc.observaciones,

    -- Datos específicos de apertura
    ac.monto_inicial,

    -- Datos específicos de ingreso/egreso
    iec.movimiento_apertura_id,
    iec.comprobante_id,
    iec.gasto_id,
    iec.monto AS monto_movimiento,

    -- Datos específicos de cierre
    cc.movimiento_apertura_id AS cierre_apertura_id,
    cc.monto_final_manual,
    cc.monto_final_calculado,
    cc.diferencia

  FROM movimientos_caja mc
  JOIN cajas c ON mc.caja_id = c.id
  JOIN usuarios u ON mc.usuario_id = u.id
  JOIN jornadas_laborales j ON mc.jornada_laboral_id = j.id
  LEFT JOIN aperturas_caja ac ON mc.id = ac.movimiento_id AND mc.tipo = 'apertura'
  LEFT JOIN ingresos_egresos_caja iec ON mc.id = iec.movimiento_id AND mc.tipo IN ('ingreso', 'egreso')
  LEFT JOIN cierres_caja cc ON mc.id = cc.movimiento_id AND mc.tipo = 'cierre'
`;

const sql = Object.freeze({
  selectAll: `${baseSelect} ORDER BY mc.fecha_hora DESC`,
  selectById: `${baseSelect} WHERE mc.id = ?`,
  selectCajaIdById: `SELECT caja_id FROM movimientos_caja WHERE id = ?`,
  selectByJornada: `${baseSelect} WHERE mc.jornada_laboral_id = ? ORDER BY mc.fecha_hora DESC`,
  selectByUsuario: `${baseSelect} WHERE mc.usuario_id = ? ORDER BY mc.fecha_hora DESC`,
  selectByCaja: `${baseSelect} WHERE mc.caja_id = ? ORDER BY mc.fecha_hora DESC`,
  selectByTipo: `${baseSelect} WHERE mc.tipo = ? ORDER BY mc.fecha_hora DESC`,

  // Consultas específicas para validaciones
  selectUltimaApertura: `
    SELECT mc.id FROM movimientos_caja mc 
    WHERE mc.caja_id = ? AND mc.tipo = 'apertura' 
    ORDER BY mc.fecha_hora DESC LIMIT 1
  `,

  selectCierreParaApertura: `
    SELECT mc.id FROM movimientos_caja mc 
    WHERE mc.caja_id = ? AND mc.tipo = 'cierre' AND mc.fecha_hora > 
    (SELECT fecha_hora FROM movimientos_caja WHERE id = ?) 
    LIMIT 1
  `,

  // Para validar estado de caja
  selectCajaAbierta: `
    SELECT 
      a.movimiento_id as movimiento_apertura_id,
      a.monto_inicial,
      mc.fecha_hora
    FROM movimientos_caja mc
    JOIN aperturas_caja a ON mc.id = a.movimiento_id
    WHERE mc.caja_id = ? AND mc.tipo = 'apertura'
    AND NOT EXISTS (
      SELECT 1 FROM movimientos_caja mc2
      WHERE mc2.caja_id = mc.caja_id 
      AND mc2.tipo = 'cierre' 
      AND mc2.fecha_hora > mc.fecha_hora
    )
    ORDER BY mc.fecha_hora DESC
    LIMIT 1
  `,

  // Insert base para movimientos
  insertMovimiento: `
    INSERT INTO movimientos_caja (
      caja_id, tipo, usuario_id, jornada_laboral_id, fecha_hora, observaciones
    ) VALUES (?, ?, ?, ?, ?, ?)
  `,

  // Update para observaciones (único campo editable)
  updateObservaciones: `
    UPDATE movimientos_caja 
    SET observaciones = ? 
    WHERE id = ?
  `,

  delete: `DELETE FROM movimientos_caja WHERE id = ?`
});

function formatMovimiento(row) {
  const movimiento = {
    id: row.id,
    tipo: row.tipo,
    fecha_hora: row.fecha_hora,
    observaciones: row.observaciones,
    caja: {
      id: row.caja_id,
      nombre: row.caja_nombre,
      descripcion: row.caja_descripcion,
      activo: Boolean(row.caja_activo)
    },
    usuario: {
      id: row.usuario_id,
      dni: row.usuario_dni,
      nombre: row.usuario_nombre,
      apellido: row.usuario_apellido,
      nombre_completo: `${row.usuario_nombre} ${row.usuario_apellido}`
    },
    jornada: {
      id: row.jornada_laboral_id,
      fecha_inicio: row.fecha_inicio,
      fecha_fin: row.fecha_fin,
      estado: row.jornada_estado
    }
  };

  // Agregar datos específicos según el tipo
  switch (row.tipo) {
    case 'apertura':
      movimiento.detalles = {
        monto_inicial: parseFloat(row.monto_inicial || 0)
      };
      break;
    
    case 'ingreso':
    case 'egreso':
      movimiento.detalles = {
        movimiento_apertura_id: row.movimiento_apertura_id,
        comprobante_id: row.comprobante_id,
        gasto_id: row.gasto_id,
        monto: parseFloat(row.monto_movimiento || 0)
      };
      break;
    
    case 'cierre':
      movimiento.detalles = {
        movimiento_apertura_id: row.cierre_apertura_id,
        monto_final_manual: parseFloat(row.monto_final_manual || 0),
        monto_final_calculado: parseFloat(row.monto_final_calculado || null),
        diferencia: parseFloat(row.diferencia || null)
      };
      break;
  }

  return movimiento;
}

export const MovimientoCaja = {
  // =================== MÉTODOS DE CONSULTA ===================
  
  selectAll() {
    try {
      return db.prepare(sql.selectAll).all().map(formatMovimiento);
    } catch (error) {
      throw new Error(`Error al obtener movimientos de caja: ${error.message}`);
    }
  },

  findById(id) {
    try {
      const row = db.prepare(sql.selectById).get(id);
      return row ? formatMovimiento(row) : null;
    } catch (error) {
      throw new Error(`Error al buscar movimiento por ID: ${error.message}`);
    }
  },

  selectCajaIdByAperturaId(id) {
    try {
      const row = db.prepare(sql.selectCajaIdById).get(id);
      return row.caja_id || null;
    } catch (error) {
      throw new Error(`Error al buscar caja_id por movimiento_apertura_id: ${error.message}`);
    }
  },

  findByJornada(jornada_laboral_id) {
    try {
      return db.prepare(sql.selectByJornada).all(jornada_laboral_id).map(formatMovimiento);
    } catch (error) {
      throw new Error(`Error al buscar movimientos por jornada: ${error.message}`);
    }
  },

  findByUsuario(usuario_id) {
    try {
      return db.prepare(sql.selectByUsuario).all(usuario_id).map(formatMovimiento);
    } catch (error) {
      throw new Error(`Error al buscar movimientos por usuario: ${error.message}`);
    }
  },

  findByCaja(caja_id) {
    try {
      return db.prepare(sql.selectByCaja).all(caja_id).map(formatMovimiento);
    } catch (error) {
      throw new Error(`Error al buscar movimientos por caja: ${error.message}`);
    }
  },

  findByTipo(tipo) {
    try {
      return db.prepare(sql.selectByTipo).all(tipo).map(formatMovimiento);
    } catch (error) {
      throw new Error(`Error al buscar movimientos por tipo: ${error.message}`);
    }
  },

  // =================== MÉTODOS DE VALIDACIÓN ===================
  
  getUltimaApertura(caja_id) {
    try {
      const row = db.prepare(sql.selectUltimaApertura).get(caja_id);
      return row?.id || null;
    } catch (error) {
      throw new Error(`Error al obtener última apertura: ${error.message}`);
    }
  },

  getCajaAbierta(caja_id) {
    try {
      const row = db.prepare(sql.selectCajaAbierta).get(caja_id);
      return row ? {
        movimiento_apertura_id: row.movimiento_apertura_id,
        fecha_hora: row.fecha_hora,
        monto_inicial: parseFloat(row.monto_inicial || 0),
        saldo: this.calcularSaldoCaja(caja_id, row.movimiento_apertura_id)
      } : null;
    } catch (error) {
      throw new Error(`Error al verificar caja abierta: ${error.message}`);
    }
  },

  validarAperturaSinCerrar(caja_id, apertura_id) {
    try {
      const cierre = db.prepare(sql.selectCierreParaApertura).get(caja_id, apertura_id);
      return !cierre; // true si no hay cierre (apertura está abierta)
    } catch (error) {
      throw new Error(`Error al validar apertura: ${error.message}`);
    }
  },

  // =================== MÉTODOS DE INSERCIÓN BASE ===================
  
  insertMovimientoBase({ caja_id, tipo, usuario_id, jornada_laboral_id, observaciones = null }) {
    try {
      const fecha_hora = DateFormatter.toLocalSQLDatetime();

      const result = db.prepare(sql.insertMovimiento).run(
        caja_id,
        tipo,
        usuario_id,
        jornada_laboral_id,
        fecha_hora,
        observaciones
      );

      return this.findById(result.lastInsertRowid);
    } catch (error) {
      throw new Error(`Error al insertar movimiento base: ${error.message}`);
    }
  },

  // =================== MÉTODOS DE ACTUALIZACIÓN ===================
  
  update(id, { observaciones }) {
    try {
      const exists = this.findById(id);
      if (!exists) return null;

      db.prepare(sql.updateObservaciones).run(observaciones, id);
      return this.findById(id);
    } catch (error) {
      throw new Error(`Error al actualizar movimiento: ${error.message}`);
    }
  },

  // =================== MÉTODO DE ELIMINACIÓN ===================
  
  delete(id) {
    try {
      const exists = this.findById(id);
      if (!exists) return null;

      // Verificar si es seguro eliminar
      if (exists.tipo === 'apertura') {
        const cajaAbierta = this.getCajaAbierta(exists.caja.id);
        if (cajaAbierta && cajaAbierta.apertura_id === id) {
          throw new Error('No se puede eliminar una apertura de caja activa');
        }
      }

      db.prepare(sql.delete).run(id);
      return { deleted: true, id };
    } catch (error) {
      throw new Error(`Error al eliminar movimiento: ${error.message}`);
    }
  },

  // =================== MÉTODOS DE UTILIDAD ===================
  
  calcularSaldoCaja(caja_id, movimiento_apertura_id = null) {
    try {
      // Obtener todos los movimientos de la caja
      let movimientos = this.findByCaja(caja_id);
      
      if (movimiento_apertura_id) {
        const aperturaIndex = movimientos.findIndex(m => m.id === movimiento_apertura_id);
        // Verificar si se encontró la apertura y filtrar desde ahí
        if (aperturaIndex !== -1) {
          movimientos = movimientos.slice(0, aperturaIndex + 1);
        }
      }

      // Calcula el saldo procesando cada movimiento
      let saldo = 0;
      movimientos.reverse().forEach(mov => { // Orden cronológico
        switch (mov.tipo) {
          case 'apertura':
            saldo = mov.detalles.monto_inicial;
            break;
          case 'ingreso':
            saldo += mov.detalles.monto;
            break;
          case 'egreso':
            saldo -= mov.detalles.monto;
            break;
        }
      });

      return parseFloat(saldo.toFixed(2));
    } catch (error) {
      throw new Error(`Error al calcular saldo de caja: ${error.message}`);
    }
  },

  getResumenCaja(caja_id, fecha_inicio = null, fecha_fin = null) {
    try {
      let movimientos = this.findByCaja(caja_id);
      
      // Filtrar por fechas si se proporcionan
      if (fecha_inicio || fecha_fin) {
        movimientos = movimientos.filter(mov => {
          const fechaMov = new Date(mov.fecha_hora);
          if (fecha_inicio && fechaMov < new Date(fecha_inicio)) return false;
          if (fecha_fin && fechaMov > new Date(fecha_fin)) return false;
          return true;
        });
      }

      const resumen = {
        total_movimientos: movimientos.length,
        aperturas: movimientos.filter(m => m.tipo === 'apertura').length,
        ingresos: movimientos.filter(m => m.tipo === 'ingreso').length,
        egresos: movimientos.filter(m => m.tipo === 'egreso').length,
        cierres: movimientos.filter(m => m.tipo === 'cierre').length,
        total_ingresos: 0,
        total_egresos: 0,
        saldo_actual: 0
      };

      movimientos.forEach(mov => {
        switch (mov.tipo) {
          case 'ingreso':
            resumen.total_ingresos += mov.detalles.monto;
            break;
          case 'egreso':
            resumen.total_egresos += mov.detalles.monto;
            break;
        }
      });

      resumen.total_ingresos = parseFloat(resumen.total_ingresos.toFixed(2));
      resumen.total_egresos = parseFloat(resumen.total_egresos.toFixed(2));
      resumen.saldo_actual = this.calcularSaldoCaja(caja_id);

      return resumen;
    } catch (error) {
      throw new Error(`Error al obtener resumen de caja: ${error.message}`);
    }
  }
};