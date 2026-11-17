import express from 'express'
import { productController } from '../../infrastructure/dependency-injection/container.js'
import AuthMiddleware from '../middleware/AuthMiddleware.js'
import RoleMiddleware from '../middleware/RoleMiddleware.js'
import ValidateProduct from "../middleware/ValidateProduct.js";

const router = express.Router()

router.post('/',AuthMiddleware,RoleMiddleware("manager"),ValidateProduct,productController.create)
router.get('/',AuthMiddleware,RoleMiddleware("manager"),productController.getAll)
router.get('/:id',AuthMiddleware,RoleMiddleware("manager"),productController.getById)

export default router