import { connection } from '../connection.js';
import { DateFormatter } from '../utils/dateFormatter.js';

const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT id, usuario_id, sede_id, fecha_inicio, fecha_fin, estado 
    FROM jornadas_laborales
    ORDER BY fecha_inicio DESC
  `,
  selectById: `
    SELECT * 
    FROM jornadas_laborales 
    WHERE id = ?
  `,
  insert: `
    INSERT INTO jornadas_laborales (usuario_id, sede_id, fecha_inicio, estado) 
    VALUES (?, ?, ?, 'iniciada')
  `,
  update: `
    UPDATE jornadas_laborales 
    SET fecha_fin = ?, estado = ? 
    WHERE id = ?
  `,
  delete: `
    DELETE FROM jornadas_laborales 
    WHERE id = ?
  `,
  findIniciadaPorUsuario: `
    SELECT * 
    FROM jornadas_laborales 
    WHERE usuario_id = ? AND estado = 'iniciada'
    ORDER BY fecha_inicio DESC
    LIMIT 1
  `,
});

export const JornadaLaboral = {
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  create({ usuario_id, sede_id }) {
    const fechaInicio = DateFormatter.toLocalSQLDatetime();
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      usuario_id,
      sede_id,
      fechaInicio
    );
    return this.findById(lastInsertRowid);
  },

  /**
   * Finaliza una jornada (actualiza estado y fecha_fin)
   */
  finalizar(id) {
    const fechaFin = DateFormatter.toLocalSQLDatetime();
    db.prepare(sql.update).run(fechaFin, 'finalizada', id);
    return this.findById(id);
  },

  findIniciadaPorUsuario(usuario_id) {
    return db.prepare(sql.findIniciadaPorUsuario).get(usuario_id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
