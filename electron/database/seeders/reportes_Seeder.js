export function seed(db) {
	console.log('[SEEDER] Insertando reportes...');
  
	const stmt = db.prepare(`
	  INSERT INTO reportes (
		id,
		tipo_id,
		usuario_id,
		sede_id,
		titulo,
		descripcion,
		parametros_json,
		ruta_archivo,
		formato_archivo,
		generado_en
	  )
	  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`);
  
	const reportes = [
	  [
		1,
		1, // tipo_id: ventas
		1, // usuario_id: admin
		1, // sede_id
		'Ventas del día',
		'Resumen de ventas emitidas en el día',
		JSON.stringify({ fecha: '2025-07-25', tipo_comprobante: ['boleta', 'factura'] }),
		'reportes/ventas_dia_2025-07-25.pdf',
		'pdf',
		'2025-07-25 18:00:00'
	  ],
	  [
		2,
		3, // tipo_id: caja
		3, // usuario_id: Carlos (cajero)
		1,
		'Cierre de caja',
		'Cierre de caja para el turno de mañana',
		JSON.stringify({ jornada_laboral_id: 10 }),
		'reportes/cierre_caja_2025-07-25.pdf',
		'pdf',
		'2025-07-25 13:45:00'
	  ],
	  [
		3,
		2, // tipo_id: inventario
		4, // usuario_id: Luisa (supervisora)
		1,
		'Stock mínimo de insumos',
		'Insumos que requieren reposición inmediata',
		JSON.stringify({ stock_minimo: true }),
		'reportes/stock_minimo_2025-07-25.xlsx',
		'xlsx',
		'2025-07-25 19:30:00'
	  ]
	];
  
	const insertMany = db.transaction((reportes) => {
	  for (const r of reportes) stmt.run(r);
	});
  
	insertMany(reportes);
	console.log(`[SEEDER] ${reportes.length} reportes insertados`);
  }
  