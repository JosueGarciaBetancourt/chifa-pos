export function seedProductos(db) {
	const productos = [
		['Arroz Chaufa Especial', 'Arroz frito con pollo, cerdo y langostinos', 22.50, 'platos_principales'],
		['Taypa', 'Salteado de carnes mixtas con verduras', 26.00, 'platos_principales'],
		// puedes seguir agregando aquí
	];

	const insert = db.prepare(`
		INSERT INTO productos (nombre, descripcion, precio, categoria)
		VALUES (?, ?, ?, ?)
	`);

	const insertMany = db.transaction((items) => {
		for (const p of items) {
		insert.run(p);
		}
	});

	insertMany(productos);
}
  