import { connection } from '../connection.js';
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
  insert: `
    INSERT INTO pedidos (
      cliente_id, usuario_id, mesa_id, tipo_id, estado_id,
      fecha_hora, direccion_entrega, subTotal, igv, total,
      observaciones_generales, cotizacion_id, sede_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
  updateEstado: `
    UPDATE pedidos 
    SET estado_id = ?
    WHERE id = ?
  `,
  delete: `
    DELETE FROM pedidos 
    WHERE id = ?
  `
});

// Formateador
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

  /**
   * Crear un pedido
   */
  create({
    cliente_id = 1,
    usuario_id,
    mesa_id = null,
    tipo_id,
    estado_id,
    fecha_hora = new Date().toISOString(),
    direccion_entrega = null,
    subTotal,
    igv,
    total,
    observaciones_generales = null,
    cotizacion_id = null,
    sede_id
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

  /**
   * Actualiza el estado del pedido
   */
  updateEstado(id, estado_id) {
    db.prepare(sql.updateEstado).run(estado_id, id);
    return this.findById(id);
  },

  /**
   * Elimina un pedido por ID
   */
  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
