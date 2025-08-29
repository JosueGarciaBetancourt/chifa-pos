import { connection } from '../connection.js';
import { DateFormatter } from '../utils/dateFormatter.js';

const db = connection();

const baseSelect = `
  SELECT 
    r.id,
    r.cliente_id,
    r.mesa_id,
    r.usuario_id,
    r.fecha,
    r.hora,
    r.numero_personas,
    r.fecha_vencimiento,
    r.hora_vencimiento,
    r.estado,
    r.observaciones,
    r.created_at,

    c.nombre AS cliente_nombre,
    c.apellido AS cliente_apellido,
    m.numero AS mesa_numero,
    u.nombre AS usuario_nombre,
    u.apellido AS usuario_apellido
  FROM reservas r
  JOIN clientes c ON r.cliente_id = c.id
  JOIN mesas m ON r.mesa_id = m.id
  JOIN usuarios u ON r.usuario_id = u.id
`;

const sql = Object.freeze({
  selectAll: `${baseSelect} ORDER BY r.fecha DESC, r.hora DESC`,
  selectById: `${baseSelect} WHERE r.id = ?`,
  selectByCliente: `${baseSelect} WHERE r.cliente_id = ? ORDER BY r.fecha DESC`,
  selectActivas: `${baseSelect} WHERE r.estado IN ('pendiente', 'confirmada') AND r.fecha >= date('now') ORDER BY r.fecha, r.hora`,
  insert: `
    INSERT INTO reservas (
      cliente_id, mesa_id, usuario_id,
      fecha, hora, numero_personas,
      fecha_vencimiento, hora_vencimiento,
      estado, observaciones, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
  updateEstado: `
    UPDATE reservas
    SET estado = ?
    WHERE id = ?
  `,
  delete: `
    DELETE FROM reservas
    WHERE id = ?
  `
});

// Formateador estructurado
function formatReserva(row) {
  return {
    id: row.id,
    cliente_id: row.cliente_id,
    mesa_id: row.mesa_id,
    usuario_id: row.usuario_id,
    fecha: row.fecha,
    hora: row.hora,
    numero_personas: row.numero_personas,
    fecha_vencimiento: row.fecha_vencimiento,
    hora_vencimiento: row.hora_vencimiento,
    estado: row.estado,
    observaciones: row.observaciones,
    created_at: row.created_at,
    cliente: {
      nombre: row.cliente_nombre,
      apellido: row.cliente_apellido
    },
    mesa: {
      numero: row.mesa_numero
    },
    usuario: {
      nombre: row.usuario_nombre,
      apellido: row.usuario_apellido
    }
  };
}

export const Reserva = {
  selectAll() {
    return db.prepare(sql.selectAll).all().map(formatReserva);
  },

  findById(id) {
    const row = db.prepare(sql.selectById).get(id);
    return row ? formatReserva(row) : null;
  },

  findByCliente(cliente_id) {
    return db.prepare(sql.selectByCliente).all(cliente_id).map(formatReserva);
  },

  selectActivas() {
    return db.prepare(sql.selectActivas).all().map(formatReserva);
  },

  create({
    cliente_id,
    mesa_id,
    usuario_id,
    fecha,
    hora,
    numero_personas,
    fecha_vencimiento,
    hora_vencimiento,
    estado = 'pendiente',
    observaciones = null
  }) {
    const created_at = DateFormatter.toLocalSQLDatetime();

    const { lastInsertRowid } = db.prepare(sql.insert).run(
      cliente_id,
      mesa_id,
      usuario_id,
      fecha,
      hora,
      numero_personas,
      fecha_vencimiento,
      hora_vencimiento,
      estado,
      observaciones,
      created_at
    );
    return this.findById(lastInsertRowid);
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
