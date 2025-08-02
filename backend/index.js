import 'dotenv/config.js';
import { app, server } from "./app.js";

const PORT = app.get("port");
const URL = app.get("url");

server.listen(PORT, "0.0.0.0", () => {
  console.log(`\n✅ API REST escuchando en ${URL}:${PORT}/api`);
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