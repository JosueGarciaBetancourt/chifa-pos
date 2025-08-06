import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectPermisosByRolId: `
    SELECT p.*
    FROM permisos p
    JOIN roles_permisos rp ON rp.permiso_id = p.id
    WHERE rp.rol_id = ?
    ORDER BY p.id ASC
  `,
  insertRelation: `
    INSERT OR IGNORE INTO roles_permisos (rol_id, permiso_id)
    VALUES (?, ?)
  `,
  deleteRelation: `
    DELETE FROM roles_permisos
    WHERE rol_id = ? AND permiso_id = ?
  `,
  deleteAllForRol: `
    DELETE FROM roles_permisos
    WHERE rol_id = ?
  `,
});

export const Rol_Permiso = {
  selectPermisosByRolId(rolId) {
    return db.prepare(sql.selectPermisosByRolId).all(rolId);
  },

  // Asigna múltiples permisos (sin eliminar los previos)
  asignarPermisos(rolId, permisos = []) {
    const insertStmt = db.prepare(sql.insertRelation);
    const transaction = db.transaction(() => {
      for (const permisoId of permisos) {
        insertStmt.run(rolId, permisoId);
      }
    });
    transaction();
    return this.selectPermisosByRolId(rolId);
  },

  // Reemplaza los permisos actuales por los nuevos (elimina todos y vuelve a insertar)
  actualizarPermisos(rolId, nuevosPermisos = []) {
    const deleteAllStmt = db.prepare(sql.deleteAllForRol);
    const insertStmt = db.prepare(sql.insertRelation);
    const transaction = db.transaction(() => {
      deleteAllStmt.run(rolId);
      for (const permisoId of nuevosPermisos) {
        insertStmt.run(rolId, permisoId);
      }
    });
    transaction();
    return this.selectPermisosByRolId(rolId);
  },

  // Quita una lista de permisos del rol
  quitarPermisos(rolId, permisos = []) {
    const deleteStmt = db.prepare(sql.deleteRelation);
    const transaction = db.transaction(() => {
      for (const permisoId of permisos) {
        deleteStmt.run(rolId, permisoId);
      }
    });
    transaction();
    return this.selectPermisosByRolId(rolId);
  },
};
