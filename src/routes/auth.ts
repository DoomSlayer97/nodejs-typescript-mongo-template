import { Router } from "express"
import { authController } from "../controllers"

const routes = Router();

routes.post('/login', authController.loginValidatorMiddlewares, authController.login)
routes.post('/register', authController.registerValidationMiddlewares, authController.register);

export default routes;