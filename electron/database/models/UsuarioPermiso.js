import { connection } from '../connection.js';
const db = connection();

const baseSelect = `
  SELECT
    up.id,
    up.usuario_id,
    u.nombre || ' ' || u.apellido AS usuario,
    up.permiso_id,
    p.modulo_id,
    p.accion_id,
    up.tipo
  FROM usuarios_permisos up
  JOIN usuarios u ON up.usuario_id = u.id
  JOIN permisos p ON up.permiso_id = p.id
`;

const sql = Object.freeze({
  selectAll: `${baseSelect} ORDER BY up.id ASC`,
  selectById: `${baseSelect} WHERE up.id = ?`,
  selectByUsuario: `${baseSelect} WHERE up.usuario_id = ?`,
  insert: `
    INSERT INTO usuarios_permisos (usuario_id, permiso_id, tipo)
    VALUES (?, ?, ?)
  `,
  update: `
    UPDATE usuarios_permisos
    SET usuario_id = ?, permiso_id = ?, tipo = ?
    WHERE id = ?
  `,
  delete: `
    DELETE FROM usuarios_permisos
    WHERE id = ?
  `
});

export const UsuarioPermiso = {
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  findByUsuario(usuarioId) {
    return db.prepare(sql.selectByUsuario).all(usuarioId);
  },

  create({ usuario_id, permiso_id, tipo }) {
    const { lastInsertRowid } = db
      .prepare(sql.insert)
      .run(usuario_id, permiso_id, tipo);
    return this.findById(lastInsertRowid);
  },

  update(id, { usuario_id, permiso_id, tipo }) {
    db.prepare(sql.update).run(usuario_id, permiso_id, tipo, id);
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
