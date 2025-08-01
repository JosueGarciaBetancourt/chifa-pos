import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT id, ruc, razon_social, nombre_comercial, direccion, telefono, email, logo_base64, activo
    FROM empresa_local
  `,
  selectActive: `
    SELECT id, ruc, razon_social, nombre_comercial, direccion, telefono, email, logo_base64, activo
    FROM empresa_local
    WHERE activo = 1
  `,
  selectInactive: `
    SELECT id, ruc, razon_social, nombre_comercial, direccion, telefono, email, logo_base64, activo
    FROM empresa_local
    WHERE activo = 0
  `,
  selectPrincipal: `
    SELECT id, ruc, razon_social, nombre_comercial, direccion, telefono, email, logo_base64, activo
    FROM empresa_local
    WHERE id = 1 AND activo = 1
  `,
  selectById: `
    SELECT id, ruc, razon_social, nombre_comercial, direccion, telefono, email, logo_base64, activo
    FROM empresa_local
    WHERE id = ? AND activo = 1
  `,
  insert: `
    INSERT INTO empresa_local (ruc, razon_social, nombre_comercial, direccion, telefono, email, logo_base64) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
  disable: `
    UPDATE empresa_local SET activo = 0 WHERE id = ? AND activo = 1
  `,
  enable: `
    UPDATE empresa_local SET activo = 1 WHERE id = ? AND activo = 0
  `
});

export const EmpresaLocal = {
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  selectActive() {
    return db.prepare(sql.selectActive).all();
  },

  selectInactive() {
    return db.prepare(sql.selectInactive).all();
  },

  selectPrincipal() {
    return db.prepare(sql.selectPrincipal).get();
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
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

  disable(id) {
    db.prepare(sql.disable).run(id);
    return;
  },

  enable(id) {
    db.prepare(sql.enable).run(id);
    return this.findById(id);
  }
};
