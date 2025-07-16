import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT id, dni, nombre, apellido, rol, activo 
    FROM usuarios
  `,
  selectById: `
    SELECT id, dni, nombre, apellido, rol, activo 
    FROM usuarios 
    WHERE id = ?
  `,
  insert: `
    INSERT INTO usuarios (dni, nombre, apellido, rol, contrasena_hash, activo) 
    VALUES (?, ?, ?, ?, ?, ?)
  `,
  update: `
    UPDATE usuarios 
    SET dni = ?, nombre = ?, apellido = ?, rol = ?, activo = ? 
    WHERE id = ?
  `,
  delete: `
    DELETE FROM usuarios 
    WHERE id = ?
  `,
  findByDni: `
    SELECT id, dni, nombre, apellido, rol, contrasena_hash, activo 
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

  create({ dni, nombre, apellido, rol, contrasena_hash, activo = 1 }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      dni, nombre, apellido, rol, contrasena_hash, activo
    );
    return this.findById(lastInsertRowid);
  },

  update(id, { dni, nombre, apellido, rol, activo }) {
    db.prepare(sql.update).run(dni, nombre, apellido, rol, activo, id);
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