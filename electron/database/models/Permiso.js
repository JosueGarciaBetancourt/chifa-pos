import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT id, nombre 
    FROM permisos
    ORDER BY id ASC
  `,
  selectById: `
    SELECT * 
    FROM permisos 
    WHERE id = ?
  `,
  selectActive: `
    SELECT *
    FROM permisos
    WHERE activo = 1
  `,
  selectInactive: `
    SELECT *
    FROM permisos
    WHERE activo = 0
  `,
  insert: `
    INSERT INTO permisos (nombre) 
    VALUES (?)
  `,
  update: `
    UPDATE permisos 
    SET nombre = ? 
    WHERE id = ?
  `,
  disable: `
    UPDATE permisos SET activo = 0 WHERE id = ? AND activo = 1
  `,
  enable: `
    UPDATE permisos SET activo = 1 WHERE id = ? AND activo = 0
  `,
  delete: `
    DELETE FROM permisos 
    WHERE id = ?
  `,
});

export const Permiso = {
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

  create({ nombre }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(nombre);
    return this.findById(lastInsertRowid);
  },

  update(id, { nombre }) {
    db.prepare(sql.update).run(nombre, id);
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
  }
};
