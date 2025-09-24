import { connection } from '../connection.js';
import { DateFormatter } from '../utils/dateFormatter.js';

const db = connection();

const baseSelect = `
  SELECT 
    cip.id,
    cip.insumo_proveedor_id,
    cip.cantidad,
    cip.costo_unitario_real,
    cip.fecha,
    cip.usuario_id,
    cip.observaciones,

    json_object(
      'id', i.id,
      'nombre', i.nombre,
      'tipo_id', i.tipo_id,
      'tipo_nombre', ti.nombre,
      'unidad_medida', i.unidad_medida,
      'stock_actual', i.stock_actual,
      'stock_minimo', i.stock_minimo
    ) AS insumo,

    json_object(
      'id', p.id,
      'nombre', p.nombre,
      'ruc', p.ruc,
      'correo', p.correo,
      'telefono', p.telefono,
      'costo_unitario_pactado', ip.costo_unitario_pactado,
      'observaciones', ip.observaciones
    ) AS proveedor,
    
    json_object(
      'id', u.id,
      'dni', u.dni,
      'nombre', u.nombre,
      'apellido', u.apellido,
      'rol_id', u.rol_id
    ) AS usuario

  FROM compras_insumos_proveedores cip
  JOIN insumos_proveedores ip ON cip.insumo_proveedor_id = ip.id
  JOIN insumos i ON ip.insumo_id = i.id
  JOIN tipos_insumos ti ON i.tipo_id = ti.id
  JOIN proveedores p ON ip.proveedor_id = p.id
  LEFT JOIN usuarios u ON cip.usuario_id = u.id
`;

const sql = Object.freeze({
  selectAll: `${baseSelect} ORDER BY cip.fecha DESC`,
  selectById: `${baseSelect} WHERE cip.id = ?`,
  selectByInsumo: `${baseSelect} WHERE ip.insumo_id = ? ORDER BY cip.fecha DESC`,
  selectByProveedor: `${baseSelect} WHERE ip.proveedor_id = ? ORDER BY cip.fecha DESC`,
  insert: `
    INSERT INTO compras_insumos_proveedores (
      insumo_proveedor_id, cantidad, costo_unitario_real, usuario_id, observaciones, fecha
    ) VALUES (?, ?, ?, ?, ?, ?)
  `,
  update: `
    UPDATE compras_insumos_proveedores 
    SET cantidad = ?, costo_unitario_real = ?, observaciones = ?
    WHERE id = ?
  `,
  delete: `
    DELETE FROM compras_insumos_proveedores 
    WHERE id = ?
  `
});

function formatCompra(row) {
  const insumo = row.insumo ? JSON.parse(row.insumo) : null;
  const proveedor = row.proveedor ? JSON.parse(row.proveedor) : null;
  const usuario = row.usuario ? JSON.parse(row.usuario) : null;

  return {
    id: row.id,
    insumo_proveedor_id: row.insumo_proveedor_id,

    insumo,
    proveedor,

    cantidad: row.cantidad,
    costo_unitario_real: row.costo_unitario_real,
    total: row.cantidad * row.costo_unitario_real,
    observaciones: row.observaciones,
    fecha: row.fecha,
    
    usuario
  };
}

export const CompraInsumoProveedor = {
  selectAll() {
    return db.prepare(sql.selectAll).all().map(formatCompra);
  },  

  findById(id) {
    const row = db.prepare(sql.selectById).get(id);
    return row ? formatCompra(row) : null;
  },

  findByInsumo(insumo_id) {
    return db.prepare(sql.selectByInsumo).all(insumo_id).map(formatCompra);
  },

  findByProveedor(proveedor_id) {
    return db.prepare(sql.selectByProveedor).all(proveedor_id).map(formatCompra);
  },

  create({ insumo_proveedor_id, cantidad, costo_unitario_real, usuario_id, observaciones = null,
          fecha = DateFormatter.toLocalSQLDatetime() }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      insumo_proveedor_id, cantidad, costo_unitario_real, usuario_id, observaciones, fecha
    );
    return this.findById(lastInsertRowid );
  },

  update(id, { cantidad, costo_unitario_real, observaciones }) {
    db.prepare(sql.update).run(
      cantidad, costo_unitario_real, observaciones, id
    );
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
