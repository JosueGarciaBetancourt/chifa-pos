export function seed(db) {
	console.log('[SEEDER] Insertando insumos_proveedores...');
	
	const stmt = db.prepare(`
	  INSERT INTO insumos_proveedores (id, insumo_id, proveedor_id, observaciones)
	  VALUES (?, ?, ?, ?)
	`);

	const insumos_proveedores = [
	  // Granos
	  [1, 1, 1, 'Proveedor habitual de arroz'],
	  [2, 1, 2, 'Precio más bajo en cantidades grandes'],
	  [3, 3, 2, 'Fideos al por mayor'],
	  [4, 33, 2, 'Wantán de buena calidad'],
	  [5, 34, 8, 'Fideos chinos importados'],
	  [6, 35, 8, 'Proveedor exclusivo de sahofán'],

	  // Carnes y proteínas
	  [7, 2, 4, 'Pollo fresco todas las semanas'],
	  [8, 4, 4, 'Carne de res de alta calidad'],
	  [9, 5, 4, 'Cortes de cerdo nacionales'],
	  [10, 6, 7, 'Camarones importados'],
	  [11, 7, 4, 'Huevos frescos cada dos días'],

	  // Bebidas
	  [12, 8, 1, 'Proveedor de bebidas Inca Kola'],
	  [13, 9, 1, 'Distribución directa de Coca Cola'],
	  [14, 10, 1, 'Agua embotellada nacional'],

	  // Condimentos
	  [15, 13, 8, 'Ajo fresco importado'],
	  [16, 14, 8, 'Jengibre en buenas condiciones'],
	  [17, 18, 2, 'Sal a granel'],
	  [18, 19, 8, 'Pimienta molida en grandes cantidades'],
	  [19, 32, 8, 'Especias exóticas'],
	  [20, 41, 8, 'Polvo importado de 5 sabores'],

	  // Vegetales
	  [21, 11, 5, 'Aji amarillo fresco'],
	  [22, 12, 5, 'Verduras frescas todos los días'],
	  [23, 20, 5, 'Suministro de brotes de soya'],
	  [24, 21, 5, 'Proveedor confiable de cebolla china'],
	  [25, 22, 5, 'Tomates de estación'],
	  [26, 23, 5, 'Zanahorias nacionales'],
	  [27, 24, 5, 'Vainitas frescas'],
	  [28, 25, 5, 'Champiñones seleccionados'],
	  [29, 27, 5, 'Espárragos peruanos'],
	  [30, 36, 8, 'Hongos chinos importados'],
	  [31, 38, 5, 'Espinaca fresca'],
	  [32, 40, 5, 'Nabo encurtido'],

	  // Salsas y líquidos
	  [33, 15, 8, 'Sillao clásico'],
	  [34, 16, 8, 'Aceite para cocina a buen precio'],
	  [35, 17, 8, null],

	  // Frutas
	  [36, 26, 5, 'Piñas frescas'],
	  [37, 30, 5, 'Duraznos de temporada'],
	  [38, 31, 5, 'Tamarindo para jugos'],
	  [39, 37, 8, 'Lychee importado de Asia'],
	  [40, 39, 5, 'Frutas mixtas para jugos'],

	  // Frutos secos y semillas
	  [41, 28, 8, 'Castañas amazónicas'],
	  [42, 29, 8, 'Castañas de cajú para cocina oriental']
	];

	const insertMany = db.transaction((rows) => {
	  for (const ip of rows) stmt.run(ip);
	});

	insertMany(insumos_proveedores);
	console.log(`[SEEDER] ${insumos_proveedores.length} insumos_proveedores insertados`);
}
