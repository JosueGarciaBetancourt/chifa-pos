import { app } from 'electron';
import { initDatabase } from './init-db.js';

app.whenReady().then(() => {
  initDatabase();
  app.quit();
});
