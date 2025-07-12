export function seed(db) {
	console.log('[SEEDER] Insertando jornadas_laborales...');
  
	const stmt = db.prepare(`
	  INSERT INTO jornadas_laborales (id, usuario_id, sede_id, fecha_inicio, fecha_fin, estado)
	  VALUES (?, ?, ?, ?, ?, ?)
	`);
  
	const jornadas = [
	  [1, 1, 1, '2024-07-01 08:00:00', '2024-07-01 18:00:00', 'finalizada'],
	  [2, 3, 1, '2024-07-02 08:00:00', '2024-07-02 18:00:00', 'finalizada'],
	  [3, 4, 1, '2024-07-03 09:00:00', null, 'iniciada'],
	  [4, 5, 1, '2024-07-03 09:00:00', null, 'iniciada'],
	  [5, 2, 1, '2024-07-02 14:00:00', '2024-07-02 22:00:00', 'finalizada']
	];
  
	const insertMany = db.transaction((jornadas) => {
	  for (const j of jornadas) stmt.run(j);
	});
  
	insertMany(jornadas);
	console.log(`[SEEDER] ${jornadas.length} jornadas_laborales insertadas`);
  }
  