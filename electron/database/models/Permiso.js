import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT id, nombre 
    FROM permisos
    ORDER BY id ASC
  `,
  selectById: `
    SELECT * 
    FROM permisos 
    WHERE id = ?
  `,
  insert: `
    INSERT INTO permisos (nombre) 
    VALUES (?)
  `,
  update: `
    UPDATE permisos 
    SET nombre = ? 
    WHERE id = ?
  `,
  delete: `
    DELETE FROM permisos 
    WHERE id = ?
  `,
});

export const Permisos = {
  /**
   * Retorna todos los permisos
   */
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  /**
   * Busca un permiso por su ID
   */
  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  /**
   * Crea un nuevo permiso
   */
  create({ nombre }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(nombre);
    return this.findById(lastInsertRowid);
  },

  /**
   * Actualiza el nombre de un permiso
   */
  update(id, { nombre }) {
    db.prepare(sql.update).run(nombre, id);
    return this.findById(id);
  },

  /**
   * Elimina un permiso por su ID
   */
  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
