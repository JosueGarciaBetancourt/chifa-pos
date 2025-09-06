import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT *
    FROM tipos_gastos
  `,
  selectById: `
    SELECT *
    FROM tipos_gastos 
    WHERE id = ?
  `,
  selectActive: `
    SELECT *
    FROM tipos_gastos
    WHERE activo = 1
  `,
  selectInactive: `
    SELECT *
    FROM tipos_gastos
    WHERE activo = 0
  `,
  insert: `
    INSERT INTO tipos_gastos (nombre, descripcion, activo) 
    VALUES (?, ?, ?)
  `,
  disable: `
    UPDATE tipos_gastos SET activo = 0 WHERE id = ? AND activo = 1
  `,
  enable: `
    UPDATE tipos_gastos SET activo = 1 WHERE id = ? AND activo = 0
  `,
  delete: `
    DELETE FROM tipos_gastos 
    WHERE id = ?
  `
});

export const TipoGasto = {
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  selectActive() {
    return db.prepare(sql.selectActive).all();
  },

  selectInactive() {
    return db.prepare(sql.selectInactive).all();
  },

  create({ nombre, descripcion, activo = 1 }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      nombre, descripcion, activo
    );
    return this.findById(lastInsertRowid);
  },

  update(id, data) {
    const keys = Object.keys(data);
    if (keys.length === 0) {
      throw new Error('No se especificaron campos para actualizar.');
    }
  
    const setClause = keys.map(key => `${key} = ?`).join(', ');
    const values = keys.map(key => data[key]);
  
    const sql = `
      UPDATE tipos_gastos 
      SET ${setClause} 
      WHERE id = ?
    `;
  
    db.prepare(sql).run(...values, id);
    return this.findById(id);
  },

  disable(id) {
    db.prepare(sql.disable).run(id);
    return;
  },

  enable(id) {
    db.prepare(sql.enable).run(id);
    return this.findById(id);
  },
  
  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  },

  findByDni(dni) {
    return db.prepare(sql.findByDni).get(dni);
  }
};
