import { app as electronApp, BrowserWindow } from "electron";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { initDatabase } from "./database/initDatabase.js";
import { connection } from "./database/connection.js";
import { productosHandlers } from "./handlers/productos.js";
import { insumosHandlers } from "./handlers/insumos.js";
import { tiposInsumosHandlers } from "./handlers/tiposInsumos.js";

import { app as expressApp, server } from "../backend/src/app.js"; // renombrado para no colisionar

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainWindow;
let db;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (process.env.FRONTEND_URL && process.env.NODE_ENV === "development") {
    mainWindow.loadURL(process.env.FRONTEND_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

electronApp.whenReady().then(async () => {
  try {
    await initDatabase();
    db = connection();
    productosHandlers(db);
    insumosHandlers(db);
    tiposInsumosHandlers(db);

    const URL = expressApp.get("url") || "http://localhost";
    const PORT = expressApp.get("port") || 4000;
    server.listen(PORT, "0.0.0.0", () => {
      console.log(`- API REST (Express) ${URL}:${PORT}/api`);
    });

    createWindow();
  } catch (error) {
    console.error("Error durante el arranque:", error);
  }
});

function closeGracefully() {
  console.log("\n- Cerrando servidor…");
  server?.close(() => {
    console.log("- Servidor cerrado correctamente");
    electronApp.quit();
  });
}

process.on("SIGINT", closeGracefully);
process.on("SIGTERM", closeGracefully);

electronApp.on("window-all-closed", () => {
  if (process.platform !== "darwin") closeGracefully();
});

electronApp.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
