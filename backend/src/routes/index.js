import productosRouter from './productos.js';
import insumosRouter from './insumos.js';
import tiposInsumosRouter from './tiposInsumos.js';

export default [
  { path: '/api/productos', router: productosRouter },
  { path: '/api/insumos', router: insumosRouter },
  { path: '/api/tiposInsumos', router: tiposInsumosRouter },
];
