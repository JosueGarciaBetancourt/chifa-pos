import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT * 
    FROM dispositivos
  `,
  selectById: `
    SELECT * FROM dispositivos WHERE id = ?
  `,
  selectByMac: `
    SELECT * FROM dispositivos WHERE mac_address = ?
  `,
  selectActive: `
    SELECT *
    FROM dispositivos
    WHERE activo = 1
  `,
  selectInactive: `
    SELECT *
    FROM dispositivos
    WHERE activo = 0
  `,
  insert: `
    INSERT INTO dispositivos (nombre, mac_address, ip_address, tipo_hardware, rol_funcional, ultima_conexion, usuario_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
  updateConexion: `
    UPDATE dispositivos
    SET ip_address = ?, ultima_conexion = ?
    WHERE mac_address = ?
  `,
  disable: `
    UPDATE dispositivos SET activo = 0 WHERE mac_address = ? AND activo = 1
  `,
  enable: `
    UPDATE dispositivos SET activo = 1 WHERE mac_address = ? AND activo = 0
  `,
  delete: `
    DELETE FROM dispositivos WHERE mac_address = ?
  `
});

function formatDispositivo(row) {
  return {
    id: row.id,
    nombre: row.nombre,
    mac_address: row.mac_address,
    ip_address: row.ip_address,
    tipo_hardware: row.tipo_hardware,
    rol_funcional: row.rol_funcional,
    ultima_conexion: row.ultima_conexion,
    usuario_id: row.usuario_id,
    activo: row.activo
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

  findByMac(mac_address) {
    const row = db.prepare(sql.selectByMac).get(mac_address);
    return row ? formatDispositivo(row) : null;
  },

  selectActive() {
    return db.prepare(sql.selectActive).all();
  },

  selectInactive() {
    return db.prepare(sql.selectInactive).all();
  },

  create({ nombre, mac_address, ip_address = null, tipo_hardware, rol_funcional, ultima_conexion, usuario_id = null }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      nombre, mac_address, ip_address, tipo_hardware, rol_funcional, ultima_conexion, usuario_id
    );
    return this.findById(lastInsertRowid);
  },

  update(mac_address, data) {
    const allowed = ['nombre', 'ip_address', 'tipo_hardware', 'rol_funcional', 'ultima_conexion', 'usuario_id', 'activo'];
    const keys = Object.keys(data).filter(k => allowed.includes(k));
    if (keys.length === 0) {
      throw new Error('No se especificaron campos válidos para actualizar.');
    }
  
    const setClause = keys.map(key => `${key} = ?`).join(', ');
    const values = keys.map(key => data[key]);
  
    const sql = `
      UPDATE dispositivos 
      SET ${setClause} 
      WHERE mac_address = ?
    `;
  
    db.prepare(sql).run(...values, mac_address);
    return this.findByMac(mac_address);
  },

  actualizarConexion(mac_address, ip_address) {
    const now = new Date().toISOString();
    db.prepare(sql.updateConexion).run(ip_address, now, mac_address);
    return this.findByMac(mac_address);
  },
  
  disable(mac_address) {
    db.prepare(sql.disable).run(mac_address);
    return;
  },

  enable(mac_address) {
    db.prepare(sql.enable).run(mac_address);
    return this.findByMac(mac_address);
  },

  delete(mac_address) {
    db.prepare(sql.delete).run(mac_address);
    return { deleted: true };
  }
};
