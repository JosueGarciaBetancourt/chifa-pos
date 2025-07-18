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
    i.costo
  FROM insumos i
  JOIN tipos_insumos t ON i.tipo_id = t.id
`;

const sql = Object.freeze({
  selectAll: `${baseSelect}`,
  selectById: `${baseSelect} WHERE i.id = ?`,
  insert: `
    INSERT INTO insumos (nombre, tipo_id, unidad_medida, stock_actual, stock_minimo, costo)
    VALUES (?, ?, ?, ?, ?, ?)
  `,
  update: `
    UPDATE insumos
    SET nombre = ?, tipo_id = ?, unidad_medida = ?, stock_actual = ?, stock_minimo = ?, costo = ?
    WHERE id = ?
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
    costo: row.costo,
    tipo: {
      id: row.tipo_id,
      nombre: row.tipo_nombre,
      descripcion: row.tipo_descripcion
    }
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

  create({ nombre, tipo_id, unidad_medida, stock_actual = 0, stock_minimo = 0, costo }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      nombre, tipo_id, unidad_medida, stock_actual, stock_minimo, costo
    );
    return this.findById(lastInsertRowid);
  },

  update(id, { nombre, tipo_id, unidad_medida, stock_actual, stock_minimo, costo }) {
    db.prepare(sql.update).run(
      nombre, tipo_id, unidad_medida, stock_actual, stock_minimo, costo, id
    );
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
