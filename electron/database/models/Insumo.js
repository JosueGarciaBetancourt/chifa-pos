// database/models/Insumos.js
import { connection } from '../connection.js';
const db = connection();

// SELECT base con JOIN
const baseSelect = `
  SELECT
    i.id,
    i.nombre,
    i.tipo_id,
    t.nombre AS tipo_nombre,
    t.descripcion AS tipo_descripcion,
    i.unidad_medida,
    i.stock_actual,
    i.stock_minimo,
    i.activo
  FROM insumos i
  JOIN tipos_insumos t ON i.tipo_id = t.id
`;

const sql = Object.freeze({
  selectAll: `${baseSelect}`,
  selectById: `${baseSelect} WHERE i.id = ?`,
  selectActive: `${baseSelect} WHERE i.activo = 1`,
  selectInactive: `${baseSelect} WHERE i.activo = 0`,
  insert: `
    INSERT INTO insumos (nombre, tipo_id, unidad_medida, stock_actual, stock_minimo)
    VALUES (?, ?, ?, ?, ?)
  `,
  update: `
    UPDATE insumos
    SET nombre = ?, tipo_id = ?, unidad_medida = ?, stock_actual = ?, stock_minimo = ?
    WHERE id = ?
  `,
  disable: `
    UPDATE insumos SET activo = 0 WHERE id = ? AND activo = 1
  `,
  enable: `
    UPDATE insumos SET activo = 1 WHERE id = ? AND activo = 0
  `,
  delete: `
    DELETE FROM insumos WHERE id = ?
  `
});

// Mapea el resultado como hace Productos.js
function formatInsumo(row) {
  return {
    id: row.id,
    nombre: row.nombre,
    unidad: row.unidad_medida,
    stock_actual: row.stock_actual,
    stock_minimo: row.stock_minimo,
    tipo: {
      id: row.tipo_id,
      nombre: row.tipo_nombre,
      descripcion: row.tipo_descripcion
    },
    activo: row.activo
  };
}

export const Insumo = {
  selectAll() {
    return db.prepare(sql.selectAll).all().map(formatInsumo);
  },

  findById(id) {
    const row = db.prepare(sql.selectById).get(id);
    return row ? formatInsumo(row) : null;
  },

  selectActive() {
    return db.prepare(sql.selectActive).all().map(formatInsumo);
  },

  selectInactive() {
    return db.prepare(sql.selectInactive).all().map(formatInsumo);
  },

  create({ nombre, tipo_id, unidad_medida, stock_actual = 0, stock_minimo = 0 }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      nombre, tipo_id, unidad_medida, stock_actual, stock_minimo
    );
    return this.findById(lastInsertRowid);
  },

  update(id, { nombre, tipo_id, unidad_medida, stock_actual, stock_minimo }) {
    db.prepare(sql.update).run(
      nombre, tipo_id, unidad_medida, stock_actual, stock_minimo, id
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
