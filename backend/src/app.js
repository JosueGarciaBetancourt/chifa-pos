// backend/src/app.js
import "dotenv/config.js";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import routes from "./routes/index.js";
import loggerMiddleware from "./logger.js";

// Express App
const app = express();

// HTTP Server y Socket.IO
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// Configuración del servidor
const PORT = process.env.API_PORT || 4000;
const URL = process.env.API_URL || "http://localhost";
app.set("url", URL);
app.set("port", PORT);

// Middlewares
app.use(loggerMiddleware);
app.use(cors());
app.use(express.json());

// Rutas API
routes.forEach(({ path, router }) => app.use(path, router));

// Socket.IO
io.on("connection", (socket) => {
  console.log("- Cliente conectado:", socket.id);
  
  socket.on("nuevo-pedido", (pedido) => {
    console.log("- Pedido recibido:", pedido);
    io.emit("pedido-nuevo", pedido);
  });

  socket.on("estadoPedidoActualizado", (pedidoActualizado) => {
    console.log("- Estado actualizado:", pedidoActualizado);
    io.emit("estadoPedidoActualizado", pedidoActualizado);
  });

  socket.on("disconnect", () => {
    console.log("- Cliente desconectado:", socket.id);
  });
});

export { app, server, io };
