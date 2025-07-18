import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT id, nombre, ruc, correo, telefono
    FROM proveedores
    ORDER BY nombre ASC
  `,
  selectById: `
    SELECT id, nombre, ruc, correo, telefono
    FROM proveedores
    WHERE id = ?
  `,
  insert: `
    INSERT INTO proveedores (nombre, ruc, correo, telefono)
    VALUES (?, ?, ?, ?)
  `,
  update: `
    UPDATE proveedores
    SET nombre = ?, ruc = ?, correo = ?, telefono = ?
    WHERE id = ?
  `,
  delete: `
    DELETE FROM proveedores
    WHERE id = ?
  `
});

export const Proveedor = {
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  create({ nombre, ruc, correo = null, telefono }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      nombre,
      ruc,
      correo,
      telefono
    );
    return this.findById(lastInsertRowid);
  },

  update(id, { nombre, ruc, correo, telefono }) {
    db.prepare(sql.update).run(
      nombre,
      ruc,
      correo,
      telefono,
      id
    );
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
