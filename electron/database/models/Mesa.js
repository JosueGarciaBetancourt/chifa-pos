import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT id, numero, capacidad, estado 
    FROM mesas
  `,
  selectById: `
    SELECT * 
    FROM mesas 
    WHERE id = ?
  `,
  insert: `
    INSERT INTO mesas (numero, capacidad, estado) 
    VALUES (?, ?, ?)
  `,
  update: `
    UPDATE mesas 
    SET numero = ?, capacidad = ?, estado = ? 
    WHERE id = ?
  `,
  delete: `
    DELETE FROM mesas 
    WHERE id = ?
  `,
});

export const Mesa = {
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  create({ numero, capacidad, estado = 'libre' }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      numero, capacidad, estado
    );
    return this.findById(lastInsertRowid);
  },

  update(id, { numero, capacidad, estado }) {
    db.prepare(sql.update).run(numero, capacidad, estado, id);
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};