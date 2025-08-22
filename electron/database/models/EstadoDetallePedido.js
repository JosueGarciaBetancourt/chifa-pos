import { connection } from '../connection.js';
const db = connection();

const baseSelect = `
  SELECT 
    id,
    nombre,
    descripcion
  FROM estados_detalles_pedidos
`;

const sql = Object.freeze({
  selectAll: `${baseSelect} ORDER BY id ASC`,
  selectById: `${baseSelect} WHERE id = ?`,
  selectByNombre: `${baseSelect} WHERE nombre = ?`,
  searchByName: `
    SELECT *
    FROM estados_detalles_pedidos  
    WHERE nombre LIKE ?`,
  insert: `
    INSERT INTO estados_detalles_pedidos (nombre, descripcion)
    VALUES (?, ?)
  `,
  update: `
    UPDATE estados_detalles_pedidos 
    SET nombre = ?, descripcion = ?
    WHERE id = ?
  `,
  delete: `
    DELETE FROM estados_detalles_pedidos 
    WHERE id = ?
  `,
});

// Formateo estructurado
function formatEstadoDetalle(row) {
  return {
    id: row.id,
    nombre: row.nombre,
    descripcion: row.descripcion
  };
}

export const EstadoDetallePedido = {
  selectAll() {
    return db.prepare(sql.selectAll).all().map(formatEstadoDetalle);
  },

  findById(id) {
    const row = db.prepare(sql.selectById).get(id);
    return row ? formatEstadoDetalle(row) : null;
  },

  findByNombre(nombre) {
    const row = db.prepare(sql.selectByNombre).get(nombre);
    return row ? formatEstadoDetalle(row) : null;
  },

  searchByName(name) {
    const rows = db.prepare(sql.searchByName).all(`%${name}%`);
    return rows;
  },

  create({ nombre, descripcion = null }) {
    const existente = db.prepare(sql.selectByNombre).get(nombre);
    if (existente) {
      throw new Error(`Ya existe un estado con el nombre "${nombre}".`);
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
