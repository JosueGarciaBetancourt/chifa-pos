import productosRouter from './productos.js';
import insumosRouter from './insumos.js';

export default [
  { path: '/api/productos', router: productosRouter },
  { path: '/api/insumos', router: insumosRouter },
  //{ path: '/api/categorias', router: categoriasRouter },
];
