import { connection } from '../connection.js';
const db = connection();

const baseSelect = `
  SELECT 
    id,
    nombre
  FROM metodos_pago
`;

const sql = Object.freeze({
  selectAll: `${baseSelect} ORDER BY nombre ASC`,
  selectById: `${baseSelect} WHERE id = ?`,
  selectByNombre: `${baseSelect} WHERE nombre = ?`,
  insert: `
    INSERT INTO metodos_pago (nombre)
    VALUES (?)
  `,
  update: `
    UPDATE metodos_pago
    SET nombre = ?
    WHERE id = ?
  `,
  delete: `
    DELETE FROM metodos_pago 
    WHERE id = ?
  `,
});

// Formateador simple
function formatMetodo(row) {
  return {
    id: row.id,
    nombre: row.nombre
  };
}

export const MetodoPago = {
  selectAll() {
    return db.prepare(sql.selectAll).all().map(formatMetodo);
  },

  findById(id) {
    const row = db.prepare(sql.selectById).get(id);
    return row ? formatMetodo(row) : null;
  },

  findByNombre(nombre) {
    const row = db.prepare(sql.selectByNombre).get(nombre);
    return row ? formatMetodo(row) : null;
  },

  create({ nombre }) {
    const existente = db.prepare(sql.selectByNombre).get(nombre);
    if (existente) {
      throw new Error(`Ya existe un método de pago llamado "${nombre}".`);
    }

    const { lastInsertRowid } = db.prepare(sql.insert).run(nombre);
    return this.findById(lastInsertRowid);
  },

  update(id, { nombre }) {
    db.prepare(sql.update).run(nombre, id);
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
