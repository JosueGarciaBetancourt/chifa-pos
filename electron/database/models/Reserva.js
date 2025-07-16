import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT id, cliente_id, mesa_id, usuario_id, fecha, hora, numero_personas, estado, observaciones, created_at 
    FROM reservas
  `,
  selectById: `
    SELECT * 
    FROM reservas 
    WHERE id = ?
  `,
  insert: `
    INSERT INTO reservas (cliente_id, mesa_id, usuario_id, fecha, hora, numero_personas, estado, observaciones) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `,
  update: `
    UPDATE reservas 
    SET cliente_id = ?, mesa_id = ?, usuario_id = ?, fecha = ?, hora = ?, numero_personas = ?, estado = ?, observaciones = ? 
    WHERE id = ?
  `,
  delete: `
    DELETE FROM reservas 
    WHERE id = ?
  `,
  updateEstado: `
    UPDATE reservas 
    SET estado = ? 
    WHERE id = ?
  `,
});

export const Reserva = {
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  create({ cliente_id, mesa_id, usuario_id, fecha, hora, numero_personas, estado, observaciones = null }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      cliente_id, mesa_id, usuario_id, fecha, hora, numero_personas, estado, observaciones
    );
    return this.findById(lastInsertRowid);
  },

  update(id, { cliente_id, mesa_id, usuario_id, fecha, hora, numero_personas, estado, observaciones }) {
    db.prepare(sql.update).run(
      cliente_id, mesa_id, usuario_id, fecha, hora, numero_personas, estado, observaciones, id
    );
    return this.findById(id);
  },

  updateEstado(id, estado) {
    db.prepare(sql.updateEstado).run(estado, id);
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};