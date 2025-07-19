import { Router } from 'express';
import { productosController } from '../controllers/productos.controller.js';

const router = Router();

router.route('/')
  .get(productosController.getProductos);

router.route('/buscarPorNombre')
  .get(productosController.buscarProductosPorNombre);

export default router;
