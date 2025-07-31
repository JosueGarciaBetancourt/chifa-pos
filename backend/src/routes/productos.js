import { Router } from 'express';
import { productosController } from '../controllers/productos.controller.js';

const productosRouter = Router();

productosRouter.route('/')
  .get(productosController.getProductos)
  .post(productosController.createProducto);

productosRouter.route('/searchByName')
  .get(productosController.searchByName);

productosRouter.route('/active')
  .get(productosController.getProductosActive);

productosRouter.route('/no-active')
  .get(productosController.getProductosNoActive);
    
productosRouter.route('/:id')
  //.all(validateObjectId(Epic))
  .get(productosController.getProductoById)
  .put(productosController.updateProducto)
  .delete(productosController.deleteProducto);


export default productosRouter;

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