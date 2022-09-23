import { Router } from "express"
import { clientsController } from "../controllers"

const routes = Router();

routes.post('/', clientsController.bodyValidationMiddlewares, clientsController.create);
routes.get('/', clientsController.findAll);
routes.get('/:id', clientsController.findOne);
routes.put('/:id', clientsController.bodyValidationMiddlewares, clientsController.updateOne);
routes.delete('/:id', clientsController.deleteOne);

export default routes;