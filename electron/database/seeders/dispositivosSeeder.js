import { DateFormatter } from "../utils/dateFormatter.js";

export function seed(db) {
  console.log('[SEEDER] Insertando dispositivos...');

  const stmt = db.prepare(`
    INSERT INTO dispositivos (
      id, nombre, mac_address, ip_address, tipo_hardware, rol_funcional, ultima_conexion, usuario_id, activo
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const ahora = DateFormatter.toLocalSQLDatetime();

  const dispositivos = [
    [1, 'Caja Principal',   '00:1B:44:11:3A:B7', '192.168.1.10', 'pc',        'caja',   ahora, 3, 1], // Carlos (cajero)
    [2, 'Cocina Principal', '00:1B:44:11:3A:B8', '192.168.1.11', 'pc',        'cocina', ahora, 7, 1], // Pedro (cocinero)
    [3, 'Tablet Mozo 1',    '00:1B:44:11:3A:B9', '192.168.1.12', 'tablet',    'mozo',   ahora, 2, 1], // Mario (mozo)
    [4, 'Tablet Mozo 2',    '00:1B:44:11:3A:C0', '192.168.1.13', 'tablet',    'mozo',   null,  5, 1], // Jorge (mozo)
    [5, 'Caja Delivery',    '00:1B:44:11:3A:C1', '192.168.1.14', 'pc',        'caja',   null,  3, 1], // Carlos (cajero)
    [6, 'Cocina Postres',   '00:1B:44:11:3A:C2', '192.168.1.15', 'pc',        'cocina', ahora, 8, 1], // Rosa (cocinero)
    [7, 'Tablet Supervisor','00:1B:44:11:3A:C3', '192.168.1.16', 'tablet',    'mozo',   ahora, 4, 1], // Luisa (supervisor)
    [8, 'Caja Reservas',    '00:1B:44:11:3A:C4', '192.168.1.17', 'pc',        'caja',   null,  3, 1], // Carlos (cajero)
    [9, 'Tablet Gerencia',  '00:1B:44:11:3A:C5', '192.168.1.18', 'tablet',    'mozo',   ahora, 1, 1], // Admin
    [10,'Impresora Cocina', '00:1B:44:11:3A:C6', '192.168.1.19', 'impresora', 'cocina', ahora, null,1] // Sin usuario
  ];

  const insertMany = db.transaction((dispositivos) => {
    for (const d of dispositivos) stmt.run(d);
  });

  insertMany(dispositivos);
  console.log(`[SEEDER] ${dispositivos.length} dispositivos insertados`);
}
