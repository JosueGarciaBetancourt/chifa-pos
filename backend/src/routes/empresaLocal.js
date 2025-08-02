import { Router } from 'express';
import { empresaLocalController } from '../controllers/empresaLocal.controller.js';

const empresaLocalRouter = Router();

empresaLocalRouter.route('/')
  .get(empresaLocalController.getEmpresaLocalAll);
  
empresaLocalRouter.route('/active')
  .get(empresaLocalController.getEmpresaLocalActive);

empresaLocalRouter.route('/inactive')
  .get(empresaLocalController.getEmpresaLocalInactive);

empresaLocalRouter.route('/principal')
  .get(empresaLocalController.getEmpresaLocalPrincipal);

empresaLocalRouter.route('/:id')
  .put(empresaLocalController.updateEmpresaLocal)

empresaLocalRouter.route('/:id/disable')
  .delete(empresaLocalController.disableEmpresaLocal);

empresaLocalRouter.route('/:id/enable')
  .patch(empresaLocalController.enableEmpresaLocal);

export default empresaLocalRouter;
