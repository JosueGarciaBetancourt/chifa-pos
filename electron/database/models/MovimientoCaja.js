import { connection } from '../connection.js';
const db = connection();

const baseSelect = `
  SELECT 
    mc.id,
    mc.usuario_id,
    u.nombre AS usuario_nombre,
    u.apellido AS usuario_apellido,
    mc.jornada_laboral_id,
    mc.tipo,
    mc.fecha_hora_inicio,
    mc.fecha_hora_cierre,
    mc.monto_inicial,
    mc.monto_final,
    mc.observaciones
  FROM movimientos_caja mc
  JOIN usuarios u ON mc.usuario_id = u.id
`;

const sql = Object.freeze({
  selectAll: `${baseSelect} ORDER BY mc.fecha_hora_inicio DESC`,
  selectByJornada: `${baseSelect} WHERE mc.jornada_laboral_id = ? ORDER BY mc.fecha_hora_inicio DESC`,
  insert: `
    INSERT INTO movimientos_caja (
      usuario_id, jornada_laboral_id, tipo, monto_inicial, monto_final, observaciones
    ) VALUES (?, ?, ?, ?, ?, ?)
  `,
  updateCierre: `
    UPDATE movimientos_caja
    SET fecha_hora_cierre = ?, monto_final = ?, observaciones = ?
    WHERE id = ?
  `,
  delete: `
    DELETE FROM movimientos_caja WHERE id = ?
  `
});

function formatMovimiento(row) {
  return {
    id: row.id,
    tipo: row.tipo,
    fecha_hora_inicio: row.fecha_hora_inicio,
    fecha_hora_cierre: row.fecha_hora_cierre,
    monto_inicial: row.monto_inicial,
    monto_final: row.monto_final,
    observaciones: row.observaciones,
    usuario_id: row.usuario_id,
    jornada_laboral_id: row.jornada_laboral_id,
    usuario: {
      nombre: row.usuario_nombre,
      apellido: row.usuario_apellido
    }
  };
}

export const MovimientoCaja = {
  selectAll() {
    return db.prepare(sql.selectAll).all().map(formatMovimiento);
  },

  findByJornada(jornada_laboral_id) {
    return db.prepare(sql.selectByJornada).all(jornada_laboral_id).map(formatMovimiento);
  },

  create({ usuario_id, jornada_laboral_id, tipo, monto_inicial, monto_final = null, observaciones = null }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      usuario_id,
      jornada_laboral_id,
      tipo,
      monto_inicial,
      monto_final,
      observaciones
    );
    return { id: lastInsertRowid };
  },

  cerrar(id, { monto_final, observaciones }) {
    const fecha_hora_cierre = new Date().toISOString();
    db.prepare(sql.updateCierre).run(fecha_hora_cierre, monto_final, observaciones, id);
    return { id, cerrado: true };
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
