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
    u.DNI AS usuario_DNI,
    u.nombre AS usuario_nombre,
    u.apellido AS usuario_apellido,
    
    mc.jornada_laboral_id,
    j.fecha_inicio,
    j.fecha_fin,
    j.estado,

    mc.tipo,
    mc.fecha_hora_inicio,
    mc.fecha_hora_cierre,
    mc.monto_inicial,
    mc.monto_final,
    mc.observaciones
  FROM movimientos_caja mc
  JOIN cajas c ON mc.caja_id = c.id
  JOIN usuarios u ON mc.usuario_id = u.id
  JOIN jornadas_laborales j ON mc.jornada_laboral_id = j.id
`;

const sql = Object.freeze({
  selectAll: `${baseSelect} ORDER BY mc.fecha_hora_inicio DESC`,
  selectById: `${baseSelect} WHERE mc.id = ?`,
  selectByJornada: `${baseSelect} WHERE mc.jornada_laboral_id = ? ORDER BY mc.fecha_hora_inicio DESC`,
  selectByUsuario: `${baseSelect} WHERE mc.usuario_id = ? ORDER BY mc.fecha_hora_inicio DESC`,
  insertAbrir: `
    INSERT INTO movimientos_caja (
      caja_id, usuario_id, jornada_laboral_id, tipo, fecha_hora_inicio, monto_inicial, observaciones
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
  update: `
    UPDATE movimientos_caja
    SET tipo = ?, monto_inicial = ?, monto_final = ?, observaciones = ?
    WHERE id = ?
  `,
  updateCierre: `
    UPDATE movimientos_caja
    SET fecha_hora_cierre = ?, monto_final = ?, observaciones = ?
    WHERE id = ?
  `,
  delete: `DELETE FROM movimientos_caja WHERE id = ?`
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
    caja: {
      id: row.caja_id,
      nombre: row.caja_nombre,
      descripcion: row.caja_descripcion,
      activo: row.caja_activo
    },
    usuario: {
      id: row.usuario_id,
      DNI: row.usuario_DNI,
      nombre: row.usuario_nombre,
      apellido: row.usuario_apellido
    },
    jornada: {
      id: row.jornada_laboral_id,
      fecha_inicio: row.fecha_inicio,
      fecha_fin: row.fecha_fin,
      estado: row.estado
    }
  };
}

export const MovimientoCaja = {
  selectAll() {
    return db.prepare(sql.selectAll).all().map(formatMovimiento);
  },

  findById(id) {
    const row = db.prepare(sql.selectById).get(id);
    return row ? formatMovimiento(row) : null;
  },

  findByJornada(jornada_laboral_id) {
    return db.prepare(sql.selectByJornada).all(jornada_laboral_id).map(formatMovimiento);
  },

  findByUsuario(usuario_id) {
    return db.prepare(sql.selectByUsuario).all(usuario_id).map(formatMovimiento);
  },

  abrir({ caja_id, usuario_id, jornada_laboral_id, tipo = "apertura", monto_inicial = 0, observaciones = null }) {
    const fecha_hora_inicio = DateFormatter.toLocalSQLDatetime();
    const result = db.prepare(sql.insertAbrir).run(
      caja_id,
      usuario_id,
      jornada_laboral_id,
      tipo,
      fecha_hora_inicio,
      monto_inicial,
      observaciones
    );
    return this.findById(result.lastInsertRowid);
  },

  update(id, { tipo, monto_inicial, monto_final, observaciones }) {
    const exists = this.findById(id);
    if (!exists) return null;

    db.prepare(sql.update).run(tipo, monto_inicial, monto_final, observaciones, id);
    return this.findById(id);
  },

  cerrar(id, { monto_final, observaciones }) {
    const exists = this.findById(id);
    if (!exists) return null;

    const fecha_hora_cierre = nowISO();
    db.prepare(sql.updateCierre).run(fecha_hora_cierre, monto_final, observaciones, id);
    return this.findById(id);
  },

  delete(id) {
    const exists = this.findById(id);
    if (!exists) return null;

    db.prepare(sql.delete).run(id);
    return { deleted: true, id };
  }
};
