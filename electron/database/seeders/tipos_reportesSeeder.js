export function seed(db) {
	console.log('[SEEDER] Insertando tipos_reportes...');
  
	const stmt = db.prepare(`
	  INSERT INTO tipos_reportes (id, nombre, descripcion)
	  VALUES (?, ?, ?)
	`);
  
	const tipos_reportes = [
	  [1, 'ventas', 'Reportes relacionados a ventas y facturación'],
	  [2, 'inventario', 'Reportes de stock, movimientos e insumos'],
	  [3, 'caja', 'Reportes de aperturas, cierres y movimientos de caja'],
	  [4, 'cocina', 'Reportes sobre tiempos y rendimiento de cocina'],
	  [5, 'clientes', 'Reportes de actividad, reservas y consumo de clientes']
	];
  
	const insertMany = db.transaction((tipos_reportes) => {
	  for (const tr of tipos_reportes) stmt.run(tr);
	});
  
	insertMany(tipos_reportes);
	console.log(`[SEEDER] ${tipos_reportes.length} tipos_reportes insertados`);
  }
  