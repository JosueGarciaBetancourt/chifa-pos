export function seed(db) {
  console.log('[SEEDER] Insertando tipos_notificaciones...');

  // Preparar la sentencia para insertar
  const stmt = db.prepare(`
    INSERT INTO tipos_notificaciones (id, nombre)
    VALUES (?, ?)
  `);

  // Lista de tipos de notificación
  const tipos = [
    [1, 'informacion'],  // Notificaciones informativas o generales
    [2, 'alerta'],       // Notificaciones que requieren atención inmediata
    [3, 'error']         // Notificaciones de fallos del sistema o procesos
  ];

  // Ejecutar inserción en transacción
  const insertMany = db.transaction((tipos) => {
    for (const tipo of tipos) {
      stmt.run(tipo);
    }
  });

  insertMany(tipos);
  console.log(`[SEEDER] ${tipos.length} tipos_notificaciones insertados`);
}
