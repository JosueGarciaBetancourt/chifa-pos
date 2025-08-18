import { connection } from '../connection.js';
const db = connection();

const baseSelect = `
  SELECT 
    id,
    nombre,
    descripcion
  FROM estados_mesas
`;

const sql = Object.freeze({
  selectAll: `${baseSelect}`,
  selectById: `${baseSelect} WHERE id = ?`,
  searchByName: `${baseSelect} WHERE nombre LIKE ?`,
  selectByNombre: `${baseSelect} WHERE nombre = ?`,
  insert: `
    INSERT INTO estados_mesas (nombre, descripcion)
    VALUES (?, ?)
  `,
  update: `
    UPDATE estados_mesas
    SET nombre = ?, descripcion = ?
    WHERE id = ?
  `,
  delete: `
    DELETE FROM estados_mesas
    WHERE id = ?
  `,
});

// Formateador de salida
function formatEstado(row) {
  return {
    id: row.id,
    nombre: row.nombre,
    descripcion: row.descripcion
  };
}

export const EstadoMesa = {
  selectAll() {
    return db.prepare(sql.selectAll).all().map(formatEstado);
  },

  findById(id) {
    const row = db.prepare(sql.selectById).get(id);
    return row ? formatEstado(row) : null;
  },

  searchByName(name) {
    const rows = db.prepare(sql.searchByName).all(`%${name}%`).map(formatEstado);
    return rows;
  },

  create({ nombre, descripcion = null }) {
    const existente = db.prepare(sql.selectByNombre).get(nombre);
    if (existente) {
      throw new Error('Ya existe un estado de mesa con ese nombre.');
    }

    const { lastInsertRowid } = db.prepare(sql.insert).run(nombre, descripcion);
    return this.findById(lastInsertRowid);
  },

  update(id, { nombre, descripcion = null }) {
    db.prepare(sql.update).run(nombre, descripcion, id);
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
