export function seed(db) {
    console.log('[SEEDER] Insertando dispositivos...');
    
    const stmt = db.prepare(`
      INSERT INTO dispositivos (nombre, mac_address, ip_address, tipo, ultima_conexion)
      VALUES (?, ?, ?, ?, ?)
    `);
  
    const ahora = new Date().toISOString();
    
    const dispositivos = [
      ['Caja Principal', '00:1B:44:11:3A:B7', '192.168.1.10', 'caja', ahora],
      ['Cocina Principal', '00:1B:44:11:3A:B8', '192.168.1.11', 'cocina', ahora],
      ['Tablet Mozo 1', '00:1B:44:11:3A:B9', '192.168.1.12', 'tablet_mozo', ahora],
      ['Tablet Mozo 2', '00:1B:44:11:3A:C0', '192.168.1.13', 'tablet_mozo', null],
      ['Caja Delivery', '00:1B:44:11:3A:C1', '192.168.1.14', 'caja', null],
      ['Cocina Postres', '00:1B:44:11:3A:C2', '192.168.1.15', 'cocina', ahora],
      ['Tablet Supervisor', '00:1B:44:11:3A:C3', '192.168.1.16', 'tablet_mozo', ahora],
      ['Caja Reservas', '00:1B:44:11:3A:C4', '192.168.1.17', 'caja', null],
      ['Tablet Gerencia', '00:1B:44:11:3A:C5', '192.168.1.18', 'tablet_mozo', ahora],
      ['Impresora Cocina', '00:1B:44:11:3A:C6', '192.168.1.19', 'cocina', ahora]
    ];
  
    const insertMany = db.transaction((dispositivos) => {
      for (const d of dispositivos) stmt.run(d);
    });
  
    insertMany(dispositivos);
    console.log('[SEEDER] 10 dispositivos insertados');
  }