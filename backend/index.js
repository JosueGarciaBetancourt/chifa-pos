/* // backend/index.js
import 'dotenv/config.js';
import http from 'http';
import app from './src/app.js';

const URL = app.get('url');
const PORT = app.get('port');

const server = http.createServer(app);

// Arrancar servidor
server.listen(PORT, () => {
  console.log(`- API REST escuchando en ${URL}:${PORT}`);
});

// Cierre limpio
process.on('SIGINT', closeGracefully);
process.on('SIGTERM', closeGracefully);

function closeGracefully() {
  console.log('-Cerrando servidor...');
  server.close(() => {
    console.log('Servidor cerrado correctamente');
    process.exit(0);
  });
}

 */