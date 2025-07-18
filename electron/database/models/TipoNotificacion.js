import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT id, nombre 
    FROM tipos_notificaciones
    ORDER BY nombre
  `,
  selectById: `
    SELECT * FROM tipos_notificaciones WHERE id = ?
  `,
  insert: `
    INSERT INTO tipos_notificaciones (nombre)
    VALUES (?)
  `,
  update: `
    UPDATE tipos_notificaciones 
    SET nombre = ?
    WHERE id = ?
  `,
  delete: `
    DELETE FROM tipos_notificaciones WHERE id = ?
  `
});

export const TipoNotificacion = {
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  create({ nombre }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(nombre);
    return this.findById(lastInsertRowid);
  },

  update(id, { nombre }) {
    db.prepare(sql.update).run(nombre, id);
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
