import { connection } from '../connection.js';
const db = connection();

// SELECT base con joins para obtener nombres
const baseSelect = `
  SELECT 
    ip.id,
    ip.insumo_id,
    ip.proveedor_id,

    i.nombre AS insumo_nombre,
    i.unidad_medida AS insumo_unidad_medida,
    i.stock_actual AS insumo_stock_actual,
    i.stock_minimo AS insumo_stock_minimo,

    ti.nombre AS tipo_nombre,

    p.nombre AS proveedor_nombre,
    p.ruc AS proveedor_ruc,
    p.correo AS proveedor_correo,
    p.telefono AS proveedor_telefono,
    p.direccion AS proveedor_direccion,

    ip.descripcion,
    ip.costo_unitario_pactado,
    ip.observaciones

  FROM insumos_proveedores ip
  JOIN insumos i ON ip.insumo_id = i.id
  JOIN tipos_insumos ti ON i.tipo_id = ti.id
  JOIN proveedores p ON ip.proveedor_id = p.id
  JOIN compras_insumos p ON ip.proveedor_id = p.id
`;

const sql = Object.freeze({
  selectAll: `${baseSelect}`,
  selectByInsumo: `${baseSelect} WHERE ip.insumo_id = ?`,
  selectByProveedor: `${baseSelect} WHERE ip.proveedor_id = ?`,
  selectById: `${baseSelect} WHERE ip.id = ?`,
  insert: `
    INSERT INTO insumos_proveedores (insumo_id, proveedor_id, descripcion, costo_unitario_pactado, observaciones)
    VALUES (?, ?, ?, ?, ?)
  `,
  update: `
    UPDATE insumos_proveedores
    SET descripcion = ?, costo_unitario_pactado = ?, observaciones = ?
    WHERE id = ?
  `,
  delete: `
    DELETE FROM insumos_proveedores
    WHERE id = ?
  `,
});

function formatInsumoProveedor(row) {
  return {
    id: row.id,
    insumo: {
      id: row.insumo_id,
      nombre: row.insumo_nombre,
      tipo: row.tipo_nombre,
      unidad_medida: row.insumo_unidad_medida,
      stock_actual: row.insumo_stock_actual,
      stock_minimo: row.insumo_stock_minimo
    },
    proveedor: {
      id: row.proveedor_id,
      nombre: row.proveedor_nombre,
      ruc: row.proveedor_ruc,
      correo: row.proveedor_correo,
      telefono: row.proveedor_telefono,
      direccion: row.proveedor_direccion
    },
    descripcion: row.descripcion,
    costo_unitario_pactado: row.costo_unitario_pactado,
    observaciones: row.observaciones
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

  create({ insumo_id, proveedor_id, descripcion = null, costo_unitario_pactado, observaciones = null }) {
    // Verificar si ya existe la relación
    const existente = db.prepare(`
      SELECT 1 FROM insumos_proveedores 
      WHERE insumo_id = ? AND proveedor_id = ?
    `).get(insumo_id, proveedor_id);

    if (existente) {
      throw new Error('Este insumo ya está asociado a este proveedor.');
    }

    const { lastInsertRowid } = db.prepare(sql.insert).run(
      insumo_id, proveedor_id, descripcion, costo_unitario_pactado, observaciones
    );
    return this.findById(lastInsertRowid);
  },

  update(id, { costo_unitario_pactado, observaciones }) {
    db.prepare(sql.update).run(costo_unitario_pactado, observaciones, id);
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};