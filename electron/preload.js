const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getProductos: () =>
    ipcRenderer.invoke('getProductos'),

  getProductosByCategoria: (categoria) =>
    ipcRenderer.invoke('getProductosByCategoria', categoria),

  buscarProductosPorNombre: (nombre) =>
    ipcRenderer.invoke('buscarProductosPorNombre', nombre)
});
