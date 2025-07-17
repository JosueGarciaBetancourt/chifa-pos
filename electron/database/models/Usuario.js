import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT id, dni, nombre, apellido, rol_id, username, activo 
    FROM usuarios
  `,
  selectById: `
    SELECT id, dni, nombre, apellido, rol_id, username, activo 
    FROM usuarios 
    WHERE id = ?
  `,
  insert: `
    INSERT INTO usuarios (dni, nombre, apellido, rol_id, username, password, activo) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
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

  findById(id) {
    return db.prepare(sql.selectById).get(id);
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

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  },

  findByDni(dni) {
    return db.prepare(sql.findByDni).get(dni);
  }
};
