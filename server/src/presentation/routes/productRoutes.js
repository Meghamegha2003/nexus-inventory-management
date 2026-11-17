import express from 'express'
import { productController } from '../../infrastructure/dependency-injection/container.js'

const router = express.Router()

router.post('/',productController.create)
router.get('/',productController.getAll)
router.get('/:id',productController.getById)

export default router