import { connection } from '../connection.js';
const db = connection();

// JOIN enriquecido para mostrar nombres descriptivos
const baseSelect = `
  SELECT 
    c.id,
    c.pedido_id,
    c.tipo_id,
    tc.nombre AS tipo_nombre,
    tc.serie_letras_iniciales AS tipo_serie,
    c.serie,
    c.numero,
    c.fecha_hora_emision,
    c.observaciones,
    c.xml_base64,
    c.metodo_pago_id,
    mp.nombre AS metodo_pago_nombre,
    c.estado_id,
    ec.nombre AS estado_nombre,
    ec.descripcion AS estado_descripcion,
    c.sede_id
  FROM comprobantes c
  JOIN tipos_comprobantes tc ON c.tipo_id = tc.id
  JOIN metodos_pago mp ON c.metodo_pago_id = mp.id
  JOIN estados_comprobantes ec ON c.estado_id = ec.id
`;

const sql = Object.freeze({
  selectAll: `${baseSelect} ORDER BY c.fecha_hora_emision DESC`,
  selectById: `${baseSelect} WHERE c.id = ?`,
  selectByPedido: `${baseSelect} WHERE c.pedido_id = ?`,
  insert: `
    INSERT INTO comprobantes (
      pedido_id, tipo_id, serie, numero,
      observaciones, xml_base64,
      metodo_pago_id, estado_id, sede_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
  updateEstado: `
    UPDATE comprobantes 
    SET estado_id = ? 
    WHERE id = ?
  `,
  updateXML: `
    UPDATE comprobantes
    SET xml_base64 = ?
    WHERE id = ?
  `,
  delete: `
    DELETE FROM comprobantes 
    WHERE id = ?
  `,
});

// Formateador estructurado
function formatComprobante(row) {
  return {
    id: row.id,
    pedido_id: row.pedido_id,
    tipo: {
      id: row.tipo_id,
      nombre: row.tipo_nombre,
      serie_letras_iniciales: row.tipo_serie
    },
    serie: row.serie,
    numero: row.numero,
    fecha_hora_emision: row.fecha_hora_emision,
    observaciones: row.observaciones,
    xml_base64: row.xml_base64,
    metodo_pago: {
      id: row.metodo_pago_id,
      nombre: row.metodo_pago_nombre
    },
    estado: {
      id: row.estado_id,
      nombre: row.estado_nombre,
      descripcion: row.estado_descripcion
    },
    sede_id: row.sede_id
  };
}

export const Comprobante = {
  selectAll() {
    return db.prepare(sql.selectAll).all().map(formatComprobante);
  },

  findById(id) {
    const row = db.prepare(sql.selectById).get(id);
    return row ? formatComprobante(row) : null;
  },

  findByPedidoId(pedido_id) {
    const row = db.prepare(sql.selectByPedido).get(pedido_id);
    return row ? formatComprobante(row) : null;
  },

  create({
    pedido_id,
    tipo_id,
    serie,
    numero,
    observaciones = null,
    xml_base64 = null,
    metodo_pago_id,
    estado_id,
    sede_id
  }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      pedido_id,
      tipo_id,
      serie,
      numero,
      observaciones,
      xml_base64,
      metodo_pago_id,
      estado_id,
      sede_id
    );
    return this.findById(lastInsertRowid);
  },

  updateEstado(id, estado_id) {
    db.prepare(sql.updateEstado).run(estado_id, id);
    return this.findById(id);
  },

  updateXML(id, xml_base64) {
    db.prepare(sql.updateXML).run(xml_base64, id);
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
