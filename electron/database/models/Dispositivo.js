import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT id, nombre, mac_address, ip_address, tipo, ultima_conexion 
    FROM dispositivos
  `,
  selectById: `
    SELECT * 
    FROM dispositivos 
    WHERE id = ?
  `,
  insert: `
    INSERT INTO dispositivos (nombre, mac_address, ip_address, tipo, ultima_conexion) 
    VALUES (?, ?, ?, ?, ?)
  `,
  update: `
    UPDATE dispositivos 
    SET nombre = ?, mac_address = ?, ip_address = ?, tipo = ?, ultima_conexion = ? 
    WHERE id = ?
  `,
  delete: `
    DELETE FROM dispositivos 
    WHERE id = ?
  `,
  updateConexion: `
    UPDATE dispositivos 
    SET ultima_conexion = ? 
    WHERE id = ?
  `,
});

export const Dispositivo = {
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  create({ nombre, mac_address, ip_address = null, tipo, ultima_conexion = null }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      nombre, mac_address, ip_address, tipo, ultima_conexion
    );
    return this.findById(lastInsertRowid);
  },

  update(id, { nombre, mac_address, ip_address, tipo, ultima_conexion }) {
    db.prepare(sql.update).run(
      nombre, mac_address, ip_address, tipo, ultima_conexion, id
    );
    return this.findById(id);
  },

  updateConexion(id, ultima_conexion) {
    db.prepare(sql.updateConexion).run(ultima_conexion, id);
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};