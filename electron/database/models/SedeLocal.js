import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT 
      id, empresa_id, nombre, direccion, ciudad, distrito, telefono, 
      serie_boleta, serie_factura, serie_ticket, usa_web_central, activo
    FROM sede_local
  `,
  selectActive: `
    SELECT 
      id, empresa_id, nombre, direccion, ciudad, distrito, telefono, 
      serie_boleta, serie_factura, serie_ticket, usa_web_central, activo
    FROM sede_local
    WHERE activo = 1
  `,
  selectInactive: `
    SELECT 
      id, empresa_id, nombre, direccion, ciudad, distrito, telefono, 
      serie_boleta, serie_factura, serie_ticket, usa_web_central, activo
    FROM sede_local
    WHERE activo = 0
  `,
  selectById: `
    SELECT * 
    FROM sede_local 
    WHERE id = ? AND activo = 1
  `,
  insert: `
    INSERT INTO sede_local (
      empresa_id, nombre, direccion, ciudad, distrito, telefono, 
      serie_boleta, serie_factura, serie_ticket, usa_web_central
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ` ,
  disable: `
    UPDATE sede_local SET activo = 0 WHERE id = ? AND activo = 1
  `,
  enable: `
    UPDATE sede_local SET activo = 1 WHERE id = ? AND activo = 0
  `
});

export const SedeLocal = {
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  selectActive() {
    return db.prepare(sql.selectActive).all();
  },

  selectInactive() {
    return db.prepare(sql.selectInactive).all();
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  create({
    empresa_id,
    nombre,
    direccion = null,
    ciudad = null,
    distrito = null,
    telefono = null,
    serie_boleta = null,
    serie_factura = null,
    serie_ticket = null,
    usa_web_central = 1
  }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      empresa_id,
      nombre,
      direccion,
      ciudad,
      distrito,
      telefono,
      serie_boleta,
      serie_factura,
      serie_ticket,
      usa_web_central
    );
    return this.findById(lastInsertRowid);
  },

  /**
   * Actualiza solo los campos enviados (actualización parcial)
   */
  update(id, data) {
    const keys = Object.keys(data);
    if (keys.length === 0) {
      throw new Error('No se especificaron campos para actualizar.');
    }

    const setClause = keys.map(k => `${k} = ?`).join(', ');
    const values = keys.map(k => data[k]);

    const sql = `
      UPDATE sede_local 
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
