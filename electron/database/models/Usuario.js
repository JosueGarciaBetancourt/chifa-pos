import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT id, dni, nombre, apellido, rol_id, username, activo 
    FROM usuarios
  `,
  searchByUsername: `
    SELECT id, dni, nombre, apellido, rol_id, username, activo 
    FROM usuarios 
    WHERE username LIKE ?`,
  selectById: `
    SELECT id, dni, nombre, apellido, rol_id, username, activo 
    FROM usuarios 
    WHERE id = ?
  `,
  selectActive: `
    SELECT *
    FROM usuarios
    WHERE activo = 1
  `,
  selectInactive: `
    SELECT *
    FROM usuarios
    WHERE activo = 0
  `,
  insert: `
    INSERT INTO usuarios (dni, nombre, apellido, rol_id, username, password, activo) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
  disable: `
    UPDATE usuarios SET activo = 0 WHERE id = ? AND activo = 1
  `,
  enable: `
    UPDATE usuarios SET activo = 1 WHERE id = ? AND activo = 0
  `,
  delete: `
    DELETE FROM usuarios 
    WHERE id = ?
  `,
  findByDni: `
    SELECT id, dni, nombre, apellido, rol_id, username, password, activo 
    FROM usuarios 
    WHERE dni = ?
  `,
});

export const Usuario = {
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  searchByUsername(username) {
    const rows = db.prepare(sql.searchByUsername).all(`%${username}%`);
    return rows;
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

  create({ dni, nombre, apellido, rol_id, username, password, activo = 1 }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      dni, nombre, apellido, rol_id, username, password, activo
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
      UPDATE usuarios 
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
