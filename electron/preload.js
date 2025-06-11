const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getProductosByCategoria: (categoria) =>
    ipcRenderer.invoke('getProductosByCategoria', categoria),

  buscarProductosPorNombre: (nombre) =>
    ipcRenderer.invoke('buscarProductosPorNombre', nombre)
});
