import { connection } from '../connection.js';
import { DateFormatter } from '../utils/dateFormatter.js';

const db = connection();

// SELECT base enriquecido
const baseSelect = `
  SELECT 
    p.id,
    p.cliente_id,
    c.nombre AS cliente_nombre,
    c.apellido AS cliente_apellido,
    p.usuario_id,
    u.nombre AS usuario_nombre,
    p.mesa_id,
    m.numero AS mesa_numero,
    p.tipo_id,
    tp.nombre AS tipo_nombre,
    p.estado_id,
    ep.nombre AS estado_nombre,
    p.fecha_hora,
    p.direccion_entrega,
    p.subTotal,
    p.igv,
    p.total,
    p.observaciones_generales,
    p.cotizacion_id,
    p.sede_id,
    s.nombre AS sede_nombre
  FROM pedidos p
  JOIN clientes c ON c.id = p.cliente_id
  JOIN usuarios u ON u.id = p.usuario_id
  JOIN tipos_pedidos tp ON tp.id = p.tipo_id
  JOIN estados_pedidos ep ON ep.id = p.estado_id
  JOIN sede_local s ON s.id = p.sede_id
  LEFT JOIN mesas m ON m.id = p.mesa_id
`;

const sql = Object.freeze({
  selectAll: `${baseSelect} ORDER BY p.fecha_hora DESC`,
  selectById: `${baseSelect} WHERE p.id = ?`,
  selectBySede: `${baseSelect} WHERE p.sede_id = ? ORDER BY p.fecha_hora DESC`,
  selectByFecha: `${baseSelect} WHERE date(p.fecha_hora) BETWEEN date(?) AND date(?) ORDER BY p.fecha_hora DESC`,
  selectByCliente: `${baseSelect} WHERE p.cliente_id = ? ORDER BY p.fecha_hora DESC`,
  selectByUsuario: `${baseSelect} WHERE p.usuario_id = ? ORDER BY p.fecha_hora DESC`,
  selectByMesa: `${baseSelect} WHERE p.mesa_id = ? ORDER BY p.fecha_hora DESC`,
  selectByEstado: `${baseSelect} WHERE p.estado_id = ? ORDER BY p.fecha_hora DESC`,
  selectByTipo: `${baseSelect} WHERE p.tipo_id = ? ORDER BY p.fecha_hora DESC`,
  selectByCotizacionId: `${baseSelect} WHERE p.cotizacion_id = ?`,
  insert: `
    INSERT INTO pedidos (
      cliente_id, usuario_id, mesa_id, tipo_id, estado_id,
      fecha_hora, direccion_entrega, subTotal, igv, total,
      observaciones_generales, cotizacion_id, sede_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
  updateEstado: `UPDATE pedidos SET estado_id = ? WHERE id = ?`,
  updatePedido: `
    UPDATE pedidos
    SET cliente_id = ?, usuario_id = ?, mesa_id = ?, tipo_id = ?, estado_id = ?,
        fecha_hora = ?, direccion_entrega = ?, subTotal = ?, igv = ?, total = ?,
        observaciones_generales = ?, cotizacion_id = ?, sede_id = ?
    WHERE id = ?
  `,
  delete: `DELETE FROM pedidos WHERE id = ?`
});

// Formateador de resultados
function formatPedido(row) {
  return {
    id: row.id,
    fecha_hora: row.fecha_hora,
    subTotal: row.subTotal,
    igv: row.igv,
    total: row.total,
    direccion_entrega: row.direccion_entrega,
    observaciones_generales: row.observaciones_generales,
    cotizacion_id: row.cotizacion_id,
    cliente: {
      id: row.cliente_id,
      nombre: row.cliente_nombre,
      apellido: row.cliente_apellido
    },
    usuario: {
      id: row.usuario_id,
      nombre: row.usuario_nombre
    },
    mesa: row.mesa_id ? {
      id: row.mesa_id,
      numero: row.mesa_numero
    } : null,
    tipo: {
      id: row.tipo_id,
      nombre: row.tipo_nombre
    },
    estado: {
      id: row.estado_id,
      nombre: row.estado_nombre
    },
    sede: {
      id: row.sede_id,
      nombre: row.sede_nombre
    }
  };
}

export const Pedido = {
  selectAll() {
    return db.prepare(sql.selectAll).all().map(formatPedido);
  },

  findById(id) {
    const row = db.prepare(sql.selectById).get(id);
    return row ? formatPedido(row) : null;
  },

  findBySede(sede_id) {
    return db.prepare(sql.selectBySede).all(sede_id).map(formatPedido);
  },

  findByFecha(fechaInicio, fechaFin) {
    return db.prepare(sql.selectByFecha).all(fechaInicio, fechaFin).map(formatPedido);
  },

  findByCliente(cliente_id) {
    return db.prepare(sql.selectByCliente).all(cliente_id).map(formatPedido);
  },

  findByUsuario(usuario_id) {
    return db.prepare(sql.selectByUsuario).all(usuario_id).map(formatPedido);
  },

  findByMesa(mesa_id) {
    return db.prepare(sql.selectByMesa).all(mesa_id).map(formatPedido);
  },

  findByEstado(estado_id) {
    return db.prepare(sql.selectByEstado).all(estado_id).map(formatPedido);
  },

  findByTipo(tipo_id) {
    return db.prepare(sql.selectByTipo).all(tipo_id).map(formatPedido);
  },

  findByCotizacionId(cotizacion_id) {
    const row = db.prepare(sql.selectByCotizacionId).get(cotizacion_id);
    return row ? formatPedido(row) : null;
  },

  create({
    cliente_id = 1,
    usuario_id,
    mesa_id = null,
    tipo_id,
    estado_id = 1, // pendiente
    fecha_hora = DateFormatter.toLocalSQLDatetime(),
    direccion_entrega = null,
    subTotal,
    igv,
    total,
    observaciones_generales = null,
    cotizacion_id = null,
    sede_id = 1
  }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      cliente_id,
      usuario_id,
      mesa_id,
      tipo_id,
      estado_id,
      fecha_hora,
      direccion_entrega,
      subTotal,
      igv,
      total,
      observaciones_generales,
      cotizacion_id,
      sede_id
    );
    return this.findById(lastInsertRowid);
  },

  updateEstado(id, estado_id) {
    db.prepare(sql.updateEstado).run(estado_id, id);
    return this.findById(id);
  },

  updatePedido(id, data) {
    const keys = Object.keys(data);
    if (keys.length === 0) return this.findById(id); // nada que actualizar
  
    const setClause = keys.map(k => `${k} = ?`).join(", ");
    const values = keys.map(k => data[k]);
  
    const stmt = db.prepare(`UPDATE pedidos SET ${setClause} WHERE id = ?`);
    stmt.run(...values, id);
  
    return this.findById(id);
  }
};
