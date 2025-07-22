import { Router } from 'express';
import { productosController } from '../controllers/productos.controller.js';

const router = Router();

router.route('/')
  .get(productosController.getProductos);

router.route('/buscarPorNombre')
  .get(productosController.buscarProductosPorNombre);

router.route('/active')
  .get(productosController.getProductosActivos);

router.route('/no-active')
  .get(productosController.getProductosNoActivos);

router.route('/:id')
  .get(productosController.getProductoById);

export default router;
