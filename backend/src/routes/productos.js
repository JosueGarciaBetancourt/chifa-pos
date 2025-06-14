// backend/src/routes/productos.js
import { Router } from 'express';
import { productosController } from '../controllers/productos.controller.js';

const router = Router();

router.route('/')
  .get(productosController.getProductos);

export default router;
