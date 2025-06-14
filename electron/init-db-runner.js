import { app } from 'electron';
import { initDatabase } from './database/initDatabase.js';

app.whenReady().then(() => {
  initDatabase(true);
  app.quit();
});
