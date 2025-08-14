import { connection } from '../connection.js';
import { DateFormatter } from '../utils/dateFormatter.js';

const db = connection();

// SELECT enriquecido preparado para futura extensión (con joins si es necesario)
const baseSelect = `
  SELECT 
    id,
    cliente_id,
    usuario_id,
    fecha_hora,
    validez_dias,
    estado,
    total
  FROM cotizaciones
`;

const detailedSelect = `
  SELECT 
    c.id AS cotizacion_id,
    json_object(
      'id', cl.id,
      'nombre', cl.nombre
    ) AS cliente,

    json_object(
      'id', u.id,
      'nombre', u.nombre
    ) AS usuario,

    c.fecha_hora,
    c.validez_dias,
    c.estado,
    c.total,

    json_object(
      'id', p.id,
      'tipo', json_object(
        'id', tp.id,
        'nombre', tp.nombre
      ),
      'estado', json_object(
        'id', ep.id,
        'nombre', ep.nombre
      ),
      'fecha_hora', p.fecha_hora,
      'subTotal', p.subTotal,
      'igv', p.igv,
      'total', p.total,
      'observaciones_generales', p.observaciones_generales
    ) AS pedido,

    json_group_array(
      json_object(
        'detalle_pedido_id', dp.id,
        'producto', json_object(
          'id', pr.id,
          'codigo', pr.codigo,
          'nombre', pr.nombre
        ),
        'cantidad', dp.cantidad,
        'precio_unitario', dp.precio_unitario,
        'detalle_pedido_subtotal', dp.subtotal
      )
    ) AS detalles

  FROM cotizaciones c
    JOIN clientes cl ON c.cliente_id = cl.id
    JOIN usuarios u ON c.usuario_id = u.id
    JOIN pedidos p ON c.id = p.cotizacion_id
    JOIN estados_pedidos ep ON p.estado_id = ep.id
    JOIN tipos_pedidos tp ON p.tipo_id = tp.id
    JOIN detalles_pedidos dp ON p.id = dp.pedido_id
    JOIN productos pr ON dp.producto_id = pr.id
`;

const sql = Object.freeze({
  selectAll: `${baseSelect} ORDER BY fecha_hora DESC`,
  selectById: `${baseSelect} WHERE id = ?`,
  selectByCliente: `${baseSelect} WHERE cliente_id = ? ORDER BY fecha_hora DESC`,
  selectByUsuario: `${baseSelect} WHERE usuario_id = ? ORDER BY fecha_hora DESC`,
  selectDetailsById: `${detailedSelect} WHERE c.id = ? ORDER BY c.fecha_hora DESC`,
  insert: `
    INSERT INTO cotizaciones (
      cliente_id, usuario_id, fecha_hora, validez_dias, estado, total
    ) VALUES (?, ?, ?, ?, ?, ?)
  `,
  update: `
    UPDATE cotizaciones 
    SET cliente_id = ?, usuario_id = ?, validez_dias = ?, estado = ?, total = ?
    WHERE id = ?
  `,
  delete: `
    DELETE FROM cotizaciones 
    WHERE id = ?
  `,
});

function formatCotizacion(row) {
  return {
    id: row.id,
    cliente_id: row.cliente_id,
    usuario_id: row.usuario_id,
    fecha_hora: row.fecha_hora,
    validez_dias: row.validez_dias,
    estado: row.estado,
    total: row.total
  };
}

export const Cotizacion = {
  selectAll() {
    return db.prepare(sql.selectAll).all().map(formatCotizacion);
  },

  findById(id) {
    const row = db.prepare(sql.selectById).get(id);
    return row ? formatCotizacion(row) : null;
  },

  findByCliente(cliente_id) {
    return db.prepare(sql.selectByCliente).all(cliente_id).map(formatCotizacion);
  },

  findByUsuario(usuario_id) {
    return db.prepare(sql.selectByUsuario).all(usuario_id).map(formatCotizacion);
  },

  findDetailsById(id) {
    const rows = db.prepare(sql.selectDetailsById).all(id);
    return rows.map(row => ({
      ...row,
      cliente: JSON.parse(row.cliente),
      usuario: JSON.parse(row.usuario),
      pedido: JSON.parse(row.pedido),
      detalles: JSON.parse(row.detalles)
    }));
  },
  
  // UNA COTIZACIÓN SIEMPRE SE DEBE CREAR LUEGO DE UN PEDIDO, EL CAMPO TOTAL SE CALCULA AUTOMÁTICAMENTE DESDE EL PEDIDO
  create({ cliente_id, usuario_id, fecha_hora = DateFormatter.toLocalSQLDatetime(), validez_dias, estado = 'activa', total }) {
    if (!['activa', 'vencida', 'convertida'].includes(estado)) {
      throw new Error('Estado de cotización inválido');
    }

    const { lastInsertRowid } = db.prepare(sql.insert).run(
      cliente_id, usuario_id, fecha_hora, validez_dias, estado, total
    );

    return this.findById(lastInsertRowid);
  },

  update(id, { cliente_id, usuario_id, validez_dias, estado, total }) {
    if (!['activa', 'vencida', 'convertida'].includes(estado)) {
      throw new Error('Estado de cotización inválido');
    }

    db.prepare(sql.update).run(
      cliente_id, usuario_id, validez_dias, estado, total, id
    );

    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
