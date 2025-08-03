import { Router } from "express";
import { rolesController } from "../controllers/roles.controller.js";

const rolesRouter = Router();

rolesRouter.route("/")
  .get(rolesController.getRoles)
  .post(rolesController.createRol);

rolesRouter.route('/active')
  .get(rolesController.getRolesActive);
  
rolesRouter.route('/inactive')
  .get(rolesController.getRolesInactive);

rolesRouter.route("/:id")
  .get(rolesController.getRolById)
  .put(rolesController.updateRol)
  .delete(rolesController.deleteRol);

rolesRouter.route('/:id/disable')
  .delete(rolesController.disableRol);

rolesRouter.route('/:id/enable')
  .patch(rolesController.enableRol);

export default rolesRouter;