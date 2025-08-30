import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT *
    FROM proveedores
    ORDER BY nombre ASC
  `,
  selectById: `
    SELECT *
    FROM proveedores
    WHERE id = ?
  `,
  selectActive: `
    SELECT *
    FROM proveedores
    WHERE activo = 1
  `,
  selectInactive: `
    SELECT *
    FROM proveedores
    WHERE activo = 0
  `,
  insert: `
    INSERT INTO proveedores (nombre, ruc, correo, telefono)
    VALUES (?, ?, ?, ?)
  `,
  disable: `
    UPDATE proveedores SET activo = 0 WHERE id = ? AND activo = 1
  `,
  enable: `
    UPDATE proveedores SET activo = 1 WHERE id = ? AND activo = 0
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

  selectActive() {
    return db.prepare(sql.selectActive).all();
  },

  selectInactive() {
    return db.prepare(sql.selectInactive).all();
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

  update(id, data) {
    const keys = Object.keys(data);
    if (keys.length === 0) {
      throw new Error('No se especificaron campos para actualizar.');
    }
  
    const setClause = keys.map(key => `${key} = ?`).join(', ');
    const values = keys.map(key => data[key]);
  
    const sql = `
      UPDATE proveedores 
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
  }
};
