import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT id, ruc, razon_social, nombre_comercial, direccion, telefono, email, logo_base64 
    FROM empresa_local
  `,
  selectById: `
    SELECT * 
    FROM empresa_local 
    WHERE id = ?
  `,
  insert: `
    INSERT INTO empresa_local (ruc, razon_social, nombre_comercial, direccion, telefono, email, logo_base64) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
  delete: `
    DELETE FROM empresa_local 
    WHERE id = ?
  `,
});

export const EmpresaLocal = {
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  create({ 
    ruc,
    razon_social,
    nombre_comercial = null,
    direccion,
    telefono = null,
    email = null,
    logo_base64 = null
  }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      ruc,
      razon_social,
      nombre_comercial,
      direccion,
      telefono,
      email,
      logo_base64
    );
    return this.findById(lastInsertRowid);
  },

  /**
   * Actualiza solo los campos proporcionados en `data`
   * @param {number} id - ID de la empresa a actualizar
   * @param {Object} data - Campos a actualizar (ej. { razon_social: 'Nuevo Nombre' })
   * @returns {Object} - Registro actualizado
   */
  update(id, data) {
    const keys = Object.keys(data);
    if (keys.length === 0) {
      throw new Error('No se especificaron campos para actualizar.');
    }

    const setClause = keys.map(k => `${k} = ?`).join(', ');
    const values = keys.map(k => data[k]);

    const sql = `
      UPDATE empresa_local 
      SET ${setClause}
      WHERE id = ?
    `;

    db.prepare(sql).run(...values, id);
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
