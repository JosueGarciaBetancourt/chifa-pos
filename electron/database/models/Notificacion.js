import { connection } from '../connection.js';
import { DateFormatter } from '../utils/dateFormatter.js';

const db = connection();

const detailedSelect = `
  SELECT 
    n.id,
    n.tipo_id,
    t.nombre AS tipo_nombre,
    n.titulo,
    n.mensaje,
    n.creado_en,
    n.activo,

    u.id AS usuario_id,
    u.dni,
    u.nombre,
    u.apellido,
    nu.leido
  FROM notificaciones n
  JOIN tipos_notificaciones t ON n.tipo_id = t.id
  JOIN notificaciones_usuarios nu ON n.id = nu.notificacion_id
  JOIN usuarios u ON nu.usuario_id = u.id
`;

function formatNotificaciones(rows) {
  const map = new Map();

  for (const row of rows) {
    if (!map.has(row.id)) {
      map.set(row.id, {
        id: row.id,
        tipo: { id: row.tipo_id, nombre: row.tipo_nombre },
        titulo: row.titulo,
        mensaje: row.mensaje,
        usuarios: [],
        creado_en: row.creado_en,
        activo: row.activo
      });
    }

    map.get(row.id).usuarios.push({
      id: row.usuario_id,
      dni: row.dni,
      nombre: row.nombre,
      apellido: row.apellido,
      leido: !!row.leido
    });
  }

  return Array.from(map.values());
}

const sql = Object.freeze({
  selectAll: `${detailedSelect} WHERE n.activo = 1 ORDER BY n.creado_en DESC`,
  selectById: `${detailedSelect} WHERE n.id = ? AND n.activo = 1 ORDER BY n.creado_en DESC`,
  selectByUsuario: `${detailedSelect} WHERE u.id = ? AND n.activo = 1 ORDER BY n.creado_en DESC`,
  insert: `
    INSERT INTO notificaciones (tipo_id, titulo, mensaje, creado_en)
    VALUES (?, ?, ?, ?)
  `,
  insertUsuario: `
    INSERT INTO notificaciones_usuarios (notificacion_id, usuario_id, leido)
    VALUES (?, ?, 0)
  `,
  marcarLeido: `
    UPDATE notificaciones_usuarios SET leido = 1 
    WHERE notificacion_id = ? AND usuario_id = ?
  `,
  marcarTodasLeidas: `
    UPDATE notificaciones_usuarios SET leido = 1 
    WHERE usuario_id = ?
  `,
  disable: `
    UPDATE notificaciones SET activo = 0
    WHERE id = ? AND activo = 1
  `
});

export const Notificacion = {
  selectAll() {
    const rows = db.prepare(sql.selectAll).all();
    return formatNotificaciones(rows);
  },

  findById(id) {
    const rows = db.prepare(sql.selectById).all(id);
    const result = formatNotificaciones(rows);
    return result.length ? result[0] : null;
  },

  findByUsuario(usuarioId) {
    const rows = db.prepare(sql.selectByUsuario).all(usuarioId);
    return formatNotificaciones(rows);
  },

  create({ tipo_id, titulo, mensaje, usuarios = [] }) {
    const creado_en = DateFormatter.toLocalSQLDatetime();
    const { lastInsertRowid: notificacion_id } = db.prepare(sql.insert).run(tipo_id, titulo,
                                                                            mensaje, creado_en);
    for (const usuario_id of usuarios) {
      db.prepare(sql.insertUsuario).run(notificacion_id, usuario_id);
    }
    return this.findById(notificacion_id);
  },

  marcarLeida(notificacion_id, usuario_id) {
    console.log({ notificacion_id, usuario_id });
    
    db.prepare(sql.marcarLeido).run(notificacion_id, usuario_id);
    return { notificacion_id, usuario_id, leido: true };
  },

  marcarTodasLeidas(usuario_id) {
    db.prepare(sql.marcarTodasLeidas).run(usuario_id);
    return { usuario_id, leidas: true };
  },

  disable(id) {
    db.prepare(sql.disable).run(id);
    return { disabled: true };
  }
};
