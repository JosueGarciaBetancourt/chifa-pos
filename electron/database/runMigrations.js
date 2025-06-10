import fs from 'fs';
import path from 'path';

export async function runMigrations(db) {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      run_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  const migrationsDir = path.join(import.meta.dirname, 'migrations');
  const files = fs.readdirSync(migrationsDir).sort();

  const appliedMigrations = db.prepare(`SELECT name FROM migrations`).all()
    .map(row => row.name);

  for (const file of files) {
    if (appliedMigrations.includes(file)) continue;

    const { up } = await import(`./migrations/${file}`);
    up(db);

    db.prepare(`INSERT INTO migrations (name) VALUES (?)`).run(file);

    console.log(`- Migración ${file} aplicada.`);
  }
}
