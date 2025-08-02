import { Router } from "express";
import { sedeLocalController } from "../controllers/sedeLocal.controller.js";

const sedeLocalRouter = Router();

sedeLocalRouter.route('/')
  .get(sedeLocalController.getSedeLocalAll);
  
sedeLocalRouter.route('/active')
  .get(sedeLocalController.getSedeLocalActive);

sedeLocalRouter.route('/inactive')
  .get(sedeLocalController.getSedeLocalInactive);

sedeLocalRouter.route('/:id')
  .put(sedeLocalController.updateSedeLocal)

sedeLocalRouter.route('/:id/disable')
  .delete(sedeLocalController.disableSedeLocal);

sedeLocalRouter.route('/:id/enable')
  .patch(sedeLocalController.enableSedeLocal);


export default sedeLocalRouter;