import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT id, nombre, unidad_medida, stock_actual, stock_minimo, costo 
    FROM insumos
  `,
  selectById: `
    SELECT * 
    FROM insumos 
    WHERE id = ?
  `,
  insert: `
    INSERT INTO insumos (nombre, unidad_medida, stock_actual, stock_minimo, costo) 
    VALUES (?, ?, ?, ?, ?)
  `,
  update: `
    UPDATE insumos 
    SET nombre = ?, unidad_medida = ?, stock_actual = ?, stock_minimo = ?, costo = ? 
    WHERE id = ?
  `,
  delete: `
    DELETE FROM insumos 
    WHERE id = ?
  `,
});

export const Insumo = {
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  create({ nombre, unidad_medida, stock_actual = 0, stock_minimo = 0, costo }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      nombre, unidad_medida, stock_actual, stock_minimo, costo
    );
    return this.findById(lastInsertRowid);
  },

  update(id, { nombre, unidad_medida, stock_actual, stock_minimo, costo }) {
    db.prepare(sql.update).run(
      nombre, unidad_medida, stock_actual, stock_minimo, costo, id
    );
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};