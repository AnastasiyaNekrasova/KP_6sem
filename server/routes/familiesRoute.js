import { Router } from 'express'
const router = new Router()

import { getAllFamilies, getFamilyById, createFamily } from '../controllers/familiesController.js'

router.post('/', createFamily)
router.get('/', getAllFamilies)
router.get('/:id', getFamilyById)

export default router