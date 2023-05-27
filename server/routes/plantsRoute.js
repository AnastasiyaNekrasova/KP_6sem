import { Router } from 'express'
import {
    createPlant,
    getAllPlants,
    getPlantById,
    removePlant,
    updatePlant,
    getPlantComments,
} from '../controllers/plantsController.js'
import { checkAuth } from '../utils/checkAuth.js'
import { checkRole } from '../utils/checkRole.js'
const router = new Router()

router.post('/', checkAuth, createPlant)
router.get('/', getAllPlants)
router.get('/:id',  checkAuth, getPlantById)
router.put('/:id', checkAuth, updatePlant)
router.delete('/:id', checkAuth, removePlant)
router.get('/comments/:id',  checkAuth, getPlantComments)

export default router

// checkRole('spec')