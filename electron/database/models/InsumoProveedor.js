import { connection } from '../connection.js';
const db = connection();

// SELECT base con joins para obtener nombres
const baseSelect = `
  SELECT 
    ip.id,
    ip.insumo_id,
    i.nombre AS insumo_nombre,
    ip.proveedor_id,
    p.nombre AS proveedor_nombre,
    ip.observaciones
  FROM insumos_proveedores ip
  JOIN insumos i ON ip.insumo_id = i.id
  JOIN proveedores p ON ip.proveedor_id = p.id
`;

const sql = Object.freeze({
  selectAll: `${baseSelect}`,
  selectByInsumo: `${baseSelect} WHERE ip.insumo_id = ?`,
  selectByProveedor: `${baseSelect} WHERE ip.proveedor_id = ?`,
  selectById: `${baseSelect} WHERE ip.id = ?`,
  insert: `
    INSERT INTO insumos_proveedores (insumo_id, proveedor_id, observaciones)
    VALUES (?, ?, ?)
  `,
  update: `
    UPDATE insumos_proveedores
    SET observaciones = ?
    WHERE id = ?
  `,
  delete: `
    DELETE FROM insumos_proveedores
    WHERE id = ?
  `,
});

// Formateador
function formatInsumoProveedor(row) {
  return {
    id: row.id,
    insumo_id: row.insumo_id,
    proveedor_id: row.proveedor_id,
    observaciones: row.observaciones,
    insumo: {
      nombre: row.insumo_nombre
    },
    proveedor: {
      nombre: row.proveedor_nombre
    }
  };
}

export const InsumoProveedor = {
  selectAll() {
    return db.prepare(sql.selectAll).all().map(formatInsumoProveedor);
  },

  findByInsumo(insumo_id) {
    return db.prepare(sql.selectByInsumo).all(insumo_id).map(formatInsumoProveedor);
  },

  findByProveedor(proveedor_id) {
    return db.prepare(sql.selectByProveedor).all(proveedor_id).map(formatInsumoProveedor);
  },

  findById(id) {
    const row = db.prepare(sql.selectById).get(id);
    return row ? formatInsumoProveedor(row) : null;
  },

  create({ insumo_id, proveedor_id, observaciones = null }) {
    // Verificar si ya existe la relación
    const existente = db.prepare(`
      SELECT 1 FROM insumos_proveedores 
      WHERE insumo_id = ? AND proveedor_id = ?
    `).get(insumo_id, proveedor_id);

    if (existente) {
      throw new Error('Este insumo ya está asociado a este proveedor.');
    }

    const { lastInsertRowid } = db.prepare(sql.insert).run(
      insumo_id, proveedor_id, observaciones
    );
    return this.findById(lastInsertRowid);
  },

  update(id, { observaciones }) {
    db.prepare(sql.update).run(observaciones, id);
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};