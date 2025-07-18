import { connection } from '../connection.js';
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

const sql = Object.freeze({
  selectAll: `${baseSelect} ORDER BY fecha_hora DESC`,
  selectById: `${baseSelect} WHERE id = ?`,
  selectByCliente: `${baseSelect} WHERE cliente_id = ? ORDER BY fecha_hora DESC`,
  selectByUsuario: `${baseSelect} WHERE usuario_id = ? ORDER BY fecha_hora DESC`,
  insert: `
    INSERT INTO cotizaciones (
      cliente_id, usuario_id, fecha_hora, validez_dias, estado, total
    ) VALUES (?, ?, ?, ?, ?, ?)
  `,
  update: `
    UPDATE cotizaciones 
    SET cliente_id = ?, usuario_id = ?, fecha_hora = ?, validez_dias = ?, estado = ?, total = ?
    WHERE id = ?
  `,
  delete: `
    DELETE FROM cotizaciones 
    WHERE id = ?
  `,
});

// Transformar resultado
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

  create({ cliente_id, usuario_id, fecha_hora = new Date().toISOString(), validez_dias, estado = 'activa', total }) {
    if (!['activa', 'vencida', 'convertida'].includes(estado)) {
      throw new Error('Estado de cotización inválido');
    }

    const { lastInsertRowid } = db.prepare(sql.insert).run(
      cliente_id, usuario_id, fecha_hora, validez_dias, estado, total
    );

    return this.findById(lastInsertRowid);
  },

  update(id, { cliente_id, usuario_id, fecha_hora, validez_dias, estado, total }) {
    if (!['activa', 'vencida', 'convertida'].includes(estado)) {
      throw new Error('Estado de cotización inválido');
    }

    db.prepare(sql.update).run(
      cliente_id, usuario_id, fecha_hora, validez_dias, estado, total, id
    );

    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
