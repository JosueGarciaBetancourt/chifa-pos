import { Router } from "express";
import { productoController } from "../controllers/Producto.controller.js";

const router = Router();

router
  .route("/")
  .get(productoController.getAll)
  .post(productoController.create);

router.route("/buscarPorNombre").get(productoController.searchByName);

router.route("/active").get(productoController.getActive);

router.route("/no-active").get(productoController.getNoActive);

router
  .route("/:id")
  .get(productoController.getById)
  .put(productoController.update)
  .delete(productoController.delete);

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
