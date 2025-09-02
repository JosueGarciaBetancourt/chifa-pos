import { connection } from '../connection.js';
const db = connection();

// SELECT base (para consistencia y orden)
const baseSelect = `
  SELECT 
    id,
    nombre,
    descripcion,
    sede_id,
    activo
  FROM cajas
`;

const sql = Object.freeze({
  selectAll: `${baseSelect}`,
  selectById: `${baseSelect} WHERE id = ?`,
  selectActive: `${baseSelect} WHERE activo = 1`,
  selectInactive: `${baseSelect} WHERE activo = 0`,
  insert: `
    INSERT INTO cajas (
      nombre, descripcion, sede_id
    ) VALUES (?, ?, ?)
  `,
  update: `
    UPDATE cajas 
    SET nombre = ?, descripcion = ?
    WHERE id = ?
  `,
  disable: `
    UPDATE cajas SET activo = 0 WHERE id = ? AND activo = 1
  `,
  enable: `
    UPDATE cajas SET activo = 1 WHERE id = ? AND activo = 0
  `,
  delete: `
    DELETE FROM cajas 
    WHERE id = ?
  `,
});

function formatCaja(row) {
  return {
    id: row.id,
    nombre: row.nombre,
    descripcion: row.descripcion,
    sede_id: row.sede_id,
    activo: row.activo
  };
}

export const Caja = {
  selectAll() {
    return db.prepare(sql.selectAll).all().map(formatCaja);
  },

  findById(id) {
    const row = db.prepare(sql.selectById).get(id);
    return row ? formatCaja(row) : null;
  },

  selectActive() {
    return db.prepare(sql.selectActive).all().map(formatCaja);
  },

  selectInactive() {
    return db.prepare(sql.selectInactive).all().map(formatCaja);
  },

  create({ nombre, descripcion = null, sede_id = 1 }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      nombre, descripcion, sede_id
    );
    return this.findById(lastInsertRowid);
  },

  update(id, { nombre, descripcion}) {
    db.prepare(sql.update).run(
      nombre, descripcion, id
    );
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
