const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Productos
  getProductos: () => ipcRenderer.invoke('getProductos'),
  buscarProductosPorNombre: () => ipcRenderer.invoke('buscarProductosPorNombre'),

  // Insumos
  getInsumos: () => ipcRenderer.invoke('getInsumos'),

  // Tipos de Insumos
  getTiposInsumos: () => ipcRenderer.invoke('getTiposInsumos')
});
