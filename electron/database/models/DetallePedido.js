import { connection } from '../connection.js';
import { Producto } from '../../../electron/database/models/Producto.js';

const db = connection();

// SELECT enriquecido con producto y estado
const baseSelect = `
  SELECT 
    d.id,
    d.pedido_id,
    d.producto_id,
    p.nombre AS producto_nombre,
    p.descripcion AS producto_descripcion,
    d.cantidad,
    d.precio_unitario,
    d.subtotal,
    d.estado_id,
    e.nombre AS estado_nombre,
    e.descripcion AS estado_descripcion,
    d.observaciones
  FROM detalles_pedidos d
  JOIN productos p ON p.id = d.producto_id
  JOIN estados_detalles_pedidos e ON e.id = d.estado_id
`;

const sql = Object.freeze({
  selectById: `${baseSelect} WHERE d.id = ?`,
  selectByPedido: `${baseSelect} WHERE d.pedido_id = ? ORDER BY d.id ASC`,
  insert: `
    INSERT INTO detalles_pedidos (
      pedido_id, producto_id, cantidad, precio_unitario, estado_id, observaciones
    ) VALUES (?, ?, ?, ?, ?, ?)
  `,
  updateEstado: `
    UPDATE detalles_pedidos 
    SET estado_id = ?
    WHERE id = ?
  `,
  update: `
    UPDATE detalles_pedidos 
    SET cantidad = ?, observaciones = ?
    WHERE id = ?
  `,
  delete: `
    DELETE FROM detalles_pedidos 
    WHERE id = ?
  `
});

// Formateador del resultado
function formatDetalle(row) {
  return {
    id: row.id,
    pedido_id: row.pedido_id,
    cantidad: row.cantidad,
    precio_unitario: row.precio_unitario,
    subtotal: row.subtotal,
    observaciones: row.observaciones,
    producto: {
      id: row.producto_id,
      nombre: row.producto_nombre,
      descripcion: row.producto_descripcion
    },
    estado: {
      id: row.estado_id,
      nombre: row.estado_nombre,
      descripcion: row.estado_descripcion
    }
  };
}

export const DetallePedido = {
  /**
   * Listar todos los detalles de un pedido
   */
  findByPedidoId(pedido_id) {
    return db.prepare(sql.selectByPedido).all(pedido_id).map(formatDetalle);
  },

  /**
   * Agregar un ítem a un pedido
   */
  create(pedido_id, { producto_id, cantidad, estado_id = 1, observaciones = null }) {
    const producto = Producto.findById(producto_id);
    const precio_unitario = producto.precio;

    const { lastInsertRowid } = db.prepare(sql.insert).run(
      pedido_id,
      producto_id,
      cantidad,
      precio_unitario,
      estado_id,
      observaciones
    );
    return this.findByPedidoId(pedido_id);
  },

  /**
   * Cambiar el estado de un ítem (ej: en cocina → listo)
   */
  updateEstado(id, estado_id) {
    db.prepare(sql.updateEstado).run(estado_id, id);
    return { id, estado_id };
  },

  update(id, { cantidad, observaciones = null }) {
    db.prepare(sql.update).run(cantidad, observaciones, id);
    const row = db.prepare(sql.selectById).get(id);
    return row ? formatDetalle(row) : null;
  },

  /**
   * Eliminar un ítem del pedido
   */
  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
