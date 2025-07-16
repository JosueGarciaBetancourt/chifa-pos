import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT id, nombre, descripcion 
    FROM tipos_insumos
  `,
  selectById: `
    SELECT id, nombre, descripcion 
    FROM tipos_insumos 
    WHERE id = ?
  `,
  insert: `
    INSERT INTO tipos_insumos (nombre, descripcion) 
    VALUES (?, ?)
  `,
  update: `
    UPDATE tipos_insumos 
    SET nombre = ?, descripcion = ? 
    WHERE id = ?
  `,
  delete: `
    DELETE FROM tipos_insumos 
    WHERE id = ?
  `,
});

export const TipoInsumo = {
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  create({ nombre, descripcion = '' }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      nombre, descripcion
    );
    return this.findById(lastInsertRowid);
  },

  update(id, { nombre, descripcion = '' }) {
    db.prepare(sql.update).run(
      nombre, descripcion, id
    );
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
