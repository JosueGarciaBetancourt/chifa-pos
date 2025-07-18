import { connection } from '../connection.js';
const db = connection();

// Paso 1: SELECT enriquecido
const baseSelect = `
  SELECT 
    r.producto_id,
    r.insumo_id,
    r.cantidad,
    i.nombre AS insumo_nombre,
    i.unidad_medida,
    i.costo,
    i.stock_actual,
    i.stock_minimo
  FROM recetas r
  JOIN insumos i ON i.id = r.insumo_id
`;

const sql = Object.freeze({
  selectByProducto: `${baseSelect} WHERE r.producto_id = ?`,
  selectByInsumo: `${baseSelect} WHERE r.insumo_id = ?`,
  insert: `
    INSERT INTO recetas (producto_id, insumo_id, cantidad) 
    VALUES (?, ?, ?)
  `,
  update: `
    UPDATE recetas 
    SET cantidad = ? 
    WHERE producto_id = ? AND insumo_id = ?
  `,
  delete: `
    DELETE FROM recetas 
    WHERE producto_id = ? AND insumo_id = ?
  `,
});

// Paso 2: Formatear la receta con datos del insumo
function formatReceta(row) {
  return {
    producto_id: row.producto_id,
    insumo_id: row.insumo_id,
    cantidad: row.cantidad,
    insumo: {
      nombre: row.insumo_nombre,
      unidad_medida: row.unidad_medida,
      costo: row.costo,
      stock_actual: row.stock_actual,
      stock_minimo: row.stock_minimo
    }
  };
}

export const Receta = {
  /**
   * Retorna todas las recetas de un producto, con detalle del insumo
   */
  findByProductoId(producto_id) {
    return db.prepare(sql.selectByProducto).all(producto_id).map(formatReceta);
  },

  /**
   * Retorna todas las recetas que usan un insumo específico
   */
  findByInsumoId(insumo_id) {
    return db.prepare(sql.selectByInsumo).all(insumo_id).map(formatReceta);
  },

  /**
   * Inserta una nueva receta
   */
  create({ producto_id, insumo_id, cantidad }) {
    const existente = db.prepare(`
      SELECT 1 FROM recetas 
      WHERE producto_id = ? AND insumo_id = ?
    `).get(producto_id, insumo_id);
  
    if (existente) {
      throw new Error('Ya existe una receta para este producto con ese insumo.');
    }
  
    db.prepare(sql.insert).run(producto_id, insumo_id, cantidad);
    return this.findByProductoId(producto_id);
  },

  /**
   * Actualiza la cantidad usada de un insumo en una receta
   */
  update(producto_id, insumo_id, cantidad) {
    const result = db.prepare(sql.update).run(cantidad, producto_id, insumo_id);
    if (result.changes === 0) {
      throw new Error('No se encontro receta para actualizar.');
    }
    return this.findByProductoId(producto_id);
  },

  /**
   * Elimina una receta
   */
  delete(producto_id, insumo_id) {
    const result = db.prepare(sql.delete).run(producto_id, insumo_id);
    return { deleted: result.changes > 0 };
  }
};
