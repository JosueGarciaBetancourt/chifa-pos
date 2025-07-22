import { connection } from '../connection.js';
const db = connection();

// Paso 1: Extraer SELECT base (evita duplicación)
const baseSelect = `
  SELECT 
    p.id, 
    p.codigo, 
    p.nombre, 
    p.descripcion, 
    p.precio, 
    p.categoria_id,
    c.nombre AS categoria_nombre,
    c.descripcion AS categoria_descripcion,
    p.tiempo_preparacion_min, 
    p.activo 
  FROM productos p
  JOIN categorias_productos c ON p.categoria_id = c.id
`;

const sql = Object.freeze({
  selectAll: `${baseSelect}`,
  searchByName: `${baseSelect} WHERE p.nombre LIKE ?`,
  selectActive: `${baseSelect} WHERE p.activo = 1`,
  selectNoActive: `${baseSelect} WHERE p.activo = 0`,
  selectById: `${baseSelect} WHERE p.id = ?`,
  insert: `
    INSERT INTO productos (codigo, nombre, descripcion, precio, categoria_id, tiempo_preparacion_min, activo) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
  update: `
    UPDATE productos 
    SET codigo = ?, nombre = ?, descripcion = ?, precio = ?, categoria_id = ?, tiempo_preparacion_min = ?, activo = ? 
    WHERE id = ?
  `,
  delete: `
    DELETE FROM productos 
    WHERE id = ?
  `,
});

// Paso 2: Transformar el resultado para anidar categoría como objeto
function formatProducto(row) {
  return {
    id: row.id,
    codigo: row.codigo,
    nombre: row.nombre,
    descripcion: row.descripcion,
    precio: row.precio,
    tiempo_preparacion_min: row.tiempo_preparacion_min,
    activo: row.activo,
    categoria: {
      id: row.categoria_id,
      nombre: row.categoria_nombre,
      descripcion: row.categoria_descripcion
    }
  };
}

export const Producto = {
  selectAll() {
    return db.prepare(sql.selectAll).all().map(formatProducto);
  },

  searchByName(nombre) {
    const rows = db.prepare(sql.searchByName).all(`%${nombre}%`);
    return rows.map(formatProducto);
  },
  
  selectActive() {
    return db.prepare(sql.selectActive).all().map(formatProducto);
  },

  selectNoActive() {
    return db.prepare(sql.selectNoActive).all().map(formatProducto);
  },

  findById(id) {
    const row = db.prepare(sql.selectById).get(id);
    return row ? formatProducto(row) : null;
  },

  create({ codigo, nombre, descripcion, precio, categoria_id, tiempo_preparacion_min, activo = 1 }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      codigo, nombre, descripcion, precio, categoria_id, tiempo_preparacion_min, activo
    );
    return this.findById(lastInsertRowid);
  },

  update(id, { codigo, nombre, descripcion, precio, categoria_id, tiempo_preparacion_min, activo }) {
    db.prepare(sql.update).run(
      codigo, nombre, descripcion, precio, categoria_id, tiempo_preparacion_min, activo, id
    );
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
