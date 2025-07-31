import { Router } from 'express';
import { empresaLocalController } from '../controllers/empresaLocal.controller.js';

const empresaLocalRouter = Router();

empresaLocalRouter.route('/')
  .get(empresaLocalController.getEmpresaLocal);

export default empresaLocalRouter;
