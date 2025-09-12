import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT *
    FROM tipos_reportes
    ORDER BY nombre
  `,
  selectById: `
    SELECT * FROM tipos_reportes WHERE id = ?
  `
});

export const TipoReporte = {
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  }
};
