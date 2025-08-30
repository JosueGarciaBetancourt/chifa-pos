export function seed(db) {
	console.log('[SEEDER] Insertando insumos_proveedores...');
	
	const stmt = db.prepare(`
	  INSERT INTO insumos_proveedores (id, insumo_id, proveedor_id, costo_unitario_pactado, observaciones)
	  VALUES (?, ?, ?, ?, ?)
	`);

	const insumos_proveedores = [
		// Granos
		[1, 1, 1, 4.20, 'Proveedor habitual de arroz (kg)'],
		[2, 1, 2, 4.00, 'Precio más bajo en cantidades grandes (kg)'],
		[3, 3, 2, 5.50, 'Fideos al por mayor (kg)'],
		[4, 33, 2, 0.25, 'Wantán de buena calidad (unidad)'],
		[5, 34, 8, 12.00, 'Fideos chinos importados (kg)'],
		[6, 35, 8, 14.00, 'Proveedor exclusivo de sahofán (kg)'],

		// Carnes y proteínas
		[7, 2, 4, 9.80, 'Pollo fresco todas las semanas (kg)'],
		[8, 4, 4, 28.00, 'Carne de res de alta calidad (kg)'],
		[9, 5, 4, 18.00, 'Cortes de cerdo nacionales (kg)'],
		[10, 6, 7, 35.00, 'Camarones importados (kg)'],
		[11, 7, 4, 0.45, 'Huevos frescos cada dos días (unidad)'],

		// Bebidas
		[12, 8, 1, 0.02, 'Proveedor de jarabe (ml)'],
		[13, 9, 1, 0.03, 'Distribución directa de pulpa de maracuyá (ml)'],
		[14, 10, 1, 0.10, 'Hojas de hierbaluisa (g)'],

		// Condimentos
		[15, 13, 8, 7.00, 'Ajo fresco importado (kg)'],
		[16, 14, 8, 9.00, 'Jengibre en buenas condiciones (kg)'],
		[17, 18, 2, 1.50, 'Sal a granel (kg)'],
		[18, 19, 8, 0.05, 'Pimienta molida en grandes cantidades (g)'],
		[19, 32, 8, 0.08, 'Especias exóticas (g)'],
		[20, 41, 8, 0.10, 'Polvo importado de 5 sabores (g)'],

		// Vegetales
		[21, 11, 5, 6.00, 'Ají amarillo fresco (kg)'],
		[22, 12, 5, 3.50, 'Verduras frescas todos los días (kg)'],
		[23, 20, 5, 5.00, 'Suministro de brotes de soya (kg)'],
		[24, 21, 5, 4.50, 'Proveedor confiable de cebolla china (kg)'],
		[25, 22, 5, 4.00, 'Tomates de estación (kg)'],
		[26, 23, 5, 2.80, 'Zanahorias nacionales (kg)'],
		[27, 24, 5, 6.50, 'Vainitas frescas (kg)'],
		[28, 25, 5, 12.00, 'Champiñones seleccionados (kg)'],
		[29, 27, 5, 15.00, 'Espárragos peruanos (kg)'],
		[30, 36, 8, 20.00, 'Hongos chinos importados (kg)'],
		[31, 38, 5, 6.50, 'Espinaca fresca (kg)'],
		[32, 40, 5, 8.00, 'Nabo encurtido (kg)'],

		// Salsas y líquidos
		[33, 15, 8, 9.00, 'Sillao clásico (l)'],
		[34, 16, 8, 8.50, 'Aceite para cocina a buen precio (l)'],
		[35, 17, 8, 7.00, 'Vinagre importado (l)'],

		// Frutas
		[36, 26, 5, 5.00, 'Piñas frescas (kg)'],
		[37, 30, 5, 6.50, 'Duraznos de temporada (kg)'],
		[38, 31, 5, 7.00, 'Tamarindo para jugos (kg)'],
		[39, 37, 8, 25.00, 'Lychee importado de Asia (kg)'],
		[40, 39, 5, 9.00, 'Frutas mixtas para jugos (kg)'],

		// Frutos secos y semillas
		[41, 28, 8, 18.00, 'Castañas amazónicas (kg)'],
		[42, 29, 8, 20.00, 'Castañas de cajú para cocina oriental (kg)'],
	];

	const insertMany = db.transaction((rows) => {
	  for (const ip of rows) stmt.run(ip);
	});

	insertMany(insumos_proveedores);
	console.log(`[SEEDER] ${insumos_proveedores.length} insumos_proveedores insertados`);
}
