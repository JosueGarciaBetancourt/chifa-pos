import { connection } from '../connection.js';
import { DateFormatter } from '../utils/dateFormatter.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT *
    FROM reportes
    ORDER BY generado_en DESC
  `,
  selectById: `
    SELECT * 
    FROM reportes 
    WHERE id = ?
  `,
  insert: `
    INSERT INTO reportes (
      tipo_id,
      usuario_id,
      sede_id,
      titulo,
      descripcion,
      parametros_json,
      ruta_archivo,
      formato_archivo,
      generado_en
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
  delete: `
    DELETE FROM reportes
    WHERE id = ?
  `
});

export const Reporte = {
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  create({ tipo_id, usuario_id, sede_id, titulo, descripcion, parametros_json, ruta_archivo, formato_archivo }) {
    const generado_en = DateFormatter.toLocalSQLDatetime();
    const stmt = db.prepare(sql.insert);
    const result = stmt.run(
      tipo_id,
      usuario_id,
      sede_id,
      titulo,
      descripcion || null,
      JSON.stringify(parametros_json) || null,
      ruta_archivo || null,
      formato_archivo || null,
      generado_en
    );
    return this.findById(result.lastInsertRowid);
  },

  update(id, data) {
    const allowed = [
      'tipo_id', 'usuario_id', 'sede_id',
      'titulo', 'descripcion', 'parametros_json',
      'ruta_archivo', 'formato_archivo'
    ];

    const keys = Object.keys(data).filter(k => allowed.includes(k));
    if (keys.length === 0) {
      throw new Error('No se especificaron campos válidos para actualizar.');
    }

    const setClause = keys.map(key => `${key} = ?`).join(', ');

    const values = keys.map(key => {
      if (key === 'parametros_json' && typeof data[key] === 'object') {
        return JSON.stringify(data[key]); // 👈 serializar el JSON
      }
      return data[key];
    });

    const sql = `
      UPDATE reportes 
      SET ${setClause} 
      WHERE id = ?
    `;

    db.prepare(sql).run(...values, id);
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
