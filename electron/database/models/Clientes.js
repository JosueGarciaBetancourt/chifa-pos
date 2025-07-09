import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT id, dni, nombre, apellido, direccion, telefono, verificado_reniec 
    FROM clientes
  `,
  selectById: `
    SELECT * 
    FROM clientes 
    WHERE id = ?
  `,
  insert: `
    INSERT INTO clientes (dni, nombre, apellido, direccion, telefono, verificado_reniec) 
    VALUES (?, ?, ?, ?, ?, ?)
  `,
  update: `
    UPDATE clientes 
    SET dni = ?, nombre = ?, apellido = ?, direccion = ?, telefono = ?, verificado_reniec = ? 
    WHERE id = ?
  `,
  delete: `
    DELETE FROM clientes 
    WHERE id = ?
  `,
});

export const Cliente = {
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  create({ dni, nombre, apellido, direccion = null, telefono = null, verificado_reniec = 0 }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      dni, nombre, apellido, direccion, telefono, verificado_reniec
    );
    return this.findById(lastInsertRowid);
  },

  update(id, { dni, nombre, apellido, direccion, telefono, verificado_reniec }) {
    db.prepare(sql.update).run(
      dni, nombre, apellido, direccion, telefono, verificado_reniec, id
    );
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};