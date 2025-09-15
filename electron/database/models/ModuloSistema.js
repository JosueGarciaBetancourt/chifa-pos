import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT *
    FROM modulos_sistema
  `,
  selectById: `
    SELECT * 
    FROM modulos_sistema 
    WHERE id = ?
  `,
  selectActive: `
    SELECT *
    FROM modulos_sistema
    WHERE activo = 1
  `,
  selectInactive: `
    SELECT *
    FROM modulos_sistema
    WHERE activo = 0
  `,
  disable: `
    UPDATE modulos_sistema SET activo = 0 WHERE id = ? AND activo = 1
  `,
  enable: `
    UPDATE modulos_sistema SET activo = 1 WHERE id = ? AND activo = 0
  `
});

export const ModuloSistema = {
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  selectActive() {
    return db.prepare(sql.selectActive).all();
  },

  selectInactive() {
    return db.prepare(sql.selectInactive).all();
  },

  disable(id) {
    db.prepare(sql.disable).run(id);
    return;
  },

  enable(id) {
    db.prepare(sql.enable).run(id);
    return this.findById(id);
  }
};
