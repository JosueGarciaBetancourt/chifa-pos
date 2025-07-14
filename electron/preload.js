const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Productos
  getProductos: () => ipcRenderer.invoke('getProductos'),

  getProductosByCategoria: (categoria) =>
    ipcRenderer.invoke('getProductosByCategoria', categoria),

  buscarProductosPorNombre: (nombre) =>
    ipcRenderer.invoke('buscarProductosPorNombre', nombre),

  // Insumos
  getInsumos: () => ipcRenderer.invoke('getInsumos'),

  buscarInsumosPorNombre: (nombre) =>
    ipcRenderer.invoke('buscarInsumosPorNombre', nombre),

  getInsumosBajoStock: () => ipcRenderer.invoke('getInsumosBajoStock'),
});