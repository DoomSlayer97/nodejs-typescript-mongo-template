import { Router } from "express"
import authRoutes from "./auth"
import clientsRoutes from "./clients"

const apiRoutes = Router();

apiRoutes.use('/api/auth', authRoutes);
apiRoutes.use('/api/clients', clientsRoutes);

export {apiRoutes};