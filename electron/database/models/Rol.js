import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT id, nombre 
    FROM roles
    ORDER BY id ASC
  `,
  selectById: `
    SELECT * 
    FROM roles 
    WHERE id = ?
  `,
  insert: `
    INSERT INTO roles (nombre) 
    VALUES (?)
  `,
  update: `
    UPDATE roles 
    SET nombre = ? 
    WHERE id = ?
  `,
  delete: `
    DELETE FROM roles 
    WHERE id = ?
  `,
});

export const Rol = {
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  create({ nombre }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(nombre);
    return this.findById(lastInsertRowid);
  },

  update(id, { nombre }) {
    db.prepare(sql.update).run(nombre, id);
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
