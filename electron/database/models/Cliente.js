import { connection } from '../connection.js';
const db = connection();

// SELECT base (para consistencia y orden)
const baseSelect = `
  SELECT 
    id,
    dni,
    digitoVerificador,
    nombre,
    apellido,
    direccion,
    telefono,
    verificado_reniec,
    activo
  FROM clientes
`;

const sql = Object.freeze({
  selectAll: `${baseSelect} ORDER BY apellido ASC, nombre ASC`,
  selectById: `${baseSelect} WHERE id = ?`,
  selectByDni: `${baseSelect} WHERE dni = ?`,
  selectActive: `${baseSelect} WHERE activo = 1`,
  selectInactive: `${baseSelect} WHERE activo = 0`,
  insert: `
    INSERT INTO clientes (
      dni, digitoVerificador, nombre, apellido, direccion, telefono, verificado_reniec
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
  update: `
    UPDATE clientes 
    SET dni = ?, digitoVerificador = ?, nombre = ?, apellido = ?, direccion = ?, telefono = ?, verificado_reniec = ?
    WHERE id = ?
  `,
  disable: `
    UPDATE clientes SET activo = 0 WHERE id = ? AND activo = 1
  `,
  enable: `
    UPDATE clientes SET activo = 1 WHERE id = ? AND activo = 0
  `,
  delete: `
    DELETE FROM clientes 
    WHERE id = ?
  `,
});

function formatCliente(row) {
  return {
    id: row.id,
    dni: row.dni,
    digitoVerificador: row.digitoVerificador,
    nombre: row.nombre,
    apellido: row.apellido,
    direccion: row.direccion,
    telefono: row.telefono,
    verificado_reniec: row.verificado_reniec,
    activo: row.activo
  };
}

export const Cliente = {
  selectAll() {
    return db.prepare(sql.selectAll).all().map(formatCliente);
  },

  findById(id) {
    const row = db.prepare(sql.selectById).get(id);
    return row ? formatCliente(row) : null;
  },

  findByDni(dni) {
    const row = db.prepare(sql.selectByDni).get(dni);
    return row ? formatCliente(row) : null;
  },

  selectActive() {
    return db.prepare(sql.selectActive).all().map(formatCliente);
  },

  selectInactive() {
    return db.prepare(sql.selectInactive).all().map(formatCliente);
  },

  create({ dni, digitoVerificador = null, nombre, apellido, direccion = null, telefono = null, verificado_reniec = 0 }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      dni, digitoVerificador, nombre, apellido, direccion, telefono, verificado_reniec
    );
    return this.findById(lastInsertRowid);
  },

  update(id, { dni, digitoVerificador = null, nombre, apellido, direccion, telefono, verificado_reniec = 1 }) {
    db.prepare(sql.update).run(
      dni, digitoVerificador, nombre, apellido, direccion, telefono, verificado_reniec, id
    );
    return this.findById(id);
  },

  disable(id) {
    db.prepare(sql.disable).run(id);
    return;
  },

  enable(id) {
    db.prepare(sql.enable).run(id);
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
