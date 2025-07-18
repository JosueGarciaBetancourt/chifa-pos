import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT id, nombre, mac_address, ip_address, tipo, ultima_conexion 
    FROM dispositivos
    ORDER BY nombre
  `,
  selectById: `
    SELECT * FROM dispositivos WHERE id = ?
  `,
  selectByMac: `
    SELECT * FROM dispositivos WHERE mac_address = ?
  `,
  insert: `
    INSERT INTO dispositivos (nombre, mac_address, ip_address, tipo, ultima_conexion)
    VALUES (?, ?, ?, ?, ?)
  `,
  update: `
    UPDATE dispositivos
    SET nombre = ?, ip_address = ?, tipo = ?, ultima_conexion = ?
    WHERE mac_address = ?
  `,
  updateConectado: `
    UPDATE dispositivos
    SET ip_address = ?, ultima_conexion = ?
    WHERE mac_address = ?
  `,
  delete: `
    DELETE FROM dispositivos WHERE id = ?
  `
});

function formatDispositivo(row) {
  return {
    id: row.id,
    nombre: row.nombre,
    mac_address: row.mac_address,
    ip_address: row.ip_address,
    tipo: row.tipo,
    ultima_conexion: row.ultima_conexion
  };
}

export const Dispositivo = {
  selectAll() {
    return db.prepare(sql.selectAll).all().map(formatDispositivo);
  },

  findById(id) {
    const row = db.prepare(sql.selectById).get(id);
    return row ? formatDispositivo(row) : null;
  },

  findByMac(mac) {
    const row = db.prepare(sql.selectByMac).get(mac);
    return row ? formatDispositivo(row) : null;
  },

  create({ nombre, mac_address, ip_address = null, tipo, ultima_conexion = null }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      nombre, mac_address, ip_address, tipo, ultima_conexion
    );
    return this.findById(lastInsertRowid);
  },

  update(mac_address, { nombre, ip_address, tipo, ultima_conexion = null }) {
    db.prepare(sql.update).run(nombre, ip_address, tipo, ultima_conexion, mac_address);
    return this.findByMac(mac_address);
  },

  actualizarConexion(mac_address, ip_address) {
    const now = new Date().toISOString();
    db.prepare(sql.updateConectado).run(ip_address, now, mac_address);
    return this.findByMac(mac_address);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
