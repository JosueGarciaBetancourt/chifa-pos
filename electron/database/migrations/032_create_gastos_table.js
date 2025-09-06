export function up(db) {
  console.log('[MIGRACION] creando tabla gastos...');

  db.prepare(`
    CREATE TABLE gastos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tipo_gasto_id INTEGER NOT NULL REFERENCES tipos_gastos(id),
      usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
      proveedor_id INTEGER REFERENCES proveedores(id),
      monto REAL NOT NULL,
      metodo_pago_id INTEGER NOT NULL REFERENCES metodos_pago(id),
      observaciones TEXT,
      fecha_hora DATETIME NOT NULL
    );
  `).run();
}
