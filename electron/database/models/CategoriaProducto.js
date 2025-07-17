import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT id, nombre, descripcion 
    FROM categorias_productos
    ORDER BY nombre ASC
  `,
  selectById: `
    SELECT * 
    FROM categorias_productos 
    WHERE id = ?
  `,
  insert: `
    INSERT INTO categorias_productos (nombre, descripcion) 
    VALUES (?, ?)
  `,
  update: `
    UPDATE categorias_productos 
    SET nombre = ?, descripcion = ? 
    WHERE id = ?
  `,
  delete: `
    DELETE FROM categorias_productos 
    WHERE id = ?
  `,
});

export const CategoriasProductos = {
  /**
   * Obtiene todas las categorías
   */
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  /**
   * Busca una categoría por su ID
   */
  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  /**
   * Crea una nueva categoría
   */
  create({ nombre, descripcion = null }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(nombre, descripcion);
    return this.findById(lastInsertRowid);
  },

  /**
   * Actualiza los datos de una categoría
   */
  update(id, { nombre, descripcion = null }) {
    db.prepare(sql.update).run(nombre, descripcion, id);
    return this.findById(id);
  },

  /**
   * Elimina una categoría por ID
   */
  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
