import { connection } from '../connection.js';
const db = connection();

const baseSelect = `
  SELECT 
    c.id,
    c.insumo_id,
    i.nombre AS insumo_nombre,
    i.unidad_medida AS insumo_unidad,
    c.proveedor_id,
    p.nombre AS proveedor_nombre,
    c.cantidad,
    c.costo_unitario,
    (c.cantidad * c.costo_unitario) AS total,
    c.fecha,
    c.usuario_id,
    u.nombre AS usuario_nombre,
    u.apellido AS usuario_apellido
  FROM compras_insumos_proveedores c
  JOIN insumos i ON c.insumo_id = i.id
  JOIN proveedores p ON c.proveedor_id = p.id
  LEFT JOIN usuarios u ON c.usuario_id = u.id
`;

const sql = Object.freeze({
  selectAll: `${baseSelect} ORDER BY c.fecha DESC`,
  selectByInsumo: `${baseSelect} WHERE c.insumo_id = ? ORDER BY c.fecha DESC`,
  selectByProveedor: `${baseSelect} WHERE c.proveedor_id = ? ORDER BY c.fecha DESC`,
  insert: `
    INSERT INTO compras_insumos_proveedores (
      insumo_id, proveedor_id, cantidad, costo_unitario, usuario_id
    ) VALUES (?, ?, ?, ?, ?)
  `,
  delete: `
    DELETE FROM compras_insumos_proveedores 
    WHERE id = ?
  `
});

// Transformador
function formatCompra(row) {
  return {
    id: row.id,
    insumo_id: row.insumo_id,
    proveedor_id: row.proveedor_id,
    cantidad: row.cantidad,
    costo_unitario: row.costo_unitario,
    total: row.total,
    fecha: row.fecha,
    usuario_id: row.usuario_id,
    insumo: {
      nombre: row.insumo_nombre,
      unidad: row.insumo_unidad
    },
    proveedor: {
      nombre: row.proveedor_nombre
    },
    usuario: row.usuario_id ? {
      nombre: row.usuario_nombre,
      apellido: row.usuario_apellido
    } : null
  };
}

export const CompraInsumoProveedor = {
  selectAll() {
    return db.prepare(sql.selectAll).all().map(formatCompra);
  },

  findByInsumo(insumo_id) {
    return db.prepare(sql.selectByInsumo).all(insumo_id).map(formatCompra);
  },

  findByProveedor(proveedor_id) {
    return db.prepare(sql.selectByProveedor).all(proveedor_id).map(formatCompra);
  },

  create({ insumo_id, proveedor_id, cantidad, costo_unitario, usuario_id }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      insumo_id, proveedor_id, cantidad, costo_unitario, usuario_id
    );
    return { id: lastInsertRowid };
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
