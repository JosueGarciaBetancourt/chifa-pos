import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT 
      l.id,
      l.usuario_id,
      l.accion,
      l.modulo,
      l.descripcion,
      l.fecha_hora,
      l.dispositivo_id,
      u.nombre AS usuario_nombre,
      u.apellido AS usuario_apellido,
      d.nombre AS dispositivo_nombre
    FROM logs_sistema l
    LEFT JOIN usuarios u ON l.usuario_id = u.id
    LEFT JOIN dispositivos d ON l.dispositivo_id = d.id
    ORDER BY l.fecha_hora DESC
  `,
  selectByUsuario: `
    SELECT * FROM logs_sistema WHERE usuario_id = ? ORDER BY fecha_hora DESC
  `,
  insert: `
    INSERT INTO logs_sistema (usuario_id, accion, modulo, descripcion, dispositivo_id)
    VALUES (?, ?, ?, ?, ?)
  `,
  delete: `
    DELETE FROM logs_sistema WHERE id = ?
  `
});

// 🎯 Transformador para formatear la salida
function formatLog(row) {
  return {
    id: row.id,
    usuario_id: row.usuario_id,
    dispositivo_id: row.dispositivo_id,
    accion: row.accion,
    modulo: row.modulo,
    descripcion: row.descripcion,
    fecha_hora: row.fecha_hora,
    usuario: row.usuario_id
      ? { nombre: row.usuario_nombre, apellido: row.usuario_apellido }
      : null,
    dispositivo: row.dispositivo_id
      ? { nombre: row.dispositivo_nombre }
      : null
  };
}

export const LogSistema = {
  /**
   * Retorna todos los logs con nombre de usuario y dispositivo
   */
  selectAll() {
    return db.prepare(sql.selectAll).all().map(formatLog);
  },

  /**
   * Retorna logs filtrados por usuario
   */
  findByUsuario(usuario_id) {
    return db.prepare(sql.selectByUsuario).all(usuario_id);
  },

  /**
   * Crea un nuevo registro de log
   */
  create({ usuario_id = null, accion, modulo, descripcion = null, dispositivo_id = null }) {
    db.prepare(sql.insert).run(usuario_id, accion, modulo, descripcion, dispositivo_id);
    return { created: true };
  },

  /**
   * Elimina un log (si es necesario por mantenimiento o políticas)
   */
  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
