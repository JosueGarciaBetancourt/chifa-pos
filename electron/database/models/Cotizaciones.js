import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT id, cliente_id, usuario_id, fecha_hora, validez_dias, estado, total 
    FROM cotizaciones
  `,
  selectById: `
    SELECT * 
    FROM cotizaciones 
    WHERE id = ?
  `,
  insert: `
    INSERT INTO cotizaciones (cliente_id, usuario_id, fecha_hora, validez_dias, estado, total) 
    VALUES (?, ?, ?, ?, ?, ?)
  `,
  update: `
    UPDATE cotizaciones 
    SET cliente_id = ?, usuario_id = ?, fecha_hora = ?, validez_dias = ?, estado = ?, total = ? 
    WHERE id = ?
  `,
  delete: `
    DELETE FROM cotizaciones 
    WHERE id = ?
  `,
});

export const Cotizacion = {
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  create({ cliente_id, usuario_id, fecha_hora, validez_dias, estado, total }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      cliente_id, usuario_id, fecha_hora, validez_dias, estado, total
    );
    return this.findById(lastInsertRowid);
  },

  update(id, { cliente_id, usuario_id, fecha_hora, validez_dias, estado, total }) {
    db.prepare(sql.update).run(
      cliente_id, usuario_id, fecha_hora, validez_dias, estado, total, id
    );
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};