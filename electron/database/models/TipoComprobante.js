import { connection } from '../connection.js';
const db = connection();

const baseSelect = `
  SELECT 
    id,
    nombre,
    serie_letras_iniciales
  FROM tipos_comprobantes
`;

const sql = Object.freeze({
  selectAll: `${baseSelect} ORDER BY nombre ASC`,
  selectById: `${baseSelect} WHERE id = ?`,
  selectByNombre: `${baseSelect} WHERE nombre = ?`,
  insert: `
    INSERT INTO tipos_comprobantes (nombre, serie_letras_iniciales)
    VALUES (?, ?)
  `,
  update: `
    UPDATE tipos_comprobantes
    SET nombre = ?, serie_letras_iniciales = ?
    WHERE id = ?
  `,
  delete: `
    DELETE FROM tipos_comprobantes 
    WHERE id = ?
  `,
});

// Formateador
function formatTipoComprobante(row) {
  return {
    id: row.id,
    nombre: row.nombre,
    serie_letras_iniciales: row.serie_letras_iniciales
  };
}

export const TipoComprobante = {
  selectAll() {
    return db.prepare(sql.selectAll).all().map(formatTipoComprobante);
  },

  findById(id) {
    const row = db.prepare(sql.selectById).get(id);
    return row ? formatTipoComprobante(row) : null;
  },

  findByNombre(nombre) {
    const row = db.prepare(sql.selectByNombre).get(nombre);
    return row ? formatTipoComprobante(row) : null;
  },

  create({ nombre, serie_letras_iniciales }) {
    const existente = db.prepare(sql.selectByNombre).get(nombre);
    if (existente) {
      throw new Error(`Ya existe un tipo de comprobante con el nombre "${nombre}".`);
    }

    const { lastInsertRowid } = db.prepare(sql.insert).run(nombre, serie_letras_iniciales);
    return this.findById(lastInsertRowid);
  },

  update(id, { nombre, serie_letras_iniciales }) {
    db.prepare(sql.update).run(nombre, serie_letras_iniciales, id);
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
