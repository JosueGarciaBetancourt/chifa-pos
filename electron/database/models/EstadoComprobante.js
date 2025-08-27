import { connection } from '../connection.js';
const db = connection();

const baseSelect = `
  SELECT 
    id,
    nombre,
    descripcion
  FROM estados_comprobantes
`;

const sql = Object.freeze({
  selectAll: `${baseSelect} ORDER BY id ASC`,
  selectById: `${baseSelect} WHERE id = ?`,
  selectByNombre: `${baseSelect} WHERE nombre = ?`,
  searchByName: `
    SELECT *
    FROM estados_comprobantes  
    WHERE nombre LIKE ?`,
  insert: `
    INSERT INTO estados_comprobantes (nombre, descripcion)
    VALUES (?, ?)
  `,
  update: `
    UPDATE estados_comprobantes
    SET nombre = ?, descripcion = ?
    WHERE id = ?
  `,
  delete: `
    DELETE FROM estados_comprobantes
    WHERE id = ?
  `,
});

// Formateador
function formatEstadoComprobante(row) {
  return {
    id: row.id,
    nombre: row.nombre,
    descripcion: row.descripcion
  };
}

export const EstadoComprobante = {
  selectAll() {
    return db.prepare(sql.selectAll).all().map(formatEstadoComprobante);
  },

  findById(id) {
    const row = db.prepare(sql.selectById).get(id);
    return row ? formatEstadoComprobante(row) : null;
  },

  findByNombre(nombre) {
    const row = db.prepare(sql.selectByNombre).get(nombre);
    return row ? formatEstadoComprobante(row) : null;
  },

  searchByName(name) {
    const rows = db.prepare(sql.searchByName).all(`%${name}%`);
    return rows;
  },

  create({ nombre, descripcion = null }) {
    const existente = db.prepare(sql.selectByNombre).get(nombre);
    if (existente) {
      throw new Error(`Ya existe un estado de comprobante con el nombre "${nombre}".`);
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
