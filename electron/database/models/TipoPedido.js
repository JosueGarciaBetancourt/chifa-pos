import { connection } from '../connection.js';
const db = connection();

const baseSelect = `
  SELECT 
    id,
    nombre
  FROM tipos_pedidos
`;

const sql = Object.freeze({
  selectAll: `${baseSelect}`,
  selectById: `${baseSelect} WHERE id = ?`,
  selectByNombre: `${baseSelect} WHERE nombre = ?`,
  searchByName: `${baseSelect} WHERE nombre LIKE ?`,
  insert: `
    INSERT INTO tipos_pedidos (nombre)
    VALUES (?)
  `,
  update: `
    UPDATE tipos_pedidos
    SET nombre = ?
    WHERE id = ?
  `,
  delete: `
    DELETE FROM tipos_pedidos
    WHERE id = ?
  `,
});

function formatTipoPedido(row) {
  return {
    id: row.id,
    nombre: row.nombre
  };
}

export const TipoPedido = {
  selectAll() {
    return db.prepare(sql.selectAll).all().map(formatTipoPedido);
  },

  findById(id) {
    const row = db.prepare(sql.selectById).get(id);
    return row ? formatTipoPedido(row) : null;
  },

  searchByName(name) {
    const rows = db.prepare(sql.searchByName).all(`%${name}%`).map(formatTipoPedido);
    return rows;
  },

  create({ nombre }) {
    const existente = db.prepare(sql.selectByNombre).get(nombre);
    if (existente) {
      throw new Error(`Ya existe un tipo de pedido con el nombre "${nombre}".`);
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
