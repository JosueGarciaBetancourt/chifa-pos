import { Router } from 'express';
import { productosController } from '../controllers/productos.controller.js';

const router = Router();

router.route('/')
  .get(productosController.getProductos)
  .post(productosController.createProducto);

router.route('/buscarPorNombre')
  .get(productosController.buscarProductosPorNombre);

router.route('/active')
  .get(productosController.getProductosActivos);

router.route('/no-active')
  .get(productosController.getProductosNoActivos);
    
router.route('/:id')
  //.all(validateObjectId(Epic))
  .get(productosController.getProductoById)
  .put(productosController.updateProducto)
  .delete(productosController.deleteProducto);


export default router;

/* 

router.route('/')
	.get(getEpics)
	.post(validateCreateEpic, createEpic);

router.route('/:id')
	.all(validateObjectId(Epic))
	.get(getEpic)
	.put(validateUpdateEpic, updateEpic)
	.delete(deleteEpic);

router.route('/project/:id')
	.get(getEpicsByProjects)

router.post('/bulk/ids', validateObjectIdArray(Epic), getEpicsBulk);

router.route('/:id/user-stories')
  .get(getEpicUserStories);

router.route('/project/:id/stats')
  .get(getEpicsStatsByProject);

*/