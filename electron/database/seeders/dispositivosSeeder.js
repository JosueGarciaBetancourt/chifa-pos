export function seed(db) {
  console.log('[SEEDER] Insertando dispositivos...');

  const stmt = db.prepare(`
    INSERT INTO dispositivos (
      id, nombre, mac_address, ip_address, tipo, ultima_conexion
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const ahora = new Date().toISOString();

  const dispositivos = [
    [1, 'Caja Principal', '00:1B:44:11:3A:B7', '192.168.1.10', 'caja', ahora],
    [2, 'Cocina Principal', '00:1B:44:11:3A:B8', '192.168.1.11', 'cocina', ahora],
    [3, 'Tablet Mozo 1', '00:1B:44:11:3A:B9', '192.168.1.12', 'tablet_mozo', ahora],
    [4, 'Tablet Mozo 2', '00:1B:44:11:3A:C0', '192.168.1.13', 'tablet_mozo', null],
    [5, 'Caja Delivery', '00:1B:44:11:3A:C1', '192.168.1.14', 'caja', null],
    [6, 'Cocina Postres', '00:1B:44:11:3A:C2', '192.168.1.15', 'cocina', ahora],
    [7, 'Tablet Supervisor', '00:1B:44:11:3A:C3', '192.168.1.16', 'tablet_mozo', ahora],
    [8, 'Caja Reservas', '00:1B:44:11:3A:C4', '192.168.1.17', 'caja', null],
    [9, 'Tablet Gerencia', '00:1B:44:11:3A:C5', '192.168.1.18', 'tablet_mozo', ahora],
    [10, 'Impresora Cocina', '00:1B:44:11:3A:C6', '192.168.1.19', 'cocina', ahora]
  ];

  const insertMany = db.transaction((dispositivos) => {
    for (const d of dispositivos) stmt.run(d);
  });

  insertMany(dispositivos);
  console.log(`[SEEDER] ${dispositivos.length} dispositivos insertados`);
}
