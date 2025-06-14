import { connection } from '../connection.js';

const db = connection();

const sql = {
  selectAll : /* sql */ `
    SELECT id, nombre, descripcion, precio, categoria
    FROM   productos
    ORDER  BY id DESC;
  `,
  selectById : /* sql */ `
    SELECT id, nombre, precio
    FROM   productos
    WHERE  id = ?;
  `,
  insert : /* sql */ `
    INSERT INTO productos (nombre, precio)
    VALUES (?, ?);
  `,
  update : /* sql */ `
    UPDATE productos
    SET    nombre = ?, precio = ?
    WHERE  id = ?;
  `,
  remove : /* sql */ `
    DELETE FROM productos
    WHERE  id = ?;
  `,
}
Object.freeze(sql);

export const Producto = {
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  create({ nombre, precio }) {
    const info = db.prepare(sql.insert).run(nombre, precio);
    return info.lastInsertRowid;
  },

  update(id, { nombre, precio }) {
    db.prepare(sql.update).run(nombre, precio, id);
    return this.findById(id);
  },

  remove(id) {
    db.prepare(sql.remove).run(id);
    return { deleted: true };
  },
}
