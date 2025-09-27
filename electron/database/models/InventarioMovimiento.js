import { connection } from '../connection.js';
import { DateFormatter } from '../utils/dateFormatter.js';
const db = connection();

// SELECT enriquecido con joins
const baseSelect = `
  SELECT 
    m.id,
    m.insumo_id,
    i.nombre AS insumo_nombre,
    i.unidad_medida AS insumo_unidad,
    m.tipo,
    m.cantidad,
    m.fecha_hora,
    m.usuario_id,
    u.nombre AS usuario_nombre,
    u.apellido AS usuario_apellido,
    m.pedido_id
  FROM inventario_movimientos m
  JOIN insumos i ON m.insumo_id = i.id
  JOIN usuarios u ON m.usuario_id = u.id
`;

const sql = Object.freeze({
  selectAll: `${baseSelect} ORDER BY m.fecha_hora DESC`,
  selectById: `${baseSelect} WHERE m.id = ?`,
  selectByInsumo: `${baseSelect} WHERE m.insumo_id = ? ORDER BY m.fecha_hora DESC`,
  selectByUsuario: `${baseSelect} WHERE m.usuario_id = ? ORDER BY m.fecha_hora DESC`,
  insert: `
    INSERT INTO inventario_movimientos (
      insumo_id, tipo, cantidad, usuario_id, pedido_id, fecha_hora
    ) VALUES (?, ?, ?, ?, ?, ?)
  `,
  delete: `
    DELETE FROM inventario_movimientos
    WHERE id = ?
  `
});

// Formateador
function formatMovimiento(row) {
  return {
    id: row.id,
    insumo_id: row.insumo_id,
    tipo: row.tipo,
    cantidad: row.cantidad,
    fecha_hora: row.fecha_hora,
    usuario_id: row.usuario_id,
    pedido_id: row.pedido_id,
    insumo: {
      nombre: row.insumo_nombre,
      unidad: row.insumo_unidad
    },
    usuario: {
      nombre: row.usuario_nombre,
      apellido: row.usuario_apellido
    }
  };
}

export const InventarioMovimiento = {
  selectAll() {
    return db.prepare(sql.selectAll).all().map(formatMovimiento);
  },

  findById(id) {
    const row = db.prepare(sql.selectById).get(id);
    return row ? formatMovimiento(row) : null;
  },

  findByInsumo(insumo_id) {
    return db.prepare(sql.selectByInsumo).all(insumo_id).map(formatMovimiento);
  },

  findByUsuario(usuario_id) {
    return db.prepare(sql.selectByUsuario).all(usuario_id).map(formatMovimiento);
  },

  create({ insumo_id, tipo, cantidad, usuario_id, pedido_id = null }) {
    const fecha_hora = DateFormatter.toLocalSQLDatetime()
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      insumo_id,
      tipo,
      cantidad,
      usuario_id,
      pedido_id,
      fecha_hora
    );
    return this.findById(lastInsertRowid);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
