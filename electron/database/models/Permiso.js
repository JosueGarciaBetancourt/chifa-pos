import { connection } from '../connection.js';
import { ModuloSistema } from '../../../electron/database/models/ModuloSistema.js';
import { AccionSistema } from '../../../electron/database/models/AccionSistema.js';

const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT *
    FROM permisos
    ORDER BY id ASC
  `,
  selectById: `
    SELECT *
    FROM permisos 
    WHERE id = ?
  `,
  insert: `
    INSERT INTO permisos (modulo_id, accion_id, codigo) 
    VALUES (?, ?, ?)
  `,
  update: `
    UPDATE permisos 
    SET modulo_id = ?, accion_id = ?, codigo = ?
    WHERE id = ?
  `,
  delete: `
    DELETE FROM permisos 
    WHERE id = ?
  `,
});

export const Permiso = {
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  create({ modulo_id, accion_id }) {
    const modulo = ModuloSistema.findById(modulo_id);
    const accion = AccionSistema.findById(accion_id);

    if (!modulo) throw new Error(`Módulo no encontrado (id=${modulo_id})`);
    if (!accion) throw new Error(`Acción no encontrada (id=${accion_id})`);

    const codigo = `${modulo?.nombre}.${accion?.nombre}`;

    const { lastInsertRowid } = db.prepare(sql.insert).run(modulo_id, accion_id, codigo);
    return this.findById(lastInsertRowid);
  },

  update(id, { modulo_id, accion_id }) {
    const modulo = ModuloSistema.findById(modulo_id);
    const accion = AccionSistema.findById(accion_id);

    if (!modulo) throw new Error(`Módulo no encontrado (id=${modulo_id})`);
    if (!accion) throw new Error(`Acción no encontrada (id=${accion_id})`);

    const codigo = `${modulo?.nombre}.${accion?.nombre}`;  

    db.prepare(sql.update).run(modulo_id, accion_id, codigo, id);
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};

