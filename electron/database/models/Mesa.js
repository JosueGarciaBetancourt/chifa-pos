import { connection } from '../connection.js';
const db = connection();

// SELECT enriquecido con estado y sede
const baseSelect = `
  SELECT 
    m.id,
    m.numero,
    m.capacidad,
    m.estado_mesa_id,
    e.nombre AS estado_nombre,
    e.descripcion AS estado_descripcion,
    m.sede_id,
    s.nombre AS sede_nombre,
    s.direccion AS sede_direccion
  FROM mesas m
  JOIN estados_mesas e ON e.id = m.estado_mesa_id
  JOIN sede_local s ON s.id = m.sede_id
`;

const sql = Object.freeze({
  selectAll: `${baseSelect} ORDER BY m.numero ASC`,
  selectById: `${baseSelect} WHERE m.id = ?`,
  selectBySede: `${baseSelect} WHERE m.sede_id = ? ORDER BY m.numero ASC`,
  selectByNumero: `${baseSelect} WHERE m.numero = ?`,
  insert: `
    INSERT INTO mesas (numero, capacidad, estado_mesa_id, sede_id)
    VALUES (?, ?, ?, ?)
  `,
  update: `
    UPDATE mesas 
    SET numero = ?, capacidad = ?, estado_mesa_id = ?, sede_id = ?
    WHERE id = ?
  `,
  delete: `
    DELETE FROM mesas WHERE id = ?
  `,
});

// Formateador
function formatMesa(row) {
  return {
    id: row.id,
    numero: row.numero,
    capacidad: row.capacidad,
    estado_mesa_id: row.estado_mesa_id,
    estado: {
      nombre: row.estado_nombre,
      descripcion: row.estado_descripcion
    },
    sede_id: row.sede_id,
    sede: {
      nombre: row.sede_nombre,
      direccion: row.sede_direccion
    }
  };
}

export const Mesa = {
  selectAll() {
    return db.prepare(sql.selectAll).all().map(formatMesa);
  },

  findById(id) {
    const row = db.prepare(sql.selectById).get(id);
    return row ? formatMesa(row) : null;
  },

  findBySede(sede_id) {
    return db.prepare(sql.selectBySede).all(sede_id).map(formatMesa);
  },

  findByNumero(numero) {
    const row = db.prepare(sql.selectByNumero).get(numero);
    return row ? formatMesa(row) : null;
  },

  create({ numero, capacidad, estado_mesa_id, sede_id }) {
    const existente = db.prepare(sql.selectByNumero).get(numero);
    if (existente) {
      throw new Error(`Ya existe una mesa con el número "${numero}".`);
    }

    const { lastInsertRowid } = db.prepare(sql.insert).run(
      numero, capacidad, estado_mesa_id, sede_id
    );

    return this.findById(lastInsertRowid);
  },

  update(id, { numero, capacidad, estado_mesa_id, sede_id }) {
    db.prepare(sql.update).run(
      numero, capacidad, estado_mesa_id, sede_id, id
    );
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
