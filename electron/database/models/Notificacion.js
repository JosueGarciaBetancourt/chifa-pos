import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT 
      n.id, 
      n.usuario_id,
      n.tipo_id,
      t.nombre AS tipo_nombre,
      n.titulo, 
      n.mensaje, 
      n.leido, 
      n.creado_en
    FROM notificaciones n
    JOIN tipos_notificaciones t ON n.tipo_id = t.id
    ORDER BY n.creado_en DESC
  `,
  selectByUsuario: `
    SELECT 
      n.id, 
      n.usuario_id,
      n.tipo_id,
      t.nombre AS tipo_nombre,
      n.titulo, 
      n.mensaje, 
      n.leido, 
      n.creado_en
    FROM notificaciones n
    JOIN tipos_notificaciones t ON n.tipo_id = t.id
    WHERE n.usuario_id = ?
    ORDER BY n.creado_en DESC
  `,
  selectById: `
    SELECT * FROM notificaciones WHERE id = ?
  `,
  insert: `
    INSERT INTO notificaciones (usuario_id, tipo_id, titulo, mensaje)
    VALUES (?, ?, ?, ?)
  `,
  marcarLeido: `
    UPDATE notificaciones SET leido = 1 WHERE id = ?
  `,
  marcarTodasLeidas: `
    UPDATE notificaciones SET leido = 1 WHERE usuario_id = ?
  `,
  delete: `
    DELETE FROM notificaciones WHERE id = ?
  `
});

// Formatea la notificación con tipo como objeto
function formatNotificacion(row) {
  return {
    id: row.id,
    usuario_id: row.usuario_id,
    tipo_id: row.tipo_id,
    tipo: {
      nombre: row.tipo_nombre
    },
    titulo: row.titulo,
    mensaje: row.mensaje,
    leido: !!row.leido,
    creado_en: row.creado_en
  };
}

export const Notificacion = {
  selectAll() {
    return db.prepare(sql.selectAll).all().map(formatNotificacion);
  },

  findByUsuario(usuario_id) {
    return db.prepare(sql.selectByUsuario).all(usuario_id).map(formatNotificacion);
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  create({ usuario_id, tipo_id, titulo = null, mensaje }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(usuario_id, tipo_id, titulo, mensaje);
    return this.findById(lastInsertRowid);
  },

  marcarLeida(id) {
    db.prepare(sql.marcarLeido).run(id);
    return { id, leido: true };
  },

  marcarTodasLeidas(usuario_id) {
    db.prepare(sql.marcarTodasLeidas).run(usuario_id);
    return { usuario_id, leidas: true };
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
